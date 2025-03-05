const TotalUsers = ({ count }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <h3 className="text-lg font-bold">Total Users</h3>
            <p className="text-2xl font-semibold text-indigo-600">{count}</p>
        </div>
    );
};

export default TotalUsers;
