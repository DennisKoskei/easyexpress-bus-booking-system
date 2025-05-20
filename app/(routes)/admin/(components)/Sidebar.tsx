"use client";

import React from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import {
  FaBus,
  FaUsers,
  FaTicketAlt,
  FaDollarSign,
  FaSignOutAlt,
  FaChartBar,
} from "react-icons/fa";

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
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
          <li
            className="flex items-center gap-3 p-2 bg-red-500 rounded-lg cursor-pointer hover:bg-red-400"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
