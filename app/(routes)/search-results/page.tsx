"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { formatDate, formatTime } from "@utils/dateUtils"; // Adjust path as needed

interface Bus {
  id: number;
  departure: string;
  destination: string;
  date: string;
  time: string;
  seats: number;
  amount: number;
}

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const departure = searchParams.get("departure") || "";
  const destination = searchParams.get("destination") || "";
  const date = searchParams.get("date") || "";

  const [buses, setBuses] = useState<Bus[]>([]);
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
        console.log("Found buses: ", data);
      } catch (error) {
        console.error("Error fetching buses:", error);
        router.push("/"); // Redirect on error
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, [departure, destination, date, router]);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Search Summary */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Available Buses</h1>
        <p className="text-gray-600 mt-2">
          Showing results for:{" "}
          <span className="font-semibold text-blue-500">
            {departure} → {destination}
          </span>{" "}
          on {formatDate(date)}
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-1/4 bg-white shadow-lg rounded-lg p-4">
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
        <div className="w-3/4">
          {loading ? (
            <div className="text-center text-gray-600">Loading buses...</div>
          ) : (
            buses.map((bus) => (
              <div
                key={bus.id}
                className="bg-white shadow-lg rounded-lg p-4 mb-4"
              >
                <h2 className="text-lg font-bold text-blue-700">
                  {bus.departure} → {bus.destination}
                </h2>
                <div className="flex flex-row gap-4 mt-3">
                  <div className="h-32 w-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                    🚌 Bus Image
                  </div>
                  <div className="flex flex-col w-3/4">
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-gray-600">From:</p>
                        <p className="font-semibold">{bus.departure}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">To:</p>
                        <p className="font-semibold">{bus.destination}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Date:</p>
                        <p className="font-semibold">{formatDate(bus.date)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Time:</p>
                        <p className="font-semibold">{formatTime(bus.time)}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-gray-600">Available Seats:</p>
                        <p className="text-xl font-bold text-green-600">
                          {bus.seats}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Price:</p>
                        <p className="text-xl font-bold text-blue-600">
                          {bus.amount} /=
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all">
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
