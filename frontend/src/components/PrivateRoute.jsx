// src/components/PrivateRoute.jsx
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/auth/login" replace />;

  return children;
};

export default PrivateRoute;
