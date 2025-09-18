// src/services/workoutService.js
import apiClient from "../utils/apiClient";

export const createWorkout = (payload) =>
  apiClient("/workouts", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getWorkouts = () => apiClient("/workouts");

export const getWorkoutById = (id) => apiClient(`/workouts/${id}`);

export const updateWorkout = (id, payload) =>
  apiClient(`/workouts/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const deleteWorkout = (id) =>
  apiClient(`/workouts/${id}`, { method: "DELETE" });

export const addExerciseToWorkout = (workoutId, exerciseData) =>
  updateWorkout(workoutId, { exercises: [exerciseData] });
