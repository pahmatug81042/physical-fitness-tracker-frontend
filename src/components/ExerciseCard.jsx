import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddToWorkoutModal from "./AddToWorkoutModal";

export default function ExerciseCard({ exercise, onExerciseAdded }) {
    const [modalOpen, setModalOpen] = useState(false);

    const thumbnail = 
        exercise.videoThumbnail || 
        exercise.gifUrl || 
        `https://via.placeholder.com/360x200?text=${encodeURIComponent(exercise.name)}`;
    
    return (
        <div style={{ border: "1px solid #eee", padding: 8, borderRadius: 8 }}>
            <Link
                to={`/exercise/${exercise.id || exercise._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
            >
                <img 
                    src={thumbnail}
                    alt={exercise.name}
                    style={
                        {
                            width: "100%",
                            height: 160,
                            objectFit: "cover",
                            borderRadius: 6
                        }
                    }
                />
                <div style={{ padding: "8px 0" }}>
                    <div style={{ fontWeight: "bold" }}>{exercise.name}</div>
                    <div>
                        {exercise.bodyPart} • {exercise.target}
                    </div>
                </div>
            </Link>
            <button
                onClick={() => setModalOpen(true)}
                style={
                    {
                        marginTop: 6,
                        padding: "4px 8px",
                        borderRadius: 4,
                        border: "none",
                        backgroundColor: "#007bff",
                        color: "white",
                        cursor: "pointer",
                    }
                }
            >
                Add to Workout
            </button>

            {modalOpen && (
                <AddToWorkoutModal 
                    exerciseId={exercise._id || exercise.id}
                    onClose={() => setModalOpen(false)}
                    onAdded={onExerciseAdded}
                />
            )}
        </div>
    );
};