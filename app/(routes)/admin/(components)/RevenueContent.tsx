"use client";

import React, { useEffect, useState } from "react";
import { FaSyncAlt } from "react-icons/fa";
import { Payment } from "@/types/payment"; // Import the Payment type

const RevenueContent: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/payments"); // Adjust to your endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch payments");
      }
      const data: Payment[] = await response.json();
      setPayments(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  if (loading) return <p>Loading payments...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Payments</h2>

        <div className="flex items-center gap-4">
          {/* Refresh Button */}
          <button
            onClick={fetchPayments}
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-md flex items-center gap-2 disabled:opacity-50"
            title="Refresh Payments"
            disabled={loading}
          >
            <FaSyncAlt
              className={`text-gray-700 ${loading ? "animate-spin" : ""}`}
            />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>

          {/* Payment Count Display */}
          <span className="text-sm text-gray-600">
            Showing | {payments.length} of {payments.length}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Booking ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Amount Paid
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Payment Method
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Transaction ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Payment Date
              </th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment.id} className="border-b border-gray-300">
                <td className="border border-gray-300 px-4 py-2 text-left">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-left">
                  {payment.bookingId}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-left">
                  {payment.amountPaid}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-left">
                  {payment.paymentMethod}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-left">
                  {payment.transactionId}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-left">
                  {payment.status}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-left">
                  {new Date(payment.paymentDate).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueContent;
