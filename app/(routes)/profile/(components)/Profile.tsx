"use client";

import React, { useState } from "react";
import Dashboard from "@app/profile/(components)/Dashboard";
import MyBookings from "@app/profile/(components)/MyBookings";
import Support from "@app/profile/(components)/Support";
import UserProfile from "@app/profile/(components)/UserProfile";
import Sidebar from "@app/profile/(components)/Sidebar";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("userProfile");
  const [reloadFlag, setReloadFlag] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        reloadFlag={reloadFlag}
      />

      {/* Main Content */}
      <main className="w-5/6 flex-1 p-8">
        {/* Header */}
        <header className="flex flex-col bg-white gap-y-2 shadow-lg p-6 rounded-lg">
          <Dashboard />
        </header>

        {/* Profile Content */}
        <div className="mt-6">
          {activeTab === "userProfile" && (
            <UserProfile
              reloadFlag={reloadFlag}
              setReloadFlag={setReloadFlag}
            />
          )}
          {activeTab === "myBookings" && <MyBookings />}
          {activeTab === "support" && <Support />}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
