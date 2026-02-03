
import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { loginService } from "../services/loginService";
import { useNavigate } from "react-router-dom";
import FloatingBubbles from "../components/FloatingBubbles";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showErrorMessage = (message) => {
    setError(message);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000); // auto hide after 3s
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const role = await loginService(email, password);
      if (role === "admin") navigate("/admin");
      else if (role === "doctor") navigate("/doctor");
      else if (role === "user") navigate("/user");
      else setError("Unknown role returned from server");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
    setLoading(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen
                    bg-gradient-to-r from-blue-100 via-purple-200 to-pink-200
                    bg-[length:400%_400%] animate-gradientMove overflow-hidden">

      {/* Floating Bubbles */}
      <FloatingBubbles />

      <form
        onSubmit={handleLogin}
        className="relative bg-white shadow-xl rounded-2xl p-8 sm:p-12 w-full max-w-md transform transition duration-500 hover:scale-105 animate-fadeUp z-10"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Login
        </h2>

        {showError && (
          <p
            className={`text-red-500 text-center mb-4 font-medium transform transition-all duration-500 ease-out
              ${showError ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
          >
            {error}
          </p>
        )}

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div className="mb-6 relative">
          <label className="block mb-2 font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition pr-10"
          />
          <div
            className="absolute right-3 top-3.5 cursor-pointer text-gray-500 transition-all duration-300 ease-in-out transform hover:scale-110"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-lg flex justify-center items-center gap-3 transition hover:bg-blue-800 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading && (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-700 hover:underline font-medium">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
