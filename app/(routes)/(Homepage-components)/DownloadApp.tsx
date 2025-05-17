"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const DownloadApp = () => {
  return (
    <div className="Download_App flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 bg-blue-100">
      {/* Left: Phone Image */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="
          relative justify-center
          w-[80%] h-[300px] 
          sm:w-[80%] sm:h-[350px] 
          md:w-9/12 md:h-[450px] 
          transition-transform duration-500 hover:scale-105"
        >
          <Image
            src="/Assets/phone-image.png"
            alt="EasyExpress App"
            fill
            style={{ objectFit: "cover" }}
            className="drop-shadow-lg"
          />
        </motion.div>
      </motion.div>

      {/* Right: App Info & Download Links */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col gap-6"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-2xl w-full text-center md:text-left font-semibold text-gray-800">
          Download EasyExpress App
        </h1>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Find a Bus Charter Near You with Our App
        </h1>
        <p className="text-gray-700 leading-relaxed">
          Book your bus tickets easily with our mobile app. Get real-time
          updates, exclusive offers, and a seamless travel experience at your
          fingertips.
        </p>

        {/* App Store & Play Store Buttons */}
        <motion.div
          className="flex flex-row mt-4 gap-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a href="#">
            <Image
              src="/Assets/appstore.png"
              width={170}
              height={50}
              alt="Download on the App Store"
              className="hover:scale-105 transition-transform"
            />
          </a>
          <a href="#">
            <Image
              src="/Assets/google-playstore.png"
              width={170}
              height={50}
              alt="Get it on the PlayStore"
              className="hover:scale-105 transition-transform"
            />
          </a>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          className="mt-2 bg-white shadow-md rounded-lg px-6 py-5 flex flex-col gap-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-800">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-gray-600 text-sm md:text-base">
            Stay updated with exclusive deals, offers, and travel tips.
          </p>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-transparent text-blue-500 font-semibold justify-center px-6 py-2 rounded-lg border-2 border-blue hover:bg-blue-800 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DownloadApp;
// className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg py-3 px-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
