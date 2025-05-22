// API Route: /api/user/initiate-bookings

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@utils/prisma";

export async function GET(req: NextRequest) {
  console.log("Inside initiate-bookings API route");
  try {
    const { searchParams } = new URL(req.url);
    const busId = searchParams.get("busId");
    const routeId = searchParams.get("routeId");
    console.log("Received busId:", busId);
    console.log("Received routeId:", routeId);

    if (!busId || !routeId) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 },
      );
    }

    const route = await prisma.route.findUnique({
      where: { id: routeId },
    });

    const bus = await prisma.bus.findUnique({
      where: { id: busId },
    });

    if (!route || !bus) {
      return NextResponse.json(
        { error: "Bus or Route not found" },
        { status: 404 },
      );
    }

    // 1. Fetch all seats
    const allSeats = await prisma.seat.findMany();

    // 2. Fetch routeSeat statuses for this route
    const routeSeats = await prisma.routeSeat.findMany({
      where: { routeId },
      include: { seat: true },
    });

    // 3. Create a map of booked seatNumbers
    const seatStatusMap = new Map<number, string>();
    for (const rs of routeSeats) {
      seatStatusMap.set(rs.seat.seatNumber, rs.status);
    }

    // 4. Combine seat data
    const seenSeatNumbers = new Set<number>();
    const seatsWithStatus = allSeats
      .map((seat) => {
        const isBooked = seatStatusMap.get(seat.seatNumber) === "BOOKED";
        return {
          ...seat,
          isBooked,
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
