import Image from "next/image";
import React from "react";
import { routes } from "../constants/constants";

const PopularRoutes = () => {
  return (
    <div className="Popular_Routes px-20 py-16 bg-gray-100">
      {/* Section Header */}
      <div className="text-center pb-4">
        <h1 className="text-4xl font-bold text-gray-900">Popular Routes</h1>
        <p className="text-gray-600 mt-1">
          Explore the most frequently traveled bus routes.
        </p>
      </div>

      {/* Route Cards */}
      <div className="flex flex-row gap-6">
        {routes.map((route, index) => (
          <div
            key={index}
            className="flex flex-col bg-white shadow-lg rounded-xl overflow-hidden w-1/6 h-80 transform transition duration-300 hover:scale-105"
          >
            <div className="relative h-4/5 w-full">
              <Image
                src={route.image}
                alt={route.name}
                fill
                objectFit="cover"
                className="rounded-t-xl"
              />
            </div>
            <div className="h-1/5 flex items-center justify-center text-gray-800 font-semibold text-sm bg-gray-50">
              {route.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularRoutes;
