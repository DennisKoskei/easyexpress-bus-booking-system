/**
 * API Route: /api/admin/bookings
 * Description: Provides CRUD operations for the bookings table.
 * - GET: Fetch all bookings along with their related data (user, route, seat, payment, ticket).
 * - POST: Add a new booking with required details.
 * - PUT: Update an existing booking by ID.
 * - DELETE: Remove a booking by ID.
 */

import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";

// 🟢 GET: FETCH ALL BOOKINGS
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany();

    // const bookings = await prisma.booking.findMany({
    //   include: {
    //     user: true,
    //     route: true,
    //     seat: true,
    //     payment: true,
    //     ticket: true,
    //   },
    // });
    console.log("API Fetch Bookings:", bookings);
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("API Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}

// 🔵 POST: ADD A NEW BOOKING
export async function POST(req: Request) {
  try {
    const {
      userId,
      routeId,
      seatId,
      passengerName,
      passengerPhone,
      passengerGender,
      status,
    } = await req.json();

    if (
      !userId ||
      !routeId ||
      !seatId ||
      !passengerName ||
      !passengerPhone ||
      !passengerGender
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newBooking = await prisma.booking.create({
      data: {
        userId,
        routeId,
        seatId,
        passengerName,
        passengerPhone,
        passengerGender,
        status,
      },
    });

    console.log("Booking Created:", newBooking);
    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error("API Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 },
    );
  }
}

// 🟠 PUT: UPDATE A BOOKING BY ID
export async function PUT(req: Request) {
  try {
    const {
      id,
      userId,
      routeId,
      seatId,
      passengerName,
      passengerPhone,
      passengerGender,
      status,
    } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 },
      );
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        userId,
        routeId,
        seatId,
        passengerName,
        passengerPhone,
        passengerGender,
        status,
      },
    });

    console.log("Booking Updated:", updatedBooking);
    return NextResponse.json(updatedBooking, { status: 200 });
  } catch (error) {
    console.error("API Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 },
    );
  }
}

// 🔴 DELETE: REMOVE A BOOKING BY ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 },
      );
    }

    await prisma.booking.delete({ where: { id } });

    console.log("Booking Deleted:", id);
    return NextResponse.json(
      { message: "Booking deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Error deleting booking:", error);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 },
    );
  }
}
