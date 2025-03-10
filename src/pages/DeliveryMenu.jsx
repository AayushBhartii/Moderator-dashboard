import React, { useState, useEffect } from "react";
import { FaUserCircle, FaBan, FaFlag, FaTrash, FaHistory, FaComments, FaStar, FaUserCog, FaCalendarAlt, FaClock } from 'react-icons/fa';
import LeftPanel from "../components/LeftPanel";
import UserStatsDashboard from "../components/userStats/UserStatsDashboard";
import TopBar from "../components/TopBar";

/*
Color Scheme:
Primary: indigo-600 (#4F46E5) - Main actions, headers
Secondary: purple-500 (#9061F9) - Secondary actions
Accent: emerald-500 (#10B981) - Success states
Warning: amber-500 (#F59E0B) - Warning states
Danger: rose-500 (#F43F5E) - Destructive actions
Background: slate-50 (#F8FAFC) - Main background
Card Background: white
Text: slate-700 (#334155) - Main text
Text Light: slate-400 (#94A3B8) - Secondary text
*/

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

  const dashboardProps = {
    totalUsers,
    activeUsers,
    bannedUsers,
    flaggedUsers,
    inactiveUsers,
    uniqueUsers,
    bounceRate,
    turnaroundRatio,
    pieChartData,
    loyalUserData
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header Section */}
      <div className="w-full bg-white shadow-lg border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-700 whitespace-nowrap flex items-center">
          <FaUserCog className="mr-2 text-indigo-600" />
          User Management Dashboard
        </h1>
        <button 
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 flex items-center shadow-md"
          onClick={() => setShowDashboard(!showDashboard)}
        >
          <FaHistory className="mr-2" />
          {showDashboard ? 'Hide Overview' : 'Show Overview'}
        </button>
      </div>

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Panel */}
        <div className="flex-shrink-0 lg:w-1/4 w-full bg-white border-r border-slate-200">
          <LeftPanel users={users} onUserSelect={handleUserSelect}>
            <FaUserCircle className="text-indigo-600 w-8 h-8" />
          </LeftPanel>
        </div>

        {/* Main Dashboard */}
        <div className="relative flex-1 flex flex-col space-y-4 p-6 bg-slate-50">
          <div className="space-y-6">
            {/* Overview Section */}
            {showDashboard && (
              <div className="transform transition-all duration-200 ease-in-out">
                <UserStatsDashboard {...dashboardProps} />
              </div>
            )}

            {/* User Information Section */}
            {selectedUser && (
              <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
                {/* User Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-500 p-6 text-white">
                  <div className="flex items-center">
                    <FaUserCircle className="w-16 h-16" />
                    <div className="ml-4">
                      <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                      <p className="text-indigo-100">{selectedUser.email}</p>
                    </div>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex space-x-1 bg-slate-50 p-4 border-b border-slate-200">
                  {[
                    { id: "details", icon: FaUserCog, label: "User Detail" },
                    { id: "orders", icon: FaHistory, label: "Order History" },
                    { id: "comments", icon: FaComments, label: "Comments" },
                    { id: "reviews", icon: FaStar, label: "Reviews" }
                  ].map(tab => (
                    <button 
                      key={tab.id}
                      className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg transition duration-200 ${
                        activeTab === tab.id 
                          ? "bg-indigo-600 text-white shadow-md" 
                          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <tab.icon className="mr-2" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === "details" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold mb-4 text-slate-700">Basic Information</h3>
                          <div className="space-y-3">
                            <p className="flex items-center">
                              <span className="font-medium w-24 text-slate-600">Username:</span>
                              <span className="text-slate-700">{selectedUser.username}</span>
                            </p>
                            <p className="flex items-center">
                              <span className="font-medium w-24 text-slate-600">Email:</span>
                              <span className="text-slate-700">{selectedUser.email}</span>
                            </p>
                            <p className="flex items-center">
                              <span className="font-medium w-24 text-slate-600">Status:</span>
                              <span className={`px-2 py-1 rounded-full text-sm ${
                                selectedUser.banned 
                                  ? "bg-rose-100 text-rose-600" 
                                  : "bg-emerald-100 text-emerald-600"
                              }`}>
                                {selectedUser.banned ? "Banned" : "Active"}
                              </span>
                            </p>
                            <p className="flex items-center">
                              <span className="font-medium w-24 text-slate-600">Flagged:</span>
                              <span className={`px-2 py-1 rounded-full text-sm ${
                                selectedUser.flagged 
                                  ? "bg-amber-100 text-amber-600" 
                                  : "bg-emerald-100 text-emerald-600"
                              }`}>
                                {selectedUser.flagged ? "Flagged" : "Clean"}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold mb-4 text-slate-700">Actions</h3>
                          <div className="flex flex-col space-y-3">
                            <button 
                              className={`w-full px-4 py-3 rounded-lg flex items-center justify-center transition duration-200 ${
                                selectedUser.banned 
                                  ? "bg-rose-500 hover:bg-rose-600" 
                                  : "bg-amber-500 hover:bg-amber-600"
                              } text-white shadow-md`}
                              onClick={() => toggleBanUser(selectedUser.id)}
                            >
                              <FaBan className="mr-2" />
                              {selectedUser.banned ? "Unban User" : "Ban User"}
                            </button>
                            <button 
                              className={`w-full px-4 py-3 rounded-lg flex items-center justify-center transition duration-200 ${
                                selectedUser.flagged 
                                  ? "bg-rose-500 hover:bg-rose-600" 
                                  : "bg-amber-500 hover:bg-amber-600"
                              } text-white shadow-md`}
                              onClick={() => toggleFlagUser(selectedUser.id)}
                            >
                              <FaFlag className="mr-2" />
                              {selectedUser.flagged ? "Remove Flag" : "Flag User"}
                            </button>
                            <button 
                              className="w-full px-4 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg flex items-center justify-center transition duration-200 shadow-md"
                              onClick={() => deleteUser(selectedUser.id)}
                            >
                              <FaTrash className="mr-2" />
                              Delete User
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "orders" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4 text-slate-700">Order History</h3>
                      {selectedUser.orders.length > 0 ? (
                        <div className="grid gap-4">
                          {selectedUser.orders.map((order, index) => (
                            <div key={index} className="bg-slate-50 p-4 rounded-lg flex items-center justify-between">
                              <div className="flex items-center">
                                <FaCalendarAlt className="text-indigo-600 mr-3" />
                                <div>
                                  <p className="font-medium text-slate-700">{order.restaurantName}</p>
                                  <p className="text-sm text-slate-500">{order.date}</p>
                                </div>
                              </div>
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm">
                                Completed
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 bg-slate-50 rounded-lg">
                          <FaHistory className="mx-auto text-slate-400 text-4xl mb-2" />
                          <p className="text-slate-500">No orders found</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "comments" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4 text-slate-700">User Comments</h3>
                      {selectedUser.comments.length > 0 ? (
                        <div className="grid gap-4">
                          {selectedUser.comments.map((comment, index) => (
                            <div key={index} className="bg-slate-50 p-4 rounded-lg">
                              <div className="flex items-center mb-2">
                                <FaComments className="text-indigo-600 mr-2" />
                                <span className="font-medium text-slate-700">{comment.restaurantName}</span>
                              </div>
                              <p className="text-slate-600 pl-7">{comment.text}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 bg-slate-50 rounded-lg">
                          <FaComments className="mx-auto text-slate-400 text-4xl mb-2" />
                          <p className="text-slate-500">No comments found</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4 text-slate-700">User Reviews</h3>
                      <div className="text-center py-8 bg-slate-50 rounded-lg">
                        <FaStar className="mx-auto text-slate-400 text-4xl mb-2" />
                        <p className="text-slate-500">No reviews available</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
