/**
 * Register a new user using external backend
 * Expected request body:
 * {
 *   full_name: "...",
 *   email: "...",
 *   password: "...",
 *   role: "user" | "doctor" | "admin"
 * }
 * Expected response:
 * {
 *   message: "User registered successfully",
 *   user: { id, full_name, email, role }
 * }
 */
export const registerService = async (fullName, email, password, role) => {
  const res = await fetch("https://backend1-5xtu.onrender.com/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      full_name: fullName,
      email,
      password,
      role: role.toLowerCase(), // Ensure role is lowercase
    }),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = body.detail || body.message || "Registration failed";
    throw new Error(err);
  }

  return body;
};
