import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const TeacherSidebar = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${bApp}/api/auth/logout`, {
        method: "POST",
        credentials: "include", // sends the cookie
      });

      if (response.ok) {
        alert("Logged out successfully");
        setUser(null);
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
        loading="lazy"
      />
      <ul className="nav flex-column text-center mt-5 ">
        <li className="nav-item  mb-2">
          <Link to="/teacher/dashboard" className="nav-link text-white">
            Dashboard
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/teacher/edit/results" className="nav-link text-white">
            Edit Result
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/teacher/results" className="nav-link text-white">
            Upload Result
          </Link>{" "}
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

export default TeacherSidebar;
