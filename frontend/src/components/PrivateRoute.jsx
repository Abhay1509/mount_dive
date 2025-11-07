// src/components/PrivateRoute.jsx
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  // Wait for user info to load
  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  // Redirect if not logged in
  if (!user) return <Navigate to="/auth/login" replace />;

  // Redirect if route requires admin and user isn't one
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/landing" replace />;
  }

  // Otherwise, render the protected content
  return children;
};

export default PrivateRoute;
