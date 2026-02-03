import { Navigate } from "react-router-dom";

const DoctorRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (role !== "doctor") return <Navigate to="/unauthorized" />;

  return children;
};

export default DoctorRoute;
