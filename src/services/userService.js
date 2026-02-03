.import axios from "axios";

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
.import { apiRequest } from "./api";

/**
 * User signup
 */
export const signup = async (full_name, email, password) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://backend1-5xtu.onrender.com";

  try {
    const response = await fetch(`${API_BASE_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ full_name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Signup failed");
    }

    const data = await response.json();
    return data; // Contains user info or token
  } catch (error) {
    throw error;
  }
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
