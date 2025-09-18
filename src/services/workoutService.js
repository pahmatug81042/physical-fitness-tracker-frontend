// src/services/workoutService.js
import apiClient from "../utils/apiClient";

/**
 * Get all workouts for the logged-in user
 */
export const getWorkouts = async () => {
  return apiClient("/api/workouts");
};

/**
 * Create a new workout
 * payload = { title: string, date: string }
 */
export const createWorkout = async (payload) => {
  return apiClient("/api/workouts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

/**
 * Add an exercise to a specific workout
 */
export const addExerciseToWorkout = async (workoutId, exerciseData) => {
  return apiClient(`/api/workouts/${workoutId}/exercises`, {
    method: "POST",
    body: JSON.stringify(exerciseData),
  });
};