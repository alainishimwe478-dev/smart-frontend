const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Generic API request handler
 */
export const apiRequest = async (
  endpoint,
  method = "GET",
  body = null,
  headers = {}
) => {
  const token = localStorage.getItem("token");

  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  // Auto logout if token expired
  if (response.status === 401) {
    localStorage.clear();
    window.location.href = "/login";
    return;
  }

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "API Error");
  }

  return response.json();
};
