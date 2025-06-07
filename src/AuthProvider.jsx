import { useEffect, createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const bApp = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [pageloading, setPageLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const publicRoutes = ["/login", "/forgot-password", "/reset-password"];

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await fetch(`${bApp}/api/auth/verify`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setPageLoading(false);
      }
    };

    verifySession();
  }, []); // <-- Run once on mount ONLY

  // Redirect to login only if not loading, no user, and not on a public route
  useEffect(() => {
    if (
      !pageloading &&
      !user &&
      !publicRoutes.some((route) => location.pathname.startsWith(route))
    ) {
      navigate("/login", { replace: true });
    }
  }, [pageloading, user, location.pathname, navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser, pageloading }}>
      {children}
    </AuthContext.Provider>
  );
};
