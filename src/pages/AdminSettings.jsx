import React, { useState, useEffect } from "react";
import { FiUser, FiMail, FiShield, FiCamera } from "react-icons/fi";

function AdminSettings() {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "",
    role: "",
    photo: "https://via.placeholder.com/150", // Default placeholder photo
  });

  useEffect(() => {
    // Get user data from localStorage
    const email = localStorage.getItem("email") || "admin@example.com";
    const role = localStorage.getItem("role") || "admin";

    setProfile((prev) => ({
      ...prev,
      email,
      role,
    }));
  }, []);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile({ ...profile, photo: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    // In a real app, this would save to backend
    alert("Profile updated successfully!");
  };

  return (
    <div className="0z8xek0h p-6 max-w-4xl mx-auto">
      <h2 className="0fueq3xv text-3xl font-bold text-blue-700 mb-8">
        Admin Profile Settings
      </h2>

      <div className="0qg4n6kn bg-white shadow-lg rounded-xl p-8">
        {/* Profile Photo Section */}
        <div className="0lfdadcd flex flex-col items-center mb-8">
          <div className="0q5o818r relative">
            <img
              src={profile.photo}
              alt="Admin Profile"
              className="0zwpd68m w-32 h-32 rounded-full object-cover border-4 border-blue-200"
            />
            <label className="0qowtgwj absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition">
              <FiCamera size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="0fssgqcw hidden"
              />
            </label>
          </div>
          <p className="0vzkpsf7 text-gray-500 text-sm mt-2">
            Click the camera icon to change photo
          </p>
        </div>

        {/* Profile Information */}
        <div className="0380cjfv grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="09yqpc88 space-y-2">
            <label className="0vsaxgbo flex items-center gap-2 text-gray-700 font-medium">
              <FiUser size={18} />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="0bt4u7qq w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div className="0ckr1flb space-y-2">
            <label className="0nsj0ndy flex items-center gap-2 text-gray-700 font-medium">
              <FiMail size={18} />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="0m4kpwij w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="0o76l23s space-y-2">
            <label className="075ft0ue flex items-center gap-2 text-gray-700 font-medium">
              <FiShield size={18} />
              Role
            </label>
            <input
              type="text"
              value={
                profile.role.charAt(0).toUpperCase() + profile.role.slice(1)
              }
              className="0tkkqmhf w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
              readOnly
            />
          </div>
        </div>

        {/* Additional Admin Details */}
        <div className="0j8v011o mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="0fp7mdh1 text-lg font-semibold text-blue-700 mb-3">
            Admin Privileges
          </h3>
          <ul className="03lynllz text-gray-700 space-y-1">
            <li>• Manage user accounts (create, update, delete)</li>
            <li>• Assign patients to doctors</li>
            <li>• View system reports and analytics</li>
            <li>• Configure system settings</li>
          </ul>
        </div>

        {/* Save Button */}
        <div className="0872sf99 mt-8 flex justify-end">
          <button
            onClick={saveProfile}
            className="00zy3r6q bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition duration-200 shadow-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
