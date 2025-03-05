import React, { useState } from "react";

export default function RightPanel({ selectedUser, onClose }) {
  const [activeTab, setActiveTab] = useState("UserDetails");

  return (
    <div className="w-full lg:w-2/3 mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={selectedUser.avatar}
            alt={selectedUser.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
            <p className="text-sm text-gray-500">@{selectedUser.username}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          ✖
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {["UserDetails", "OrderHistory", "Comments", "Reviews"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium ${activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "UserDetails" && (
          <div className="space-y-4">
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-medium ${selectedUser.banned ? "text-red-500" : "text-green-500"
                  }`}
              >
                {selectedUser.banned ? "Banned" : "Active"}
              </span>
            </p>
            <button className="px-4 py-2 bg-red-500 text-white rounded">
              {selectedUser.banned ? "Unban User" : "Ban User"}
            </button>
          </div>
        )}

        {activeTab === "OrderHistory" && (
          <div className="space-y-4">
            {selectedUser.orders.map((order, index) => (
              <div key={index} className="p-4 border rounded">
                <p>
                  <strong>Restaurant:</strong> {order.restaurantName}
                </p>
                <p>
                  <strong>Date:</strong> {order.date}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Comments" && (
          <div className="space-y-4">
            {selectedUser.comments.map((comment, index) => (
              <div key={index} className="p-4 border rounded">
                <p>
                  <strong>Restaurant:</strong> {comment.restaurantName}
                </p>
                <p>
                  <strong>Comment:</strong> {comment.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Reviews" && (
          <div className="space-y-4">
            <p>No reviews available for this user.</p>
          </div>
        )}
      </div>
    </div>
  );
}
