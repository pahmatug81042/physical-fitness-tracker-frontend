// src/services/videoService.js
import { apiClient } from "../utils/apiClient";

export const fetchVideosForExercise = (exerciseName) =>
  apiClient(`/api/videos/${encodeURIComponent(exerciseName)}`);