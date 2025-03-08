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
          lt: new Date(`${date}T24:00:00.000Z`), // Start of the next day (or 00:00:00 of the next day)
        },
      }, // Convert date string to Date object
    });

    console.log("Found Buses:", foundBuses);

    // No need for a null check here. findMany always returns an array.
    return NextResponse.json({ foundBuses }, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) }, // Include the error message
      { status: 500 },
    );
  }
}
