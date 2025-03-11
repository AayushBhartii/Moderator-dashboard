import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import AccountManagement from "./AccountManageMent";
import SupportTickets from "./SupportTickets";
import PromotionsManager from "./PromotionsManager";
function DisplayCustomer({ item,color}) {

  
  const [customer,setCustomer]=useState(item);
  const [activeSection, setActiveSection] = useState("profile");
  useEffect(()=>{
    setCustomer(item);
  },[item])
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  const spendingData = [
    {
      year: "Previous Year",
      totalSpent: customer.orderHistory
        .filter((order) => new Date(order.date).getFullYear() === previousYear)
        .reduce((sum, order) => sum + order.amount, 0),
    },
    {
      year: "This Year",
      totalSpent: customer.orderHistory
        .filter((order) => new Date(order.date).getFullYear() === currentYear)
        .reduce((sum, order) => sum + order.amount, 0),
    },
  ];

    const handleActive = (status) => {
        setCustomer((prevCustomer) => ({
          ...prevCustomer,
          accountStatus: status === "active" ? "Active" : "Inactive",
        }));
      };
  
  return (
    <div className="p-6  ">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-16 h-16 flex items-center justify-center rounded-full text-white text-2xl font-bold ${color}`}>
          {customer.name.slice(0, 1).toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-semibold">{customer.name}</h1>
          <p className="text-gray-600">{customer.email}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-around border-b pb-2 mb-4">
        <button
          className={`px-4 py-2 font-semibold ${activeSection === "profile" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600"}`}
          onClick={() => setActiveSection("profile")}
        >
          Profile
        </button>
        <button
          className={`px-4 py-2 font-semibold ${activeSection === "orders" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600"}`}
          onClick={() => setActiveSection("orders")}
        >
          Order History
        </button>
        <button
          className={`px-4 py-2 font-semibold ${activeSection === "supportTickets" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600"}`}
          onClick={() => setActiveSection("supportTickets")}
        >
          supportTickets
        </button>
        
        <button
          className={`px-4 py-2 font-semibold ${activeSection === "engagement" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600"}`}
          onClick={() => setActiveSection("engagement")}
        >
          Engagement
        </button>
      </div>

      {/* Section Content */}
        {activeSection === "profile" && (
            <div className="text-gray-700 p-4 m-4">
                <p className="m-2">
                <span className="font-semibold">Phone:</span> {customer.phone}
                </p>
                <p className="m-2 ">
                <span className="font-semibold">Address:</span> {customer.address}
                </p>
                <p className="m-2 ">
                <span className="font-semibold">Account Status:</span>{" "}
                <span
                    className={`px-2 py-1 rounded ${
                    customer.accountStatus === "Active"
                        ? "bg-green-400 text-white"
                        : "bg-red-400 text-white"
                    }`}
                >
                    {customer.accountStatus}
                </span>
                </p>
                <p className="m-2 ">
                <span className="font-semibold">Loyalty Points:</span> {customer.loyaltyPoints}
                </p>
                <p className="m-2 ">
                <span className="font-semibold">Most Frequent Buyer:</span>{" "}
                <span
                    className={`px-2 py-1 rounded ${
                    customer.mostFrequentBuyer
                        ? "bg-blue-400 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                >
                    {customer.mostFrequentBuyer ? "Yes" : "No"}
                </span>
                </p>
                <p className="m-2 ">
                <span className="font-semibold">High-Value Customer:</span>{" "}
                <span
                    className={`px-2 py-1 rounded ${
                    customer.availableCustomer
                        ? "bg-purple-400 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                >
                    {customer.availableCustomer ? "Yes" : "No"}
                </span>
                </p>
                {customer.internalNotes && <p className="m-2 ">
                <span className="font-semibold">Internal Notes:</span> <span className="font-semibold">{customer.internalNotes}</span>
                </p>}
                <AccountManagement active={item.accountStatus} handleActive={handleActive}/>
            </div>
        )}


        {activeSection === "orders" && (
        <div>
            {/* Bar Chart Section */}
            <div className="h-64 mb-8">
            <h2 className="text-lg font-semibold mb-4">Order History - Spending Overview</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spendingData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalSpent" fill="#8884d8" name="Total Spent" />
                </BarChart>
            </ResponsiveContainer>
            </div>

            {/* Table Section */}
            <div>
            <h2 className="text-lg font-semibold mb-4">Detailed Order History</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Order ID</th>
                    <th className="border border-gray-300 p-2">Date</th>
                    <th className="border border-gray-300 p-2">Amount</th>
                </tr>
                </thead>
                <tbody>
                {customer.orderHistory.map((order, index) => (
                    <tr key={index} className="even:bg-gray-50">
                    <td className="border border-gray-300 p-2 text-center">{order.orderId}</td>
                    <td className="border border-gray-300 p-2 text-center">{order.date}</td>
                    <td className="border border-gray-300 p-2 text-center">${order.amount}</td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
            
                <tr>
                    <td colSpan="2" className="border border-gray-300 p-2 font-semibold text-right">
                    Orders Last Year
                    </td>
                    <td className="border border-gray-300 p-2 font-semibold text-center">{customer.ordersLastYear}</td>
                </tr>
                <tr>
                    <td colSpan="2" className="border border-gray-300 p-2 font-semibold text-right">
                    Orders This Year
                    </td>
                    <td className="border border-gray-300 p-2 font-semibold text-center">{customer.ordersThisYear}</td>
                </tr>
                <tr>
                    <td colSpan="2" className="border border-gray-300 p-2 font-semibold text-right">
                    Total Spending
                    </td>
                    <td className="border border-gray-300 p-2 font-semibold text-center">${customer.totalSpending}</td>
                </tr>
                </tfoot>
            </table>
            </div>
        </div>
        )}


      {activeSection === "engagement" && (
        <div className="text-gray-700">
          <h2 className="text-lg font-semibold mb-4">Customer Engagement</h2>
          <p className="mb-2">
            <span className="font-semibold">Loyalty Points:</span> {customer.loyaltyPoints}
          </p>
            <PromotionsManager promotionsSent={customer.promotionsSent}/>
        </div>
      )}
      {activeSection === "supportTickets" && (
        <div className="text-gray-700">
          <h2 className="text-lg font-semibold mb-4">Customer Support Tickets</h2>
            <SupportTickets supportTickets={customer.supportTickets}/>
        </div>
      )}
    </div>
  );
}

export default DisplayCustomer;
