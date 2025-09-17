import React, { useEffect, useState } from "react";
import { getWorkouts, deleteWorkout } from "../services/workoutService";

export default function WorkoutList() {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getWorkouts();
                setWorkouts(data);
            } catch (error) {
                console.error("Failed to fetch workouts:", error);
            }
        };
        load();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteWorkout(id);
            setWorkouts((prev) => prev.filter((w) => w._id !== id));
        } catch (error) {
            console.error("Failed to delete workout:", error);
        }
    };

    return (
        <div>
            <h3>Your Workouts</h3>
            {workouts.length === 0 ? (
                <p>No workouts yet. Create one above!</p>
            ) : (
                <ul>
                    {workouts.map((workout) => (
                        <li
                            key={workout._id}
                            style={
                                {
                                    border: "1px solid #ccc",
                                    marginBottom: 12,
                                    padding: 10,
                                    borderRadius: 6,
                                }
                            }
                        >
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <strong>{workout.title}</strong>
                                <button onClick={() => handleDelete(workout._id)}>Delete</button>
                            </div>
                            <small>{new Date(workout.date).toLocaleDateString()}</small>
                            {workout.exercises?.length > 0 && (
                                <div style={{ marginTop: 10 }}>
                                    <h4>Exercises</h4>
                                    <ul>
                                        {workout.exercises.map((ex, idx) => (
                                            <li key={idx}>
                                                {ex.exercise.name || "Unnamed Exercise"} -{" "}
                                                {ex.sets} sets x {ex.reps} • {ex.duration} min
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};