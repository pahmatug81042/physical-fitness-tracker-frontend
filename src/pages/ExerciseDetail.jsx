import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchExerciseById } from "../services/exerciseService";
import { fetchVideosForExercise } from "../services/videoService";
import ExerciseVideos from "../components/ExerciseVideos";
import AddToWorkoutModal from "../components/AddToWorkoutModal";

export default function ExerciseDetail() {
    const { id } = useParams();
    const [exercise, setExercise] = useState(null);
    const [videos, setVideos] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const ex = await fetchExerciseById(id);
                setExercise(ex);
                const vids = await fetchVideosForExercise(ex.name);
                setVideos(vids);
            } catch (error) {
                console.error(error);
            }
        };
        load();
    }, [id]);

    if (!exercise) return <div>Loading...</div>;

    const mainImg = 
        videos?.[0]?.videos?.thumbnails?.[0]?.url || 
        exercise.gifUrl || 
        `https://via.placeholder.com/640x360?text=${encodeURIComponent(exercise.name)}`;

    return (
        <div style={{ padding: 20 }}>
            <h2 style={{ textTransform: "capitalize" }}>{exercise.name}</h2>
            <img 
                src={mainImg}
                alt={exercise.name}
                style={{ width: "100%", maxWidth: 760, borderRadius: 8 }}
            />
            <p>{exercise.description}</p>
            <button
                onClick={() => setModalOpen(true)}
                style={
                    {
                        margin: "12px 0",
                        padding: "6px 12px",
                        borderRadius: 4,
                        border: "none",
                        backgroundColor: "007bff",
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
                />
            )}
            <h3>Tutorial Videos</h3>
            <ExerciseVideos exerciseVideos={videos} name={exercise.name} />
        </div>
    );
};