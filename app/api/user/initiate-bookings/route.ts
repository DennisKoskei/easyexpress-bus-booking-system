// API Route: /api/user/initiate-bookings

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@utils/prisma";

export async function GET(req: NextRequest) {
  console.log("Inside initiate-bookings API route");
  const { searchParams } = new URL(req.url);
  const busId = searchParams.get("busId");
  const routeId = searchParams.get("routeId");
  console.log("Received busId:", busId);
  console.log("Received routeId:", routeId);

  if (!busId || !routeId) {
    return NextResponse.json(
      { error: "Missing busId or routeId" },
      { status: 400 },
    );
  }

  try {
    const route = await prisma.route.findUnique({
      where: { id: routeId },
    });

    const bus = await prisma.bus.findUnique({
      where: { id: busId },
    });

    const seats = await prisma.seat.findMany({
      where: { busId },
      orderBy: { seatNumber: "asc" },
    });

    if (!route || !bus) {
      return NextResponse.json(
        { error: "Bus or Route not found" },
        { status: 404 },
      );
    }

    console.log("Bookings Route :-->", route);
    console.log("Bookings Bus :-->", bus);
    console.log("Bookings Seats :-->", seats);
    return NextResponse.json({ route, bus, seats });
  } catch (error) {
    console.error("API Error in /initiate-bookings:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
