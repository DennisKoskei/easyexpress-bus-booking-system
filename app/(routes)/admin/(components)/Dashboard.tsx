import React, { useState, useEffect } from "react";
import { FaBus, FaUsers, FaTicketAlt, FaDollarSign } from "react-icons/fa";

interface SummaryData {
  users: number;
  buses: number;
  drivers: number;
  totalRevenue: number;
  routes: number;
  bookings: number;
}

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch("/api/admin/dashboard-summary");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: { data: SummaryData } = await response.json();
        console.log("Summary data:", data);
        setSummary(data.data);
      } catch (error) {
        console.log("Error fetching summary:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-4 py-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FaUsers className="text-blue-600 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">{summary?.users}</h2>
            <p className="text-gray-500">Total Users</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FaBus className="text-blue-600 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">{summary?.buses}</h2>
            <p className="text-gray-500">Total Buses</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FaUsers className="text-green-600 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">{summary?.drivers}</h2>
            <p className="text-gray-500">Total Drivers</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FaDollarSign className="text-yellow-600 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">${summary?.totalRevenue}</h2>
            <p className="text-gray-500">Total Revenue</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FaUsers className="text-purple-600 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">{summary?.routes}</h2>
            <p className="text-gray-500">Past | Upcoming Routes</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FaTicketAlt className="text-purple-600 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">{summary?.bookings}</h2>
            <p className="text-gray-500">Past | Upcoming Bookings</p>
          </div>
        </div>
      </div>
      <div className="py-4 bg-white p-6 rounded-lg shadow-md ">
        <p> This is another div </p>
      </div>
    </div>
  );
};

export default Dashboard;
