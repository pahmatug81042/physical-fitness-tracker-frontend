import React, { useState, useCallback, useEffect } from "react";
import ExerciseList from "../components/ExerciseList";
import WorkoutList from "../components/WorkoutList";
import AddToWorkoutModal from "../components/AddToWorkoutModal";
import WorkoutForm from "../components/WorkoutForm";
import { getWorkouts } from "../services/workoutService";

export default function Dashboard() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [workoutCreated, setWorkoutCreated] = useState(false);

  const handleAddClick = (exercise) => setSelectedExercise(exercise);
  const clearSelectedExercise = () => setSelectedExercise(null);

  // Load workouts from backend
  const loadWorkouts = useCallback(async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  // Reload workouts when workoutCreated changes to true
  useEffect(() => {
    if (workoutCreated) {
      loadWorkouts();
      setWorkoutCreated(false);
    }
  }, [workoutCreated, loadWorkouts]);

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

          {/* Pass setWorkoutCreated to WorkoutForm */}
          <WorkoutForm setWorkoutCreated={setWorkoutCreated} />
        </div>
      </div>

      {selectedExercise && (
        <AddToWorkoutModal
          exercise={selectedExercise}
          onClose={clearSelectedExercise}
          onAdded={loadWorkouts}
        />
      )}
    </div>
  );
}