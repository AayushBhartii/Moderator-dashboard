import React, { useState, useEffect } from "react";
import { FaUserCircle, FaBan, FaFlag, FaTrash } from 'react-icons/fa';
import LeftPanel from "../components/LeftPanel";
import UserStatsDashboard from "../components/userStats/UserStatsDashboard";
import TopBar from "../components/TopBar";

export default function DeliveryMenu() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      avatar: "https://via.placeholder.com/50",
      banned: false,
      flagged: false,
      orders: [
        { restaurantName: "Krupa Mess", date: "2023-12-01" },
        { restaurantName: "Spicy Bites", date: "2023-12-15" },
        { restaurantName: "The Food Hub", date: "2023-12-20" },
      ],
      comments: [
        {
          restaurantName: "Krupa Mess",
          text: "Great food but terrible service!",
        },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      username: "janesmith",
      email: "jane@example.com",
      avatar: "https://via.placeholder.com/50",
      banned: false,
      flagged: true,
      orders: [
        { restaurantName: "Pasta Point", date: "2023-11-25" },
        { restaurantName: "The Curry House", date: "2023-12-05" },
      ],
      comments: [
        {
          restaurantName: "Pasta Point",
          text: "Loved the pasta! Will visit again.",
        },
      ],
    },
    {
      id: 3,
      name: "Michael Brown",
      username: "mikebrown",
      email: "michael@example.com",
      avatar: "https://via.placeholder.com/50",
      banned: true,
      flagged: false,
      orders: [
        { restaurantName: "Burger Haven", date: "2023-12-10" },
      ],
      comments: [
        {
          restaurantName: "Burger Haven",
          text: "Worst burger I've ever had. Avoid!",
        },
      ],
    },
    {
      id: 4,
      name: "Emily Davis",
      username: "emilydavis",
      email: "emily@example.com",
      avatar: "https://via.placeholder.com/50",
      banned: false,
      flagged: true,
      orders: [
        { restaurantName: "Green Leaf Cafe", date: "2023-11-30" },
        { restaurantName: "Krupa Mess", date: "2023-12-12" },
      ],
      comments: [
        {
          restaurantName: "Green Leaf Cafe",
          text: "Beautiful ambiance and great salads!",
        },
      ],
    },
    {
      id: 5,
      name: "Sophia Wilson",
      username: "sophiawilson",
      email: "sophia@example.com",
      avatar: "https://via.placeholder.com/50",
      banned: true,
      flagged: true,
      orders: [
        { restaurantName: "Pizza Palace", date: "2023-12-01" },
        { restaurantName: "The Grill Station", date: "2023-12-16" },
      ],
      comments: [
        {
          restaurantName: "Pizza Palace",
          text: "Pizza was too oily, but the staff was kind.",
        },
      ],
    },
    {
      id: 6,
      name: "James Taylor",
      username: "jamestaylor",
      email: "james@example.com",
      avatar: "https://via.placeholder.com/50",
      banned: false,
      flagged: false,
      orders: [
        { restaurantName: "Fusion Feast", date: "2023-12-18" },
      ],
      comments: [
        {
          restaurantName: "Fusion Feast",
          text: "Creative dishes, but portions are small.",
        },
      ],
    },
  ]);

  // Set the default selected user when the component mounts
  useEffect(() => {
    setSelectedUser(users[0]); // Always open the first user by default
  }, [users]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setActiveTab("details");
  };

  const toggleBanUser = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, banned: !user.banned } : user
    ));
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser(prev => ({ ...prev, banned: !prev.banned }));
    }
  };

  const toggleFlagUser = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, flagged: !user.flagged } : user
    ));
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser(prev => ({ ...prev, flagged: !prev.flagged }));
    }
  };

  const deleteUser = (userId) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      setUsers(users.filter(user => user.id !== userId));
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser(users[0] || null); // Select the first user or null if none left
      }
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => !user.banned).length;
  const bannedUsers = users.filter((user) => user.banned).length;
  const flaggedUsers = users.filter((user) => user.flagged).length;
  const inactiveUsers = users.filter((user) => !user.orders.length).length;
  const uniqueUsers = new Set(users.map((user) => user.username)).size;
  const bounceRate = ((inactiveUsers / totalUsers) * 100).toFixed(2);
  const turnaroundRatio = (activeUsers / totalUsers).toFixed(2);

  const pieChartData = [
    { name: "Active Users", value: activeUsers },
    { name: "Banned Users", value: bannedUsers },
    { name: "Flagged Users", value: flaggedUsers },
  ];

  const loyalUserData = [
    { month: "Jan", growth: 20 },
    { month: "Feb", growth: 30 },
    { month: "Mar", growth: 40 },
    { month: "Apr", growth: 50 },
    { month: "May", growth: 60 },
    { month: "Jun", growth: 70 },
    { month: "Jul", growth: 80 },
    { month: "Aug", growth: 90 },
    { month: "Sep", growth: 100 },
  ];

  return (
    <div className="flex flex-col h-screen">
       <div className="w-full bg-white shadow-md border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
      {/* Title on the Left */}
      <h1 className="text-2xl font-bold text-gray-800 whitespace-nowrap">
      User Management Dashboard
      </h1>
      <button 
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            onClick={() => setShowDashboard(!showDashboard)}
          >
            Overview
          </button>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Panel */}
        <div className="flex-shrink-0 lg:w-1/4 w-full">
        
          <LeftPanel users={users} onUserSelect={handleUserSelect}>
            <FaUserCircle className="text-gray-500 w-8 h-8" />
          </LeftPanel>
          
        </div>
      
        {/* Main Dashboard */}
        <div className="relative flex-1 flex flex-col space-y-4 p-4 bg-gray-100">
        
          

          <div className="space-y-4">
            {/* Overview Section - Shows at the top when button is clicked */}
            {showDashboard && (
              <div className="mb-4">
                <UserStatsDashboard
                  totalUsers={totalUsers}
                  activeUsers={activeUsers}
                  bannedUsers={bannedUsers}
                  flaggedUsers={flaggedUsers}
                  inactiveUsers={inactiveUsers}
                  uniqueUsers={uniqueUsers}
                  bounceRate={bounceRate}
                  turnaroundRatio={turnaroundRatio}
                  pieChartData={pieChartData}
                  loyalUserData={loyalUserData}
                />
              </div>
            )}

            {/* User Information Section */}
            {selectedUser && (
              <div className="border p-4 bg-white rounded shadow">
                <div className="flex items-center mb-4">
                  <FaUserCircle className="text-gray-500 w-12 h-12" />
                  <h2 className="text-lg font-bold ml-2">{selectedUser.name}</h2>
                </div>

                {/* Tab Navigation */}
                <div className="flex space-x-4 mb-4">
                  <button 
                    className={`px-4 py-2 rounded transition duration-200 ${activeTab === "details" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                    onClick={() => setActiveTab("details")}
                  >
                    User Detail
                  </button>
                  <button 
                    className={`px-4 py-2 rounded transition duration-200 ${activeTab === "orders" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                    onClick={() => setActiveTab("orders")}
                  >
                    Order History
                  </button>
                  <button 
                    className={`px-4 py-2 rounded transition duration-200 ${activeTab === "comments" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                    onClick={() => setActiveTab("comments")}
                  >
                    Comments
                  </button>
                  <button 
                    className={`px-4 py-2 rounded transition duration-200 ${activeTab === "reviews" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                    onClick={() => setActiveTab("reviews")}
                  >
                    Reviews
                  </button>
                </div>

                {/* Tab Content */}
                {activeTab === "details" && (
                  <div className="border-t border-gray-300 pt-4">
                    <h2 className="text-lg font-bold">User Detail</h2>
                    <p><strong>Username:</strong> {selectedUser.username}</p>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Banned:</strong> {selectedUser.banned ? "Yes" : "No"}</p>
                    <p><strong>Flagged:</strong> {selectedUser.flagged ? "Yes" : "No"}</p>
                    {/* User Actions */}
                    <h2 className="text-lg font-bold mt-4">Action Buttons</h2>
                    <div className="flex space-x-4 mb-4">
                      <button 
                        className={`px-4 py-2 rounded ${selectedUser.banned ? "bg-red-500" : "bg-yellow-500"} text-white flex items-center`}
                        onClick={() => toggleBanUser(selectedUser.id)}
                      >
                        <FaBan className="mr-2" />
                        {selectedUser.banned ? "Unban" : "Ban"}
                      </button>
                      <button 
                        className={`px-4 py-2 rounded ${selectedUser.flagged ? "bg-red-500" : "bg-yellow-500"} text-white flex items-center`}
                        onClick={() => toggleFlagUser(selectedUser.id)}
                      >
                        <FaFlag className="mr-2" />
                        {selectedUser.flagged ? "Unflag" : "Flag"}
                      </button>
                      <button 
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 flex items-center"
                        onClick={() => deleteUser(selectedUser.id)}
                      >
                        <FaTrash className="mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div className="border-t border-gray-300 pt-4">
                    <h2 className="text-lg font-bold">Order History</h2>
                    <ul className="list-disc pl-5">
                      {selectedUser.orders.length > 0 ? (
                        selectedUser.orders.map((order, index) => (
                          <li key={index}>{order.restaurantName} on {order.date}</li>
                        ))
                      ) : (
                        <li>No orders found.</li>
                      )}
                    </ul>
                  </div>
                )}

                {activeTab === "comments" && (
                  <div className="border-t border-gray-300 pt-4">
                    <h2 className="text-lg font-bold">Comments</h2>
                    <ul className="list-disc pl-5">
                      {selectedUser.comments.length > 0 ? (
                        selectedUser.comments.map((comment, index) => (
                          <li key={index}><strong>{comment.restaurantName}:</strong> {comment.text}</li>
                        ))
                      ) : (
                        <li>No comments found.</li>
                      )}
                    </ul>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="border-t border-gray-300 pt-4">
                    <h2 className="text-lg font-bold">Reviews</h2>
                    <p>No reviews available.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
