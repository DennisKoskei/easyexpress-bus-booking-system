"use client";

import React, { useEffect, useState } from "react";
import { FaTrash, FaSyncAlt } from "react-icons/fa";
import { Booking } from "@/types/booking"; // Create this type interface based on your schema

const BookingsContent: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [refreshInterval, setRefreshInterval] = useState<number>(10000); // default 5s
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings");
      if (!res.ok) throw new Error("Failed to fetch bookings");

      const data = await res.json();
      setBookings(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchBookings();
    }, refreshInterval);

    return () => clearInterval(interval); // Cleanup
  }, [autoRefresh, refreshInterval]);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this booking?",
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/admin/bookings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete booking");

      setBookings(bookings.filter((b) => b.id !== id));
    } catch (err) {
      alert("Failed to delete booking. Try again.");
    }
  };

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Bookings</h2>

        <div className="flex items-center gap-4">
          {/* Refresh Button */}
          <button
            onClick={fetchBookings}
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-md flex items-center gap-2 disabled:opacity-50"
            title="Refresh Bookings"
            disabled={loading}
          >
            <FaSyncAlt
              className={`text-gray-700 ${loading ? "animate-spin" : ""}`}
            />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>

          {/* Auto-Refresh Interval Selector */}
          <label className="text-sm text-gray-700 flex items-center gap-2">
            Interval:
            <select
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
            >
              <option value={3000}>3s</option>
              <option value={5000}>5s</option>
              <option value={10000}>10s</option>
              <option value={30000}>30s</option>
              <option value={60000}>1m</option>
            </select>
          </label>

          {/* Auto-Refresh Toggle */}
          <label className="text-sm text-gray-700 flex items-center gap-2">
            Auto:
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={() => setAutoRefresh((prev) => !prev)}
              className="w-4 h-4"
            />
          </label>

          {/* Count Display */}
          <span className="text-sm text-gray-600">
            Showing | {bookings.length} of {bookings.length}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-left">#</th>
              <th className="border px-4 py-2 text-left">Passenger Name</th>
              <th className="border px-4 py-2 text-left">Phone</th>
              <th className="border px-4 py-2 text-left">Gender</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">User ID</th>
              <th className="border px-4 py-2 text-left">Route ID</th>
              <th className="border px-4 py-2 text-left">Seat ID</th>
              <th className="border px-4 py-2 text-left">Created At</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.id} className="border-b">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{booking.passengerName}</td>
                <td className="border px-4 py-2">{booking.passengerPhone}</td>
                <td className="border px-4 py-2">{booking.passengerGender}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold
      ${booking.status === "CONFIRMED"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="border px-4 py-2">{booking.userId}</td>
                <td className="border px-4 py-2">{booking.routeId}</td>
                <td className="border px-4 py-2">{booking.seatId}</td>
                <td className="border px-4 py-2">
                  {new Date(booking.createdAt).toLocaleString()}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(booking.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsContent;
