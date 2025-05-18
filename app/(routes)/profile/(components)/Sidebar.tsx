"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { User } from "@/types/user";
import {
  FaTicketAlt,
  FaHeadset,
  FaSignOutAlt,
  FaChartBar,
  FaCamera,
} from "react-icons/fa";

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  reloadFlag: number;
};

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  reloadFlag,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/profile");
        if (!res.ok) throw new Error("Failed to fetch user profile");

        const data = await res.json();
        setUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          avatarUrl: data.avatarUrl || "/Assets/profile-pic.png",
        });
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchUser();
  }, [reloadFlag]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <aside className="w-1/6 bg-slate-900 text-white p-6">
      <div className="flex flex-col items-center text-center">
        <div className="relative group">
          <Image
            className="rounded-full border-2 border-white object-cover"
            src={user?.avatarUrl || "/Assets/profile-pic.png"}
            width={100}
            height={100}
            alt="Profile Picture"
          />
          <button
            className="absolute bottom-1 right-1 bg-white p-2 rounded-full border shadow group-hover:opacity-100 opacity-0 transition"
            title="Change profile photo (disabled)"
            disabled
          >
            <FaCamera className="text-gray-600" />
          </button>
        </div>
        <h2 className="text-lg font-semibold mt-2">
          {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
        </h2>
        <p className="text-gray-300 text-sm">{user?.email || ""}</p>
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
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${activeTab === "userProfile" ? "bg-blue-800" : ""
              }`}
            onClick={() => setActiveTab("userProfile")}
          >
            <FaChartBar /> My Profile
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
          <li
            className="flex items-center gap-3 p-2 bg-red-500 rounded-lg cursor-pointer hover:bg-red-400"
            onClick={handleLogout} // <-- Call logout
          >
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
