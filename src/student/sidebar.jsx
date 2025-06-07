import { Link, useNavigate } from "react-router-dom";

const bApp = import.meta.env.VITE_API_URL;
const Sidebar = () => {
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
        loading="lazy"
      />
      <ul className="nav flex-column text-center mt-5 ">
        <li className="nav-item  mb-2">
          <Link to="/student/dashboard" className="nav-link text-white">
            Dashboard
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/student/profile" className="nav-link text-white">
            Profile
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/student/results" className="nav-link text-white">
            Result
          </Link>{" "}
        </li>
        <li className="nav-item mb-2">
          <Link to="/student/receipt" className="nav-link text-white">
            Fee & Receipt
          </Link>{" "}
        </li>
        <li className="nav-item mb-2">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
