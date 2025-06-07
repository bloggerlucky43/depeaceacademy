import { useEffect, createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const bApp = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage if available
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
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
          localStorage.setItem("user", JSON.stringify(data.user));  // persist user
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      } catch (error) {
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setPageLoading(false);
      }
    };

    if (!user) {
      // Only verify if no user in localStorage
      verifySession();
    } else {
      // We already have a user from localStorage, so loading done
      setPageLoading(false);
    }
  }, []);

  useEffect(() => {
    if (
      !pageloading &&
      !user &&
      !publicRoutes.some((route) => location.pathname.startsWith(route))
    ) {
      navigate("/login", { replace: true });
    }
  }, [pageloading, user, location.pathname, navigate]);

  // Save user to localStorage when user state changes (login/logout)
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, pageloading }}>
      {children}
    </AuthContext.Provider>
  );
};
