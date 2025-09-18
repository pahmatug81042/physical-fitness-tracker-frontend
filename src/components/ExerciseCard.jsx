import React from "react";
import { Link } from "react-router-dom";

export default function ExerciseCard({ exercise }) {
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
                    style={{
                        width: "100%",
                        height: 160,
                        objectFit: "cover",
                        borderRadius: 6
                    }}
                />
                <div style={{ padding: "8px 0" }}>
                    <div style={{ fontWeight: "bold" }}>{exercise.name}</div>
                    <div>
                        {exercise.bodyPart} • {exercise.target}
                    </div>
                </div>
            </Link>
        </div>
    );
}