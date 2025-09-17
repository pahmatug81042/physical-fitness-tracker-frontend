import React, { useState } from "react";
import ExerciseList from "../components/ExerciseList";
import WorkoutList from "../components/WorkoutList";
import AddToWorkoutModal from "../components/AddToWorkoutModal";

export default function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);

    const handleAddClick = (exercise) => {
        setSelectedExercise(exercise);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedExercise(null);
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Dashboard</h1>
            <div style={{ display: "flex", gap: 20 }}>
                {/* Left side: browse exercises */}
                <div style={{ flex: 2 }}>
                    <h2>Browse Exercises</h2>
                    <ExerciseList onAddToWorkout={handleAddClick} />
                </div>

                {/* Right side: workouts */}
                <div style={{ flex: 1 }}>
                    <h2>Your Workouts</h2>
                    <WorkoutList />
                </div>
            </div>

            {/* Add to workout modal */}
            {showModal && (
                <AddToWorkoutModal 
                    exercise={selectedExercise}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};