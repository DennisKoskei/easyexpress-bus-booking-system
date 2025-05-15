/**
 * API Route: /api/user/profile
 * Description: Provides CRUD operations for a specific user's profile.
 * - GET: Fetch the user's details by ID.
 * - PUT: Update the user's profile, including the avatar.
 * - DELETE: Remove the user's profile.
 * - No authentication required (for now).
 */

import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@utils/auth";

// 🟢 GET: FETCH USER DETAILS BY ID
export async function GET() {
  try {
    // Get user session
    const session = await getServerSession(authConfig);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    console.log("User ID from session:", userId);

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
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

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("API Error fetching user details:", error);
    return NextResponse.json(
      { error: "Failed to fetch user details" },
      { status: 500 },
    );
  }
}

// 🟠 PUT: UPDATE USER PROFILE WITHOUT AUTHENTICATION
export async function PUT(req: Request) {
  try {
    const { id, ...updateData } = await req.json();

    if (!id || Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData, // Update only the fields provided in the request
    });

    console.log("User Profile Updated:", updatedUser);
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}

// 🔴 DELETE: REMOVE USER PROFILE
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    await prisma.user.delete({ where: { id } });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}
