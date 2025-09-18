// src/services/workoutService.js
import apiClient from "../api/apiClient";

/**
 * Get all workouts for the logged-in user
 */
export const getWorkouts = async () => {
    return apiClient("/api/workouts");
};

/**
 * Create a new workout
 * @param {Object} payload - { title, date }
 */
export const createWorkout = async (payload) => {
    return apiClient("/api/workouts", {
        method: "POST",
        body: JSON.stringify(payload),
    });
};

/**
 * Add an exercise to a workout
 * @param {string} workoutId 
 * @param {Object} exercise - { exerciseId, sets, reps, duration }
 */
export const addExerciseToWorkout = async (workoutId, exercise) => {
    return apiClient(`/api/workouts/${workoutId}/add-exercise`, {
        method: "POST",
        body: JSON.stringify(exercise),
    });
};