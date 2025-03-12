import React from "react";

const SubNewsletter = () => {
  return (
    <div className="w-full bg-blue-500 p-8 p-t-10 text-white rounded-lg shadow-md flex flex-col">
      <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
      <form className="w-full flex flex-col space-y-4">
        <input
          type="email"
          name="newsletterEmail"
          id="newsletterName"
          placeholder="Enter Your Email"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 outline-none focus:ring-2 focus:ring-white"
        />
        <button
          type="submit"
          className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg transition-all duration-300 hover:bg-gray-200"
        >
          Subscribe to our Newsletter
        </button>
      </form>
    </div>
  );
};

export default SubNewsletter;
