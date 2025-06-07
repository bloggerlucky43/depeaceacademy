import { useState } from "react";
import Sidebar from "./sidebar";
import { Link, useNavigate } from "react-router-dom";

const bApp = import.meta.env.VITE_API_URL;
const Profile = () => {
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
  console.log(userInfo);
  const userClass = userInfo?.class;
  // const term=userInfo?.term;
  const identityNumber = userInfo?.identitynumber;
  // const currentSession=userInfo?.session;
  const userName = userInfo?.name;
  const userGender = userInfo?.gender;
  const dateOfBirth = userInfo?.dateofbirth;
  const guardiancontact = userInfo?.contact;
  const contactAddress = userInfo?.address;
  const userEmail = userInfo?.email;

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
                    Result
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

          <div className="container my-5 ">
            <div className="card shadow bg-shadow  ">
              <div className="card-header bg-card text-white">
                <h4 className="mb-0">Student Profile Information</h4>
              </div>
              <div className="card-body">
                <div className="row g-4">
                  {/* <Student Image */}
                  {/* <div className="col-md-4 text-center">
                    <img
                      src="/myprofile.jpg"
                      alt="Student Passport"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      className="img-fluid rounded-circle border border-2"
                    />
                  </div> */}

                  {/* Profile Table  */}
                  <div className="col-md-8">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <th scope="row">Full Name</th>
                          <td>{userName}</td>
                        </tr>
                        <tr>
                          <th scope="row">Admission Number</th>
                          <td>{identityNumber}</td>
                        </tr>
                        <tr>
                          <th scope="row">Gender</th>
                          <td>{userGender}</td>
                        </tr>
                        <tr>
                          <th scope="row">Date of Birth</th>
                          <td>{dateOfBirth}</td>
                        </tr>

                        <tr>
                          <th scope="row">Class</th>
                          <td>{userClass}</td>
                        </tr>

                        <tr>
                          <th scope="row">Email Address</th>
                          <td>{userEmail}</td>
                        </tr>
                        <tr>
                          <th scope="row">Phone Number</th>
                          <td>{guardiancontact}</td>
                        </tr>
                        <tr>
                          <th scope="row">Address</th>
                          <td>{contactAddress}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
