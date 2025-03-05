import React from "react";

const BounceRate = ({ rate }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">Bounce Rate</h2>
            <p className="text-3xl font-semibold text-red-500">{rate}%</p>
        </div>
    );
};

export default BounceRate;
