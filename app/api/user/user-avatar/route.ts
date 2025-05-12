import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@utils/auth"; // Adjust the path as needed

export async function GET() {
  try {
    // Get user session
    const session = await getServerSession(authConfig);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the user's avatar from the database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { avatar: true }, // Fetch only the avatar field
    });

    if (!user || !user.avatar) {
      return NextResponse.json({ error: "Avatar not found" }, { status: 404 });
    }

    return NextResponse.json({ avatarUrl: user.avatar });
  } catch (error) {
    console.error("API Error fetching user avatar:", error);
    return NextResponse.json(
      { error: "Failed to fetch user avatar" },
      { status: 500 },
    );
  }
}
