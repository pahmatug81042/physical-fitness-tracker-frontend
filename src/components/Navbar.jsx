import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav
            style={
                {
                    padding: 12,
                    borderBottom: "1px solid #eee",
                    display: "flex",
                    justifyContent: "space-between",
                }
            }
        >
            <div>
                <Link to="/" style={{ marginRight: 12 }}>Home</Link>
            </div>
            <div>
                {user ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <span style={{ marginRight: 12 }}>Hello, {user.name}</span>
                        <button>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ marginRight: 8 }}>Login</Link>
                        <Link to="/signup">Sign up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};