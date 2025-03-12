import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";

export async function GET() {
  try {
    const routes = await prisma.route.findMany();
    console.log("API Fetch Users:", routes); // ✅ Console log in API route
    return NextResponse.json(routes);
  } catch (error) {
    console.error("API Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}
