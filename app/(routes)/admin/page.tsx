"use client";

import Image from "next/image";
import React, { useState } from "react";
import Dashboard from "./(components)/Dashboard";
import BookingsContent from "./(components)/BookingsContent";
import RoutesContent from "./(components)/RoutesContent";
import BusesContent from "./(components)/BusesContent";
import UsersContent from "./(components)/UsersContent";
import DriversContent from "./(components)/DriversContent";
import RevenueContent from "./(components)/RevenueContent";
import SettingsContent from "./(components)/SettingsContent";
import {
  FaBus,
  FaUsers,
  FaTicketAlt,
  FaDollarSign,
  FaSignOutAlt,
  FaChartBar,
} from "react-icons/fa";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-1/6 bg-slate-900 flex flex-col text-white py-6 px-4">
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
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${activeTab === "routes" ? "bg-blue-800" : "hover:bg-blue-800"}`}
              onClick={() => setActiveTab("routes")}
            >
              <FaChartBar /> Routes
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
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${activeTab === "drivers" ? "bg-blue-800" : "hover:bg-blue-800"}`}
              onClick={() => setActiveTab("drivers")}
            >
              <FaUsers /> Drivers
            </li>
            <li
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${activeTab === "revenue" ? "bg-blue-800" : "hover:bg-blue-800"}`}
              onClick={() => setActiveTab("revenue")}
            >
              <FaDollarSign /> Revenue
            </li>
            <li className="flex items-center gap-3 p-2 bg-red-500 rounded-lg cursor-pointer hover:bg-red-400">
              <FaSignOutAlt /> Logout
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-5/6 flex-1 p-8">
        {/* Header */}
        <header className="bg-white shadow-lg p-6 rounded-lg flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700">Admin Dashboard</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Logout
          </button>
        </header>

        {/* Dynamic Content */}
        <section className="mt-6">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "routes" && <RoutesContent />}
          {activeTab === "bookings" && <BookingsContent />}
          {activeTab === "buses" && <BusesContent />}
          {activeTab === "users" && <UsersContent />}
          {activeTab === "drivers" && <DriversContent />}
          {activeTab === "revenue" && <RevenueContent />}
          {activeTab === "settings" && <SettingsContent />}
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
