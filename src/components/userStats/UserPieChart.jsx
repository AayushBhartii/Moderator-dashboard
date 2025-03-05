import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const UserPieChart = ({ data }) => {
    const COLORS = ["#4CAF50", "#FF5722", "#FFC107"];

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">User Statistics</h2>
            <PieChart width={300} height={300}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default UserPieChart;
