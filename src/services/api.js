const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"; // replace with your backend URL

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  // Default headers
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    // "x-api-key": "YOUR_API_KEY_HERE", // replace with your actual API key if needed
  };

  // Merge default headers with any custom headers passed in options
  options.headers = {
    ...defaultHeaders,
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    // Auto logout if token expired
    if (response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `API request failed with status ${response.status}`
      );
    }

    // If response has content, parse as JSON, otherwise return empty object
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};
