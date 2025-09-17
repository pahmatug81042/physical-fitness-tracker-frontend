import React from "react";
import { createWorkout } from "../services/workoutService";

export default function WorkoutForm({ onCreated }) {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createWorkout({ title });
            setTitle("");
            if (onCreated) onCreated();
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
            <input 
                placeholder="Workout title: (e.g., Push Day)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">Create Workout</button>
        </form>
    );
};