// /app/api/user/list-of-bookings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@utils/prisma"; // adjust path if needed

export async function GET(req: NextRequest) {
  try {
    // Placeholder user ID (replace with session logic in production)
    const userId = "cm9lg7ztx0000xtj0w7gpc3xv";
    console.log("Inside list-of-bookings API");

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

    if (bookings.length === 0) {
      return NextResponse.json(
        { message: "No bookings found" },
        { status: 404 },
      );
    }
    console.log("Bookings: --> ", bookings);

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

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("Failed to fetch user bookings:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
