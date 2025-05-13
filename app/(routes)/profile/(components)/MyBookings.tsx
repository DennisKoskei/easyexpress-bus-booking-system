"use client";

import React, { useEffect, useState } from "react";
import { FaChevronDown, FaDownload } from "react-icons/fa";
import clsx from "clsx";
import { parseDateTime } from "@/utils/dateUtils";

type BookingData = {
  id: string;
  route: {
    departure: string;
    destination: string;
    date: string; // ISO date string
    time: string; // e.g. "08:00 AM"
  };
  passengerName: string;
  passengerPhone: string;
  passengerGender: string;
  createdAt: string;
  ticket?: {
    seatNumber: number;
    busPlate: string;
    price: number;
    qrCode: string;
  };
};

const MyBookings = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/user/list-of-bookings");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings", err);
      }
    };

    fetchBookings();
  }, []);

  const now = new Date();

  const upcoming = bookings.filter(
    (b) => parseDateTime(b.route.date, b.route.time) > now,
  );
  const past = bookings.filter(
    (b) => parseDateTime(b.route.date, b.route.time) <= now,
  );

  const toggleDropdown = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const BookingCard = ({ booking }: { booking: BookingData }) => {
    const isExpanded = expanded === booking.id;

    return (
      <div
        onClick={() => toggleDropdown(booking.id)}
        className="bg-white p-4 rounded-xl shadow-lg hover:shadow-blue-300 transition cursor-pointer border border-slate-200"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              🚍 {booking.route.departure} → {booking.route.destination}
            </h3>
            <p className="text-sm text-gray-500">
              {booking.route.date} | {booking.route.time}
            </p>
          </div>
          <FaChevronDown
            className={clsx("transition-transform", {
              "rotate-180": isExpanded,
            })}
          />
        </div>

        {isExpanded && (
          <div className="mt-4 border-t pt-3 text-sm text-gray-700 space-y-2">
            <p>
              <strong>Passenger:</strong> {booking.passengerName} (
              {booking.passengerGender})
            </p>
            <p>
              <strong>Phone:</strong> {booking.passengerPhone}
            </p>

            {booking.ticket ? (
              <>
                <p>
                  <strong>Seat:</strong> {booking.ticket.seatNumber}
                </p>
                <p>
                  <strong>Bus Plate:</strong> {booking.ticket.busPlate}
                </p>
                <p>
                  <strong>Price:</strong> KES {booking.ticket.price.toFixed(2)}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      `/api/user/ticket-pdf?id=${booking.id}`,
                      "_blank",
                    );
                  }}
                  className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline mt-2"
                >
                  <FaDownload /> Download PDF
                </button>
              </>
            ) : (
              <p className="italic text-gray-500">No ticket issued yet.</p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">My Bookings</h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-3">
            📅 Upcoming Bookings
          </h3>
          {upcoming.length ? (
            <div className="space-y-4">
              {upcoming.map((b) => (
                <BookingCard key={b.id} booking={b} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No upcoming bookings.</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-3">
            🕓 Past Bookings
          </h3>
          {past.length ? (
            <div className="space-y-4">
              {past.map((b) => (
                <BookingCard key={b.id} booking={b} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No past bookings found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyBookings;
