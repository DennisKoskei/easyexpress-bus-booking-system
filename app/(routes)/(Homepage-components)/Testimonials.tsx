"use client";

import React from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/app/constants/constants";

const Testimonials = () => {
  const testimonialVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="Client_Testimonials relative px-20 pt-10 pb-20 bg-gray-100">
      {/* Title Section */}
      <motion.div
        className="flex flex-col relative justify-center items-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="p-4 font-semibold text-3xl text-blue-600">
          What Our Clients Say...
        </h1>
        <p className="w-3/6 text-center mb-7 text-gray-600">
          Hear from our satisfied customers who have experienced the comfort and
          reliability of EasyExpress firsthand.
        </p>
      </motion.div>

      {/* Testimonial Cards */}
      <div className="flex flex-col md:flex-row relative z-20 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={testimonialVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="cards border-2 rounded-xl py-4 px-5 w-1/4 bg-white shadow-md"
          >
            <p className="mb-2 text-gray-700 italic">“{testimonial.text}”</p>
            <div className="flex flex-row gap-2 text-sm font-medium items-center mt-2">
              <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-sm border-2 border-white">
                {testimonial.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold">{testimonial.name}</h3>
                <div className="text-yellow-400 text-xs">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Logo Section (Full Width) */}
      <motion.div
        className="bg-black absolute -inset-x-0 h-28 -mt-6 w-full mx-auto flex gap-12 items-center justify-around text-white font-bold text-lg pt-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <p className="text-gray-300">LOGO</p>
        <p className="text-gray-300">LOGO</p>
        <p className="text-gray-300">LOGO</p>
        <p className="text-gray-300">LOGO</p>
      </motion.div>
    </div>
  );
};

export default Testimonials;
