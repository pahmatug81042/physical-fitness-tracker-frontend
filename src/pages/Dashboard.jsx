// src/pages/Dashboard.jsx
import React, { useState, useEffect, useCallback } from "react";
import ExerciseList from "../components/ExerciseList";
import WorkoutList from "../components/WorkoutList";
import AddToWorkoutModal from "../components/AddToWorkoutModal";
import WorkoutForm from "../components/WorkoutForm";
import { getWorkouts } from "../services/workoutService";

export default function Dashboard() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [workouts, setWorkouts] = useState([]);

  const handleAddClick = (exercise) => setSelectedExercise(exercise);
  const clearSelectedExercise = () => setSelectedExercise(null);

  const loadWorkouts = useCallback(async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (err) {
      console.error("Failed to load workouts:", err);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

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
          <WorkoutList workouts={workouts} />
          <button
            className="btn btn-primary"
            style={{ marginTop: 16 }}
            onClick={() => setShowWorkoutForm(true)}
          >
            Add Workout
          </button>
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <h2>Add Exercise to Workout</h2>
        {selectedExercise ? (
          <>
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
              onAdded={loadWorkouts} // Reload workouts after adding exercise
            />
          </>
        ) : (
          <p>Select an exercise from the left to add it to a workout.</p>
        )}
      </div>

      {showWorkoutForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <WorkoutForm onWorkoutCreated={loadWorkouts} /> {/* Reload workouts after creation */}
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