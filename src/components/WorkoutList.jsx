import React, { useEffect, useState } from "react";
import { getWorkouts } from "../services/workoutService";

export default function WorkoutList() {
    const [workouts, setWorkouts] = useState([]);

    const loadWorkouts = async () => {
        try {
            const data = await getWorkouts();
            setWorkouts(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadWorkouts();
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h2>Your Workouts</h2>
            {workouts.length === 0 && <p>No workouts yet.</p>}
            {workouts.map((workout) => (
                <div
                    key={workout._id}
                    style={
                        {
                            border: "1px solid #ddd",
                            borderRadius: 8,
                            padding: 12,
                            marginBottom: 12,
                        }
                    }
                >
                    <h3>{workout.title}</h3>
                    <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
                    <div>
                        {workout.exercises?.map((ex, idx) => (
                            <div
                                key={idx}
                                style={{ padding: 6, borderBottom: "1px solid #eee" }}
                            >
                                <strong>{ex.exercise?.name}</strong> | Sets: {ex.sets} | Reps: {" "}{ex.reps} | Duration:  {ex.duration} min
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};