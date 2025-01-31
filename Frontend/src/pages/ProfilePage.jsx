import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { current_user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  // If there is no current_user, navigate to login page
  useEffect(() => {
    if (!current_user) {
      navigate("/login");  // Redirect to login if user is not authenticated
    }
  }, [current_user, navigate]);  // Re-run the effect when `current_user` changes

  if (!current_user) {
    return <div>Loading...</div>;  // Optionally, show a loading state while redirecting
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Profile</h2>

      <div className="space-y-4">
        {/* Username */}
        <div className="flex justify-between">
          <h3 className="text-xl font-medium text-gray-600">Username</h3>
          <p className="text-gray-800">{current_user.username}</p>
        </div>

        {/* Email */}
        <div className="flex justify-between">
          <h3 className="text-xl font-medium text-gray-600">Email</h3>
          <p className="text-gray-800">{current_user.email}</p>
        </div>

        {/* Approval Status */}
        <div className="flex justify-between">
          <h3 className="text-xl font-medium text-gray-600">Approval Status</h3>
          <p className={`text-sm font-semibold ${current_user.is_approved ? "text-green-600" : "text-red-600 border p-3"}`}>
            {current_user.is_approved ? "Approved" : "Pending Approval"}
          </p>
        </div>

        {/* Admin Status */}
        <div className="flex justify-between">
          <h3 className="text-xl font-medium text-gray-600">Admin Status</h3>
          <p className={`text-sm font-semibold ${current_user.is_admin ? "text-blue-900" : "text-orange-600 border p-3"}`}>
            {current_user.is_admin ? "Admin" : "User"}
          </p>
        </div>
      </div>

      {/* Update Profile Button */}
      <div className="mt-6 flex justify-end">
        <button className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Update Profile
        </button>
      </div>

      {/* Logout Button */}
      <div className="mt-4 flex justify-end">
        <button
          className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
