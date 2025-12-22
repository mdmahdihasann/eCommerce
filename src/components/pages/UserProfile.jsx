import React, { useState } from "react";

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

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "profile" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Profile Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <p>
                  <span className="font-medium">Name:</span> John Doe
                </p>
                <p>
                  <span className="font-medium">Email:</span> john.doe@example.com
                </p>
                <p>
                  <span className="font-medium">Phone:</span> 0123456789
                </p>
                <p>
                  <span className="font-medium">City:</span> Dhaka
                </p>
              </div>
            </div>
          )}

          {activeTab === "order-details" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Orders
              </h2>
              <div className="space-y-4">
                {/* Single Order */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                  <p className="font-medium text-gray-800">
                    Order ID: ORD-1703045123456
                  </p>
                  <p className="text-gray-600">Placed on: 21 Dec 2025</p>
                  <p className="mt-1 font-semibold text-gray-800">Total: $105</p>
                  <p className="text-yellow-600 font-semibold mt-1">Status: Pending</p>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                  <p className="font-medium text-gray-800">
                    Order ID: ORD-1703045123457
                  </p>
                  <p className="text-gray-600">Placed on: 20 Dec 2025</p>
                  <p className="mt-1 font-semibold text-gray-800">Total: $250</p>
                  <p className="text-green-600 font-semibold mt-1">Status: Completed</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "logout" && (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Logout
              </h2>
              <p className="text-gray-600 mb-4">
                Click the button below to logout from your account.
              </p>
              <button className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
