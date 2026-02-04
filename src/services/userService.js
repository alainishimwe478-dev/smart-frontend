import axios from "axios";
import { apiRequest } from "./api";

const API_URL = import.meta.env.VITE_API_URL || "https://backend1-5xtu.onrender.com";

/**
 * User signup
 */
export const signup = async (full_name, email, password) => {
  try {
    const res = await axios.post(`${API_URL}/users/signup`, {
      full_name,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};

/**
 * User login
 */
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/users/login`, {
    email,
    password,
  }, {
    headers: { "Content-Type": "application/json" }
  });

  return response.data; // should return { token, role }
};

/**
 * Get current user profile
 */
export const getMyProfile = () => {
  return apiRequest("/api/user/profile");
};

/**
 * Submit daily health log
 */
export const submitDailyLog = (logData) => {
  return apiRequest("/api/user/daily-log", "POST", logData);
};

/**
 * Get user data
 */
export const getUserData = (email) => {
  return apiRequest(`/api/user/profile/${email}`);
};

/**
 * Get medications for user
 */
export const getMedications = (email) => {
  return apiRequest(`/api/user/medications/${email}`);
};

/**
 * Get daily logs for user
 */
export const getDailyLogs = (email) => {
  return apiRequest(`/api/user/daily-logs/${email}`);
};

/**
 * Add daily log for user
 */
export const addDailyLog = (email, logData) => {
  return apiRequest(`/api/user/daily-log/${email}`, "POST", logData);
};
