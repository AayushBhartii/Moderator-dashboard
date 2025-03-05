import React from "react";

const TurnaroundRatio = ({ ratio }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">Turnaround Ratio</h2>
            <p className="text-3xl font-semibold text-blue-500">{ratio}</p>
        </div>
    );
};

export default TurnaroundRatio;
