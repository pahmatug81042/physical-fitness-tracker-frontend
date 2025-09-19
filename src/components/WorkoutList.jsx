// src/components/WorkoutList.jsx
import React, { useState } from "react";
import {
  deleteWorkout,
  deleteExerciseFromWorkout,
  updateExerciseInWorkout,
} from "../services/workoutService"; // Assuming you have the deleteExercise API

export default function WorkoutList({
  workouts,
  onWorkoutDeleted,
  onWorkoutEdit,
  onExerciseEdit,
}) {
  const [editingExercise, setEditingExercise] = useState(null);
  const [exerciseFormData, setExerciseFormData] = useState({
    sets: "",
    reps: "",
    duration: "",
  });

  if (!workouts || workouts.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Your Workouts</h2>
        <p>No workouts yet. Create one to get started!</p>
      </div>
    );
  }

  const handleDeleteWorkout = async (id) => {
    if (!window.confirm("Are you sure you want to delete this workout?")) return;
    try {
      await deleteWorkout(id);
      onWorkoutDeleted(); // trigger reload
    } catch (err) {
      console.error("Failed to delete workout", err);
    }
  };

  const handleDeleteExercise = async (workoutId, exerciseId) => {
    if (!window.confirm("Are you sure you want to delete this exercise from the workout?")) return;
    try {
      await deleteExerciseFromWorkout(workoutId, exerciseId);
      onWorkoutDeleted(); // trigger reload to refresh workout list
    } catch (err) {
      console.error("Failed to delete exercise", err);
    }
  };

  const handleExerciseEdit = (workoutId, exerciseId, exerciseData) => {
    // Open the form to edit exercise
    setEditingExercise({ workoutId, exerciseId });
    setExerciseFormData({
      sets: exerciseData.sets || "",
      reps: exerciseData.reps || "",
      duration: exerciseData.duration || "",
    });
  };

  const handleExerciseFormSubmit = async (e) => {
    e.preventDefault();
    const { workoutId, exerciseId } = editingExercise;
    const updatedData = {
      sets: exerciseFormData.sets,
      reps: exerciseFormData.reps,
      duration: exerciseFormData.duration,
    };

    try {
      await updateExerciseInWorkout(workoutId, exerciseId, updatedData);
      setEditingExercise(null);
      setExerciseFormData({ sets: "", reps: "", duration: "" });
      onWorkoutDeleted(); // Refresh the list after update
    } catch (err) {
      console.error("Failed to update exercise", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExerciseFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Workouts</h2>
      {workouts.map((workout) => (
        <div key={workout._id} className="card" style={{ marginBottom: 16 }}>
          <h3>{workout.title}</h3>
          <p>
            Date:{" "}
            {workout.date
              ? new Date(workout.date).toLocaleDateString()
              : "No date set"}
          </p>

          <div style={{ marginBottom: 10 }}>
            {workout.exercise && workout.exercise.length > 0 ? (
              workout.exercise.map((ex, idx) => (
                <div
                  key={ex.exercise._id} // Use the exercise's unique ID
                  style={{
                    padding: 6,
                    borderBottom: "1px solid var(--input-border)",
                    fontSize: 14,
                  }}
                >
                  <strong>{ex.exercise?.name || "Unnamed Exercise"}</strong> | Sets:{" "}
                  {ex.sets ?? 0} | Reps: {ex.reps ?? 0} | Duration:{" "}
                  {ex.duration ?? 0} min

                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button
                      className="btn"
                      onClick={() =>
                        handleExerciseEdit(workout._id, ex.exercise._id, ex)
                      }
                    >
                      ✏️ Edit Exercise
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleDeleteExercise(workout._id, ex.exercise._id)}
                    >
                      ❌ Delete Exercise
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ fontStyle: "italic", fontSize: 14 }}>
                No exercises added yet.
              </p>
            )}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={() => onWorkoutEdit(workout)}>
              ✏️ Edit Workout
            </button>
            <button
              className="btn"
              onClick={() => handleDeleteWorkout(workout._id)}
            >
              ❌ Delete Workout
            </button>
          </div>
        </div>
      ))}

      {/* Exercise Edit Form (Modal or inline form) */}
      {editingExercise && (
        <div style={{ padding: 20, border: "1px solid #ccc", marginTop: 20 }}>
          <h3>Edit Exercise</h3>
          <form onSubmit={handleExerciseFormSubmit}>
            <div>
              <label htmlFor="sets">Sets:</label>
              <input
                type="number"
                id="sets"
                name="sets"
                value={exerciseFormData.sets}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="reps">Reps:</label>
              <input
                type="number"
                id="reps"
                name="reps"
                value={exerciseFormData.reps}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="duration">Duration (min):</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={exerciseFormData.duration}
                onChange={handleInputChange}
                required
              />
            </div>

            <div style={{ marginTop: 10 }}>
              <button type="submit" className="btn">
                Save Changes
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => setEditingExercise(null)} // Cancel editing
                style={{ marginLeft: 10 }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}