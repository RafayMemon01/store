// Components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../Store/useAuthStore"; // Import Zustand store

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedRoute;
