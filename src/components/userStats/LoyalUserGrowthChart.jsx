import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const LoyalUserGrowthChart = ({ data }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Loyal User Growth Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="growth" stroke="#4F46E5" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LoyalUserGrowthChart;
