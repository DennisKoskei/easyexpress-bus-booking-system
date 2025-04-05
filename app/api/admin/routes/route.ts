/**
 * API Route: /api/admin/routes
 * Description: Provides CRUD operations for the routes table.
 * - GET: Fetch all routes along with their related data (bus, bookings, tickets).
 * - POST: Add a new route with required details.
 * - PUT: Update an existing route by ID.
 * - DELETE: Remove a route by ID.
 */

import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";

// 🟢 GET: FETCH ALL ROUTES
export async function GET() {
  try {
    const routes = await prisma.route.findMany();

    // const routes = await prisma.route.findMany({
    //   include: {
    //     bus: true,
    //     bookings: true,
    //     tickets: true,
    //   },
    // });

    console.log("API Fetch Routes:", routes);
    return NextResponse.json(routes);
  } catch (error) {
    console.error("API Error fetching routes:", error);
    return NextResponse.json(
      { error: "Failed to fetch routes" },
      { status: 500 },
    );
  }
}

// 🔵 POST: ADD A NEW ROUTE
export async function POST(req: Request) {
  try {
    const { departure, destination, date, time, amount, busId } =
      await req.json();

    if (!departure || !destination || !date || !time || !amount || !busId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newRoute = await prisma.route.create({
      data: {
        departure,
        destination,
        date: new Date(date),
        time,
        amount,
        busId,
      },
    });

    console.log("Route Created:", newRoute);
    return NextResponse.json(newRoute, { status: 201 });
  } catch (error) {
    console.error("API Error creating route:", error);
    return NextResponse.json(
      { error: "Failed to create route" },
      { status: 500 },
    );
  }
}

// 🟠 PUT: UPDATE A ROUTE BY ID
export async function PUT(req: Request) {
  try {
    const { id, departure, destination, date, time, amount, busId } =
      await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Route ID is required" },
        { status: 400 },
      );
    }

    const updatedRoute = await prisma.route.update({
      where: { id },
      data: {
        departure,
        destination,
        date: new Date(date),
        time,
        amount,
        busId,
      },
    });

    console.log("Route Updated:", updatedRoute);
    return NextResponse.json(updatedRoute, { status: 200 });
  } catch (error) {
    console.error("API Error updating route:", error);
    return NextResponse.json(
      { error: "Failed to update route" },
      { status: 500 },
    );
  }
}

// 🔴 DELETE: REMOVE A ROUTE BY ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Route ID is required" },
        { status: 400 },
      );
    }

    await prisma.route.delete({ where: { id } });

    console.log("Route Deleted:", id);
    return NextResponse.json(
      { message: "Route deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Error deleting route:", error);
    return NextResponse.json(
      { error: "Failed to delete route" },
      { status: 500 },
    );
  }
}
