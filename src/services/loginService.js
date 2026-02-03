export const loginService = async (email, password) => {
  const response = await fetch("https://backend1-5xtu.onrender.com/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  const data = await response.json();

  // Store token and role for protected routes
  if (data.token) localStorage.setItem("token", data.token);
  if (data.role) localStorage.setItem("role", data.role);

  return data.role;
};
