import React, { useState } from "react";
import { createWorkout } from "../services/workoutService";

export default function WorkoutForm({ setWorkoutCreated }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createWorkout({ title, date });
      setWorkoutCreated(true);
      setTitle("");
      setDate(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
      });
    } catch (err) {
      setError(err.message || "Failed to create workout");
    } finally {
      setLoading(false);
    }
  };

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
          disabled={loading}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          disabled={loading}
        />
      </div>
      <button type="submit" disabled={loading} style={{ marginRight: 8 }}>
        {loading ? "Creating..." : "Create Workout"}
      </button>
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </form>
  );
}