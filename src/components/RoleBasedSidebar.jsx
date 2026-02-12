import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiSettings,
  FiLogOut,
  FiUsers,
  FiStethoscope,
  FiBarChart,
  FiActivity,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function RoleBasedSidebar({ role, sidebarOpen, toggleSidebar }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = {
    admin: [
      { to: "/admin", icon: FiHome, label: "Dashboard" },
      { to: "/admin/users", icon: FiUsers, label: "Users" },
      { to: "/admin/settings", icon: FiSettings, label: "Settings" },
    ],
    doctor: [
      { to: "/doctor", icon: FiHome, label: "Dashboard" },
      {
        to: "/doctor/patient",
        icon: FiActivity,
        label: "Patient Dashboard",
      },
      { to: "/doctor/chat", icon: FiUser, label: "Chat" },
      { to: "/doctor/settings", icon: FiSettings, label: "Settings" },
    ],
    user: [
      { to: "/user", icon: FiHome, label: "Dashboard" },
      { to: "/user/profile", icon: FiUser, label: "Profile" },
      { to: "/user/settings", icon: FiSettings, label: "Settings" },
    ],
  };

  const items = menuItems[role] || [];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="0hzr9pea md:hidden fixed top-4 left-4 z-50 bg-blue-800 text-white p-2 rounded"
      >
        {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`0ckekf5e fixed inset-y-0 left-0 z-40 w-64 bg-blue-800 text-white transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:inset-0`}
      >
        <div className="04lwnjzg p-4">
          <h2 className="0jtvimv1 text-xl font-bold mb-6">AsthmaCare</h2>
          <nav className="0kra18dz space-y-2">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setTimeout(toggleSidebar, 100)} // Close sidebar on mobile after navigation
                className="0jb3ua7r flex items-center space-x-3 p-3 rounded hover:bg-blue-700 transition"
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <button
            onClick={logout}
            className="0ezgy8op flex items-center space-x-3 p-3 rounded hover:bg-blue-700 transition mt-8 w-full"
          >
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="0rpf80y0 fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
