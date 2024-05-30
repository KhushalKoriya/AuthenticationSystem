import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import EmailVerificationPage from "./components/EmailVerificationPage";
import Header from "./components/Header";
import RegistrationTabs from "./components/RegistrationTabs";
import { AuthProvider } from "./contexts/AuthContext";
import IsLoggedIn from "./components/IsloggedIn";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/register"
            element={
              <IsLoggedIn>
                <RegistrationTabs />
              </IsLoggedIn>
            }
          />
          <Route
            path="/login/admin"
            element={
              <IsLoggedIn>
                <AdminLogin />
              </IsLoggedIn>
            }
          />
          <Route
            path="/verify-email/:token"
            element={<EmailVerificationPage />}
          />

          <Route path="/admin/dashboard" element={<PrivateRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
