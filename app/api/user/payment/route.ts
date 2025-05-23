// API route: /api/user/payment/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@utils/prisma"; // Adjust the import path if needed
import { getServerSession } from "next-auth";
import { authConfig } from "@utils/auth"; // Adjust if using a custom location
import { v4 as uuidv4 } from "uuid"; // For mock transactionId
import { PaymentMethod } from "@/types/payment";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authConfig);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const {
    bookingIds,
    paymentMethod,
  }: { bookingIds: string[]; paymentMethod: PaymentMethod } = await req.json();

  if (!bookingIds || !Array.isArray(bookingIds) || bookingIds.length === 0) {
    return NextResponse.json(
      { message: "Invalid booking IDs" },
      { status: 400 },
    );
  }

  try {
    // Get the bookings to calculate the total
    const bookings = await prisma.booking.findMany({
      where: { id: { in: bookingIds } },
      select: { id: true, route: { select: { amount: true } } },
    });

    if (bookings.length === 0) {
      return NextResponse.json(
        { message: "No valid bookings found" },
        { status: 404 },
      );
    }

    const totalAmount = bookings.reduce(
      (sum, booking) => sum + booking.route.amount,
      0,
    );
    const transactionId = `TX-${uuidv4()}`;

    // Create the payment record
    const payment = await prisma.payment.create({
      data: {
        amountPaid: totalAmount,
        paymentMethod,
        transactionId,
        status: "SUCCESSFUL",
        bookings: {
          connect: bookingIds.map((id) => ({ id })),
        },
      },
    });

    // Update each booking to attach the paymentId
    await prisma.booking.updateMany({
      where: { id: { in: bookingIds } },
      data: { status: "PAID", paymentId: payment.id },
    });

    return NextResponse.json({ paymentId: payment.id });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { message: "Payment failed", error },
      { status: 500 },
    );
  }
}
