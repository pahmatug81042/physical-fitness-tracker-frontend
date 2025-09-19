import { apiClient } from "../utils/apiClient";

export const fetchAllExercises = () => apiClient("/api/exercises");
export const fetchExerciseById = (id) => apiClient(`/api/exercises/${id}`);
export const fetchByBodyPart = (bodyPart) => apiClient(`/api/exercises/bodyPart/${encodeURIComponent(bodyPart)}`);
export const fetchByTarget = (target) => apiClient(`/api/exercises/target/${encodeURIComponent(target)}`);
export const fetchByEquipment = (equipment) => apiClient(`/api/exercises/equipment/${encodeURIComponent(equipment)}`);