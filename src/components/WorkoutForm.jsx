// src/components/WorkoutForm.jsx
import React, { useState } from "react";
import apiClient from "../utils/apiClient";

export default function WorkoutForm({ onWorkoutCreated }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { title, date };
      const workout = await apiClient("/workouts", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      onWorkoutCreated?.(workout);
      setTitle("");
      setDate("");
    } catch (error) {
      console.error("Failed to create workout:", error);
      alert("Failed to create workout: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Create Workout</h3>
      <div>
        <label>Workout Name: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Chest Day"
          required
        />
      </div>
      <div>
        <label>Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button type="submit">Create Workout</button>
    </form>
  );
}