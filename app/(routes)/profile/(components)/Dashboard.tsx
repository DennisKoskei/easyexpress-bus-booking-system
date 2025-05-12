import React from "react";
import { FaTicketAlt, FaChartBar, FaWallet } from "react-icons/fa";

const Dashboard = () => {
  return (
    <section className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md transition-all duration-300">
          <FaTicketAlt className="text-indigo-500 text-3xl" />
          <div>
            <p className="text-sm text-slate-500">Upcoming Trips</p>
            <h2 className="text-2xl font-semibold text-slate-800">5</h2>
          </div>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md transition-all duration-300">
          <FaTicketAlt className="text-emerald-500 text-3xl" />
          <div>
            <p className="text-sm text-slate-500">Past Trips</p>
            <h2 className="text-2xl font-semibold text-slate-800">25</h2>
          </div>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md transition-all duration-300">
          <FaWallet className="text-amber-500 text-3xl" />
          <div>
            <p className="text-sm text-slate-500">Total Spent</p>
            <h2 className="text-2xl font-semibold text-slate-800">
              Ksh 10,540
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
