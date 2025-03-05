import React from "react";

const UniqueUsers = ({ count }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">Unique Users</h2>
            <p className="text-3xl font-semibold text-green-500">{count}</p>
        </div>
    );
};

export default UniqueUsers;
