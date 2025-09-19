// WorkoutForm.jsx
import React, { useState, useEffect } from "react";
import { createWorkout, updateWorkout } from "../services/workoutService";

export default function WorkoutForm({
  setWorkoutCreated,
  editingWorkout,
  setEditingWorkout,
}) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Populate form in edit mode
  useEffect(() => {
    if (editingWorkout) {
      setTitle(editingWorkout.title || "");
      setDate(editingWorkout.date?.split("T")[0] || "");
    } else {
      setTitle("");
      setDate(new Date().toISOString().split("T")[0]);
    }
  }, [editingWorkout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (editingWorkout) {
        await updateWorkout(editingWorkout._id, { title, date });
        setEditingWorkout(null);
      } else {
        await createWorkout({ title, date });
      }

      setWorkoutCreated(true);
      setTitle("");
      setDate(new Date().toISOString().split("T")[0]);
    } catch (err) {
      setError(err.message || "Failed to save workout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card"
      style={{ maxWidth: 400, margin: "20px auto" }}
    >
      <h3>{editingWorkout ? "Edit Workout" : "Create Workout"}</h3>
      <div>
        <label>Workout Name:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary"
        style={{ marginTop: 12 }}
      >
        {loading
          ? editingWorkout
            ? "Saving..."
            : "Creating..."
          : editingWorkout
          ? "Update Workout"
          : "Create Workout"}
      </button>

      {editingWorkout && (
        <button
          type="button"
          className="btn"
          style={{ marginTop: 12, marginLeft: 8 }}
          onClick={() => setEditingWorkout(null)}
          disabled={loading}
        >
          Cancel
        </button>
      )}

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </form>
  );
}