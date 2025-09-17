import React from "react";

export default function ExerciseVideos({ exerciseVideos = [], name }) {
    if (!exerciseVideos.length) return <div>No videos found.</div>

    return (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {exerciseVideos.slice(0, 6).map((item, i) => {
                const vid = item.videos;
                const thumb = vid?.thumbnails?.[0]?.url;
                return (
                    <a
                        key={i}
                        href={`https://www.youtube.com/watch?v=${vid.videoId}`}
                        target="_blank"
                        rel="noreferrer"
                        style={
                            {
                                width: 300,
                                textDecoration: "none",
                                color: "inherit",
                            }
                        }
                    >
                        <img 
                            src={thumb}
                            alt={vid.title}
                            style={
                                {
                                    width: "100%",
                                    height: 170,
                                    objectFit: "cover",
                                    borderRadius: 6,
                                }
                            }
                        />
                        <div style={{ fontWeight: 600, marginTop: 6 }}>{vid.title}</div>
                        <div style={{ fontSize: 12, color: "#666" }}>{vid.channelName}</div>
                    </a>
                );
            })}
        </div>
    );
};