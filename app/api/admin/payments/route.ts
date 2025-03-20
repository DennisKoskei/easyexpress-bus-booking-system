/**
 * API Route: /api/admin/payments
 * Description: Provides CRUD operations for the payments table.
 * - GET: Fetch all payments along with related booking data.
 * - POST: Add a new payment entry.
 * - PUT: Update an existing payment by ID.
 * - DELETE: Remove a payment by ID.
 */

import { NextResponse } from "next/server";
import { prisma } from "@utils/prisma";

// 🟢 GET: FETCH ALL PAYMENTS
export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        booking: true,
      },
    });
    console.log("API Fetch Payments:", payments);
    return NextResponse.json(payments);
  } catch (error) {
    console.error("API Error fetching payments:", error);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 },
    );
  }
}

// 🔵 POST: ADD A NEW PAYMENT
export async function POST(req: Request) {
  try {
    const { bookingId, amountPaid, paymentMethod, transactionId, status } =
      await req.json();

    if (!bookingId || !amountPaid || !paymentMethod || !transactionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newPayment = await prisma.payment.create({
      data: { bookingId, amountPaid, paymentMethod, transactionId, status },
    });

    console.log("Payment Created:", newPayment);
    return NextResponse.json(newPayment, { status: 201 });
  } catch (error) {
    console.error("API Error creating payment:", error);
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 },
    );
  }
}

// 🟠 PUT: UPDATE A PAYMENT BY ID
export async function PUT(req: Request) {
  try {
    const { id, bookingId, amountPaid, paymentMethod, transactionId, status } =
      await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 },
      );
    }

    const updatedPayment = await prisma.payment.update({
      where: { id },
      data: { bookingId, amountPaid, paymentMethod, transactionId, status },
    });

    console.log("Payment Updated:", updatedPayment);
    return NextResponse.json(updatedPayment, { status: 200 });
  } catch (error) {
    console.error("API Error updating payment:", error);
    return NextResponse.json(
      { error: "Failed to update payment" },
      { status: 500 },
    );
  }
}

// 🔴 DELETE: REMOVE A PAYMENT BY ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 },
      );
    }

    await prisma.payment.delete({ where: { id } });

    console.log("Payment Deleted:", id);
    return NextResponse.json(
      { message: "Payment deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Error deleting payment:", error);
    return NextResponse.json(
      { error: "Failed to delete payment" },
      { status: 500 },
    );
  }
}
