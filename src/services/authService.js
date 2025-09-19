import { apiClient } from "../utils/apiClient";

export const register = (payload) => apiClient("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
});

export const login = (payload) => apiClient("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
});

export const getMe = () => apiClient("/api/auth/me");