import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@utils/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authConfig);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: body, // Update only the fields provided in the request
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}
