    console.log("Register with:", name, email, password);
    // Simulate successful registration: persist token & role and navigate
    localStorage.setItem("token", "demo-token");
    localStorage.setItem("role", "user");
    navigate("/user");

    setError("");

    try {
      const response = await signup(name, email, password);
      console.log("API RESPONSE:", response);

      // Assuming response includes token and role
      localStorage.setItem("token", response.token || "demo-token");
      localStorage.setItem("role", response.role || "user");
      navigate("/login");
    } catch (err) {
      console.error("API ERROR:", err.response?.data || err.message);
      setError(
        err.detail ||
        err.message ||
        "Signup failed. Please check your details."
      );
    }

    setError("");

    try {
      const response = await signup(name, email, password);
      console.log("API RESPONSE:", response);

      // Assuming response includes token and role
      localStorage.setItem("token", response.token || "demo-token");
      localStorage.setItem("role", response.role || "user");
      navigate("/login");
    } catch (err) {
      console.error("API ERROR:", err.response?.data || err.message);
      setError(
        err.detail ||
        err.message ||
        "Signup failed. Please check your details."
      );
    }
=======
    console.log("Register with:", name, email, password);
    // Simulate successful registration: persist token & role and navigate
    localStorage.setItem("token", "demo-token");
    localStorage.setItem("role", "user");
    navigate("/user");f8986bba102d65bff37bf2f82ccb73b45546a85b
=======
    setError("");

    try {
      const response = await signup(name, email, password);
      console.log("API RESPONSE:", response);

      // Assuming response includes token and role
      localStorage.setItem("token", response.token || "demo-token");
      localStorage.setItem("role", response.role || "user");
      navigate("/login");
    } catch (err) {
      console.error("API ERROR:", err.response?.data || err.message);
      setError(
        err.detail ||
        err.message ||
        "Signup failed. Please check your details."
      );
    }
