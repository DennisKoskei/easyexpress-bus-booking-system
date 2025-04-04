/**
 * API Route: /api/admin/users
 * Description: Provides CRUD operations for the user table.
 * - GET: Fetch all users.
 * - POST: Add a new user with required details.
 * - PUT: Update an existing user by ID.
 * - DELETE: Remove a user by ID.
 */

import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";

// 🟢 GET: FETCH ALL USERS
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    console.log("API Fetch Users --> :", users); // ✅ Console log in API route
    return NextResponse.json(users);
  } catch (error) {
    console.error("API Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

// 🔵 POST: ADD A NEW USER
export async function POST(req: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      passwordHash,
      gender,
      age,
      role,
    } = await req.json();

    if (!email || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        passwordHash,
        gender,
        age,
        role,
      },
    });

    console.log("User Created:", newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("API Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}

// 🟠 PUT: UPDATE A USER BY ID
export async function PUT(req: Request) {
  try {
    const { id, firstName, lastName, email, phone, gender, role } =
      await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { firstName, lastName, email, phone, gender, role },
    });

    console.log("User Updated:", updatedUser);
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("API Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}

// 🔴 DELETE: REMOVE A USER BY ID
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

    console.log("User Deleted:", id);
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
