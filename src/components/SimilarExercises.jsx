import React from "react";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => (
  <div className="similar-section">
    <h3 className="similar-heading">
      Similar <span>Target Muscle</span> exercises
    </h3>
    <div className="scrollbar-container">
      {targetMuscleExercises.length ? (
        <HorizontalScrollbar data={targetMuscleExercises} />
      ) : (
        <Loader />
      )}
    </div>

    <h3 className="similar-heading second-heading">
      Similar <span>Equipment</span> exercises
    </h3>
    <div className="scrollbar-container">
      {equipmentExercises.length ? (
        <HorizontalScrollbar data={equipmentExercises} />
      ) : (
        <Loader />
      )}
    </div>
  </div>
);

export default SimilarExercises;