import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("userInfo");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [pageloading, setPageLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/verify`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (res.ok) {
          // If token is valid, keep user from localStorage
          const storedUser = localStorage.getItem("userInfo");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        } else {
          // Invalid token
          setUser(null);
          localStorage.removeItem("userInfo");
        }
      } catch (error) {
        console.error("Auth verify error:", error);
        setUser(null);
        localStorage.removeItem("userInfo");
      } finally {
        setPageLoading(false);
      }
    };

    verifySession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, pageloading }}>
      {children}
    </AuthContext.Provider>
  );
};
