import React, { useState } from "react";
import ProfileTabs from "./ProfileTabs";
import Profile from "./Profile";
import OrderDetails from "./OrderDetails";
import Logout from "./Logout";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen py-10 px-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-xl border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
        </div>
        {/* Tabs */}
        <ProfileTabs setActiveTab={setActiveTab} activeTab={activeTab}/>
        {/* Tab Content */}
        <div className="p-6">
          <Profile activeTab={activeTab}/>

          <OrderDetails activeTab={activeTab}/>

          <Logout activeTab={activeTab}/>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
