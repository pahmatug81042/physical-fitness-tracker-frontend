import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav
            style={{
                padding: 12,
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
            }}
        >
            <div>
                <Link to="/" style={{ marginRight: 12 }}>Home</Link>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {user && user.name ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <span>Hello, {user.name}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ marginRight: 8 }}>Login</Link>
                        <Link to="/signup">Sign up</Link>
                    </>
                )}
                {/* Theme toggle button */}
                <ThemeToggleButton />
            </div>
        </nav>
    );
};