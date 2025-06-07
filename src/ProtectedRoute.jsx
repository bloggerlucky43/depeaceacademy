import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, pageloading } = useContext(AuthContext);

  // Wait for loading to complete before rendering anything
  if (pageloading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  console.log("ProtectedRoute user:", user);
  console.log("User role:", user?.role);
  console.log("Allowed roles:", allowedRoles);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
