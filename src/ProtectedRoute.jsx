import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore.js";

const ProtectedRoute = ({ element: Component }) => {
  const { authUser } = useAuthStore();

  if (!authUser) {
    // If user is not authenticated, redirect to login
    return <Navigate to="/" />;
  }

  // If authenticated, render the component
  return Component;
};

export default ProtectedRoute;
