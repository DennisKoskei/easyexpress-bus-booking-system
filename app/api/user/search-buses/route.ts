import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received req.body:", body);

    const { departure, destination, date } = body;

    if (!departure || !destination || !date) {
      console.error("Error: Missing required fields");
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const foundBuses = await prisma.route.findMany({
      where: {
        departure,
        destination,
        date: {
          gte: new Date(`${date}T00:00:00.000Z`), // Start of the day
          lt: new Date(`${date}T24:00:00.000Z`), // End of the day
        },
      },
      include: {
        bus: true,
        // routeSeats: true,
      },
    });

    console.log("Found Buses:", foundBuses);

    // Transforming data to explicitly include busId
    const busesWithId = foundBuses.map((route) => ({
      routeId: route.id, // Route ID
      busId: route.bus?.id ?? null, // Include busId explicitly
      plateNumber: route.bus?.plateNumber ?? null, // Include bus plate number if available
      departure: route.departure,
      destination: route.destination,
      date: route.date,
      time: route.time,
      amount: route.amount,
      totalSeats: route.bus?.totalSeats ?? null, // Include total seats if available
      busAvatar: route.bus?.busAvatar ?? null, // Include bus avatar if available
      driverId: route.bus?.driverId ?? null, // Include driver ID if available
    }));

    console.log("Found Transformed Bues :-->:", busesWithId);

    return NextResponse.json({ foundBuses: busesWithId }, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) }, // Include the error message
      { status: 500 },
    );
  }
}
