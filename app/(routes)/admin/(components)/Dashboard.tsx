import React from "react";
import { FaBus, FaUsers, FaTicketAlt, FaDollarSign } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FaTicketAlt className="text-blue-600 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">12,450</h2>
            <p className="text-gray-500">Total Bookings</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FaBus className="text-green-600 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">150</h2>
            <p className="text-gray-500">Active Buses</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FaUsers className="text-purple-600 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">3,200</h2>
            <p className="text-gray-500">Registered Users</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FaDollarSign className="text-yellow-600 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">$25,840</h2>
            <p className="text-gray-500">Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
