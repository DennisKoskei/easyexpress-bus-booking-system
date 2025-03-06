"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Define form data type
interface SearchData {
  departure: string;
  destination: string;
  date: string;
}

const SearchBox: React.FC = () => {
  const router = useRouter();
  const [searchData, setSearchData] = useState<SearchData>({
    departure: "",
    destination: "",
    date: "",
  });

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Sending request with:", searchData); // Log sent data

    try {
      const response = await fetch("/api/search-buses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Received response:", result);

      if (result.foundBuses.length > 0) {
        router.push(
          `/search-results?departure=${searchData.departure}&destination=${searchData.destination}&date=${searchData.date}`
        );
      } else {
        alert("No buses available for the specified date.");
      }
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  return (
    <div className="relative z-10 flex justify-center items-center h-full">
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl w-[95%] md:w-[60%] px-3 py-3 border border-gray-200">
        <form
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          onSubmit={handleSearch}
        >
          {/* Departure City */}
          <div className="flex flex-col">
            <input
              type="text"
              name="departure"
              value={searchData.departure}
              onChange={handleChange}
              placeholder="Enter Departure City"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm hover:shadow-md"
              required
            />
          </div>

          {/* Destination */}
          <div className="flex flex-col">
            <input
              type="text"
              name="destination"
              value={searchData.destination}
              onChange={handleChange}
              placeholder="Enter Destination"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm hover:shadow-md"
              required
            />
          </div>

          {/* Date Picker */}
          <div className="flex flex-col">
            <input
              type="date"
              name="date"
              value={searchData.date}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm hover:shadow-md"
              required
            />
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              🔍 Search Buses
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBox;
