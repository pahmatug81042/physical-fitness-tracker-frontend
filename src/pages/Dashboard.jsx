import React, { useState } from "react";
import ExerciseList from "../components/ExerciseList";
import WorkoutList from "../components/WorkoutList";
import AddToWorkoutModal from "../components/AddToWorkoutModal";
import WorkoutForm from "../components/WorkoutForm";

export default function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [showWorkoutForm, setShowWorkoutForm] = useState(false);
    const [workoutRefreshKey, setWorkoutRefreshKey] = useState(0);

    const handleAddClick = (exercise) => {
        setSelectedExercise(exercise);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedExercise(null);
    };

    const handleWorkoutCreated = () => {
        setWorkoutRefreshKey((k) => k + 1);
        setShowWorkoutForm(false);
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
                    <WorkoutList key={workoutRefreshKey} />
                    <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setShowWorkoutForm(true)}>
                        Add Workout
                    </button>
                </div>
            </div>

            {/* Add to workout modal */}
            {showModal && (
                <AddToWorkoutModal 
                    exercise={selectedExercise}
                    onClose={closeModal}
                />
            )}

            {/* Workout form modal */}
            {showWorkoutForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <WorkoutForm onWorkoutCreated={handleWorkoutCreated} />
                        <button className="btn" style={{ marginTop: 12 }} onClick={() => setShowWorkoutForm(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};