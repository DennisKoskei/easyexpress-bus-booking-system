"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { capitalizeFirstLetter } from "@utils/formatText";
import { SearchData } from "@/types/route"

const SearchBox: React.FC = () => {
  const router = useRouter();
  const [searchData, setSearchData] = useState<SearchData>({
    departure: "",
    destination: "",
    date: "",
  });

  const [departureSuggestions, setDepartureSuggestions] = useState<string[]>(
    [],
  );
  const [destinationSuggestions, setDestinationSuggestions] = useState<
    string[]
  >([]);
  const [selectedDepartureIndex, setSelectedDepartureIndex] =
    useState<number>(-1);
  const [selectedDestinationIndex, setSelectedDestinationIndex] =
    useState<number>(-1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const fetchSuggestions = async (
    field: "departure" | "destination",
    query: string,
  ) => {
    if (!query.trim()) return;
    try {
      const res = await fetch(
        `/api/user/route-suggestions?type=${field}&query=${query}`,
      );
      const data = await res.json();
      const suggestions = Array.isArray(data.suggestions)
        ? data.suggestions
        : [];
      if (field === "departure") {
        setDepartureSuggestions(suggestions);
      } else {
        setDestinationSuggestions(suggestions);
      }
    } catch (err) {
      console.error("Suggestion fetch error:", err);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });

    if (name === "departure") {
      setSelectedDepartureIndex(-1);
      fetchSuggestions(name, value);
    } else if (name === "destination") {
      setSelectedDestinationIndex(-1);
      fetchSuggestions(name, value);
    }
  };

  const handleSuggestionClick = (
    field: "departure" | "destination",
    value: string,
  ) => {
    setSearchData((prev) => ({ ...prev, [field]: value }));
    if (field === "departure") {
      setDepartureSuggestions([]);
    } else {
      setDestinationSuggestions([]);
    }
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formattedData = {
      departure: capitalizeFirstLetter(searchData.departure),
      destination: capitalizeFirstLetter(searchData.destination),
      date: searchData.date,
    };

    try {
      const response = await fetch("/api/user/search-buses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();

      if (result.foundBuses.length > 0) {
        router.push(
          `/search-results?departure=${formattedData.departure}&destination=${formattedData.destination}&date=${formattedData.date}`,
        );
      } else {
        alert("No buses available for the specified date.");
        setSearchData({ departure: "", destination: "", date: "" });
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
          {/* Departure */}
          <div className="relative flex flex-col">
            <input
              type="text"
              name="departure"
              autoComplete="off"
              value={searchData.departure}
              onChange={handleInputChange}
              onBlur={() => setTimeout(() => setDepartureSuggestions([]), 100)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  setSelectedDepartureIndex((prev) =>
                    Math.min(prev + 1, departureSuggestions.length - 1),
                  );
                } else if (e.key === "ArrowUp") {
                  setSelectedDepartureIndex((prev) => Math.max(prev - 1, 0));
                } else if (e.key === "Enter" && selectedDepartureIndex >= 0) {
                  e.preventDefault();
                  handleSuggestionClick(
                    "departure",
                    departureSuggestions[selectedDepartureIndex],
                  );
                }
              }}
              placeholder="Enter Departure City"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm hover:shadow-md"
              required
            />
            {departureSuggestions.length > 0 && (
              <ul className="absolute top-full mt-2 w-full bg-white border border-blue-300 rounded-xl shadow-lg max-h-48 overflow-y-auto z-50">
                {departureSuggestions.map((suggestion, index) => (
                  <li
                    key={suggestion}
                    onClick={() =>
                      handleSuggestionClick("departure", suggestion)
                    }
                    className={`px-4 py-2 text-sm md:text-base cursor-pointer transition-colors duration-150 rounded-lg ${selectedDepartureIndex === index
                      ? "bg-blue-200"
                      : "hover:bg-blue-100"
                      }`}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Destination */}
          <div className="relative flex flex-col">
            <input
              type="text"
              name="destination"
              autoComplete="off"
              value={searchData.destination}
              onChange={handleInputChange}
              onBlur={() =>
                setTimeout(() => setDestinationSuggestions([]), 100)
              }
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  setSelectedDestinationIndex((prev) =>
                    Math.min(prev + 1, destinationSuggestions.length - 1),
                  );
                } else if (e.key === "ArrowUp") {
                  setSelectedDestinationIndex((prev) => Math.max(prev - 1, 0));
                } else if (e.key === "Enter" && selectedDestinationIndex >= 0) {
                  e.preventDefault();
                  handleSuggestionClick(
                    "destination",
                    destinationSuggestions[selectedDestinationIndex],
                  );
                }
              }}
              placeholder="Enter Destination"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm hover:shadow-md"
              required
            />
            {destinationSuggestions.length > 0 && (
              <ul className="absolute top-full mt-2 w-full bg-white border border-blue-300 rounded-xl shadow-lg max-h-48 overflow-y-auto z-50">
                {destinationSuggestions.map((suggestion, index) => (
                  <li
                    key={suggestion}
                    onClick={() =>
                      handleSuggestionClick("destination", suggestion)
                    }
                    className={`px-4 py-2 text-sm md:text-base cursor-pointer transition-colors duration-150 rounded-lg ${selectedDestinationIndex === index
                      ? "bg-blue-200"
                      : "hover:bg-blue-100"
                      }`}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
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
