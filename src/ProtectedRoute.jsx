import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; //Show loading while verifying
  }

  if (!user) {
    return <Navigate to="/login" replace />; // Not logged in,go to login
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />; //USer role not allowed,go to login
  }

  return children; //user is logged in and has allowed role,show page content
};

export default ProtectedRoute;
