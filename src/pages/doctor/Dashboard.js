import React from "react";
import { Link } from "react-router-dom";
import PatientsList from "../../components/PatientsList";
import {
  UsersIcon,
  ClipboardDocumentListIcon,
  HeartIcon,
  PencilSquareIcon,
  BellAlertIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

function Dashboard() {
  // Top summary numbers (dummy data)
  const stats = [
    { title: "Total Patients", count: 12, icon: UsersIcon, color: "bg-blue-500" },
    { title: "Daily Logs", count: 34, icon: ClipboardDocumentListIcon, color: "bg-green-500" },
    { title: "Alerts", count: 5, icon: BellAlertIcon, color: "bg-red-500" },
    { title: "Messages", count: 8, icon: ChatBubbleLeftRightIcon, color: "bg-indigo-500" },
  ];

  // Main summary cards
  const summary = [
    { title: "My Patients", count: 12, link: "/my-patients", color: "bg-blue-500", icon: UsersIcon },
    { title: "Daily Logs", count: 34, link: "/daily-logs", color: "bg-green-500", icon: ClipboardDocumentListIcon },
    { title: "Vitals", count: 28, link: "/vitals", color: "bg-yellow-500", icon: HeartIcon },
    { title: "Prescriptions", count: 15, link: "/prescriptions", color: "bg-purple-500", icon: PencilSquareIcon },
    { title: "Medical Notes", count: 20, link: "/medical-notes", color: "bg-pink-500", icon: PencilSquareIcon },
    { title: "Alerts", count: 5, link: "/alerts", color: "bg-red-500", icon: BellAlertIcon },
    { title: "Messages", count: 8, link: "/messages", color: "bg-indigo-500", icon: ChatBubbleLeftRightIcon },
    { title: "Appointments", count: 6, link: "/appointments", color: "bg-teal-500", icon: CalendarDaysIcon },
    { title: "Reports", count: 3, link: "/reports", color: "bg-orange-500", icon: DocumentChartBarIcon },
    { title: "Settings", count: "-", link: "/settings", color: "bg-gray-500", icon: Cog6ToothIcon },
  ];

  // Dummy recent activity
  const recentLogs = [
    { id: 1, patient: "John Doe", note: "Mild wheezing at night", date: "2026-02-03 08:00" },
    { id: 2, patient: "Jane Smith", note: "Inhaler dosage increased", date: "2026-02-02 14:00" },
    { id: 3, patient: "Mark Lee", note: "Shortness of breath observed", date: "2026-02-01 10:00" },
  ];

  const recentAlerts = [
    { id: 1, type: "Warning", message: "Heart rate elevated", date: "2026-02-03 09:00" },
    { id: 2, type: "Critical", message: "Oxygen below 90%", date: "2026-02-02 15:00" },
  ];

  const recentMessages = [
    { id: 1, sender: "Patient", text: "I felt shortness of breath", date: "2026-02-03 07:00" },
    { id: 2, sender: "Doctor", text: "Please use inhaler as prescribed", date: "2026-02-03 07:15" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className={`p-4 rounded-xl shadow flex items-center gap-4 ${item.color} text-white`}>
              <Icon className="w-10 h-10" />
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-2xl font-bold">{item.count}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main summary grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {summary.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              to={item.link}
              className={`p-6 rounded-xl shadow hover:scale-105 transform transition ${item.color} text-white flex flex-col justify-between`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-8 h-8" />
                <h2 className="text-xl font-semibold">{item.title}</h2>
              </div>
              <p className="text-3xl font-bold mt-4">{item.count}</p>
            </Link>
          );
        })}
      </div>

      {/* Patients List */}
      <PatientsList />

      {/* Recent activity section */}
      <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logs */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-2">Daily Logs</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {recentLogs.map(log => (
              <div key={log.id} className="border-b py-2">
                <p className="text-gray-700"><strong>{log.patient}:</strong> {log.note}</p>
                <p className="text-gray-400 text-sm">{log.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-2">Alerts</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {recentAlerts.map(alert => (
              <div key={alert.id} className="border-b py-2">
                <p className="text-gray-700"><strong>{alert.type}:</strong> {alert.message}</p>
                <p className="text-gray-400 text-sm">{alert.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-2">Messages</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {recentMessages.map(msg => (
              <div key={msg.id} className="border-b py-2">
                <p className="text-gray-700"><strong>{msg.sender}:</strong> {msg.text}</p>
                <p className="text-gray-400 text-sm">{msg.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
