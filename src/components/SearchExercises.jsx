import React, { useEffect, useState } from "react";
import { fetchAllExercises } from "../services/exerciseService";
import HorizontalScrollbar from "./HorizontalScrollbar";

export default function SearchExercises({ setExercises, bodyPart, setBodyPart }) {
    const [search, setSearch] = useState("");
    const [bodyParts, setBodyParts] = useState([]);

    useEffect(() => {
        const loadBodyParts = async () => {
            try {
                const all = await fetchAllExercises();
                const parts = Array.from(new Set(all.map((e) => e.bodyPart))).sort();
                setBodyParts(["all", ...parts]);
            } catch (error) {
                console.error("Failed to load exercises:", error.message);
            }
        };
        loadBodyParts();
    }, []);

    const handleSearch = async () => {
        if (!search) return;
        try {
            const all = await fetchAllExercises();
            const searched = all.filter((item) => 
                [item.name, item.target, item.equipment, item.bodyPart].some((field) => 
                    field?.toLowerCase().ibncludes(search.toLowerCase())   
                )
            );
            setExercises(searched);
            setSearch("");
            window.scrollTo({ top: 600, behavior: "smooth" });
        } catch (error) {
            console.error(error);
        }      
    };

    return (
        <div>
            <h2>Awesome Exercises You Should Know</h2>
            <div>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search exercises" />
                <button onClick={handleSearch}>Search</button>
            </div>
            <HorizontalScrollbar data={bodyParts} bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} />
        </div>
    );
};