import React, { useState, useEffect } from "react";
import { FiBell, FiX, FiMessageSquare, FiAlertTriangle, FiInfo } from "react-icons/fi";

const NotificationSystem = ({ initialNotifications = [] }) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock functions
  const simulateDoctorNotification = () => {
    const doctorMessages = [
      "Dr. Sarah: Remember to take your inhaler before outdoor activities today.",
      "Dr. Williams: Your recent symptoms show improvement. Keep up the good work!",
      "Dr. Johnson: Air quality alert: High pollen count expected tomorrow.",
      "Dr. Patel: Please schedule your monthly check-up soon.",
      "Dr. Garcia: New medication dosage adjustment available in your profile.",
    ];

    const randomMessage = doctorMessages[Math.floor(Math.random() * doctorMessages.length)];

    const newNotification = {
      id: Date.now(),
      type: "doctor",
      title: "Doctor Message",
      message: randomMessage,
      time: "just now",
      read: false,
      icon: <FiMessageSquare />,
    };

    setNotifications((prev) => [newNotification, ...prev]);
  };

  const simulateWeatherAlert = () => {
    const weatherAlerts = [
      "Air quality is poor today. Limit outdoor activities.",
      "High humidity detected. Monitor your breathing closely.",
      "Pollen count is high. Consider taking allergy medication.",
      "Temperature drop expected. Keep warm and monitor symptoms.",
      "Dust storm approaching. Stay indoors if possible.",
    ];

    const randomAlert = weatherAlerts[Math.floor(Math.random() * weatherAlerts.length)];

    const newAlert = {
      id: Date.now(),
      type: "alert",
      title: "Weather Alert",
      message: randomAlert,
      time: "just now",
      read: false,
      icon: <FiAlertTriangle />,
    };

    setNotifications((prev) => [newAlert, ...prev]);
  };

  const simulateHealthReminder = () => {
    const reminders = [
      "Time for your daily medication check.",
      "Don't forget to log your symptoms today.",
      "Weekly asthma review due tomorrow.",
