"use client";

import React, { useEffect, useState } from "react";
import { FaTrash, FaSyncAlt } from "react-icons/fa";
import { Ticket } from "@/types/ticket"; // Create this type interface based on your schema

const TicketsContent: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [refreshInterval, setRefreshInterval] = useState<number>(10000); // default 5s
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/tickets");
      if (!res.ok) throw new Error("Failed to fetch tickets");

      const data = await res.json();
      setTickets(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchTickets();
    }, refreshInterval);

    return () => clearInterval(interval); // Cleanup
  }, [autoRefresh, refreshInterval]);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this ticket?",
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/admin/tickets", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete ticket");

      setTickets(tickets.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error: ", error);
      alert("Failed to delete ticket. Try again.");
    }
  };

  if (loading) return <p>Loading tickets...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tickets</h2>

        <div className="flex items-center gap-4">
          {/* Refresh Button */}
          <button
            onClick={fetchTickets}
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-md flex items-center gap-2 disabled:opacity-50"
            title="Refresh Tickets"
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
            Showing | {tickets.length} of {tickets.length}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-left">#</th>
              <th className="border px-4 py-2 text-left">Passenger Id</th>
              <th className="border px-4 py-2 text-left">Booking SeatId</th>
              <th className="border px-4 py-2 text-left">Route Id</th>
              <th className="border px-4 py-2 text-left">Seat No</th>
              <th className="border px-4 py-2 text-left">Bus Plate </th>
              <th className="border px-4 py-2 text-left">Price </th>
              <th className="border px-4 py-2 text-left">QR Code </th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket.id} className="border-b">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{ticket.passengerId}</td>
                <td className="border px-4 py-2">{ticket.bookingSeatId}</td>
                <td className="border px-4 py-2">{ticket.routeId}</td>
                <td className="border px-4 py-2">{ticket.seatNumber}</td>
                <td className="border px-4 py-2">{ticket.busPlate}</td>
                <td className="border px-4 py-2">{ticket.price}</td>
                <td className="border px-4 py-2">{ticket.qrCode}</td>
                <td className="border px-4 py-2">
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(ticket.id)}
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

export default TicketsContent;
