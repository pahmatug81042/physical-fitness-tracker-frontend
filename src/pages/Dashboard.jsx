import React, { useEffect, useState } from "react";
import { getWorkouts } from "../services/workoutService";
import WorkoutList from "../components/WorkoutList";
import WorkoutForm from "../components/WorkoutForm";

export default function Dashboard() {
    const [workouts, setWorkouts] = useState([]);

    const load = async () => {
        try {
            const data = await getWorkouts();
            setWorkouts(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { load(); }, []);

    return (
        <div style={{ padding: 20 }}>
            <h2>Your Workouts</h2>
            <WorkoutForm onCreated={load} />
            <WorkoutList workouts={workouts} onDeleted={load} />
        </div>
    );
};