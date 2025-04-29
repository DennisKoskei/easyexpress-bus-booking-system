/**
 * API Endpoint: POST /api/user/booking-details
 *
 * Description:
 * This API allows a logged-in user to book one or more seats for a specific bus route.
 * It accepts the route ID, bus ID, selected seats, and passenger details (name, phone, seat number), It then creates booking records linked to the user, updates seat statuses to "BOOKED", and associates the bookings with the correct seats.
 * If the user's authentication token is valid, their email is extracted from the token to identify them; otherwise, a fallback email is used.
 * The endpoint ensures that each seat booked is correctly tracked for the specific bus and route combination.
 */

import { prisma } from "@utils/prisma";
import { decodeJwt } from "jose";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("Received body:", body);
  const { routeId, busId, passengerDetails } = body;

  try {
    // Extract token from Authorization header
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    // Decode JWT using jose or fallback to dummy email
    let email = "john.doe@example.com";
    if (token) {
      try {
        const decoded = decodeJwt(token);
        if (decoded?.email && typeof decoded.email === "string") {
          email = decoded.email;
        }
      } catch (error) {
        console.error("Failed to decode JWT:", error);
        console.warn("Failed to decode JWT, using dummy email.");
      }
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const createdBookings: string[] = []; // Array to store created booking IDs
    const createdBookingSeats: string[] = []; // Array to store created booking seat IDs

    for (const detail of passengerDetails) {
      // Creating the Booking in booking table
      const booking = await prisma.booking.create({
        data: {
          userId: user.id,
          routeId,
          passengerName: detail.name,
          passengerPhone: detail.phone,
          passengerGender: "OTHER", // Update if needed
        },
      });

      createdBookings.push(booking.id); // Add the booking ID to the array

      const seat = await prisma.seat.findFirst({
        where: { seatNumber: detail.seat, busId },
      });

      if (!seat) {
        throw new Error(`Seat ${detail.seat} not found for this bus`);
      }

      const createdRouteSeat = await prisma.seat.findFirst({
        where: { id: seat!.id, busId },
      });

      await prisma.routeSeat.create({
        data: {
          routeId: routeId,
          seatId: createdRouteSeat!.id,
          status: "AVAILABLE",
        },
      });

      // Find the route seat based on the seat ID and route ID
      const routeSeat = await prisma.routeSeat.findFirst({
        where: {
          seatId: seat!.id,
          routeId: routeId,
        },
      });

      if (!routeSeat) {
        throw new Error(`Route seat not found for seat ${detail.seat}`);
      }

      await prisma.routeSeat.update({
        where: { id: routeSeat.id },
        data: { status: "BOOKED" },
      });

      const bookingSeat = await prisma.bookingSeat.create({
        data: {
          bookingId: booking.id,
          routeSeatId: routeSeat.id,
        },
      });

      createdBookingSeats.push(bookingSeat.id); // Add the booking seat ID to the array
    }

    return new Response(
      JSON.stringify({
        message: "Booking successful",
        bookingIds: createdBookings, // Return the booking IDs
        bookingSeatIds: createdBookingSeats, // Return the booking seat IDs
      }),
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
