import React from "react";

export default function HorizontalScrollbar({ data = [], bodyParts = false, setBodyPart, bodyPart }) {
    return (
        <div
            style={
                {
                    display: "flex",
                    gap: 12,
                    overflowX: "auto",
                    padding: "12px 0",
                }
            }
        >
            {data.map((item) => (
                <button
                    key={item}
                    onClick={() => bodyParts && setBodyPart(item)}
                    style={
                        {
                            padding: "8px 12px",
                            borderRadius: 20,
                            border: bodyPart === item ? "2px solid #ff2625" : "1px solid #ddd",
                            backgroundColor: bodyPart === item ? "#fff1f0" : "#fff",
                            cursor: pointer,
                            whiteSpace: "nowrap",
                        }
                    }
                >
                    {item}
                </button>
            ))}
        </div>
    );
};