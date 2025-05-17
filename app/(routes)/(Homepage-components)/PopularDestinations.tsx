"use client";

import React from "react";
import { destinations } from "@/app/constants/constants";
import { motion } from "framer-motion";

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const PopularDestinations = () => {
  return (
    <div className="Popular_Destinations px-10 md:px-20 py-14 bg-gray-100">
      {/* Section Header */}
      <div className="pb-8">
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
          <motion.div
            key={index}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
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
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
