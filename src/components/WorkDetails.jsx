// WorkoutDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
} from "../services/workoutService";

export default function WorkoutDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchWorkout() {
      try {
        setLoading(true);
        const data = await getWorkoutById(id);
        setWorkout(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load workout");
      } finally {
        setLoading(false);
      }
    }
    fetchWorkout();
  }, [id]);

  // Handle updating exercise fields in workout locally
  const handleExerciseChange = (index, field, value) => {
    setWorkout((prev) => {
      const updated = { ...prev };
      if (updated.exercise && updated.exercise[index]) {
        updated.exercise[index] = {
          ...updated.exercise[index],
          [field]: field === "sets" || field === "reps" || field === "duration"
            ? Number(value)
            : value,
        };
      }
      return updated;
    });
  };

  // Save workout after changes
  const handleSave = async () => {
    try {
      setSaving(true);
      // Prepare payload with updated exercises
      const updatedExercises = workout.exercise.map((ex) => ({
        exerciseId: ex.exercise._id,
        sets: ex.sets,
        reps: ex.reps,
        duration: ex.duration,
      }));

      // Update workout title and date + exercises
      await updateWorkout(id, {
        title: workout.title,
        date: workout.date?.split("T")[0], // just date string
      });

      // Because your backend doesn’t have a dedicated route to update exercises array,
      // we must update exercises separately (add/remove logic).
      // For simplicity, here we assume exercises are updated one by one.
      // Or you can reload the page after update.

      alert("Workout updated! To update exercises, please add/remove exercises again from Dashboard.");

      // Refresh workout data or redirect
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to save workout");
    } finally {
      setSaving(false);
    }
  };

  // Delete workout
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this workout?")) return;
    try {
      await deleteWorkout(id);
      alert("Workout deleted!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to delete workout");
    }
  };

  if (loading) return <div>Loading workout...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!workout) return <div>Workout not found</div>;

  return (
    <div className="card" style={{ maxWidth: 600, margin: "20px auto", padding: 20 }}>
      <h2>Edit Workout</h2>

      <div>
        <label>Title:</label>
        <input
          type="text"
          value={workout.title}
          onChange={(e) => setWorkout({ ...workout, title: e.target.value })}
          style={{ width: "100%", marginBottom: 12 }}
        />
      </div>

      <div>
        <label>Date:</label>
        <input
          type="date"
          value={workout.date?.split("T")[0] || ""}
          onChange={(e) => setWorkout({ ...workout, date: e.target.value })}
          style={{ marginBottom: 20 }}
        />
      </div>

      <h3>Exercises</h3>
      {workout.exercise && workout.exercise.length > 0 ? (
        workout.exercise.map((exItem, idx) => (
          <div
            key={exItem._id || idx}
            style={{
              borderBottom: "1px solid var(--input-border)",
              paddingBottom: 8,
              marginBottom: 8,
            }}
          >
            <strong>{exItem.exercise?.name || "Unnamed Exercise"}</strong>
            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              <label>
                Sets:
                <input
                  type="number"
                  min="0"
                  value={exItem.sets}
                  onChange={(e) => handleExerciseChange(idx, "sets", e.target.value)}
                  style={{ width: 60, marginLeft: 6 }}
                />
              </label>
              <label>
                Reps:
                <input
                  type="number"
                  min="0"
                  value={exItem.reps}
                  onChange={(e) => handleExerciseChange(idx, "reps", e.target.value)}
                  style={{ width: 60, marginLeft: 6 }}
                />
              </label>
              <label>
                Duration (min):
                <input
                  type="number"
                  min="0"
                  value={exItem.duration}
                  onChange={(e) => handleExerciseChange(idx, "duration", e.target.value)}
                  style={{ width: 60, marginLeft: 6 }}
                />
              </label>
            </div>
          </div>
        ))
      ) : (
        <p>No exercises added to this workout yet.</p>
      )}

      <div style={{ marginTop: 20 }}>
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={saving}
          style={{ marginRight: 12 }}
        >
          {saving ? "Saving..." : "Save Workout"}
        </button>

        <button className="btn btn-danger" onClick={handleDelete} disabled={saving}>
          Delete Workout
        </button>
      </div>
    </div>
  );
}