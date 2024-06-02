import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ component: Component, ...props }) => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? (
    <Component {...props} />
  ) : (
    <Navigate replace to="/login" />
  );
};
