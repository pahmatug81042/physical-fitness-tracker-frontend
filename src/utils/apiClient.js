// src/api/apiClient.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://physical-fitness-trainer.onrender.com";

const getToken = () => localStorage.getItem("token");

/**
 * Universal API client for authenticated requests
 */
const apiClient = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const res = await fetch(`${API_BASE_URL.replace(/\/$/, "")}${endpoint}`, {
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
  } catch (err) {
    console.error("API request failed:", err);
    throw err;
  }
};

export default apiClient;