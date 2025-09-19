import React, { useEffect, useState } from "react";
import { addExerciseToWorkout, getWorkouts } from "../services/workoutService";
import ModalPortal from "./ModalPortal";

export default function AddToWorkoutModal({ exercise, onClose, onAdded }) {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadWorkouts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedWorkout) return alert("Please select a workout");

    if (!exercise) return alert("Exercise data is missing");

    try {
      await addExerciseToWorkout(selectedWorkout, {
        exerciseId: exercise.id || exercise._id,
        name: exercise.name,
        bodyPart: exercise.bodyPart,
        target: exercise.target,
        equipment: exercise.equipment,
        gifUrl: exercise.gifUrl,
        sets,
        reps,
        duration,
      });
      onAdded?.(); // Trigger Dashboard refresh
      onClose();
    } catch (error) {
      console.error(error);
      alert(`Failed to add exercise: ${error.message}`);
    }
  };

  return (
    <ModalPortal>
      <div className="modal-overlay">
        <form onSubmit={handleSubmit} className="modal-form">
          <h3>Add Exercise to Workout</h3>
          <label>
            Workout:
            <select
              value={selectedWorkout}
              onChange={(e) => setSelectedWorkout(e.target.value)}
              className="modal-select"
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
              className="modal-input"
              min={0}
            />
          </label>

          <label>
            Reps:
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(Number(e.target.value))}
              className="modal-input"
              min={0}
            />
          </label>

          <label>
            Duration (min):
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="modal-input"
              min={0}
            />
          </label>

          <div className="modal-actions">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ModalPortal>
  );
}