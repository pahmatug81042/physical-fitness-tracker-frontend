// WorkoutList.jsx
import React from "react";
import { deleteWorkout, deleteExerciseFromWorkout } from "../services/workoutService"; // Assuming you have the deleteExercise API

export default function WorkoutList({
  workouts,
  onWorkoutDeleted,
  onWorkoutEdit,
  onExerciseEdit,
}) {
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
      await deleteExerciseFromWorkout(workoutId, exerciseId); // Assuming this function exists in your service
      onWorkoutDeleted(); // trigger reload to refresh workout list
    } catch (err) {
      console.error("Failed to delete exercise", err);
    }
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
                  key={idx}
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
                      onClick={() => onExerciseEdit(workout._id, ex.exercise._id)}
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
            <button className="btn" onClick={() => handleDeleteWorkout(workout._id)}>
              ❌ Delete Workout
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
