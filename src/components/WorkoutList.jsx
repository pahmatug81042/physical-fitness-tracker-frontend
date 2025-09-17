import React, { useEffect, useState } from "react";
import { getWorkouts, addExerciseToWorkout } from "../services/workoutService";
import { fetchAllExercises } from "../services/exerciseService";

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState("");
    const [selectedExercise, setSelectedExercise] = useState("");

    // Fetch workouts from backend
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const data = await getWorkouts();
                setWorkouts(data);
            } catch (error) {
                console.error("Error fetching workouts:", error);
            }
        };
        fetchWorkouts();
    }, []);

    // Fetch exercises from backend
    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const data = await fetchAllExercises();
                setExercises(data);
            } catch (error) {
                console.error("Error fetching exercises:", error);
            }
        };
        fetchExercises();
    }, []);

    // Add exercise to selected workout
    const handleAddExercise = async () => {
        if (!selectedWorkout || !selectedExercise) return;
        try {
           const updatedWorkout = await addExerciseToWorkout(selectedWorkout, {
            exerciseId: selectedExercise,
           });
           
           // Update workouts list with new workout data
           setWorkouts((prev) => prev.map((w) => (w._id === updatedWorkout._id ? updatedWorkout : w)));

           // Reset form
           setSelectedWorkout("");
           setSelectedExercise("");
        } catch (error) {
            console.error("Error adding exercise to workout:", error);
        }
    };

    return (
        <div>
            <h2>Workouts</h2>
            {workouts.length === 0 ? (
                <p>No workouts found</p>
            ) : (
                <ul>
                    {workouts.map((w) => (
                        <li key={w._id}>
                            <strong>{w.name}</strong>
                            <ul>
                                {w.exercises?.map((e, idx) => (
                                    <li key={idx}>{e.name || e.exercise?.name}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}

            <h3>Add Exercise to Workout</h3>
            <select
                value={selectedWorkout}
                onChange={(e) => setSelectedWorkout(e.target.value)}
            >
                <option value="">Select Workout</option>
                {workouts.map((w) => (
                    <option key={w._id} value={w._id}>
                        {w.name}
                    </option>
                ))}
            </select>

            <select
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
            >
                <option value="">Select Exercise</option>
                {exercises.map((e) => (
                    <option key={e.id} value={e.id}>
                        {e.name}
                    </option>
                ))}
            </select>

            <button onClick={handleAddExercise}>Add Exercise</button>
        </div>
    );
};

export default WorkoutList;