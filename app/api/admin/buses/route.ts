/**
 * API Route: /api/admin/buses
 * Description: Provides CRUD operations for the bus table.
 * - GET: Fetch all buses along with their related data (driver, routes, seats).
 * - POST: Add a new bus with required details.
 * - PUT: Update an existing bus by ID.
 * - DELETE: Remove a bus by ID.
 */

import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";

// 🟢 GET: FETCH ALL BUSES
export async function GET() {
  try {
    const buses = await prisma.bus.findMany({
      include: {
        driver: true,
        routes: true,
        seats: true,
      },
    });
    console.log("API Fetch Buses:", buses);
    return NextResponse.json(buses);
  } catch (error) {
    console.error("API Error fetching buses:", error);
    return NextResponse.json(
      { error: "Failed to fetch buses" },
      { status: 500 },
    );
  }
}

// 🔵 POST: ADD A NEW BUS
export async function POST(req: Request) {
  try {
    const { plateNumber, totalSeats, busAvatar, driverId } = await req.json();

    if (!plateNumber || !totalSeats || !driverId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newBus = await prisma.bus.create({
      data: { plateNumber, totalSeats, busAvatar, driverId },
    });

    console.log("Bus Created:", newBus);
    return NextResponse.json(newBus, { status: 201 });
  } catch (error) {
    console.error("API Error creating bus:", error);
    return NextResponse.json(
      { error: "Failed to create bus" },
      { status: 500 },
    );
  }
}

// 🟠 PUT: UPDATE A BUS BY ID
export async function PUT(req: Request) {
  try {
    const { id, plateNumber, totalSeats, busAvatar, driverId } =
      await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Bus ID is required" },
        { status: 400 },
      );
    }

    const updatedBus = await prisma.bus.update({
      where: { id },
      data: { plateNumber, totalSeats, busAvatar, driverId },
    });

    console.log("Bus Updated:", updatedBus);
    return NextResponse.json(updatedBus, { status: 200 });
  } catch (error) {
    console.error("API Error updating bus:", error);
    return NextResponse.json(
      { error: "Failed to update bus" },
      { status: 500 },
    );
  }
}

// 🔴 DELETE: REMOVE A BUS BY ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Bus ID is required" },
        { status: 400 },
      );
    }

    await prisma.bus.delete({ where: { id } });

    console.log("Bus Deleted:", id);
    return NextResponse.json(
      { message: "Bus deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Error deleting bus:", error);
    return NextResponse.json(
      { error: "Failed to delete bus" },
      { status: 500 },
    );
  }
}
