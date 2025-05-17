"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar, FaCheckCircle } from "react-icons/fa";
import { STRINGS } from "@constants/strings";

const WhyUs = () => {
  return (
    <div className="Why_Us bg-blue-100 flex flex-col md:flex-row px-10 md:px-20 py-16 items-center gap-12">
      {/* Left Section (Text) */}
      <motion.div
        className="w-full md:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-blue-600 font-bold text-lg uppercase tracking-widest"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {STRINGS.whyUs.title}
        </motion.h1>

        <motion.h2
          className="text-4xl font-extrabold text-gray-900 leading-tight mt-3"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {STRINGS.whyUs.subtitle}
        </motion.h2>

        <motion.p
          className="text-gray-600 mt-4 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {STRINGS.whyUs.description}
        </motion.p>

        {/* Feature List */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-gray-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <ul className="space-y-3">
            {STRINGS.whyUs.featuresLeft.map((item, i) => (
              <motion.li
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex items-center gap-2"
              >
                <FaCheckCircle className="text-blue-500 w-5 h-5" />
                {item}
              </motion.li>
            ))}
          </ul>

          <ul className="space-y-3">
            {STRINGS.whyUs.featuresRight.map((item, i) => (
              <motion.li
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex items-center gap-2"
              >
                <FaCheckCircle className="text-blue-500 w-5 h-5" />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* About Us Button */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          <Link
            href="/about"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg py-3 px-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            {STRINGS.whyUs.learnMore}
          </Link>
        </motion.div>
      </motion.div>

      {/* Right Section (Image) */}
      <motion.div
        className="Right w-full md:w-1/2 relative"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="
          relative justify-center rounded-3xl 
          w-[80%] h-[300px] 
          sm:w-[80%] sm:h-[350px] 
          md:w-9/12 md:h-[450px] 
          transition-transform duration-500 hover:scale-105"
        >
          {/* Big Image */}
          <Image
            src="/Assets/bus-image-big.png"
            alt="Big Image"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-3xl"
          />

          {/* Small Image */}
          <motion.div
            className="
            absolute 
            -right-[30%] 
            inset-y-14 
            h-[60%] w-[60%] 
            sm:h-[70%] sm:w-[70%] 
            md:h-3/4 md:w-2/3 
            border-blue-100 border-l-8 border-y-8 
            rounded-[10%] md:rounded-[15%]"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Image
              src="/Assets/bus-image-small.png"
              alt="Small Image"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-[5%] md:rounded-[15%]"
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            className="
            absolute 
            bottom-2 left-2
            font-extrabold flex-col 
            rounded-2xl 
            py-2 px-4 
            border border-slate-400 
            bg-white shadow-md"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-center text-sm md:font-md">
              {STRINGS.whyUs.badgeYears}
            </p>

            {/* 5 Star Icons */}
            <div className="flex justify-center mt-1 space-x-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="w-4 h-4 md:w-5 md:h-5" />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WhyUs;
