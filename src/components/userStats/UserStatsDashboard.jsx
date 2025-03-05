import React from "react";
import TotalUsers from "./TotalUsers";
import ActiveUsers from "./ActiveUsers";
import BannedUsers from "./BannedUsers";
import FlaggedUsers from "./FlaggedUsers";
import InactiveUsers from "./InactiveUsers";
import UniqueUsers from "./UniqueUsers";
import BounceRate from "./BounceRate";
import TurnaroundRatio from "./TurnaroundRatio";
import UserPieChart from "./UserPieChart";
import LoyalUserGrowthChart from "./LoyalUserGrowthChart";

const UserStatsDashboard = ({
    totalUsers,
    activeUsers,
    bannedUsers,
    flaggedUsers,
    inactiveUsers,
    uniqueUsers,
    bounceRate,
    turnaroundRatio,
    pieChartData,
    loyalUserData,
}) => {
    return (
        <div className="space-y-4">
            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <TotalUsers count={totalUsers} />
                <ActiveUsers count={activeUsers} />
                <BannedUsers count={bannedUsers} />
                <FlaggedUsers count={flaggedUsers} />
                <InactiveUsers count={inactiveUsers} />
                <UniqueUsers count={uniqueUsers} />
                <BounceRate rate={bounceRate} />
                <TurnaroundRatio ratio={turnaroundRatio} />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <LoyalUserGrowthChart data={loyalUserData} />
                <UserPieChart data={pieChartData} />
            </div>
        </div>
    );
};

export default UserStatsDashboard;
