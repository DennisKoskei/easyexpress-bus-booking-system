import React from "react";

const Testimonials = () => {
  return (
    <div className="Client_Testimonials px-20 py-10">
      {/* Title Section */}
      <div className="flex flex-col justify-center items-center">
        <h1 className="p-4 font-semibold text-3xl text-blue-600">
          What Our Clients Say...
        </h1>
        <p className="w-3/6 text-center mb-7 text-gray-600">
          Hear from our satisfied customers who have experienced the comfort and
          reliability of EasyExpress firsthand.
        </p>
      </div>

      {/* Testimonial Cards */}
      <div className="flex flex-row gap-4">
        {[
          {
            text: "EasyExpress made my travel so much easier! The booking process was seamless, and the bus was extremely comfortable.",
            name: "James Mwangi",
          },
          {
            text: "I loved how punctual and professional the drivers were. I highly recommend EasyExpress for long-distance travel.",
            name: "Aisha Hassan",
          },
          {
            text: "The customer service is top-notch. I had an issue with my booking, and they resolved it within minutes!",
            name: "Michael Otieno",
          },
          {
            text: "Safe, clean, and reliable. I always choose EasyExpress for my travels, and they never disappoint!",
            name: "Esther Kamau",
          },
        ].map((testimonial, index) => (
          <div
            key={index}
            className="cards border-2 rounded-xl py-4 px-4 w-1/4 bg-white shadow-md"
          >
            <p className="pr-2 text-gray-700">{testimonial.text}</p>
            <div className="flex flex-row gap-2 text-sm font-medium items-center mt-2">
              <div className="h-8 w-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white font-bold">
                {testimonial.name.charAt(0)}
              </div>
              <h3>{testimonial.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Logo Section (Full Width) */}
      <div className="bg-black h-28 -mt-6 w-full flex gap-12 items-center justify-around text-white font-bold text-lg pt-4">
        <p className="text-gray-300">LOGO</p>
        <p className="text-gray-300">LOGO</p>
        <p className="text-gray-300">LOGO</p>
        <p className="text-gray-300">LOGO</p>
      </div>
    </div>
  );
};

export default Testimonials;
