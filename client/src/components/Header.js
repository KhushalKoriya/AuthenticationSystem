import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const currentLocation = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
  };

  const isVerifyEmailRoute = () => {
    return currentLocation.pathname.startsWith("/verify-email");
  };
  useEffect(() => {
    if (isAuthenticated && currentLocation.pathname === "/") {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, currentLocation, navigate]);
  return (
    <header>
      <nav>
        <ul>
          {!isVerifyEmailRoute() && (
            <>
              {isAuthenticated ? (
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                  <li>
                    <Link to="/login/admin">Login</Link>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
