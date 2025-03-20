/**
 * GET /api/tickets
 * Retrieves all tickets with passenger, booking, route, and seat details.
 * Returns a JSON array of tickets or an error message if the request fails.
 */

import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";

export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        passenger: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        booking: true, // Include booking details
        route: true, // Include route details
        seat: true, // Include seat details
        //payment: true, // Include payment details
      },
    });

    return NextResponse.json({ tickets }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 },
    );
  }
}
