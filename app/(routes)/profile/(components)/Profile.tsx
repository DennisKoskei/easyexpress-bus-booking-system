"use client";

import React, { useState } from "react";
import Image from "next/image";
import Dashboard from "@app/profile/(components)/Dashboard";
import MyBookings from "@app/profile/(components)/MyBookings";
import Support from "@app/profile/(components)/Support";
import UserProfile from "@app/profile/(components)/UserProfile";
import {
  FaTicketAlt,
  FaHeadset,
  FaSignOutAlt,
  FaChartBar,
} from "react-icons/fa";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-1/6 bg-slate-900 text-white p-6">
        <div className="flex flex-col items-center text-center">
          <Image
            className="rounded-full border-2 border-white"
            src="/Assets/profile-pic.png"
            width={100}
            height={100}
            alt="Profile Picture"
          />
          <h2 className="text-lg font-semibold mt-2">Dennis Koskei</h2>
          <p className="text-gray-300 text-sm">example@mail.com</p>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <ul className="space-y-4">
            <li
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${activeTab === "dashboard" ? "bg-blue-800" : ""
                }`}
              onClick={() => setActiveTab("dashboard")}
            >
              <FaChartBar /> Dashboard
            </li>
            <li
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${activeTab === "myBookings" ? "bg-blue-800" : ""
                }`}
              onClick={() => setActiveTab("myBookings")}
            >
              <FaTicketAlt /> My Bookings
            </li>
            <li
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${activeTab === "support" ? "bg-blue-800" : ""
                }`}
              onClick={() => setActiveTab("support")}
            >
              <FaHeadset /> Support
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
        <header className="flex flex-col bg-white gap-y-2 shadow-lg p-6 rounded-lg">
          <Dashboard />
        </header>
        <div className="mt-6">
          <UserProfile />
        </div>

        {/* Profile Content */}
        <div className="mt-6">
          {activeTab === "myBookings" && <MyBookings />}
          {activeTab === "support" && <Support />}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
