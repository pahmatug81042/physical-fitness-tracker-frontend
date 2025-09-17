import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchExerciseById } from "../services/exerciseService";
import { fetchVideosForExercise } from "../services/videoService";
import { getWorkouts, addExerciseToWorkout } from "../services/workoutService";
import ExerciseVideos from "../components/ExerciseVideos";

export default function ExerciseDetail() {
    const { id } = useParams();
    const [exercise, setExercise] = useState(null);
    const [videos, setVideos] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [form, setForm] = useState(
        {
            workoutId: "",
            sets: "",
            reps: "",
            duration: "",
        }
    );

    useEffect(() => {
        const load = async () => {
            try {
                const ex = await fetchExerciseById(id);
                setExercise(ex);
                const vids = await fetchVideosForExercise(ex.name);
                setVideos(vids);
                const ws = await getWorkouts();
                setWorkouts(ws);
            } catch (error) {
                console.error(error);
            }
        };
        load();
    }, [id]);

    if (!exercise) return <div>Loading...</div>;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.name });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.workoutId) return alert("Please select a workout");
        try {
            await addExerciseToWorkout(form.workoutId, {
                exerciseId: exercise.id || exercise._id,
                sets: form.sets,
                reps: form.reps,
                duration: form.duration,
            });
            alert("Exercise added successfully!");
            setForm(
                {
                    workoutId: "",
                    sets: "",
                    reps: "",
                    duration: "",
                }
            );
        } catch (error) {
            console.error(error);
            alert("Failed to add exercise.");
        }
    };

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
                style={
                    {
                        width: "100%",
                        maxWidth: 760,
                        borderRadius: 8,
                    }
                }
            />
            <p>{exercise.description}</p>

            <h3>Tutorial Videos</h3>
            <ExerciseVideos exerciseVideos={videos} name={exercise.name} />

            <h3 style={{ marginTop: 20 }}>
                Add to Workout
            </h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Select Workout:
                    <select
                        name="workoutId"
                        value={form.workoutId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Choose --</option>
                        {workouts.map((w) => (
                            <option key={w._id} value={w._id}>
                                {w.name}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Sets:
                    <input 
                        type="number"
                        name="sets"
                        value={form.sets}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Reps:
                    <input 
                        type="number"
                        name="reps"
                        value={form.reps}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Duration (min):
                    <input 
                        type="number"
                        name="duration"
                        value={form.duration}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};