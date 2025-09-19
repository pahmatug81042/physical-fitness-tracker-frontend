// Dashboard.jsx
import React, { useState, useCallback, useEffect } from "react";
import ExerciseList from "../components/ExerciseList";
import WorkoutList from "../components/WorkoutList";
import AddToWorkoutModal from "../components/AddToWorkoutModal";
import WorkoutForm from "../components/WorkoutForm";
import { getWorkouts } from "../services/workoutService";

export default function Dashboard() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [workoutCreated, setWorkoutCreated] = useState(false);

  const handleAddClick = (exercise) => setSelectedExercise(exercise);
  const clearSelectedExercise = () => setSelectedExercise(null);

  const loadWorkouts = useCallback(async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

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
          <WorkoutList
            workouts={workouts}
            onWorkoutDeleted={loadWorkouts}
            onWorkoutEdit={setEditingWorkout}
          />

          <WorkoutForm
            setWorkoutCreated={setWorkoutCreated}
            editingWorkout={editingWorkout}
            setEditingWorkout={setEditingWorkout}
          />
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