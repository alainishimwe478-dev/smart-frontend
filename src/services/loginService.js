/**
 * Login user using external backend
 * Expected response:
 * {
 *   token: "...",
 *   user: { id, full_name, email, role }
 * }
 */
export const loginService = async (email, password) => {
  if (email === "doctor@test.com" && password === "123456") {
    // Simulate successful login for doctor credentials
    const mockToken = "mock-doctor-token";
    const mockUser = { id: 1, full_name: "Doctor Test", email: "doctor@test.com", role: "doctor" };
    const mockRole = "doctor";

    localStorage.setItem("token", mockToken);
    localStorage.setItem("role", mockRole);
    localStorage.setItem("user", JSON.stringify(mockUser));

    return mockRole;
  } else {
    const res = await fetch("https://backend1-5xtu.onrender.com/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", accept: "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = body.detail || body.message || "Login failed";
      throw new Error(err);
    }

    const token = body.token;
    const user = body.user || {};
    const role = user.role || "user";

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(user));

    return role;
  }
};
