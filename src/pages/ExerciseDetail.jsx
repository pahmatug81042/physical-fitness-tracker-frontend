import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { exerciseOptions, apiClient, youtubeOptions } from "../utils/apiClient";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";
import AddToWorkoutModal from "../components/AddToWorkoutModal";

export default function ExerciseDetail() {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const { id } = useParams(); // ✅ Gets ID from "/exercises/:id"
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchExercisesData = async () => {
      const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
      const youtubeSearchUrl = "https://youtube-search-and-download.p.rapidapi.com";

      try {
        const exerciseDetailData = await apiClient(
          `${exerciseDbUrl}/exercises/exercise/${id}`,
          exerciseOptions
        );
        setExerciseDetail(exerciseDetailData);

        const exerciseVideosData = await apiClient(
          `${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
          youtubeOptions
        );
        setExerciseVideos(exerciseVideosData.contents);

        const targetMuscleExercisesData = await apiClient(
          `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
          exerciseOptions
        );
        setTargetMuscleExercises(targetMuscleExercisesData);

        const equipmentExercisesData = await apiClient(
          `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
          exerciseOptions
        );
        setEquipmentExercises(equipmentExercisesData);
      } catch (error) {
        console.error("Error fetching exercise details:", error);
      }
    };

    fetchExercisesData();
  }, [id]);

  if (!exerciseDetail || !exerciseDetail.name) return <div>Loading...</div>;

  const handleAdded = () => {
    setConfirmation("Exercise added to your workout!");
    setModalOpen(false);

    setTimeout(() => {
      // Reload current page with same ID
      navigate(`/exercises/${id}`, { replace: true });
      setConfirmation("");
    }, 1500);
  };

  return (
    <div className="exercise-detail-container" style={{ marginTop: 96, padding: "0 16px" }}>
      <Detail exerciseDetail={exerciseDetail} />

      <button
        className="btn-primary"
        style={{ margin: "24px 0", padding: "12px 20px", fontSize: 16, cursor: "pointer" }}
        onClick={() => setModalOpen(true)}
      >
        Add to Workout
      </button>

      {confirmation && (
        <div
          className="confirmation-message"
          style={{
            marginBottom: 24,
            padding: "12px 16px",
            backgroundColor: "#d4edda",
            color: "#155724",
            borderRadius: 6,
            fontWeight: "bold",
          }}
        >
          {confirmation}
        </div>
      )}

      {modalOpen && (
        <AddToWorkoutModal
          exercise={exerciseDetail}
          onClose={() => setModalOpen(false)}
          onAdded={handleAdded}
        />
      )}

      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />

      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </div>
  );
}