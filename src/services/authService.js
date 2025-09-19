// src/services/authService.js
import { apiClient } from "../utils/apiClient";

export const register = (payload) =>
  apiClient("/api/auth/register", {
    method: "POST",
    body: payload, // pass plain object, not stringified
    credentials: "include", // include cookies if backend uses sessions
  });

export const login = (payload) =>
  apiClient("/api/auth/login", {
    method: "POST",
    body: payload, // pass plain object, not stringified
    credentials: "include",
  });

export const getMe = () =>
  apiClient("/api/auth/me", {
    credentials: "include",
  });