import React, { useState } from "react";
import UserDetails from "./UserDetails";
import OrderHistory from "./OrderHistory";
import Comments from "./Comments";
import FlaggedComments from "./FlaggedComments"; // New Component

export default function RightPanelPopup({ selectedUser, onClose, allUsers }) {
    const [activeTab, setActiveTab] = useState("UserDetail"); // Default active tab

    if (!selectedUser) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-full">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                    Close
                </button>

                {/* Header */}
                <div className="mb-4">
                    <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                    <p className="text-sm text-gray-600">{selectedUser.username}</p>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b mb-4">
                    <button
                        className={`flex-1 py-2 text-center ${activeTab === "UserDetail" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
                            }`}
                        onClick={() => setActiveTab("UserDetail")}
                    >
                        User Detail
                    </button>
                    <button
                        className={`flex-1 py-2 text-center ${activeTab === "OrderHistory" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
                            }`}
                        onClick={() => setActiveTab("OrderHistory")}
                    >
                        Order History
                    </button>
                    <button
                        className={`flex-1 py-2 text-center ${activeTab === "Comments" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
                            }`}
                        onClick={() => setActiveTab("Comments")}
                    >
                        Comments
                    </button>
                    <button
                        className={`flex-1 py-2 text-center ${activeTab === "Reviews" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
                            }`}
                        onClick={() => setActiveTab("Reviews")}
                    >
                        Reviews
                    </button>
                </div>

                {/* Tab Content */}
                <div>
                    {activeTab === "UserDetail" && <UserDetails user={selectedUser} />}
                    {activeTab === "OrderHistory" && <OrderHistory orders={selectedUser.orders} />}
                    {activeTab === "Comments" && (
                        <Comments
                            comments={selectedUser.comments}
                            onApprove={(comment) => console.log("Approved:", comment)}
                            onDelete={(comment) => console.log("Deleted:", comment)}
                        />
                    )}
                    {activeTab === "Reviews" && (
                        <FlaggedComments
                            allUsers={allUsers} // Pass all users to filter flagged comments
                            onApprove={(comment) => console.log("Approved:", comment)}
                            onDelete={(comment) => console.log("Deleted:", comment)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
