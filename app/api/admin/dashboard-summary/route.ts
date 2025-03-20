/**
 * API Route: GET /api/counts
 * Description: Fetches the total number of records for users, buses, routes, drivers, payments, and bookings.
 * Uses Prisma to query the database and returns a JSON response.
 */

import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";

export async function GET() {
  try {
    const [users, buses, routes, drivers, payments, bookings, totalRevenue] =
      await Promise.all([
        prisma.user.count(),
        prisma.bus.count(),
        prisma.route.count(),
        prisma.driver.count(),
        prisma.payment.count(),
        prisma.booking.count(),
        prisma.payment
          .aggregate({ _sum: { amountPaid: true } })
          .then((res) => res._sum.amountPaid || 0),
      ]);

    return NextResponse.json({
      users,
      buses,
      routes,
      drivers,
      payments,
      bookings,
      totalRevenue,
    });
  } catch (error) {
    console.error("Error fetching counts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
