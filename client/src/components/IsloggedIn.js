import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const IsLoggedIn = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return <>{!isAuthenticated && children}</>;
};

export default IsLoggedIn;
