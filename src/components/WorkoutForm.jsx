// src/components/WorkoutForm.jsx
import React, { useState } from "react";
import { createWorkout } from "../services/workoutService";

export default function WorkoutForm({ onWorkoutCreated }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert("Please enter a workout name");

    try {
      const payload = { title, date };
      const workout = await createWorkout(payload);
      if (onWorkoutCreated) onWorkoutCreated(workout);
      setTitle("");
      setDate("");
      alert("Workout created successfully!");
    } catch (error) {
      console.error("Failed to create workout:", error);
      alert(`Failed to create workout: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Create Workout</h3>
      <div style={{ marginBottom: 8 }}>
        <label>Workout Name: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Chest Day"
          required
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create Workout
      </button>
    </form>
  );
}