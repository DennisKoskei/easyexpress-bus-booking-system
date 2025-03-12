import React from "react";
import { FaTicketAlt, FaChartBar, FaWallet } from "react-icons/fa";

const Dashboard = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Dashboard</h2>
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FaTicketAlt className="text-blue-600 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">5</h2>
            <p className="text-gray-500">Upcoming Trips</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FaTicketAlt className="text-green-600 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">25</h2>
            <p className="text-gray-500">Past Trips</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FaWallet className="text-yellow-600 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">Ksh 10,540</h2>
            <p className="text-gray-500">Total Spent</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FaChartBar className="text-purple-600 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">EasyExpress</h2>
            <p className="text-gray-500">Loyalty Level</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
