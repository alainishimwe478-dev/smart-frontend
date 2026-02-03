import React from "react";
import { Navigate } from "react-router-dom";

// roleAllowed: string or array of roles allowed for this route
const ProtectedRoute = ({ children, roleAllowed }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // store role on login

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  // Check role if roleAllowed is specified
  if (roleAllowed && !roleAllowed.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
