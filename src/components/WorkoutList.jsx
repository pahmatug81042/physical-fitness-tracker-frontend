import React from "react";

export default function WorkoutList({ workouts }) {
  if (!workouts || workouts.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Your Workouts</h2>
        <p>No workouts yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Workouts</h2>
      {workouts.map((workout) => (
        <div
          key={workout._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 12,
            marginBottom: 12,
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3>{workout.title}</h3>
          <p>
            Date:{" "}
            {workout.date
              ? new Date(workout.date).toLocaleDateString()
              : "No date set"}
          </p>
          <div>
            {workout.exercise && workout.exercise.length > 0 ? (
              workout.exercise.map((ex, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 6,
                    borderBottom: "1px solid #eee",
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
        </div>
      ))}
    </div>
  );
}