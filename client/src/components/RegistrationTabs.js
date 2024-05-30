import React, { useState } from "react";
import "./RegistrationTabs.css";
import RegistrationForm from "../pages/RegistrationForm";

const RegistrationTabs = () => {
  const [activeTab, setActiveTab] = useState("customer");

  return (
    <div>
      <div className="tabs">
        <button
          onClick={() => setActiveTab("customer")}
          className={activeTab === "customer" ? "active" : ""}
        >
          Customer Registration
        </button>
        <button
          onClick={() => setActiveTab("admin")}
          className={activeTab === "admin" ? "active" : ""}
        >
          Admin Registration
        </button>
      </div>
      <div className="tab-content">
        <RegistrationForm userType={activeTab} />
      </div>
    </div>
  );
};

export default RegistrationTabs;
