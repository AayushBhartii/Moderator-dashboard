import React from "react";

export default function UserStats({ totalUsers, activeUsers, bannedUsers }) {
    return (
        <>
            <div className="p-4 bg-white shadow-md rounded-lg text-center">
                <h3 className="text-3xl font-bold"></h3>
                <p className="text-sm text-gray-500"></p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg text-center">
                <h3 className="text-3xl font-bold"></h3>
                <p className="text-sm text-gray-500"></p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg text-center">
                <h3 className="text-3xl font-bold"></h3>
                <p className="text-sm text-gray-500"></p>
            </div>
        </>
    );
}
