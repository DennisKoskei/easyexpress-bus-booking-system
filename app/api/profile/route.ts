// Route to allow users to Modify their profile
// Modify so that it only fetches the user's details

import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";
import { getServerSession } from "next-auth"; // If using next-auth
import { authConfig } from "@utils/auth"; // Adjust based on your setup

export async function GET() {
  try {
    const session = await getServerSession(authConfig); // Get the logged-in user's session

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id; // Extract user ID from session

    const userDetails = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        gender: true,
        age: true,
        role: true,
        createdAt: true,
      },
    });

    if (!userDetails) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userDetails);
  } catch (error) {
    console.error("API Error fetching user details:", error);
    return NextResponse.json(
      { error: "Failed to fetch user details" },
      { status: 500 },
    );
  }
}
