// src/components/AddToWorkoutModal.jsx
import React, { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";

export default function AddToWorkoutModal({ exerciseId, onClose, onAdded }) {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [duration, setDuration] = useState(0);

  // Load workouts from backend
  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await apiClient("/workouts");
        setWorkouts(data);
      } catch (error) {
        console.error("Failed to load workouts:", error);
      }
    };
    loadWorkouts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedWorkout) return alert("Please select a workout");

    try {
      await apiClient(`/workouts/${selectedWorkout}`, {
        method: "PUT",
        body: JSON.stringify({ exerciseId, sets, reps, duration }),
      });
      onAdded?.();
      onClose();
    } catch (error) {
      console.error("Failed to add exercise:", error);
      alert("Failed to add exercise: " + error.message);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 8,
          minWidth: 300,
        }}
      >
        <h3>Add Exercise to Workout</h3>
        <label>
          Workout:
          <select
            value={selectedWorkout}
            onChange={(e) => setSelectedWorkout(e.target.value)}
            style={{ width: "100%", marginBottom: 8 }}
          >
            <option value="">Select Workout</option>
            {workouts.map((w) => (
              <option key={w._id} value={w._id}>
                {w.title}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sets:
          <input
            type="number"
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
            style={{ width: "100%", marginBottom: 8 }}
            min={0}
          />
        </label>

        <label>
          Reps:
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(Number(e.target.value))}
            style={{ width: "100%", marginBottom: 8 }}
            min={0}
          />
        </label>

        <label>
          Duration (min):
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            style={{ width: "100%", marginBottom: 12 }}
            min={0}
          />
        </label>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="submit" style={{ padding: "6px 12px" }}>
            Add
          </button>
          <button type="button" onClick={onClose} style={{ padding: "6px 12px" }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}