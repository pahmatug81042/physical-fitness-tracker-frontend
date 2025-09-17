import React, { createContext, useEffect, useState } from "react";
import { getMe } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

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

    useEffect(() => {
        loadUser();
    }, []);

    // Login user: store token & set user state
    const login = (token, userData) => {
        localStorage.setItem("token", token);
        setUser(userData);
    };

    // Logout user: remove token & reset user state
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    );
};