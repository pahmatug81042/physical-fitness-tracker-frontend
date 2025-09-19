import React from "react";
import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ];

  return (
    <div className="detail-container">
      <img src={gifUrl} alt={name} className="detail-image" loading="lazy" />
      <div className="detail-text">
        <h2 className="exercise-name">{name}</h2>
        <p className="exercise-description">
          Exercises keep you strong. <span>{name}</span> is one of the best exercises to target your {target}. It will
          help you improve your mood and gain energy.
        </p>
        {extraDetail.map((item) => (
          <div className="extra-detail" key={item.name}>
            <div className="icon-button">
              <img src={item.icon} alt={item.name} />
            </div>
            <p className="extra-label">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;