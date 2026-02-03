import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import {
  FiBell,
  FiUser,
  FiLogOut,
  FiHome,
  FiFileText,
  FiHeart,
  FiClipboard,
  FiSettings,
  FiMenu,
  FiXSquare,
} from "react-icons/fi";
import DailyLog from "./DailyLog";
import Medication from "./Medication";
import DashboardHome from "./DashboardHome";
import Reports from "./Reports";
import Settings from "./Settings";
import AdminDashboard from "./AdminDashboard";
import ChatWidget from "../components/ChatWidget";

function Dashboard({ onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const asthmaData = [
    { day: "Mon", attacks: 1, steps: 5000, meds: 2 },
    { day: "Tue", attacks: 0, steps: 6200, meds: 3 },
    { day: "Wed", attacks: 2, steps: 4800, meds: 1 },
    { day: "Thu", attacks: 1, steps: 7000, meds: 3 },
    { day: "Fri", attacks: 0, steps: 8000, meds: 3 },
    { day: "Sat", attacks: 1, steps: 7500, meds: 2 },
    { day: "Sun", attacks: 0, steps: 6000, meds: 3 },
  ];

  useEffect(() => {
    const fetchAirQuality = async () => {
      try {
        // Example coordinates (replace with user's actual location)
        const lat = -1.9577; // Kigali latitude
        const lon = 30.1127; // Kigali longitude

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=ad81bed73ab67bc106f2b63f738cdf07`
        );
        const data = await res.json();

        // Air Quality Index (AQI) from 1 (good) to 5 (very poor)
        const aqi = data.list[0].main.aqi;

        const weatherNotifications = [];

        if (aqi >= 4) {
          weatherNotifications.push({
            id: 1,
            type: "alert",
            message: "Air quality is poor today. Limit outdoor activities.",
          });
        } else if (aqi === 3) {
          weatherNotifications.push({
            id: 2,
            type: "reminder",
            message: "Air quality is moderate. Be cautious while exercising outside.",
          });
        } else {
          weatherNotifications.push({
            id: 3,
            type: "health",
            message: "Air quality is good today. Enjoy your day!",
          });
        }

        // Health notifications
        const healthNotifications = [
          {
            id: 4,
            type: "reminder",
            message: "Take your inhaler at 8:00 AM.",
          },
          {
            id: 5,
            type: "health",
            message: "Your asthma symptoms increased yesterday. Be cautious.",
          },
        ];

        // Merge weather + health notifications
        setNotifications([...weatherNotifications, ...healthNotifications]);
      } catch (error) {
        console.error("Failed to fetch air quality data", error);
      }
    };

    fetchAirQuality();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className={`w-64 bg-white shadow-lg min-h-screen flex flex-col fixed md:relative z-20 transform transition-transform duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:flex`}>
        <div className="p-6 text-2xl font-bold text-blue-700 border-b flex justify-between items-center">
          Smart Asthma
          <FiXSquare
            size={24}
            className="text-gray-600 cursor-pointer md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        </div>
        <nav className="flex flex-col mt-6 space-y-2">
          <Link to="/dashboard" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-100 rounded-lg">
            <FiHome size={20} /> Dashboard
          </Link>
          <Link to="daily-log" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-100 rounded-lg">
            <FiFileText size={20} /> Daily Log
          </Link>
          <Link to="medication" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-100 rounded-lg">
            <FiHeart size={20} /> Medication
          </Link>
          <Link to="reports" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-100 rounded-lg">
            <FiClipboard size={20} /> Reports
          </Link>
          <Link to="admin" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-100 rounded-lg">
            <FiSettings size={20} /> Admin Dashboard
          </Link>
          <Link
            to="settings"
            className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-100 rounded-lg"
          >
            <FiSettings size={20} /> Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="bg-white shadow-md p-4 flex justify-between items-center md:ml-0">
          <div className="flex items-center space-x-4">
            <FiMenu
              size={24}
              className="text-gray-600 cursor-pointer md:hidden"
              onClick={() => setShowSidebar(!showSidebar)}
            />
            <h1 className="text-2xl font-bold text-blue-700">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4 relative">
            <FiBell
              size={24}
              className="text-gray-600 cursor-pointer"
              onClick={() => setShowNotifications(!showNotifications)}
            />
            {showNotifications && (
              <div className="absolute right-12 top-10 bg-white shadow-lg rounded-lg w-80 p-4 z-10">
                <h3 className="font-semibold mb-2 text-blue-700">Notifications</h3>
                {notifications.length === 0 && <p className="text-gray-600 text-sm">No new notifications</p>}
                <ul>
                  {notifications.map((note) => (
                    <li
                      key={note.id}
                      className={`mb-2 p-2 rounded-lg ${
                        note.type === "alert"
                          ? "bg-red-100 text-red-700"
                          : note.type === "reminder"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {note.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <FiUser
              size={24}
              className="text-gray-600 cursor-pointer"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            />
            {showProfileMenu && (
              <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg w-40 p-4 z-10">
                <p className="text-gray-700 mb-2">User Name</p>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 w-full text-red-600 hover:text-red-700"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Routes inside Dashboard */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardHome notifications={notifications} />} />
            <Route path="/daily-log" element={<DailyLog />} />
            <Route path="/medication" element={<Medication />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>

        {/* Chat Widget */}
        <ChatWidget />
      </div>
    </div>
  );
}

export default Dashboard;
