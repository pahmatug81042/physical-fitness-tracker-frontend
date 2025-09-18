import React, { useState, useEffect } from "react";
import { addExerciseToWorkout, getWorkouts } from "../services/workoutService";

export default function AddToWorkoutModal({ exerciseId, onClose, onAdded }) {
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState("");
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadWorkouts = async () => {
            try {
                const data = await getWorkouts();
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

        setLoading(true);
        try {
            console.log("Adding exercise to workout", selectedWorkout, {
                exerciseId,
                sets,
                reps,
                duration,
            });

            await addExerciseToWorkout(selectedWorkout, {
                exerciseId,
                sets,
                reps,
                duration,
            });

            onAdded?.(); // trigger refresh in parent
            onClose();   // close modal
        } catch (error) {
            console.error("Failed to add exercise:", error);
            alert(error.message || "Failed to add exercise");
        } finally {
            setLoading(false);
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
                        required
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
                    <button type="submit" disabled={loading} style={{ padding: "6px 12px" }}>
                        {loading ? "Adding..." : "Add"}
                    </button>
                    <button type="button" onClick={onClose} style={{ padding: "6px 12px" }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}