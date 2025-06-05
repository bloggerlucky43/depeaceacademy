import { useState } from "react";
import { Link } from "react-router-dom";
import TeacherSidebar from "./sidebar";

const bApp = import.meta.env.VITE_API_URL;
const TeacherSetting = () => {
  // State to toggle sidebar visibility
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSideBar = (e) => {
    e.preventDefault();
    setSidebarVisible(!sidebarVisible); // Toggle sidebar visibility
  };

  return (
    <>
      <div className="d-flex topdiv vh-100">
        {/* TeacherSidebar - Toggled visibility */}
        {sidebarVisible && <TeacherSidebar />}

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
                <h3 className="m-0">Welcome John Doe Mushin</h3>
                <p>{new Date().toLocaleDateString}</p>
              </div>
            </div>
            <button className="btn btn-outline-danger me-xl-5">Log out</button>
          </div>

          {sidebarVisible && (
            <div className="d-block d-sm-none custom-brown p-3">
              <ul className="nav flex-column text-center">
                <li className="nav-item mb-2">
                  <Link to="/teacher/dashboard" className="nav-link text-nav">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/teacher/profile" className="nav-link text-nav">
                    Profile
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/teacher/" className="nav-link text-nav">
                    Result
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/teacher/settings" className="nav-link text-nav">
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
          )}
          <div className="container my-5">
            <div className="card shadow-lg bg-shadow">
              <div className="card-header bg-card text-white">
                <h4 className="mb-0">Profile Settings</h4>
              </div>

              <div className="card-body">
                <form>
                  <div className="row mb-3">
                    <div className="col-md-3 text-center">
                      <img
                        src="/student_12935609.png"
                        className="rounded-circle img-thumbnail mb-2"
                        alt="Profile Picture"
                      />
                    </div>

                    <div className="col-md-9">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Full Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value="Mr. John Doe"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value="johndoe@school.edu.ng"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Phone Number</label>
                          <input
                            type="text"
                            className="form-control"
                            value="+234 801 234 5678"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Gender</label>
                          <select className="form-select">
                            <option selected>Male</option>
                            <option>Female</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Department</label>
                          <input
                            type="text"
                            className="form-control"
                            value="Mathematics"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">
                            Subjects Assigned
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value="Mathematics, Further Mathematics"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Qualifications</label>
                          <input
                            type="text"
                            className="form-control"
                            value="B.Sc (Ed) Mathematics"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            value="No 12, Akintola Street, Lagos"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Change Password"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-end">
                    <button type="submit" className="btn btn-success">
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherSetting;
