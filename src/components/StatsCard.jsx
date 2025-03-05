import React from "react";

const StatsCard = ({ title, value, color }) => {
    return (
        <div
            style={{
                padding: "16px",
                borderRadius: "8px",
                backgroundColor: color || "#f9f9f9",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                marginBottom: "16px",
            }}
        >
            <h3 style={{ margin: 0, fontSize: "1.25rem", color: "#333" }}>{title}</h3>
            <p style={{ margin: "8px 0 0", fontSize: "2rem", color: "#007bff" }}>
                {value}
            </p>
        </div>
    );
};

export default StatsCard;
