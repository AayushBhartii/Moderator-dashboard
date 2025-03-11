import React, { useState, useEffect } from "react";
import { FaUserCircle, FaBan, FaFlag, FaTrash, FaHistory, FaComments, FaStar, FaUserCog, FaCalendarAlt,FaTenge,FaHandsHelping, FaClock } from 'react-icons/fa';
import LeftPanel from "../components/LeftPanel";
import UserStatsDashboard from "../components/userStats/UserStatsDashboard";
import TopBar from "../components/TopBar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import SupportTickets from "./SupportTickets";
import PromotionsManager from "./PromotionsManager";

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
  const [customer, setCustomer] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      phone: "+1 234-567-8900",
      address: "123 Main St, City, Country",
      avatar: "https://via.placeholder.com/50",
      banned: false,
      flagged: false,
      accountStatus: "Active",
      loyaltyPoints: 150,
      promotionsSent: [
        { id: 1, name: "Welcome Bonus", date: "2024-01-15" },
        { id: 2, name: "Birthday Special", date: "2024-02-01" }
      ],
      supportTickets: [
        { id: 1, issue: "Order Delay", status: "Resolved", date: "2024-01-20" },
        { id: 2, issue: "Payment Issue", status: "Pending", date: "2024-02-05" }
      ],
      orders: [
        { restaurantName: "Krupa Mess", date: "2023-12-01", amount: 45.99 },
        { restaurantName: "Spicy Bites", date: "2023-12-15", amount: 32.50 },
        { restaurantName: "The Food Hub", date: "2023-12-20", amount: 28.75 },
      ],
      comments: [
        {
          restaurantName: "Krupa Mess",
          text: "Great food but terrible service!",
        },
      ],
      orderHistory: [
        { orderId: "ORD001", date: "2023-12-01", amount: 45.99 },
        { orderId: "ORD002", date: "2023-12-15", amount: 32.50 },
        { orderId: "ORD003", date: "2023-12-20", amount: 28.75 },
      ],
      ordersLastYear: 12,
      ordersThisYear: 8,
      totalSpending: 450.75,
    },
    {
      id: 2,
      name: "Jane Smith",
      username: "janesmith",
      email: "jane@example.com",
      phone: "+1 234-567-8901",
      address: "456 Elm St, City, Country",
      avatar: "https://via.placeholder.com/50",
      banned: false,
      flagged: true,
      accountStatus: "Active",
      loyaltyPoints: 100,
      promotionsSent: [],
      supportTickets: [],
      orders: [
        { restaurantName: "Pasta Point", date: "2023-11-25", amount: 25.00 },
        { restaurantName: "The Curry House", date: "2023-12-05", amount: 30.00 },
      ],
      comments: [
        {
          restaurantName: "Pasta Point",
          text: "Loved the pasta! Will visit again.",
        },
      ],
      orderHistory: [
        { orderId: "ORD004", date: "2023-11-25", amount: 25.00 },
        { orderId: "ORD005", date: "2023-12-05", amount: 30.00 },
      ],
      ordersLastYear: 2,
      ordersThisYear: 2,
      totalSpending: 55.00,
    },
    {
      id: 3,
      name: "Michael Brown",
      username: "mikebrown",
      email: "michael@example.com",
      phone: "+1 234-567-8902",
      address: "789 Oak St, City, Country",
      avatar: "https://via.placeholder.com/50",
      banned: true,
      flagged: false,
      accountStatus: "Inactive",
      loyaltyPoints: 0,
      promotionsSent: [],
      supportTickets: [],
      orders: [
        { restaurantName: "Burger Haven", date: "2023-12-10", amount: 35.00 },
      ],
      comments: [
        {
          restaurantName: "Burger Haven",
          text: "Worst burger I've ever had. Avoid!",
        },
      ],
      orderHistory: [
        { orderId: "ORD006", date: "2023-12-10", amount: 35.00 },
      ],
      ordersLastYear: 1,
      ordersThisYear: 0,
      totalSpending: 35.00,
    },
    {
      id: 4,
      name: "Emily Davis",
      username: "emilydavis",
      email: "emily@example.com",
      phone: "+1 234-567-8903",
      address: "101 Pine St, City, Country",
      avatar: "https://via.placeholder.com/50",
      banned: false,
      flagged: true,
      accountStatus: "Active",
      loyaltyPoints: 50,
      promotionsSent: [],
      supportTickets: [],
      orders: [
        { restaurantName: "Green Leaf Cafe", date: "2023-11-30", amount: 20.00 },
        { restaurantName: "Krupa Mess", date: "2023-12-12", amount: 40.00 },
      ],
      comments: [
        {
          restaurantName: "Green Leaf Cafe",
          text: "Beautiful ambiance and great salads!",
        },
      ],
      orderHistory: [
        { orderId: "ORD007", date: "2023-11-30", amount: 20.00 },
        { orderId: "ORD008", date: "2023-12-12", amount: 40.00 },
      ],
      ordersLastYear: 1,
      ordersThisYear: 2,
      totalSpending: 60.00,
    },
    {
      id: 5,
      name: "Sophia Wilson",
      username: "sophiawilson",
      email: "sophia@example.com",
      phone: "+1 234-567-8904",
      address: "202 Maple St, City, Country",
      avatar: "https://via.placeholder.com/50",
      banned: true,
      flagged: true,
      accountStatus: "Inactive",
      loyaltyPoints: 0,
      promotionsSent: [],
      supportTickets: [],
      orders: [
        { restaurantName: "Pizza Palace", date: "2023-12-01", amount: 30.00 },
        { restaurantName: "The Grill Station", date: "2023-12-16", amount: 25.00 },
      ],
      comments: [
        {
          restaurantName: "Pizza Palace",
          text: "Pizza was too oily, but the staff was kind.",
        },
      ],
      orderHistory: [
        { orderId: "ORD009", date: "2023-12-01", amount: 30.00 },
        { orderId: "ORD010", date: "2023-12-16", amount: 25.00 },
      ],
      ordersLastYear: 1,
      ordersThisYear: 1,
      totalSpending: 55.00,
    },
    {
      id: 6,
      name: "James Taylor",
      username: "jamestaylor",
      email: "james@example.com",
      phone: "+1 234-567-8905",
      address: "303 Cedar St, City, Country",
      avatar: "https://via.placeholder.com/50",
      banned: false,
      flagged: false,
      accountStatus: "Active",
      loyaltyPoints: 75,
      promotionsSent: [],
      supportTickets: [],
      orders: [
        { restaurantName: "Fusion Feast", date: "2023-12-18", amount: 50.00 },
      ],
      comments: [
        {
          restaurantName: "Fusion Feast",
          text: "Creative dishes, but portions are small.",
        },
      ],
      orderHistory: [
        { orderId: "ORD011", date: "2023-12-18", amount: 50.00 },
      ],
      ordersLastYear: 1,
      ordersThisYear: 1,
      totalSpending: 50.00,
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

  // Function to handle account status changes
  const handleActive = (status) => {
    if (selectedUser) {
      setSelectedUser(prevUser => ({
        ...prevUser,
        accountStatus: status === "active" ? "Active" : "Inactive"
      }));
    }
  };

  // Calculate spending data for the selected user
  const calculateSpendingData = (user) => {
    if (!user || !user.orderHistory) return [];
    
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;

    return [
      {
        year: "Previous Year",
        totalSpent: user.orderHistory
          .filter((order) => new Date(order.date).getFullYear() === previousYear)
          .reduce((sum, order) => sum + (order.amount || 0), 0),
      },
      {
        year: "This Year",
        totalSpent: user.orderHistory
          .filter((order) => new Date(order.date).getFullYear() === currentYear)
          .reduce((sum, order) => sum + (order.amount || 0), 0),
      },
    ];
  };

  // Update customer when selected user changes
  useEffect(() => {
    if (selectedUser) {
      setCustomer(selectedUser);
    }
  }, [selectedUser]);

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
                    { id: "support", icon: FaHandsHelping, label: "Support" },
                    { id: "engagement", icon: FaTenge, label: "Engagement" },
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
                              <span className="font-medium w-24 text-slate-600">Phone:</span>
                              <span className="text-slate-700">{selectedUser.phone || 'N/A'}</span>
                            </p>
                            <p className="flex items-center">
                              <span className="font-medium w-24 text-slate-600">Address:</span>
                              <span className="text-slate-700">{selectedUser.address || 'N/A'}</span>
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
                              <span className="font-medium w-24 text-slate-600">Loyalty:</span>
                              <span className="text-slate-700">{selectedUser.loyaltyPoints || 0} points</span>
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
                      {/* Bar Chart Section */}
                      <div className="h-64 mb-8">
                        <h2 className="text-lg font-semibold mb-4">Order History - Spending Overview</h2>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={calculateSpendingData(selectedUser)}>
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="totalSpent" fill="#8884d8" name="Total Spent" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <h3 className="text-lg font-semibold mb-4 text-slate-700">Order History</h3>
                      {selectedUser.orders && selectedUser.orders.length > 0 ? (
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
                                {order.amount ? `$${order.amount}` : 'Completed'}
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
                  {activeTab === "engagement" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4 text-slate-700">Customer Engagement</h3>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="mb-4">
                          <span className="font-semibold">Loyalty Points:</span> {selectedUser.loyaltyPoints || 0}
                        </p>
                        {selectedUser.promotionsSent && (
                          <PromotionsManager promotionsSent={selectedUser.promotionsSent} />
                        )}
                      </div>
                    </div>
                  )}
                   {activeTab === "support" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4 text-slate-700">Customer Support Tickets</h3>
                      {selectedUser.supportTickets ? (
                        <SupportTickets supportTickets={selectedUser.supportTickets} />
                      ) : (
                        <div className="text-center py-8 bg-slate-50 rounded-lg">
                          <FaComments className="mx-auto text-slate-400 text-4xl mb-2" />
                          <p className="text-slate-500">No support tickets found</p>
                        </div>
                      )}
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
