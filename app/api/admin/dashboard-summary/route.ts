/**
 * API Route: GET /api/counts
 * Description: Fetches the total number of records for users, buses, routes, drivers, payments, and bookings.
 * Uses Prisma to query the database and returns a JSON response.
 */

import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";

export async function GET() {
  try {
    const [
      users,
      buses,
      routes,
      drivers,
      payments,
      bookings,
      totalRevenueData,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.bus.count(),
      prisma.route.count(),
      prisma.driver.count(),
      prisma.payment.count(),
      prisma.booking.count(),
      prisma.payment.aggregate({ _sum: { amountPaid: true } }),
    ]);

    const totalRevenue = totalRevenueData?._sum?.amountPaid || 0;

    return NextResponse.json({
      data: {
        users,
        buses,
        routes,
        drivers,
        payments,
        bookings,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error("Error fetching counts:", error);

    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 },
    );
  }
}
