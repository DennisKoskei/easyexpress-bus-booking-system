// /api/user/checkout-bookings.ts

import { prisma } from "@utils/prisma";
import { decodeJwt } from "jose";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const busId = url.searchParams.get("busId");
    const routeId = url.searchParams.get("routeId");
    const bookingIds = url.searchParams.get("bookingIds");

    console.log("Received busId:", busId);
    console.log("Received routeId:", routeId);
    console.log("Received bookingIds:", bookingIds);

    if (!busId || !routeId || !bookingIds) {
      return new Response("Missing required parameters", { status: 400 });
    }

    // Ensure bookingIds is properly parsed from JSON-encoded string
    let bookingIdsArray: string[] = [];
    try {
      bookingIdsArray = JSON.parse(bookingIds);
    } catch (error) {
      console.error("Failed to parse bookingIds:", error);
      return new Response("Failed to parse bookingIds", { status: 400 });
    }

    console.log("Parsed bookingIds array:", bookingIdsArray);

    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    let email = "john.doe@example.com";
    if (token) {
      const decoded = decodeJwt(token);
      if (decoded?.email && typeof decoded.email === "string") {
        email = decoded.email;
      }
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return new Response("User not found", { status: 404 });

    // Fetch the bookings with matching IDs for the user
    const bookings = await prisma.booking.findMany({
      where: {
        id: { in: bookingIdsArray }, // Use the parsed array for bookingIds
        userId: user.id, // Ensure the bookings belong to the user
        routeId: routeId, // Ensure the bookings match the given routeId
      },
      include: {
        bookingSeats: {
          include: {
            routeSeat: {
              include: { seat: true }, // Include seat details
            },
          },
        },
      },
    });

    if (bookings.length === 0) {
      return new Response("No bookings found for the provided parameters", {
        status: 404,
      });
    }
    // Find price for the route
    const routeAmount = await prisma.route.findUnique({
      where: { id: routeId },
    });

    if (!routeAmount) {
      return new Response("Route not found", {
        status: 404,
      });
    }

    // Map the booking details to include relevant information
    const result = bookings.map((booking) => ({
      id: booking.id,
      passengerName: booking.passengerName,
      passengerPhone: booking.passengerPhone,
      seatNumber: booking.bookingSeats[0]?.routeSeat?.seat?.seatNumber || 0,
      amount: routeAmount.amount,
      // Add any other relevant fields from the booking
      // departure, destination, time, gender
    }));

    return new Response(JSON.stringify({ bookings: result }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch bookings", { status: 500 });
  }
}
