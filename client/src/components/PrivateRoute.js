// src/components/PrivateRoute.js
import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("userData");
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated]);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login/admin" />;
};

export default PrivateRoute;
