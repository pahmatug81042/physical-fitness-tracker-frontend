import apiClient from "../utils/apiClient";

export const createWorkout = (payload) => 
    apiClient("/api/workouts", { method: "POST", body: JSON.stringify(payload) });

export const getWorkouts = () => apiClient("/api/workouts");

export const getWorkoutById = (id) => apiClient(`/api/workouts/${id}`);

export const addExerciseToWorkout = (workoutId, payload) => 
    apiClient(`/api/workouts/${workoutId}/exercises`, { method: "POST", body: JSON.stringify(payload) });

export const deleteWorkout = (id) => apiClient(`/api/workouts/${id}`, { method: "DELETE" });