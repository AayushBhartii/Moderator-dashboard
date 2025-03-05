const ActiveUsers = ({ count }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <h3 className="text-lg font-bold">Active Users</h3>
            <p className="text-2xl font-semibold text-green-600">{count}</p>
        </div>
    );
};

export default ActiveUsers;
