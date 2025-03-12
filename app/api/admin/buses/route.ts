import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";

export async function GET() {
  try {
    const buses = await prisma.bus.findMany();
    console.log("API Fetch Buses:", buses); // ✅ Console log in API route
    return NextResponse.json(buses);
  } catch (error) {
    console.error("API Error fetching buses:", error);
    return NextResponse.json(
      { error: "Failed to fetch buses" },
      { status: 500 },
    );
  }
}
