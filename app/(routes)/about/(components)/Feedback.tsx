import React from "react";
import SubNewsletter from "./SubNewsletter";

const Feedback = () => {
  return (
    <div className="bg-white p-20 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-8">
      {/* Left Section - Feedback Form */}
      <div className="w-full md:w-1/2 p-8 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          We&apos;d love you hear your Feedback!
        </h1>
        <form className="space-y-5">
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            id="message"
            rows={5}
            placeholder="Write your feedback..."
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            Submit Feedback
          </button>
        </form>
      </div>

      {/* Right Section - Contact Info */}
      <div className="w-full md:w-1/2 px-8 pt-8 bg-gray-100 text-white rounded-lg shadow-md flex flex-col">
        <div className="w-full flex flex-col items-end text-right">
          <h2 className="text-2xl text-gray-800 font-bold mb-4">Contact Us</h2>
          <div className="text-gray-800 font-medium">
            <p className="mb-0 text-gray-800">Express House, Jogoo Road</p>
            <p className="mb-2">Nairobi, Kenya</p>
            <p className="mb-1"> +254 700 123 456</p>
            <p className="mb-1"> support@easyexpress.com</p>
            <p className="mb-3"> www.easyexpress.com</p>
          </div>
        </div>
        <SubNewsletter />
      </div>
    </div>
  );
};

export default Feedback;
