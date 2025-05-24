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

// 🟢 GET: FETCH ALL USERS WITH BOOKING AND TICKET COUNTS
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        bookings: {
          select: {
            id: true,
            bookingSeats: {
              select: {
                id: true,
                ticket: {
                  select: {
                    id: true,
                    passengerId: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    console.log("Users found: --> --> ", users);

    const enrichedUsers = users.map((user) => ({
      ...user,
      totalBookings: user.bookings.length,
      totalTickets: user.bookings.reduce((sum, booking) => {
        const ticketsInBooking = booking.bookingSeats.reduce(
          (seatSum, seat) => {
            return seat.ticket ? seatSum + 1 : seatSum;
          },
          0,
        );
        return sum + ticketsInBooking;
      }, 0),
    }));
    console.log("EnrichedUsers found: --> --> ", enrichedUsers);

    return NextResponse.json(enrichedUsers);
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
      avatarUrl,
      gender,
      age,
      role,
    } = await req.json();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !role
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const finalAvatarUrl = avatarUrl?.trim() === "" ? null : avatarUrl;

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        passwordHash,
        avatarUrl: finalAvatarUrl,
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
