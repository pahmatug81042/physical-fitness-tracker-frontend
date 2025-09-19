// src/services/workoutService.js
import { apiClient } from "../utils/apiClient";

// Create a new workout
export const createWorkout = (payload) =>
  apiClient("/api/workouts", {
    method: "POST",
    body: payload,
  });

// Get all workouts for the logged-in user
export const getWorkouts = () => apiClient("/api/workouts");

// Get a single workout by its ID
export const getWorkoutById = (id) => apiClient(`/api/workouts/${id}`);

// Update a workout (title, date)
export const updateWorkout = (id, payload) =>
  apiClient(`/api/workouts/${id}`, {
    method: "PUT",
    body: payload,
  });

// Delete a workout
export const deleteWorkout = (id) =>
  apiClient(`/api/workouts/${id}`, { method: "DELETE" });

// Add an exercise to a workout
export const addExerciseToWorkout = (workoutId, exerciseData) =>
  apiClient(`/api/workouts/${workoutId}/exercises`, {
    method: "PUT",
    body: exerciseData,
  });

// Update an exercise in a workout
export const updateExerciseInWorkout = (workoutId, exerciseIndex, exerciseData) =>
  apiClient(`/api/workouts/${workoutId}/exercises/${exerciseIndex}`, {
    method: "PUT",
    body: exerciseData,
  });

// Delete an exercise from a workout
export const deleteExerciseFromWorkout = (workoutId, exerciseIndex) =>
  apiClient(`/api/workouts/${workoutId}/exercises/${exerciseIndex}`, {
    method: "DELETE",
});