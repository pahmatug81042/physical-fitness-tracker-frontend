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
    <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 400, margin: "20px auto" }}>
      <h3>Create Workout</h3>
      <div>
        <label>Workout Name:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Chest Day"
          required
          disabled={loading}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={loading}
        />
      </div>
      <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: 12 }}>
        {loading ? "Creating..." : "Create Workout"}
      </button>
      {error && <p style={{ color: "var(--btn-primary-bg)", marginTop: 10 }}>{error}</p>}
    </form>
  );
}