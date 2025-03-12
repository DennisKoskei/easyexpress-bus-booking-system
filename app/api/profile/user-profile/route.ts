import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";
import { loginIsRequiredServer } from "@utils/auth"; // Import function

export async function GET() {
  try {
    // 🔒 Check authentication using loginIsRequiredServer()
    const session = await loginIsRequiredServer();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract user ID safely
    const userId = Number(session.user.id);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Fetch user from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        age: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("Fetched User:", user);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch user profile",
        details: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
