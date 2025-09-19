// src/utils/apiClient.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// Helper to get auth token
const getToken = () => localStorage.getItem("token");

/**
 * Generic API client for both internal API and third-party APIs (e.g., RapidAPI).
 * Supports Authorization token and dynamic headers.
 * 
 * @param {string} endpoint - API endpoint or full URL for external APIs.
 * @param {object} options - Fetch options including headers, method, body, etc.
 * @param {boolean} isExternal - Whether to bypass the base URL (for RapidAPI).
 * @returns {Promise<object|null>}
 */
const apiClient = async (endpoint, options = {}, isExternal = false) => {
  const token = getToken();

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token && !isExternal ? { Authorization: `Bearer ${token}` } : {}),
  };

  const url = isExternal ? endpoint : `${API_BASE_URL.replace(/\/$/, "")}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: defaultHeaders,
  });

  const contentType = res.headers.get("Content-Type");

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = errorData.message || `${res.status} ${res.statusText}`;
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }

  if (res.status === 204) return null;

  if (contentType && contentType.includes("application/json")) {
    return res.json().catch(() => null);
  }

  return null;
};

export default apiClient;