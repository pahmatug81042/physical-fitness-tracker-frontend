import React from "react";
import { Link } from "react-router-dom";

export default function ExerciseCard({ exercise }) {
  const thumbnail =
    exercise.videoThumbnail ||
    exercise.gifUrl ||
    `https://via.placeholder.com/360x200?text=${encodeURIComponent(exercise.name)}`;

  return (
    <div className="exercise-card">
      <Link to={`/exercise/${exercise.id || exercise._id}`} className="exercise-link">
        <img
          src={thumbnail}
          alt={exercise.name}
          className="exercise-thumbnail"
        />
        <div className="exercise-info">
          <div className="exercise-name">{exercise.name}</div>
          <div className="exercise-details">
            {exercise.bodyPart} • {exercise.target}
          </div>
        </div>
      </Link>
    </div>
  );
}