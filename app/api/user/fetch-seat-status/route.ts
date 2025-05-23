// API Route: /api/user/fetch-seat-status

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@utils/prisma";

export async function GET(req: NextRequest) {
  console.log("Inside fetch-booking-details API route");
  try {
    const { searchParams } = new URL(req.url);
    const busId = searchParams.get("busId");
    const routeId = searchParams.get("routeId");

    if (!busId || !routeId) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 },
      );
    }

    // Fetch route and bus
    const [route, bus] = await Promise.all([
      prisma.route.findUnique({ where: { id: routeId } }),
      prisma.bus.findUnique({ where: { id: busId }, include: { seats: true } }),
    ]);

    if (!route || !bus) {
      return NextResponse.json(
        { error: "Bus or Route not found" },
        { status: 404 },
      );
    }

    // Step 1: Ensure all Seat entries exist for this bus
    const existingSeatNumbers = new Set(
      bus.seats.map((seat) => seat.seatNumber),
    );

    const seatCreatePromises = [];
    for (let i = 1; i <= bus.totalSeats; i++) {
      if (!existingSeatNumbers.has(i)) {
        seatCreatePromises.push(
          prisma.seat.create({
            data: {
              busId: bus.id,
              seatNumber: i,
            },
          }),
        );
      }
    }

    if (seatCreatePromises.length > 0) {
      await Promise.all(seatCreatePromises);
    }

    // Step 2: Fetch all (updated) seats
    const allSeats = await prisma.seat.findMany({ where: { busId: bus.id } });

    // Step 3: Ensure RouteSeat entries exist
    const existingRouteSeats = await prisma.routeSeat.findMany({
      where: { routeId },
    });

    const existingSeatIds = new Set(existingRouteSeats.map((rs) => rs.seatId));

    const routeSeatCreatePromises = [];
    for (const seat of allSeats) {
      if (!existingSeatIds.has(seat.id)) {
        routeSeatCreatePromises.push(
          prisma.routeSeat.upsert({
            where: {
              routeId_seatId: {
                routeId,
                seatId: seat.id,
              },
            },
            update: {}, // Do nothing if it exists
            create: {
              routeId,
              seatId: seat.id,
              status: "AVAILABLE",
            },
          }),
        );
      }
    }

    if (routeSeatCreatePromises.length > 0) {
      await Promise.all(routeSeatCreatePromises);
    }

    // Step 4: Fetch routeSeat statuses again with seat data
    const updatedRouteSeats = await prisma.routeSeat.findMany({
      where: { routeId },
      include: { seat: true },
    });

    // Step 5: Create a map of seatNumber -> status
    const seatStatusMap = new Map<number, string>();
    for (const rs of updatedRouteSeats) {
      seatStatusMap.set(rs.seat.seatNumber, rs.status);
      console.log("Seat Number:", rs.seat.seatNumber, "Status:", rs.status);
    }

    // Step 6: Prepare response data
    const seenSeatNumbers = new Set<number>();
    const seatsWithStatus = allSeats
      .map((seat) => {
        const status = seatStatusMap.get(seat.seatNumber);
        const isBooked = status === "BOOKED";
        return {
          ...seat,
          isBooked,
          status: status ?? "AVAILABLE",
        };
      })
      .filter((seat) => {
        if (seenSeatNumbers.has(seat.seatNumber)) return false;
        seenSeatNumbers.add(seat.seatNumber);
        return true;
      });

    return NextResponse.json({
      route,
      bus,
      seats: seatsWithStatus,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
