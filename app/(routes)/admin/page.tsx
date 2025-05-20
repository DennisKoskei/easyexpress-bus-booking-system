"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import Dashboard from "./(components)/Dashboard";
import BookingsContent from "./(components)/BookingsContent";
import RoutesContent from "./(components)/RoutesContent";
import BusesContent from "./(components)/BusesContent";
import UsersContent from "./(components)/UsersContent";
import DriversContent from "./(components)/DriversContent";
import RevenueContent from "./(components)/RevenueContent";
import SettingsContent from "./(components)/SettingsContent";
import Sidebar from "./(components)/Sidebar";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-100 flex pt-20">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="w-5/6 flex-1 p-8">
        {/* Header */}
        <header className="bg-white shadow-lg p-6 rounded-lg flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700">Admin Dashboard</h1>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
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
