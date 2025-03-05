import React, { useState } from "react";

export default function LeftPanel({ users, onUserSelect }) {
  const [filter, setFilter] = useState("all"); // State to track the selected filter

  // Filter users based on the selected tag
  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true;
    if (filter === "active") return !user.banned;
    if (filter === "banned") return user.banned;
    if (filter === "flagged") return user.flagged;
    return true;
  });

  return (
    <div className="bg-white shadow-lg h-full overflow-y-auto p-4">
      <h2 className="text-xl font-bold mb-4">Users Queue</h2>

      {/* Filter Tags */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded-full text-sm ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-3 py-1 rounded-full text-sm ${filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`px-3 py-1 rounded-full text-sm ${filter === "banned" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          onClick={() => setFilter("banned")}
        >
          Banned
        </button>
        <button
          className={`px-3 py-1 rounded-full text-sm ${filter === "flagged" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          onClick={() => setFilter("flagged")}
        >
          Flagged
        </button>
      </div>

      {/* Filtered User List */}
      <ul className="space-y-4">
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => onUserSelect(user)}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
