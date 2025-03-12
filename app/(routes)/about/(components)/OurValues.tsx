import React from "react";

const OurValues = () => {
  return (
    <div className="px-20 py-12 bg-gray-100">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Our Values</h1>
        <p className="text-lg text-gray-600 mt-2">
          At EasyExpress, we are committed to providing safe, reliable, and
          comfortable travel experiences for our passengers.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Value 1: Safety First */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Safety First
          </h2>
          <p className="text-gray-700">
            We prioritize the safety of our passengers and staff by ensuring
            regular vehicle maintenance, professional drivers, and adherence to
            strict safety regulations.
          </p>
        </div>

        {/* Value 2: Reliability & Punctuality */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Reliability & Punctuality
          </h2>
          <p className="text-gray-700">
            Our passengers trust us to get them to their destinations on time.
            We ensure prompt departures and arrivals, minimizing delays and
            inconveniences.
          </p>
        </div>

        {/* Value 3: Customer Satisfaction */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Customer Satisfaction
          </h2>
          <p className="text-gray-700">
            We are dedicated to providing excellent service, comfortable
            seating, and a seamless booking experience to ensure every journey
            is pleasant and stress-free.
          </p>
        </div>

        {/* Value 4: Sustainability & Responsibility */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Sustainability & Responsibility
          </h2>
          <p className="text-gray-700">
            We are committed to reducing our environmental footprint by
            implementing eco-friendly practices and maintaining fuel-efficient
            fleets.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurValues;
