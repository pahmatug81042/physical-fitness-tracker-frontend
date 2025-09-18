// src/services/workoutService.js
import apiClient from "..//utils/apiClient";

/**
 * Fetch all workouts for the logged-in user
 */
export const getWorkouts = async () => {
  return apiClient("/workouts");
};

/**
 * Create a new workout
 * @param {Object} payload { title, date }
 */
export const createWorkout = async (payload) => {
  return apiClient("/workouts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

/**
 * Add an exercise to an existing workout
 * @param {string} workoutId - ID of the workout
 * @param {Object} payload - { exerciseId, sets, reps, duration }
 */
export const addExerciseToWorkout = async (workoutId, payload) => {
  return apiClient(`/workouts/${workoutId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

/**
 * Get a single workout by ID
 * @param {string} workoutId
 */
export const getWorkoutById = async (workoutId) => {
  return apiClient(`/workouts/${workoutId}`);
};

/**
 * Delete a workout by ID
 * @param {string} workoutId
 */
export const deleteWorkout = async (workoutId) => {
  return apiClient(`/workouts/${workoutId}`, {
    method: "DELETE",
  });
};