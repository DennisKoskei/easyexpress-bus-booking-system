"use client";

import React, { useEffect, useState } from "react";
import { FaTicketAlt, FaChartBar, FaWallet } from "react-icons/fa";
import { parseDateTime } from "@/utils/dateUtils";

const Dashboard = () => {
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [pastCount, setPastCount] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/user/list-of-bookings");
        const data = await res.json();

        const now = new Date();

        let upcoming = 0;
        let past = 0;
        let spent = 0;

        for (const booking of data) {
          const routeDateTime = parseDateTime(
            booking.route.date,
            booking.route.time,
          );

          if (routeDateTime > now) {
            upcoming++;
          } else {
            past++;
          }

          if (booking.ticket?.price) {
            spent += booking.ticket.price;
          }
        }

        setUpcomingCount(upcoming);
        setPastCount(past);
        setTotalSpent(spent);
      } catch (err) {
        console.error("Failed to load bookings", err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md transition-all duration-300">
          <FaTicketAlt className="text-indigo-500 text-3xl" />
          <div>
            <p className="text-sm text-slate-500">Upcoming Trips</p>
            <h2 className="text-2xl font-semibold text-slate-800">
              {upcomingCount}
            </h2>
          </div>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md transition-all duration-300">
          <FaTicketAlt className="text-emerald-500 text-3xl" />
          <div>
            <p className="text-sm text-slate-500">Past Trips</p>
            <h2 className="text-2xl font-semibold text-slate-800">
              {pastCount}
            </h2>
          </div>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md transition-all duration-300">
          <FaWallet className="text-amber-500 text-3xl" />
          <div>
            <p className="text-sm text-slate-500">Total Spent</p>
            <h2 className="text-2xl font-semibold text-slate-800">
              Ksh {totalSpent.toLocaleString()}
            </h2>
          </div>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md transition-all duration-300">
          <FaChartBar className="text-violet-500 text-3xl" />
          <div>
            <p className="text-sm text-slate-500">Loyalty Points</p>
            <h2 className="text-2xl font-semibold text-slate-800">
              EasyExpress
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
