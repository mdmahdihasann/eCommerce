import React from "react";

const ProfileTabs = ({setActiveTab, activeTab}) => {
  return (
    <div className="flex border-b border-gray-200">
      {["profile", "order-details", "logout"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 text-center py-3 font-medium transition-colors ${
            activeTab === tab
              ? "border-b-4 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          {tab === "profile"
            ? "Profile"
            : tab === "order-details"
            ? "Order Details"
            : "Logout"}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;
