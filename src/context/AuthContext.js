import React, { createContext, useEffect, useState } from "react";
import { getMe, login as loginService, register as registerService } from "../services/authService";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider wraps the app and provides auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // logged-in user state
  const [loadingAuth, setLoadingAuth] = useState(true); // loading state

  // Load user from backend if token exists
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

  // Run once on mount
  useEffect(() => {
    loadUser();
  }, []);

  // Login user: store token & set user state
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  // Register user: call backend, store token & set user state
  const registerUser = async (payload) => {
    try {
      const response = await registerService(payload);
      // Assuming the response returns user info + token
      const { token, ...userData } = response;
      localStorage.setItem("token", token);
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Registration failed:", error.message);
      throw error;
    }
  };

  // Logout user: remove token & reset user state
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, loadingAuth, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};