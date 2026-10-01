import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

// You would typically import icons from a library like Heroicons
// For demonstration, we'll keep the SVG paths directly within the component
const PersonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2" // In JSX, 'stroke-width' becomes 'strokeWidth'
  >
    <path
      strokeLinecap="round" // In JSX, 'stroke-linecap' becomes 'strokeLinecap'
      strokeLinejoin="round" // In JSX, 'stroke-linejoin' becomes 'strokeLinejoin'
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const CompanyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

const TeamMembersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 20h2a2 2 0 002-2V8a2 2 0 00-2-2h-2M4 16V4a2 2 0 012-2h12a2 2 0 012 2v12m-6 4h3m-3 0h-3m-3 0h-3m-3 0V4"
    />
  </svg>
);

const BillingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
);

const TabBar = () => {
  const [activeTab, setActiveTab] = useState('My Account'); // State to manage active tab

  const tabs = [
    { name: 'My Account', icon: <PersonIcon />, path:"tab-1"},
    { name: 'Company', icon: <CompanyIcon />, path:"tab-2"},
    { name: 'Team Members', icon: <TeamMembersIcon />, path:"tab-3"},
    { name: 'Billing', icon: <BillingIcon />, path:"tab-4"},
  ];

  return (
    <div className="">
      <nav>
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <NavLink to={tab.path}>
          <button
            key={tab.name} // Key prop for list rendering in React
            className={`
              flex items-center px-4 py-3 focus:outline-none
              ${activeTab === tab.name
                ? 'text-indigo-700 border-b-2 border-indigo-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
            onClick={() => setActiveTab(tab.name)} // Update active tab on click
          >
            {tab.icon}
            {tab.name}
          </button>
          </NavLink>
        ))}
      </div>
      </nav>
      <Outlet/>
    </div>
  );
};

export default TabBar;