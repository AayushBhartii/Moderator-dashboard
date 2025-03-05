import React from "react";

const OrderHistory = ({ orders }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order History</h3>
            {orders && orders.length > 0 ? (
                <ul className="space-y-3">
                    {orders.map((order, index) => (
                        <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md shadow-sm">
                            <div>
                                <p className="text-sm font-medium text-gray-800">{order.restaurantName}</p>
                                <p className="text-xs text-gray-500">{order.date}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-500">No orders found.</p>
            )}
        </div>
    );
};

export default OrderHistory;
