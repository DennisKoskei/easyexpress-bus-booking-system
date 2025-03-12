import React from "react";
import OurStory from "./OurStory";

const AboutUs = () => {
  return (
    <div className="flex bg-gray-100 px-8 md:px-20 flex-row gap-8 py-12 items-start">
      {/* Left Section - About Us */}
      <div className="w-[55%] bg-white p-8 border rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
        <div className="flex flex-wrap">
          <p className="w-full text-lg text-gray-600 leading-relaxed mb-4">
            Founded in 2010, EasyExpress Coaches has been a trusted name in the
            transportation industry, providing safe, comfortable, and reliable
            travel services across Kenya and neighboring countries. Our
            commitment to customer satisfaction and innovation has made us one
            of the leading online bus ticket booking platforms.
          </p>
          <p className="w-1/2 pr-4 text-lg text-gray-600 leading-relaxed">
            With a fleet of modern, well-maintained buses, we prioritize
            passenger comfort and safety. Our mission is to make travel
            seamless, accessible, and hassle-free for everyone.
          </p>
          <p className="w-1/2 text-lg text-gray-600 leading-relaxed">
            We continue to expand our routes and services to meet the growing
            demand for efficient and affordable transport solutions, connecting
            thousands of passengers daily.
          </p>
        </div>
      </div>

      {/* Right Section - Our Story with Timeline */}
      <div className="w-[45%] relative">
        <div className="p-8 space-y-4 bg-blue-800 text-white border rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center mb-6">Our Story</h1>
          <OurStory />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
