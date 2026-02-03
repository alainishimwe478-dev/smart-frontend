import { apiRequest } from "./api";

/**
 * Get all users
 */
export const getAllUsers = () => {
  return apiRequest("/api/admin/users");
};

/**
 * Create doctor account
 */
export const createDoctor = (doctorData) => {
  return apiRequest("/api/admin/create-doctor", "POST", doctorData);
};

/**
 * Assign patient to doctor
 */
export const assignPatient = (assignmentData) => {
  return apiRequest("/api/admin/assign-patient", "POST", assignmentData);
};

/**
 * Add user account
 */
export const addUser = (userData) => {
  return apiRequest("/api/admin/create-user", "POST", userData);
};

/**
 * Add doctor account
 */
export const addDoctor = (doctorData) => {
  return apiRequest("/api/admin/create-doctor", "POST", doctorData);
};

/**
 * Add patient account
 */
export const addPatient = (patientData) => {
  return apiRequest("/api/admin/create-patient", "POST", patientData);
};
