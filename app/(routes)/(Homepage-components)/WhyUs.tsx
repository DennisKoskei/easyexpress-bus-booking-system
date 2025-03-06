import React from "react";
import Link from "next/link";
import Image from "next/image";

const WhyUs = () => {
  return (
    <div className="Why_Us bg-blue-100 flex flex-col md:flex-row px-10 md:px-20 py-16 items-center gap-12">
      {/* Left Section (Text) */}
      <div className="w-full md:w-1/2">
        <h1 className="text-blue-600 font-bold text-lg uppercase tracking-widest">
          Why Choose Us
        </h1>
        <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mt-3">
          25+ Years of Reliable Bus Charter Service
        </h2>
        <p className="text-gray-600 mt-4 leading-relaxed">
          We provide a safe, efficient, and comfortable journey with top-quality
          services. Our commitment to safety and customer satisfaction makes us
          the best choice.
        </p>

        {/* Feature List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-gray-800">
          <ul className="space-y-3">
            <li>✅ Brilliant Customer Service</li>
            <li>✅ 24/7 Online Support</li>
            <li>✅ Safety Guarantee</li>
            <li>✅ Experienced Drivers</li>
          </ul>
          <ul className="space-y-3">
            <li>✅ Comfortable & Modern Buses</li>
            <li>✅ Affordable Prices</li>
            <li>✅ Easy Online Booking</li>
            <li>✅ Eco-Friendly Travel</li>
          </ul>
        </div>

        {/* About Us Button */}
        <div className="mt-6">
          <Link
            href="/about"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg py-3 px-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>

      <div className="Right w-1/2 relative">
        <div className="relative justify-center rounded-3xl w-9/12 h-[450px]">
          {/* Big Image */}
          <Image
            src="/Assets/bus-image-big.png"
            alt="Big Image"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-3xl"
          />
          {/* Small Image */}
          <div className="absolute -right-1/3 inset-y-10 rounded-[15%] h-3/4 w-2/3 border-blue-100 border-l-8 border-y-8">
            <Image
              src="/Assets/bus-image-small.png"
              alt="Small Image"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-[15%]"
            />
          </div>
          {/* Badge */}
          <div className="absolute bottom-2 left-2 font-extrabold flex-col rounded-2xl py-2 px-4 border-1 border-slate-400 bg-white align">
            <p className="text-center">25+ Years</p>
            <p>⭐⭐⭐⭐⭐</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
