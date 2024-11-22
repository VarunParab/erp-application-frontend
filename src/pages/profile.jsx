import React from "react";
import Dashboard from "../components/dashboard";
import ProfileCard from "../components/Modals/profileModal";

function Profile() {
  return (
    <div className="flex bg-gray-200">
      {/* Sidebar with Dashboard */}
      <div className="w-[242.01px]">
        <Dashboard />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-50 p-7 overflow-y-auto h-screen bg-white rounded-2xl mt-3 ml-3 mr-3">
        <h1 className="text-2xl font-extrabold ml-3 mb-4">👤 Profile</h1>

        {/* Grid Container */}
        <div className="grid grid-rows-3 gap-4 h-full">
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-4">
            {/* Small Grid */}
            <ProfileCard />

            {/* Large Grid */}
            <div className="col-span-2 h-[680px] bg-white border-solid border-2 border-gray-100 rounded-3xl shadow-md p-4">
              <h2 className="text-lg font-bold">Your Details</h2>

              {/* Form Section */}
              <div className="mt-4 space-y-4">
                {/* Name */}
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Employee ID</label>
                  <input
                    type="text"
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your employee ID"
                    value={"ET-1234"}
                    disabled
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your name"
                    value={"John Doe"}
                    disabled
                  />
                </div>
                {/* Email */}
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your email"
                    disabled
                    value={"johndoe@gmail.com"}
                  />
                </div>
                {/* Phone */}
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Contact Number</label>
                  <input
                    type="text"
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your contact number"
                    value={"1234567890"}
                    disabled
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Department</label>
                  <input
                    type="text"
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your department"
                    value={"Sales"}
                    disabled
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Employee Type</label>
                  <input
                    type="text"
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your employee type"
                    value={"Full-time"}
                    disabled
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Reporting Manager</label>
                  <input
                    type="text"
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your reporting manager"
                    value={"Jane Doe"}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-4">
            {/* Small Grid Below the ProfileCard */}
            <div className="h-[360px] bg-white mt-16 border-solid border-2 border-gray-100 rounded-3xl shadow-md p-4">
              <h2 className="text-lg font-bold">Attendance and Leaves</h2>
              <div className="mt-4 space-y-4">
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Total Attendance</label>
                  <input
                    type="text"
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter attendance"
                    value={"71"}
                    disabled
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Leaves Balance</label>
                  <input
                    type="text"
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your leave balance"
                    value={"8"}
                    disabled
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Leaves Taken</label>
                  <input
                    type="text"
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your leaves taken"
                    value={"2"}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
