import { useEffect } from "react";
import { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const bApp = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store user details here
  const [loading, setLoading] = useState(true); // Loading state while we check cookie
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await fetch(`${bApp}/api/auth/verify`, {
          method: "GET",
          credentials: "include", // send cookies with request
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
          // ✅ Only redirect if user is on a protected route
          const publicRoutes = [
            "/login",
            "/forgot-password",
            "/reset-password",
          ];
          if (!publicRoutes.includes(location.pathname)) {
            navigate("/login");
          }
        }
      } catch (error) {
        setUser(null);
        const publicRoutes = ["/login", "/forgot-password", "/reset-password"];
        if (!publicRoutes.includes(location.pathname)) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [navigate, location.pathname]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
