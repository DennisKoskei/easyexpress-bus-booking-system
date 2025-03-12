"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  FaBus,
  FaUsers,
  FaTicketAlt,
  FaDollarSign,
  FaCog,
  FaChartBar,
} from "react-icons/fa";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-slate-900 text-white p-6">
        <div className="flex flex-col items-center text-center">
          <Image
            className="rounded-full border-2 border-white"
            src="/Assets/profile-pic.png"
            width={100}
            height={100}
            alt="Admin Profile"
          />
          <h2 className="text-lg font-semibold mt-2">Dennis Koskei</h2>
          <p className="text-sm text-gray-300">example@mail.com</p>
        </div>

        <nav className="mt-6">
          <ul className="space-y-4">
            <li
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${activeTab === "dashboard" ? "bg-blue-800" : "hover:bg-blue-800"}`}
              onClick={() => setActiveTab("dashboard")}
            >
              <FaChartBar /> Dashboard
            </li>
            <li
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${activeTab === "bookings" ? "bg-blue-800" : "hover:bg-blue-800"}`}
              onClick={() => setActiveTab("bookings")}
            >
              <FaTicketAlt /> Bookings
            </li>
            <li
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${activeTab === "buses" ? "bg-blue-800" : "hover:bg-blue-800"}`}
              onClick={() => setActiveTab("buses")}
            >
              <FaBus /> Buses
            </li>
            <li
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${activeTab === "users" ? "bg-blue-800" : "hover:bg-blue-800"}`}
              onClick={() => setActiveTab("users")}
            >
              <FaUsers /> Users
            </li>
            <li
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${activeTab === "revenue" ? "bg-blue-800" : "hover:bg-blue-800"}`}
              onClick={() => setActiveTab("revenue")}
            >
              <FaDollarSign /> Revenue
            </li>
            <li
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${activeTab === "settings" ? "bg-blue-800" : "hover:bg-blue-800"}`}
              onClick={() => setActiveTab("settings")}
            >
              <FaCog /> Settings
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="bg-white shadow-lg p-6 rounded-lg flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700">Admin Dashboard</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Logout
          </button>
        </header>

        {/* Dynamic Content */}
        <section className="mt-6">
          {activeTab === "dashboard" && (
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
          )}

          {activeTab === "bookings" && (
            <h2 className="text-xl font-semibold">Bookings Content</h2>
          )}
          {activeTab === "buses" && (
            <h2 className="text-xl font-semibold">Buses Content</h2>
          )}
          {activeTab === "users" && (
            <h2 className="text-xl font-semibold">Users Content</h2>
          )}
          {activeTab === "revenue" && (
            <h2 className="text-xl font-semibold">Revenue Content</h2>
          )}
          {activeTab === "settings" && (
            <h2 className="text-xl font-semibold">Settings Content</h2>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
