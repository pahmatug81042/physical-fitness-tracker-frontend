import React, { useState, useContext } from "react";
import { login as loginApi } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            navigate("/dashboard");
        } catch (err) {
            setError(err.message)
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                { error && <div style={{ color: "red" }}>{error}</div> }
                <button type="submit">Login</button>
            </form>
        </div>
    );
};