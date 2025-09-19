import React, { useState } from "react";
import { createWorkout } from "../services/workoutService";
import ModalPortal from "./ModalPortal";

export default function WorkoutForm({ onWorkoutCreated, onClose }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { title, date };
      await createWorkout(payload);
      onWorkoutCreated?.(); // Directly refresh workouts in Dashboard
      setTitle("");
      setDate("");
      onClose?.();          // Close modal after creation
    } catch (error) {
      console.error("Failed to create workout:", error);
      alert(`Failed to create workout: ${error.message}`);
    }
  };

  return (
    <ModalPortal>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20, backgroundColor: 'white', padding: 20, borderRadius: 8, minWidth: 300 }}>
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
        <button type="button" onClick={onClose} style={{ marginLeft: 8 }}>Cancel</button>
      </form>
    </ModalPortal>
  );
}