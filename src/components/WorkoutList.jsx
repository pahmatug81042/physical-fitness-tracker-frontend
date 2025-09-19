// WorkoutList.jsx
import React from "react";
import { deleteWorkout } from "../services/workoutService";

export default function WorkoutList({
  workouts,
  onWorkoutDeleted,
  onWorkoutEdit,
}) {
  if (!workouts || workouts.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Your Workouts</h2>
        <p>No workouts yet. Create one to get started!</p>
      </div>
    );
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this workout?")) return;
    try {
      await deleteWorkout(id);
      onWorkoutDeleted(); // trigger reload
    } catch (err) {
      console.error("Failed to delete workout", err);
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
                  {ex.sets ?? 0} | Reps: {ex.reps ?? 0} | Duration: {ex.duration ?? 0}{" "}
                  min
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
              ✏️ Edit
            </button>
            <button className="btn" onClick={() => handleDelete(workout._id)}>
              ❌ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}