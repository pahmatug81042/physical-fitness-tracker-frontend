import React, { useEffect, useState } from "react";
import SearchExercises from "../components/SearchExercises";
import Exercises from "../components/Exercises";

export default function Home() {
    const [exercises, setExercises] = useState([]);
    const [bodyPart, setBodyPart] = useState("all");

    return (
        <div style={{ padding: 20 }}>
            <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
            <Exercises exercises={exercises} setExercises={setExercises} bodyPart={bodyPart} />
        </div>
    );
};