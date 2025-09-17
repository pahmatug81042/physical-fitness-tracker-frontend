import React, { createContext, useEffect, useState } from "react";
import { getMe } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

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

    const login = (token, userData) => {
        localStorage.setItem("token", token);
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    );
};