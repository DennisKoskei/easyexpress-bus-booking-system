/**
 * API Route: /api/drivers
 * Description: Provides CRUD operations for the drivers table.
 * - GET: Fetch all drivers along with their assigned bus (if any).
 * - POST: Add a new driver with required details.
 * - PUT: Update an existing driver by ID.
 * - DELETE: Remove a driver by ID.
 */

import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";

// 🟢 GET: FETCH ALL DRIVERS
export async function GET() {
  try {
    const drivers = await prisma.driver.findMany();
    // include: { bus: true },
    console.log("API Fetch Drivers:", drivers);
    return NextResponse.json(drivers);
  } catch (error) {
    console.error("API Error fetching drivers:", error);
    return NextResponse.json(
      { error: "Failed to fetch drivers" },
      { status: 500 },
    );
  }
}

// 🔵 POST: ADD A NEW DRIVER
export async function POST(req: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      passwordHash,
      gender,
      age,
      avatarUrl,
      phone,
      licenseNo,
      experience,
    } = await req.json();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !passwordHash ||
      !gender ||
      !age ||
      !phone ||
      !licenseNo ||
      !experience
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const finalAvatarUrl = avatarUrl?.trim() === "" ? null : avatarUrl;

    const newDriver = await prisma.driver.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash,
        gender,
        age,
        avatarUrl: finalAvatarUrl,
        phone,
        licenseNo,
        experience,
      },
    });

    console.log("Driver Created:", newDriver);
    return NextResponse.json(newDriver, { status: 201 });
  } catch (error) {
    console.error("API Error creating driver:", error);
    return NextResponse.json(
      { error: "Failed to create driver" },
      { status: 500 },
    );
  }
}

// 🟠 PUT: UPDATE A DRIVER BY ID
export async function PUT(req: Request) {
  try {
    const {
      id,
      firstName,
      lastName,
      email,
      gender,
      age,
      avatarUrl,
      phone,
      licenseNo,
      experience,
    } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Driver ID is required" },
        { status: 400 },
      );
    }

    const updatedDriver = await prisma.driver.update({
      where: { id },
      data: {
        id,
        firstName,
        lastName,
        email,
        gender,
        age,
        avatarUrl,
        phone,
        licenseNo,
        experience,
      },
    });

    console.log("Driver Updated:", updatedDriver);
    return NextResponse.json(updatedDriver, { status: 200 });
  } catch (error) {
    console.error("API Error updating driver:", error);
    return NextResponse.json(
      { error: "Failed to update driver" },
      { status: 500 },
    );
  }
}

// 🔴 DELETE: REMOVE A DRIVER BY ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Driver ID is required" },
        { status: 400 },
      );
    }

    const assignedBus = await prisma.bus.findFirst({
      where: { driverId: id },
    });

    if (assignedBus) {
      return NextResponse.json(
        {
          error: "Cannot delete driver. They are currently assigned to a bus.",
        },
        { status: 400 },
      );
    }

    await prisma.driver.delete({ where: { id } });

    return NextResponse.json(
      { message: "Driver deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Error deleting driver:", error);
    return NextResponse.json(
      { error: "Failed to delete driver" },
      { status: 500 },
    );
  }
}
