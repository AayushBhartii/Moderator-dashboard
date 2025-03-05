import React from "react";
import { FaEnvelope, FaUser, FaCheckCircle, FaBan } from "react-icons/fa";

const UserDetails = ({ user }) => {
    if (!user) return null;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {/* User Details List */}
            <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                    <FaEnvelope className="text-blue-500" />
                    <span className="text-gray-800 font-medium">Email:</span>
                    <span className="text-gray-600">{user.email}</span>
                </li>
                <li className="flex items-center space-x-3">
                    <FaUser className="text-green-500" />
                    <span className="text-gray-800 font-medium">Name:</span>
                    <span className="text-gray-600">{user.name}</span>
                </li>
                <li className="flex items-center space-x-3">
                    {user.banned ? (
                        <FaBan className="text-red-500" />
                    ) : (
                        <FaCheckCircle className="text-green-500" />
                    )}
                    <span className="text-gray-800 font-medium">Status:</span>
                    <span
                        className={`font-semibold ${user.banned ? "text-red-500" : "text-green-500"
                            }`}
                    >
                        {user.banned ? "Banned" : "Active"}
                    </span>
                </li>
            </ul>

            {/* Action Button */}
            <button
                className={`mt-4 px-3 py-1 rounded-md text-white font-medium text-sm transition ${user.banned ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                    }`}
                onClick={() =>
                    console.log(user.banned ? "Unbanning User" : "Banning User")
                }
            >
                {user.banned ? "Unban User" : "Ban User"}
            </button>
        </div>
    );
};

export default UserDetails;
