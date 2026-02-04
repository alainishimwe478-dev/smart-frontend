import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { loginService } from "../services/loginService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Auto-redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/user");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

      navigate("/user");
=======
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
>>>>>>> f8986bba102d65bff37bf2f82ccb73b45546a85b
    }
  }, [navigate]);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
<<<<<<< HEAD
      const response = await fetch(
        "https://backend1-5xtu.onrender.com/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Login failed. Please try again.");
        setLoading(false);
        return;
      }

      // Save token and user info in localStorage
      localStorage.setItem("token", data.access_token || "demo-token");
      localStorage.setItem("role", data.role || "user");
      localStorage.setItem("email", email);

      // Redirect to user dashboard
      navigate("/userdashboard");
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again later.");
      setLoading(false);
=======
      const role = await loginService(email, password);
      setSuccessMessage("Login successful");
      setLoading(false);
      // short delay so user sees success briefly
      setTimeout(() => {
        if (role === "admin") navigate("/admin");
        else if (role === "doctor") navigate("/doctor");
        else navigate("/user");
      }, 500);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Login failed. Please check your credentials.");
>>>>>>> f8986bba102d65bff37bf2f82ccb73b45546a85b
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <FaLungs className="text-blue-600 text-4xl mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">
            Asthma Care System
          </h1>
          <p className="text-gray-500 text-sm">
            Login to manage your asthma health
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <div className="flex items-center border rounded px-3 py-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="user@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none"
            />
=======
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 animate-fadeIn">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-2xl p-8 sm:p-12 w-full max-w-md transform transition duration-500 hover:scale-105"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium animate-pulse">
            {error}
          </p>
        )}

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded mb-4 text-center">
            {successMessage}
          </div>
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
            className="absolute right-3 top-10 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
>>>>>>> f8986bba102d65bff37bf2f82ccb73b45546a85b
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Password</label>
          <div className="flex items-center border rounded px-3 py-2">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
<<<<<<< HEAD
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
=======
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-700 text-white py-3 rounded-lg transition font-semibold shadow-lg ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Signing in...
            </span>
          ) : (
            "Login"
          )}
>>>>>>> f8986bba102d65bff37bf2f82ccb73b45546a85b
        </button>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-4">
          Forgot password? Contact admin
        </p>
      </div>
    </div>
  );
}
