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
            const data = await loginApi({ email, password });
            // backend returns token and user info: adjust if different
            localStorage.setItem("token", data.token);
            login(data.token, {
                _id: data._id,
                name: data.name,
                email: data.email,
            });
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
                    <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                { error && <div style={{ color: "red" }}>{error}</div> }
                <button type="submit">Login</button>
            </form>
        </div>
    );
};