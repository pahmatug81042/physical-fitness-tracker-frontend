// src/pages/Dashboard.jsx
import React, { useState } from "react";
import ExerciseList from "../components/ExerciseList";
import WorkoutList from "../components/WorkoutList";
import AddToWorkoutModal from "../components/AddToWorkoutModal";
import WorkoutForm from "../components/WorkoutForm";

export default function Dashboard() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [workoutRefreshKey, setWorkoutRefreshKey] = useState(0);

  const handleAddClick = (exercise) => setSelectedExercise(exercise);
  const clearSelectedExercise = () => setSelectedExercise(null);

  const refreshWorkouts = () => setWorkoutRefreshKey((k) => k + 1);

  const handleWorkoutCreated = () => {
    refreshWorkouts();
    setShowWorkoutForm(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 2 }}>
          <h2>Browse Exercises</h2>
          <ExerciseList onAddToWorkout={handleAddClick} />
        </div>

        <div style={{ flex: 1 }}>
          <h2>Your Workouts</h2>
          <WorkoutList key={workoutRefreshKey} />
          <button
            className="btn btn-primary"
            style={{ marginTop: 16 }}
            onClick={() => setShowWorkoutForm(true)}
          >
            Add Workout
          </button>
        </div>
      </div>

      {selectedExercise && (
        <div style={{ marginTop: 32 }}>
          <h2>Add Exercise to Workout</h2>
          <div style={{ marginBottom: 12 }}>
            <strong>Selected Exercise:</strong> {selectedExercise.name}
            <button
              className="btn"
              style={{ marginLeft: 12 }}
              onClick={clearSelectedExercise}
            >
              Clear
            </button>
          </div>
          <AddToWorkoutModal
            exerciseId={selectedExercise.id || selectedExercise._id}
            onClose={clearSelectedExercise}
            onAdded={refreshWorkouts}
          />
        </div>
      )}

      {showWorkoutForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <WorkoutForm onWorkoutCreated={handleWorkoutCreated} />
            <button
              className="btn"
              style={{ marginTop: 12 }}
              onClick={() => setShowWorkoutForm(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}