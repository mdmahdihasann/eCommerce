import React from "react";

const Profile = ({ activeTab }) => {
  return (
    <>
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
    </>
  );
};

export default Profile;
