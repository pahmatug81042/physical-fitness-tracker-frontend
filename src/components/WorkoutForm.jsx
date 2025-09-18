import React, { useState } from "react";
import { createWorkout } from "../services/workoutService";

export default function WorkoutForm({ onWorkoutCreated }) {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { title, date };
            const workout = await createWorkout(payload);
            if (onWorkoutCreated) onWorkoutCreated(workout);
            setTitle("");
            setDate("");
        } catch (error) {
            console.error("Failed to create workout:", error);
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
};