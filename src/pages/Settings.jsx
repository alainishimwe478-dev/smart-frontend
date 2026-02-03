import React, { useState } from "react";
import { FiUser, FiBell, FiPhone, FiClock, FiShield } from "react-icons/fi";

function Settings() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+250700000000",
  });

  const [alerts, setAlerts] = useState({
    medication: true,
    airQuality: true,
    emergency: true,
  });

  const [reminderTime, setReminderTime] = useState("08:00");

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const toggleAlert = (type) => {
    setAlerts({ ...alerts, [type]: !alerts[type] });
  };

  const saveSettings = () => {
    alert("Settings saved successfully!");
    // Later: send to backend API
  };

  return (
    <div className="05fju29d p-4 sm:p-8 max-w-4xl">
      <h2 className="01xdqr6w text-2xl font-bold text-blue-700 mb-6">
        Settings
      </h2>

      {/* Profile Settings */}
      <div className="03quoci3 bg-white shadow rounded-xl p-6 mb-6">
        <h3 className="0kt35zyk font-semibold text-lg mb-4 flex items-center gap-2">
          <FiUser /> Profile Information
        </h3>

        <div className="0legzrvi grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            className="0khtrmx4 border p-3 rounded-lg"
            placeholder="Full Name"
          />
          <input
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            className="0hvwvoef border p-3 rounded-lg"
            placeholder="Email"
          />
          <input
            name="phone"
            value={profile.phone}
            onChange={handleProfileChange}
            className="0us6al6z border p-3 rounded-lg"
            placeholder="Phone Number"
          />
        </div>
      </div>

      {/* Alerts Settings */}
      <div className="0b0nlphc bg-white shadow rounded-xl p-6 mb-6">
        <h3 className="0k7dvr0m font-semibold text-lg mb-4 flex items-center gap-2">
          <FiBell /> Alert Preferences
        </h3>

        {["medication", "airQuality", "emergency"].map((type) => (
          <div
            key={type}
            className="0ejrla9b flex justify-between items-center mb-3"
          >
            <span className="026rxik4 capitalize">{type} alerts</span>
            <button
              onClick={() => toggleAlert(type)}
              className={`0gaw5zba px-4 py-1 rounded-full text-white ${
                alerts[type] ? "bg-green-500" : "bg-gray-400"
              }`}
            >
              {alerts[type] ? "ON" : "OFF"}
            </button>
          </div>
        ))}
      </div>

      {/* Reminder Time */}
      <div className="0y6sg2bm bg-white shadow rounded-xl p-6 mb-6">
        <h3 className="0dtss1se font-semibold text-lg mb-4 flex items-center gap-2">
          <FiClock /> Medication Reminder
        </h3>

        <input
          type="time"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="09tj68ty border p-3 rounded-lg"
        />
      </div>

      {/* Security */}
      <div className="0571xuv4 bg-white shadow rounded-xl p-6">
        <h3 className="0e99kwtc font-semibold text-lg mb-4 flex items-center gap-2">
          <FiShield /> Security
        </h3>

        <button
          className="04hkvq7n bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          onClick={() => alert("Password reset link sent!")}
        >
          Change Password
        </button>
      </div>

      {/* Save Button */}
      <div className="0g05oiyo mt-6">
        <button
          onClick={saveSettings}
          className="0p52q6x0 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Settings;
