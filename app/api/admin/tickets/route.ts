/**
 * API Route: /api/admin/tickets
 * Description: Provides CRUD operations for the tickets table.
 * - GET: Fetch all tickets along with their related data (passenger, booking, route, seat).
 * - POST: Add a new ticket with required details.
 * - PUT: Update an existing ticket by ID.
 * - DELETE: Remove a ticket by ID.
 */

import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";

// 🟢 GET: FETCH ALL TICKETS
export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        passenger: true,
        booking: true,
        route: true,
        seat: true,
      },
    });
    console.log("API Fetch Tickets:", tickets);
    return NextResponse.json(tickets);
  } catch (error) {
    console.error("API Error fetching tickets:", error);
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 },
    );
  }
}

// 🔵 POST: ADD A NEW TICKET
export async function POST(req: Request) {
  try {
    const { passengerId, bookingId, routeId, seatId, busPlate, price, qrCode } =
      await req.json();

    if (
      !passengerId ||
      !bookingId ||
      !routeId ||
      !seatId ||
      !busPlate ||
      !price ||
      !qrCode
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newTicket = await prisma.ticket.create({
      data: {
        passengerId,
        bookingId,
        routeId,
        seatId,
        busPlate,
        price,
        qrCode,
      },
    });

    console.log("Ticket Created:", newTicket);
    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error("API Error creating ticket:", error);
    return NextResponse.json(
      { error: "Failed to create ticket" },
      { status: 500 },
    );
  }
}

// 🟠 PUT: UPDATE A TICKET BY ID
export async function PUT(req: Request) {
  try {
    const {
      id,
      passengerId,
      bookingId,
      routeId,
      seatId,
      busPlate,
      price,
      qrCode,
    } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Ticket ID is required" },
        { status: 400 },
      );
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id },
      data: {
        passengerId,
        bookingId,
        routeId,
        seatId,
        busPlate,
        price,
        qrCode,
      },
    });

    console.log("Ticket Updated:", updatedTicket);
    return NextResponse.json(updatedTicket, { status: 200 });
  } catch (error) {
    console.error("API Error updating ticket:", error);
    return NextResponse.json(
      { error: "Failed to update ticket" },
      { status: 500 },
    );
  }
}

// 🔴 DELETE: REMOVE A TICKET BY ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Ticket ID is required" },
        { status: 400 },
      );
    }

    await prisma.ticket.delete({ where: { id } });

    console.log("Ticket Deleted:", id);
    return NextResponse.json(
      { message: "Ticket deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Error deleting ticket:", error);
    return NextResponse.json(
      { error: "Failed to delete ticket" },
      { status: 500 },
    );
  }
}
