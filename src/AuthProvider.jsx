import { useEffect, createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const bApp = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
          if (!publicRoutes.some((route) => location.pathname.startsWith(route))) {
            navigate("/login");
          }
        }
      } catch (error) {
        setUser(null);
        if (!publicRoutes.some((route) => location.pathname.startsWith(route))) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [navigate, location.pathname]);

  useEffect(() => {
  if (!loading && !user && !publicRoutes.some(route => location.pathname.startsWith(route))) {
    navigate("/login");
  }
}, [loading, user, location.pathname, navigate]);
  
  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
