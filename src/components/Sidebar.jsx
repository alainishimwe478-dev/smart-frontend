import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaPills,
  FaComments,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar({ onLogout }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaHome />, path: "/user" },
    {
      id: "dailyLogs",
      label: "Daily Logs",
      icon: <FaClipboardList />,
      path: "/daily-logs",
    },
    {
      id: "medications",
      label: "Medications",
      icon: <FaPills />,
      path: "/medications",
    },
    { id: "chat", label: "Doctor Chat", icon: <FaComments />, path: "/chat" },
    { id: "profile", label: "Profile", icon: <FaUser />, path: "/profile" },
  ];

  return (
    <aside className="0s3few6e w-64 bg-blue-700 text-white min-h-screen flex flex-col">
      <h1 className="0n7uj446 text-2xl font-bold text-center py-6 border-b border-blue-600">
        Asthma Care
      </h1>

      <nav className="0yfhefag flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded transition ${
                isActive ? "bg-blue-600 font-semibold" : "hover:bg-blue-600"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={onLogout}
        className="0hpg8dtp m-4 flex items-center gap-3 px-4 py-3 bg-red-500 hover:bg-red-600 rounded transition"
      >
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
}
