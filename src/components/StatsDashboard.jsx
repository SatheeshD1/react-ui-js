// components/StatsDashboard.jsx
import React from 'react';
import { FaAmazonPay,FaCcVisa  } from 'react-icons/fa'; // Example icons

const statsData = [{
    id: 1,
    icon: <FaAmazonPay size={50} />,
    title: "Inward",
    value: "50000000",
    change: null,
    changeType: "increase"
},
{
    id: 2,
    icon: <FaCcVisa size={50}/>,
    title: "Outward",
    value: "545456",
    change: null,
    changeType: "decrease"
}
];

const StatCard = ({ icon, title, value, change, changeType }) => {
    const isIncrease = changeType === 'increase';
    const changeColor = isIncrease ? 'text-green-500' : 'text-red-500';
    const arrowIcon = isIncrease ? '↑' : '↓';

    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex-1">
            <div className="flex items-center mb-4">
                <div className="bg-purple-600 p-3 rounded-md mr-4">
                    {icon}
                </div>
                <h3 className="text-gray-600 text-base">{title}</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-2">{value}</p>
            <div className="flex items-center text-sm">
                <span className={`${changeColor} font-semibold mr-1`}>{arrowIcon}{change}</span>
            </div>
            <a href="#" className="text-blue-500 hover:underline mt-4 block">View all</a>
        </div>
    );
};

const StatsDashboard = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen bg-[linear-gradient(to_right,#5B86E5,#36D1DC)]">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Last 30 days</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statsData.map((stat) => (
                    <StatCard
                        key={stat.id}
                        icon={stat.icon}
                        title={stat.title}
                        value={stat.value}
                        change={stat.change}
                        changeType={stat.changeType}
                    />
                ))}
            </div>
        </div>
    );
};

export default StatsDashboard;
