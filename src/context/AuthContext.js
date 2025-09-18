import React, { createContext, useEffect, useState } from "react";
import { getMe, login as loginService, register as registerService } from "../services/authService";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Logged-in user state
  const [loadingAuth, setLoadingAuth] = useState(true); // Loading state

  // Load user from backend if token exists
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoadingAuth(false);
        return;
      }
      try {
        const data = await getMe();
        setUser(data);
      } catch (error) {
        console.warn("Auth load failed:", error.message);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoadingAuth(false);
      }
    };
    loadUser();
  }, []);

  // Login user
  const login = async (payload) => {
    const response = await loginService(payload);
    const { token, ...userData } = response;
    localStorage.setItem("token", token);
    setUser(userData);
    return userData;
  };

  // Register user
  const registerUser = async (payload) => {
    const response = await registerService(payload);
    const { token, ...userData } = response;
    localStorage.setItem("token", token);
    setUser(userData);
    return userData;
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Return provider
  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, loadingAuth, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
