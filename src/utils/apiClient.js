// src/apiClient.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const getToken = () => localStorage.getItem("token");

const apiClient = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const url = `${API_BASE_URL.replace(/\/$/, "")}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const res = await fetch(url, {
    headers,
    ...options,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = errorData.message || `${res.status} ${res.statusText}`;
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }

  if (res.status === 204) return null;
  return res.json().catch(() => null);
};

export default apiClient;