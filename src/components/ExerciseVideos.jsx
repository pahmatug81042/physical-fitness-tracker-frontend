import React from "react";

const ExerciseVideos = ({ exerciseVideos, name }) => {

  return (
    <div className="videos-section">
      <h3 className="videos-heading">
        Watch <span>{name}</span> exercise videos
      </h3>
      <div className="videos-container">
        {exerciseVideos.slice(0, 3).map((item, index) => (
          <a
            key={index}
            className="video-card"
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={item.video.thumbnails[0].url}
              alt={item.video.title}
              className="video-thumbnail"
            />
            <div>
              <h4 className="video-title">{item.video.title}</h4>
              <p className="video-channel">{item.video.channelName}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ExerciseVideos;