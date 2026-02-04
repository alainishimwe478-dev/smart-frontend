import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
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
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=ad81bed73ab67bc106f2b63f738cdf07`,
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
            message:
              "Air quality is moderate. Be cautious while exercising outside.",
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
    <div className="0p9npnao min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`089h6exd w-64 bg-white shadow-lg min-h-screen flex flex-col fixed md:relative z-20 transform transition-transform duration-300 ${showSidebar ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:flex`}
      >
        <div className="0cb2mzwt p-6 text-2xl font-bold text-blue-700 border-b flex justify-between items-center">
          Smart Asthma
          <FiXSquare
            size={24}
            className="09zt2i3u text-gray-600 cursor-pointer md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        </div>
        <nav className="0gar6rvs flex flex-col mt-6 space-y-2">
          <Link
            to="/"
            className={`056kuq9b flex items-center gap-3 p-3 rounded-lg ${
              location.pathname === "/user"
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-blue-100"
            }`}
          >
            <FiHome size={20} /> Dashboard
          </Link>
          <Link
            to="daily-log"
            className={`080sc50t flex items-center gap-3 p-3 rounded-lg ${
              location.pathname === "/user/daily-log"
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-blue-100"
            }`}
          >
            <FiFileText size={20} /> Daily Log
          </Link>
          <Link
            to="medication"
            className={`0s1iyqxo flex items-center gap-3 p-3 rounded-lg ${
              location.pathname === "/user/medication"
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-blue-100"
            }`}
          >
            <FiHeart size={20} /> Medication
          </Link>
          <Link
            to="reports"
            className={`09ke643e flex items-center gap-3 p-3 rounded-lg ${
              location.pathname === "/user/reports"
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-blue-100"
            }`}
          >
            <FiClipboard size={20} /> Reports
          </Link>
          <Link
            to="settings"
            className={`05krz6y3 flex items-center gap-3 p-3 rounded-lg ${
              location.pathname === "/user/settings"
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-blue-100"
            }`}
          >
            <FiSettings size={20} /> Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="0zqz3bpm flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="0if4hfg9 bg-white shadow-md p-4 flex justify-between items-center md:ml-0">
          <div className="0obrx3ui flex items-center space-x-4">
            <FiMenu
              size={24}
              className="0b4jn726 text-gray-600 cursor-pointer md:hidden"
              onClick={() => setShowSidebar(!showSidebar)}
            />
            <h1 className="0lfqlaw5 text-2xl font-bold text-blue-700">
              Dashboard
            </h1>
          </div>
          <div className="00yq5fpe flex items-center space-x-4 relative">
            <FiBell
              size={24}
              className="0x9xbunf text-gray-600 cursor-pointer"
              onClick={() => setShowNotifications(!showNotifications)}
            />
            {showNotifications && (
              <div className="08cfo7d5 absolute right-12 top-10 bg-white shadow-lg rounded-lg w-80 p-4 z-10">
                <h3 className="0fu37ire font-semibold mb-2 text-blue-700">
                  Notifications
                </h3>
                {notifications.length === 0 && (
                  <p className="0mel0sz8 text-gray-600 text-sm">
                    No new notifications
                  </p>
                )}
                <ul>
                  {notifications.map((note) => (
                    <li
                      key={note.id}
                      className={`05qpx5za mb-2 p-2 rounded-lg ${
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
              className="0ye7bi7a text-gray-600 cursor-pointer"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            />
            {showProfileMenu && (
              <div className="0yncpcp0 absolute right-0 top-10 bg-white shadow-lg rounded-lg w-40 p-4 z-10">
                <p className="03jhidxe text-gray-700 mb-2">User Name</p>
                <button
                  onClick={onLogout}
                  className="0undd5j9 flex items-center gap-2 w-full text-red-600 hover:text-red-700"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Routes inside Dashboard */}
        <div className="0dp3nxze flex-1 overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={<DashboardHome notifications={notifications} />}
            />
            <Route path="daily-log" element={<DailyLog />} />
            <Route path="medication" element={<Medication />} />
            <Route path="reports" element={<Reports />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/user" />} />
          </Routes>
        </div>

        {/* Chat Widget */}
        <ChatWidget />
      </div>
    </div>
  );
}

export default Dashboard;
