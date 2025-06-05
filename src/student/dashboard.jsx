import React, { useState } from "react";
import Sidebar from "./sidebar"; // Assuming Sidebar is another component
import Card from "./card";
import { Link, useNavigate } from "react-router-dom";

const bApp = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  // State to toggle sidebar visibility
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const handleSideBar = (e) => {
    e.preventDefault();
    setSidebarVisible(!sidebarVisible); // Toggle sidebar visibility
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${bApp}/api/auth/logout`, {
        method: "POST",
        credentials: "include", // sends the cookie
      });

      if (response.ok) {
        alert("Logged out successfully");
        localStorage.removeItem("userInfo");
        navigate("/login");
      } else {
        const data = await response.json();
        alert(data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout");
    }
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userClass = userInfo?.class;
  const term = userInfo?.term;
  const identityNumber = userInfo?.identitynumber;
  const currentSession = userInfo?.session;
  const userName = userInfo?.name;

  return (
    <>
      <div className="d-flex topdiv vh-100">
        {/* Sidebar - Toggled visibility */}
        {sidebarVisible && <Sidebar />}

        <div className="flex-grow-1">
          {/* Top Bar */}
          <div className="custom-topbar d-flex justify-content-between align-items-center py-2 px-3 shadow-sm">
            <div className="d-flex ">
              <button
                className="btn ms-3 me-3 click-custom"
                onClick={handleSideBar}>
                {sidebarVisible ? (
                  <i className="fa fa-times" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-bars" aria-hidden="true"></i>
                )}
              </button>
              <div className="d-flex flex-column ">
                <h3 className="m-0">Welcome {userName}</h3>
                <p>{new Date().toDateString()}</p>
              </div>
            </div>
          </div>

          {sidebarVisible && (
            <div className="d-block d-sm-none custom-brown p-3">
              <ul className="nav flex-column text-center">
                <li className="nav-item mb-2">
                  <Link to="/student/dashboard" className="nav-link text-nav">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/student/profile" className="nav-link text-nav">
                    Profile
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/student/results" className="nav-link text-nav">
                    View Result
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/student/payment" className="nav-link text-nav">
                    Pay School Fee
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/student/receipt" className="nav-link text-nav">
                    View Receipt
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <button onClick={handleLogout} className="sm-logout-btn">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

          <div className="content p-4 text-custom-darkbrown custom-content">
            <div className="justify-content-center">
              <h1 className="text-center fs-2 mt-3">{userName}</h1>
              <p className="text-center">Identity Number: {identityNumber}</p>
              <h2 className="text-center fs-5">Class: {userClass}</h2>
              <h3 className="text-center fs-5">
                Current Session: {currentSession} Academic Session
              </h3>
              <h3 className="text-center mb-5 fs-5">Current Term: {term}</h3>
            </div>
            <Card />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
