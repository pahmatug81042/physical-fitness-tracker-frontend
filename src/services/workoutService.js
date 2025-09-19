// src/services/workoutService.js
import { apiClient } from "../utils/apiClient";

export const createWorkout = (payload) =>
  apiClient("/api/workouts", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getWorkouts = () => apiClient("/api/workouts");

export const getWorkoutById = (id) => apiClient(`/api/workouts/${id}`);

export const updateWorkout = (id, payload) =>
  apiClient(`/api/workouts/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const deleteWorkout = (id) =>
  apiClient(`/api/workouts/${id}`, { method: "DELETE" });

// ✅ Correctly add exercise to workout via backend endpoint
export const addExerciseToWorkout = (workoutId, exerciseData) =>
  apiClient(`/api/workouts/${workoutId}/exercises`, {
    method: "PUT",
    body: JSON.stringify(exerciseData),
});