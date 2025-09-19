import React, { useState, useEffect } from "react";
import { createWorkout } from "../services/workoutService";

export default function WorkoutForm({ onWorkoutCreated }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await createWorkout({ title, date });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Failed to create workout");
    }
  };

  useEffect(() => {
    if (submitted) {
      onWorkoutCreated?.();
      setTitle("");
      setDate("");
      setSubmitted(false);
    }
  }, [submitted, onWorkoutCreated]);

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: 20,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 8,
        minWidth: 300,
        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
      }}
    >
      <h3>Create Workout</h3>
      <div style={{ marginBottom: 10 }}>
        <label>Workout Name: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Chest Day"
          required
          style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
        />
      </div>
      <button type="submit" style={{ marginRight: 8 }}>
        Create Workout
      </button>
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </form>
  );
}