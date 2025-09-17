import React, { useEffect, useState } from "react";
import ExerciseCard from "./ExerciseCard";
import { fetchAllExercises, fetchByBodyPart } from "../services/exerciseService";

export default function Exercises({ exercises, setExercises, bodyPart }) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const data = bodyPart === "all" ? await fetchAllExercises() : await fetchByBodyPart(bodyPart);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [ bodyPart, setExercises]);

    if (loading) return <div>Loading exercises...</div>;
    if (!exercises || exercises.length === 0) return <div>No exercises found.</div>

    return (
        <div
            style={
                {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: 16,
                }
            }
        >
            {exercises.map((exercise) => (
                <ExerciseCard key={exercise.id || exercise._id || exercise.name} exercise={exercise} />
            ))}
        </div>
    );
};