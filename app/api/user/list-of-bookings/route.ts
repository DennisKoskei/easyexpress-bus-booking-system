// /app/api/user/list-of-bookings/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@utils/auth";

export async function GET() {
  try {
    console.log("Inside list-of-bookings route");

    const session = await getServerSession(authConfig);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    console.log("User ID from session:", userId);

    const bookings = await prisma.booking.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        route: {
          select: {
            departure: true,
            destination: true,
            date: true,
            time: true,
          },
        },
        bookingSeats: {
          include: {
            ticket: true,
          },
        },
      },
    });

    console.log("Bookings fetched: --> --> ", bookings);

    const formatted = bookings.map((b) => {
      const ticket = b.bookingSeats[0]?.ticket;

      return {
        id: b.id,
        route: {
          departure: b.route.departure,
          destination: b.route.destination,
          date: b.route.date.toISOString().split("T")[0],
          time: b.route.time,
        },
        passengerName: b.passengerName,
        passengerPhone: b.passengerPhone,
        passengerGender: b.passengerGender,
        createdAt: b.createdAt.toISOString(),
        ticket: ticket
          ? {
            seatNumber: ticket.seatNumber,
            busPlate: ticket.busPlate,
            price: ticket.price,
            qrCode: ticket.qrCode,
          }
          : null,
      };
    });

    return NextResponse.json(formatted); // returns [] if no bookings found
  } catch (err) {
    console.error("Failed to fetch user bookings:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
