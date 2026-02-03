import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { FiActivity, FiClipboard } from "react-icons/fi";

function DashboardHome({ notifications = [] }) {
  const asthmaData = [
    { day: "Mon", attacks: 1, steps: 5000, meds: 2 },
    { day: "Tue", attacks: 0, steps: 6200, meds: 3 },
    { day: "Wed", attacks: 2, steps: 4800, meds: 1 },
    { day: "Thu", attacks: 1, steps: 7000, meds: 3 },
    { day: "Fri", attacks: 0, steps: 8000, meds: 3 },
    { day: "Sat", attacks: 1, steps: 7500, meds: 2 },
    { day: "Sun", attacks: 0, steps: 6000, meds: 3 },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Welcome Header */}
      <header className="p-8 bg-gradient-to-r from-blue-100 to-blue-200">
        <h2 className="text-3xl font-bold mb-2">Welcome Back, User!</h2>
        <p className="text-gray-700">
          Monitor your asthma attacks, steps, and medication adherence this week.
        </p>
      </header>

      {/* Stats Cards */}
      <section className="p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 flex flex-col items-start hover:scale-105 transform transition">
          <FiActivity size={28} className="text-blue-700 mb-2" />
          <h3 className="text-gray-500 text-sm sm:text-base">Daily Steps</h3>
          <p className="text-xl sm:text-2xl font-bold">5,230</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 flex flex-col items-start hover:scale-105 transform transition">
          <FiClipboard size={28} className="text-green-700 mb-2" />
          <h3 className="text-gray-500 text-sm sm:text-base">Asthma Attacks</h3>
          <p className="text-xl sm:text-2xl font-bold">1</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 flex flex-col items-start hover:scale-105 transform transition">
          <FiActivity size={28} className="text-yellow-500 mb-2" />
          <h3 className="text-gray-500 text-sm sm:text-base">Medication Taken</h3>
          <p className="text-xl sm:text-2xl font-bold">2 / 3</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 flex flex-col items-start hover:scale-105 transform transition">
          <FiClipboard size={28} className="text-red-500 mb-2" />
          <h3 className="text-gray-500 text-sm sm:text-base">Alerts Today</h3>
          <p className="text-xl sm:text-2xl font-bold">{notifications.filter(n => n.type==="alert").length}</p>
        </div>
      </section>

      {/* Charts Section */}
      <section className="p-4 sm:p-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Asthma Attacks */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4">Weekly Asthma Attacks</h3>
          <div className="w-full h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={asthmaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="attacks" stroke="#22c55e" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Steps */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4">Daily Steps</h3>
          <div className="w-full h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={asthmaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="steps" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Daily Log</h3>
          <p className="text-gray-600">Track your symptoms and activities.</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Medication</h3>
          <p className="text-gray-600">View your current medication schedule.</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Reports</h3>
          <p className="text-gray-600">Analyze your asthma history and trends.</p>
        </div>
      </section>
    </div>
  );
}

export default DashboardHome;
