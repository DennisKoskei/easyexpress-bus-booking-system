"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { formatAmount } from "@utils/amountUtil";
import { FaMoneyCheckAlt, FaMobileAlt } from "react-icons/fa";
import { BookingSummary } from "@/types/booking";

const PaymentPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const busId = searchParams.get("busId");
  const routeId = searchParams.get("routeId");
  const bookingIds = searchParams.get("bookingIds");

  const [bookings, setBookings] = useState<BookingSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!busId || !routeId || !bookingIds) {
      console.error("Missing required parameters");
      return router.push("/"); // Redirect if any required params are missing
    }

    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `/api/user/checkout-bookings?busId=${busId}&routeId=${routeId}&bookingIds=${bookingIds}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data.bookings);
      } catch (err) {
        console.error(err);
        router.push("/"); // Redirect to home if error
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [router, busId, routeId, bookingIds]);

  const totalAmount = bookings.reduce(
    (sum, booking) => sum + booking.amount,
    0,
  );

  // const handlePayCard = () => {
  //   alert("Proceed to Card Payment Gateway (placeholder)");
  //   // Implement real card payment logic later
  // };

  // const handlePayMpesa = () => {
  //   alert("Proceed to Mpesa Payment Gateway (placeholder)");
  //   // Implement real Mpesa payment logic later
  // };

  const handlePayment = async () => {
    try {
      const parsedBookingIds = JSON.parse(bookingIds || "[]");

      // STEP 1: Make the payment
      const paymentResponse = await fetch("/api/user/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingIds: parsedBookingIds,
          paymentMethod: "MPESA", // or "PAYPAL" – set dynamically if needed
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error("Payment creation failed");
      }

      // STEP 2: Generate tickets after successful payment
      const response = await fetch("/api/user/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          busId,
          routeId,
          bookingIds: parsedBookingIds,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate tickets");
      }

      router.push("/profile"); // Success redirect
    } catch (error) {
      console.error("Payment or ticket generation failed:", error);
      alert("There was an error processing payment or creating tickets.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 p-6">
      <header className="bg-blue-900 text-white p-4 text-center text-2xl font-semibold rounded-md">
        EasyExpress - Payment
      </header>

      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500 text-lg animate-pulse">
              Loading your bookings...
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Confirm Your Booking Details
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Passenger Name</th>
                    <th className="border px-4 py-2">Phone Number</th>
                    <th className="border px-4 py-2">Seat Number</th>
                    <th className="border px-4 py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="text-center">
                      <td className="border px-4 py-2">
                        {booking.passengerName}
                      </td>
                      <td className="border px-4 py-2">
                        {booking.passengerPhone}
                      </td>
                      <td className="border px-4 py-2">{booking.seatNumber}</td>
                      <td className="border px-4 py-2">
                        {formatAmount(booking.amount)} /=
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md mb-6">
              <h3 className="text-xl font-bold">Total Amount:</h3>
              <p className="text-2xl font-extrabold text-blue-700">
                {formatAmount(totalAmount)} /=
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handlePayment}
                className="flex items-center justify-center gap-3 bg-green-600 text-white py-3 rounded-lg text-lg hover:bg-green-700"
              >
                <FaMoneyCheckAlt className="text-2xl" />
                Pay with Card
              </button>

              <button
                onClick={handlePayment}
                className="flex items-center justify-center gap-3 bg-yellow-500 text-white py-3 rounded-lg text-lg hover:bg-yellow-600"
              >
                <FaMobileAlt className="text-2xl" />
                Pay with Mpesa
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
