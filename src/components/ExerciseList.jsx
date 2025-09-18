import React, { useEffect, useState } from "react";
import {
    fetchAllExercises,
    fetchByBodyPart,
    fetchByTarget,
    fetchByEquipment,
} from "../services/exerciseService";
import ExerciseCard from "./ExerciseCard";

const ExerciseList = ({ onAddToWorkout }) => {
    // State for exercises
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    // FIlter states
    const [bodyPart, setBodyPart] = useState("");
    const [target, setTarget] = useState("");
    const [equipment, setEquipment] = useState("");

    // Fetch exercises based on filters
    useEffect(() => {
        const loadExercises = async () => {
            setLoading(true);
            try {
                let data = [];

                if (bodyPart) {
                    data = await fetchByBodyPart(bodyPart);
                } else if (target) {
                    data = await fetchByTarget(target);
                } else if (equipment) {
                    data = await fetchByEquipment(equipment);
                } else {
                    data = await fetchAllExercises();
                }

                setExercises(data);
            } catch (error) {
                console.error("Error fetching exercises:", error);
            } finally {
                setLoading(false);
            }
        };

        loadExercises();
    }, [bodyPart, target, equipment]);

    return (
        <div className="exercise-list">
            <h2>Browse Exercises</h2>

            {/* Filters */}
            <div className="filters">
                <select
                    value={bodyPart}
                    onChange={(e) => setBodyPart(e.target.value)}
                >
                    <option value="">Filter by Body Part</option>
                    <option value="chest">Chest</option>
                    <option value="back">Back</option>
                    <option value="legs">Legs</option>
                    <option value="shoulders">Shoulders</option>
                    <option value="arms">Arms</option>
                    <option value="waist">Waist</option>
                </select>

                <select
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                >
                    <option value="">Filter by Target Muscle</option>
                    <option value="biceps">Biceps</option>
                    <option value="triceps">Triceps</option>
                    <option value="glutes">Glutes</option>
                    <option value="abs">Abs</option>
                </select>

                <select
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                >
                    <option value="">Filter by Equipment</option>
                    <option value="body weight">Body Weight</option>
                    <option value="barbell">Barbell</option>
                    <option value="dumbbell">Dumbbell</option>
                    <option value="cable">Cable</option>
                    <option value="machine">Machine</option>
                </select>

                {/* Reset button */}
                <button
                    onClick={() => {
                        setBodyPart("");
                        setTarget("");
                        setEquipment("");
                    }}
                >
                    Reset Filters
                </button>
            </div>

            {/* Exercise Cards */}
            {loading ? (
                <p>Loading exercises...</p>
            ) : (
                <div className="exercise-grid">
                    {exercises.length > 0 ? (
                        exercises.map((exercise) => (
                            <div key={exercise.id}>
                                <ExerciseCard exercise={exercise} />
                                {onAddToWorkout && (
                                    <button className="btn" style={{ marginTop: 8 }} onClick={() => onAddToWorkout(exercise)}>
                                        Add to Workout
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No exercises found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ExerciseList;