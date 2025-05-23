import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@utils/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@utils/auth";
import QRCode from "qrcode";

export async function POST(req: NextRequest) {
  console.log("Inside ticket creation API route");

  const session = await getServerSession(authConfig);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { busId, routeId, bookingIds } = await req.json();
    console.log("Bus ID:", busId);
    console.log("Route ID:", routeId);
    console.log("Booking IDs:", bookingIds);
    console.log("Array.isArray(bookingIds):", Array.isArray(bookingIds));

    if (
      !busId ||
      !routeId ||
      !Array.isArray(bookingIds) ||
      bookingIds.length === 0
    ) {
      console.log("Erorr in Missing or invalid required fields");
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 },
      );
    } else {
      console.log("Success validating busId, routeId and bokingIds is Array");
    }

    const createdTickets = [];

    // Fetch bus and route only once for reuse
    const bus = await prisma.bus.findUnique({ where: { id: busId } });
    const route = await prisma.route.findUnique({ where: { id: routeId } });

    for (const bookingId of bookingIds) {
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          bookingSeats: {
            include: {
              routeSeat: {
                include: {
                  seat: {
                    include: {
                      bus: true,
                    },
                  },
                  route: true,
                },
              },
            },
          },
          user: true,
        },
      });

      if (!booking) {
        console.warn(`Booking not found: ${bookingId}`);
        continue;
      } else {
        console.log("---Success: Booking found : ---");
        console.log(`Booking  found: ${bookingId}`);
      }

      console.log("Starting Step 2:");
      for (const bookingSeat of booking.bookingSeats) {
        const seatNumber = bookingSeat.routeSeat.seat.seatNumber;

        const qrContent = ` Booking ID: ${booking.id} Passenger: ${booking.passengerName} Route: ${route?.departure} → ${route?.destination} Seat: ${seatNumber}`;
        const qrDataUrl = await QRCode.toDataURL(qrContent);

        const newTicket = await prisma.ticket.create({
          data: {
            passengerId: booking.userId,
            bookingSeatId: bookingSeat.id,
            routeId,
            seatNumber,
            busPlate: bus?.plateNumber || "UNKNOWN",
            price: route?.amount || 0,
            qrCode: qrDataUrl,
          },
        });

        createdTickets.push(newTicket);
        console.log("Created Ticket: --> ", newTicket);
      }

      if (booking.status !== "PAID") {
        await prisma.booking.update({
          where: { id: bookingId },
          data: { status: "PAID" },
        });
      }
    }

    return NextResponse.json({ tickets: createdTickets }, { status: 201 });
  } catch (error) {
    console.error("[TICKET_CREATION_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
