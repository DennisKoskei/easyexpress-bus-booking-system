import React from "react";
import { destinations } from "../constants/constants";

const PopularDestinations = () => {
  return (
    <div className="Popular_Destinations px-20 py-14 bg-gray-100">
      {/* Section Header */}
      <div className=" pb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Popular Destinations
        </h1>
        <p className="text-gray-600 mt-2">
          Discover the most traveled routes with EasyExpress.
        </p>
      </div>

      {/* Destination Cards */}
      <div className="grid grid-cols-3 gap-6">
        {destinations.map((destination, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl shadow-lg group hover:scale-105 transition-transform"
          >
            <img
              src={destination.image}
              alt={destination.city}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-white p-4 text-lg font-semibold">
              {destination.city}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
