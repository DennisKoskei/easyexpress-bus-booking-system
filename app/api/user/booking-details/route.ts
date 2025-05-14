// API: /app/api/user/booking-details/route.ts

import { prisma } from "@utils/prisma";

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

    // Use a hardcoded dummy email since auth is not yet implemented
    const email = "john.doe@example.com";

    // Get the user by email
    const user = await prisma.user.findUnique({
      where: { email },
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
