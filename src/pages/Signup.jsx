import React, { useState, useContext } from "react";
import { register as registerApi } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerApi({ name, email, password });
            localStorage.setItem("token", data.token);
            login(data.token, {
                _id: user._id,
                name: data.name,
                email: data.email,
            });
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
};