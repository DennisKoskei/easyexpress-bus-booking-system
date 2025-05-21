"use client";

import Image from "next/image";
import React from "react";
import { routes } from "@constants/constants";
import { motion } from "framer-motion";

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const PopularRoutes = () => {
  return (
    <div className="Popular_Routes px-4 sm:px-8 md:px-20 py-12 sm:py-16 bg-gray-100">
      {/* Section Header */}
      <div className="text-center pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Popular Routes
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Explore the most frequently traveled bus routes.
        </p>
      </div>

      {/* Route Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {routes.map((route, index) => (
          <motion.div
            key={index}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex flex-col bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <div className="relative h-40 sm:h-48 md:h-52 w-full">
              <Image
                src={route.image}
                alt={route.name}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-t-xl"
              />
            </div>
            <div className="flex items-center justify-center text-gray-800 font-semibold text-sm bg-gray-50 h-12">
              {route.name}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularRoutes;
