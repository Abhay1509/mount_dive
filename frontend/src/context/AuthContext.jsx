// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check localStorage for token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");
    if (token) {
      setUser(userData ? JSON.parse(userData) : { token });
    }
  }, []);

  const login = (token, userData = null) => {
    localStorage.setItem("token", token);
    if (userData) localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData || { token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easy use
export const useAuth = () => useContext(AuthContext);
