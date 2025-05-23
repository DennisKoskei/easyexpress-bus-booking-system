// API: /app/api/user/booking-details/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@utils/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { routeId, busId, passengerDetails } = body as {
      routeId: string;
      busId: string;
      passengerDetails: Array<{
        seat: number;
        name: string;
        phone: string;
        idNumber?: string; // optional field
      }>;
    };

    const session = await getServerSession(authConfig);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionEmail = session.user.email;

    const user = await prisma.user.findUnique({
      where: { email: sessionEmail },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const createdBookings: string[] = [];
    const createdBookingSeats: string[] = [];

    for (const detail of passengerDetails) {
      // Create booking
      const booking = await prisma.booking.create({
        data: {
          userId: user.id,
          routeId,
          passengerName: detail.name,
          passengerPhone: detail.phone,
          passengerGender: "OTHER", // Placeholder, can be updated
        },
      });

      createdBookings.push(booking.id);

      // Find the seat by seat number and bus ID
      const seat = await prisma.seat.findFirst({
        where: { seatNumber: detail.seat, busId },
      });

      if (!seat) {
        throw new Error(`Seat ${detail.seat} not found for this bus`);
      }

      if (!routeId || !seat?.id) {
        console.error("Missing routeId or seat.id:", { routeId, seat });
        continue; // skip this iteration
      }

      // Ensure a routeSeat exists for this route/seat/bus
      await prisma.routeSeat.upsert({
        where: {
          routeId_seatId: {
            routeId,
            seatId: seat.id,
          },
        },
        update: {}, // no update needed
        create: {
          routeId,
          seatId: seat.id,
          status: "AVAILABLE",
        },
      });

      // Now fetch the routeSeat to update its status
      const routeSeat = await prisma.routeSeat.findFirst({
        where: {
          routeId,
          seatId: seat.id,
        },
      });

      if (!routeSeat) {
        throw new Error(`Route seat not found for seat ${detail.seat}`);
      }

      // Mark seat as BOOKED
      await prisma.routeSeat.update({
        where: { id: routeSeat.id },
        data: { status: "BOOKED" },
      });

      // Create booking-seat link
      const bookingSeat = await prisma.bookingSeat.create({
        data: {
          bookingId: booking.id,
          routeSeatId: routeSeat.id,
        },
      });

      createdBookingSeats.push(bookingSeat.id);
    }

    return new Response(
      JSON.stringify({
        message: "Booking successful",
        bookingIds: createdBookings,
        bookingSeatIds: createdBookingSeats,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (err) {
    console.error("Booking API Error:", err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
