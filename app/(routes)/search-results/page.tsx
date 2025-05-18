"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { formatDate, formatTime } from "@utils/dateUtils"; // Adjust path as needed
import { BusList } from "@/types/bus"; // Adjust path as needed
import { formatAmount } from "@utils/amountUtil";

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const departure = searchParams.get("departure") || "";
  const destination = searchParams.get("destination") || "";
  const date = searchParams.get("date") || "";

  const [buses, setBuses] = useState<BusList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuses = async () => {
      if (!departure || !destination || !date) {
        return router.push("/"); // Redirect if search params are missing
      }

      try {
        const response = await fetch("/api/user/search-buses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ departure, destination, date }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch buses");
        }

        const data = await response.json();

        if (!data.foundBuses?.length) {
          return router.push("/"); // Redirect if no buses found
        }

        setBuses(data.foundBuses);
      } catch (error) {
        console.error("Error fetching buses:", error);
        router.push("/"); // Redirect on error
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, [departure, destination, date, router]);

  // Handle Booking Button Click
  const handleBooking = (busId: string, routeId: string) => {
    router.push(`/booking?busId=${busId}&routeId=${routeId}`);
  };

  return (
    <div className="bg-slate-50 mx-auto px-4 sm:px-8 md:px-20 py-24">
      {/* Search Summary */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Available Buses</h1>
        <p className="text-gray-600 mt-2">
          Showing results for: <br className="block md:hidden" />
          <span className="font-semibold text-blue-500">
            {departure} → {destination}
          </span>
          {" on "}
          <span className="font-semibold text-blue-500">
            {formatDate(date)}
          </span>
        </p>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 flex-end bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">
            Popular Destinations
          </h2>
          <ul className="space-y-2">
            <li className="bg-gray-100 p-2 rounded-md">Kigali → Nairobi</li>
            <li className="bg-gray-100 p-2 rounded-md">Nairobi → Mombasa</li>
            <li className="bg-gray-100 p-2 rounded-md">Kisumu → Eldoret</li>
            <li className="bg-gray-100 p-2 rounded-md">
              Arusha → Dar es Salaam
            </li>
            <li className="bg-gray-100 p-2 rounded-md">Nairobi → Kampala</li>
          </ul>
        </div>

        {/* Search Results */}
        <div className="w-full md:w-3/4">
          {loading ? (
            <div className="text-center text-gray-600">Loading buses...</div>
          ) : (
            buses.map((bus) => (
              <div
                key={bus.routeId}
                className="bg-white shadow-xl rounded-lg p-3 md:p-4 mb-4"
              >
                <div className="flex justify-between">
                  <h2 className="text-lg font-bold text-blue-700">
                    {bus.departure} → {bus.destination}
                  </h2>
                  <div className="flex sm:hidden items-center">
                    <p className="text-gray-600 text-sm md:text-base mr-2">
                      Seats:
                    </p>
                    <p className="text-base md:text-xl font-bold  text-green-600">
                      {bus.totalSeats}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row gap-4 mt-0.5 md:mt-3">
                  <div className="flex flex-col md:h-full">
                    <div className="h-20 md:h-28 w-20 md:w-28 relative bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                      <Image
                        // src={`/images/buses/${bus.plateNumber}.jpg`}
                        src={`/Assets/bus-image-small.png`}
                        alt={bus.busId}
                        fill
                        style={{ objectFit: "cover" }}
                        className="absolute rounded-xl"
                      />
                    </div>
                    <p className="hidden md:flex italic text-xs text-gray-500 pt-1">
                      Plate: {bus.plateNumber}
                    </p>
                  </div>
                  <div className="flex flex-col w-3/4">
                    <div className="grid grid-cols-1 text-gray-600 md:grid-cols-4 text-sm md:text-base gap-y-0 gap-x-0 md:gap-x-4 md:gap-y-4">
                      <div className="hidden md:flex md:flex-col items-start justify-center">
                        <p>From: </p>
                        <p className="font-bold">{bus.departure}</p>
                      </div>
                      <div className="hidden md:flex md:flex-col items-start justify-center">
                        <p>To:</p>
                        <p className="font-bold">{bus.destination}</p>
                      </div>
                      <div className="flex sm:flex-col ">
                        <p className="mr-1.5">Date:</p>
                        <p className="font-bold">{formatDate(bus.date)}</p>
                      </div>
                      <div className="flex sm:flex-col">
                        <p className="mr-1.5">Time:</p>
                        <p className="font-bold">{formatTime(bus.time)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-0 md:gap-x-4 mt-1 sm:mt-2">
                      <div className="hidden md:flex md:flex-col">
                        <p className="text-gray-600 text-sm md:text-base">
                          Available Seats:
                        </p>
                        <p className="text-base md:text-xl font-bold  text-green-600">
                          {bus.totalSeats}
                        </p>
                      </div>
                      <div className="flex sm:flex-col items-baseline">
                        <p className="text-gray-600 text-sm md:text-base mr-1.5">
                          Price:
                        </p>
                        <p className="text-lg md:text-xl font-bold text-blue-600 -mr-1.5">
                          {formatAmount(bus.amount)} /=
                        </p>
                      </div>

                      <div className="hidden md:flex items-center justify-center"></div>

                      <div className="flex w-full h-full items-start justify-end sm:justify-start -mt-2 sm:mt-0">
                        <button
                          onClick={() => handleBooking(bus.busId, bus.routeId)}
                          className="bg-gradient-to-r from-blue-400 to-blue-700 text-white font-semibold text-sm sm:text-lg px-3 sm:px-4 py-2.5 sm:py-1.5 rounded-md shadow hover:shadow-lg hover:scale-110 transition-all duration-300"
                        >
                          Book Seat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
