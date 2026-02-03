import { apiRequest } from "./api";

/**
 * Login user (admin / doctor / user)
 */
export const loginService = async (email, password) => {
  const data = await apiRequest(
    "/api/login",
    "POST",
    { email, password },
    {} // no auth header needed
  );

  /**
   * Expected backend response:
   * {
   *   access_token: "...",
   *   refresh_token: "...",
   *   role: "admin"
   * }
   */

  localStorage.setItem("token", data.access_token);
  localStorage.setItem("refresh", data.refresh_token);
  localStorage.setItem("role", data.role);

  return data.role;
};
