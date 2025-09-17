import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getWorkouts, addExerciseToWorkout } from "../services/workoutService";

export default function ExerciseCard({ exercise }) {
    const [showModal, setShowModal] = useState(false);
    const [workouts, setWorkouts] = useState([]);
    const [form, setForm] = useState(
        {
            workoutId: "",
            sets: "",
            reps: "",
            duration: "",
        }
    );

    // Fetch available workouts when modal opens
    useEffect(() => {
        if (showModal) {
            getWorkouts().then(setWorkouts).catch(console.error);
        }
    }, [showModal]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.name });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.workoutId) return alert("Please select a workout");
        try {
            await addExerciseToWorkout(form.workoutId, {
                exerciseId: exercise.id || exercise._id,
                sets: form.sets,
                reps: form.reps,
                duration: form.duration,
            });
            alert("Exercise added successfully!");
            setShowModal(false);
        } catch (error) {
            console.error(error);
            alert("Failed to add exercise.");
        }
    };

    const thumbnail = 
        exercise.videoThumbnail || 
        exercise.gifUrl || 
        `https://via.placeholder.com/360x200?text=${encodeURIComponent(exercise.name)}`;

    return (
        <div style={{ position: "relative" }}>
            <Link
                to={`/exercise/${exercise.id || exercise._id}`}
                style={
                    {
                        textDecoration: "none",
                        color: "inherit",
                        border: "1px solid #eee",
                        padding: 8,
                        borderRadius: 8,
                        display: "block",
                    }
                }
            >
                <img 
                    src={thumbnail}
                    alt={exercise.name}
                    style={
                        {
                            width: "100%",
                            height: 160,
                            objectFit: "cover",
                            borderRadius: 6,
                        }
                    }
                />
                <div style={{ padding: "8px 0" }}>
                    <div style={{ fontWeight: "bold" }}>{exercise.name}</div>
                    <div style={{ fontSize: 12, color: "#666" }}>
                        {exercise.bodyPart} • {exercise.target}
                    </div>
                </div>
            </Link>

            {/* Add to Workout Button */}
            <button
                onClick={() => setShowModal(true)}
                style={
                    {
                        marginTop: 8,
                        padding: "6px 12px",
                        border: "none",
                        borderRadius: "4",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        cursor: "pointer",
                    }
                }
            >
                Add to Workout
            </button>

            {/* Modal */}
            {showModal && (
                <div
                    style={
                        {
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }
                    }
                >
                    <div
                        style={
                            {
                                backgroundColor: "#fff",
                                padding: 20,
                                borderRadius: 8,
                                width: "90%",
                                maxWidth: 400,
                            }
                        }
                    >
                        <h3>Add {exercise.name} to Workout</h3>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Select Workout:
                                <select
                                    name="workoutId"
                                    value={form.workoutId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">-- Choose --</option>
                                    {workouts.map((w) => (
                                        <option key={w._id} value={w._id}>
                                            {w.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <br />
                            <label>
                                Sets:
                                <input 
                                    type="number"
                                    name="sets"
                                    value={form.sets}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <label>
                                Reps:
                                <input 
                                    type="number"
                                    name="reps"
                                    value={form.reps}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <label>
                                Duration (min):
                                <input 
                                    type="number"
                                    name="duration"
                                    value={form.duration}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <button type="submit">Add</button>
                            <button type="button" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};