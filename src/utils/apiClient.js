// src/utils/apiClient.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const getToken = () => localStorage.getItem("token");

export const apiClient = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(
    endpoint.startsWith("http")
      ? endpoint
      : `${API_BASE_URL.replace(/\/$/, "")}${endpoint}`,
    {
      headers,
      method: options.method || "GET",
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: options.credentials || "same-origin", // Add credentials handling
    }
  );

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

// --- RapidAPI headers ---
export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
  },
};

export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
  },
};