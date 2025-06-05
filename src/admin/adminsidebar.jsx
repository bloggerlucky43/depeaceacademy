import { Link, useNavigate } from "react-router-dom";

const bApp = import.meta.env.VITE_API_URL;
const AdminSideBar = () => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

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

  return (
    <div className="d-none d-sm-block d-flex flex-column p-3 text-white custom-nav align-items-center">
      <img
        src="/DE.png"
        alt="schoollogo"
        className="rounded mx-auto d-block custom-logo"
      />
      <ul className="nav flex-column text-center mt-5 ">
        <li className="nav-item  mb-3">
          <Link to="/admin_dashboard" className="nav-link text-white">
            Dashboard
          </Link>
        </li>
        <li className="nav-item mb-3">
          <div className="dropdown">
            <Link
              className="new-btn dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              Student Management
            </Link>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <Link className="dropdown-item" to="/admin/addNewStudent">
                  Add New Student
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/admin/users">
                  View Students
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item mb-3">
          <div className="dropdown">
            <Link
              className="new-btn dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              Teacher Management
            </Link>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <Link className="dropdown-item" to="/admin/addNewTeacher">
                  Add New Teacher
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/admin/teachers">
                  View Teachers
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="nav-item mb-3">
          <div className="dropdown">
            <Link
              className="new-btn dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              Academics Management
            </Link>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <Link
                  className="dropdown-item"
                  to="/admin/academics/pendingresults">
                  View Uploaded Results
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="nav-item mb-3">
          <div className="dropdown">
            <Link
              className="new-btn dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              Finance
            </Link>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <Link className="dropdown-item" to="/admin/academics/receipts">
                  Payment History
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideBar;
