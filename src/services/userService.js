import { apiRequest } from "./api";

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
