import { Icon } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Dashboard from "../components/dashboard";
import DateProfile from "../components/dateprofile";

const Homepage = () => {
  let progressBarColor;
  const progress = 20;
  if (progress < 40) {
    progressBarColor = "bg-red-600";
  } else if (progress >= 40 && progress < 70) {
    progressBarColor = "bg-orange-600";
  } else {
    progressBarColor = "bg-green-600";
  }

  // Initial countdown time in seconds (for example, 10 seconds)
  const initialTime = 0;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    // If timeLeft is 0, stop the timer
    if (timeLeft <= 0) return;

    // Set an interval to decrease timeLeft every second
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clear the interval when the component is unmounted or timeLeft reaches 0
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex bg-gray-200" style={{ maxHeight: "100vh", overflowY: "auto" }}>
      <div className="w-[242.01px]">
        <Dashboard />
      </div>
      {/* -----Dashboard name ----------*/}
      <div className="flex-1 ml-50 p-7 overflow-y-auto h-screen bg-white rounded-2xl mt-3 ml-3 mr-3">
        <div className="headingdash flex items-center justify-between">
          <div className="flex items-center">
            <DashboardIcon className="text-2xl" style={{ marginRight: "2px" }} />{" "}
            {/* Icon with spacing */}
            <h1 className="text-3xl font-extrabold ml-2">Dashboard</h1>
          </div>
          {/* Hi, User with profile circle and dummy photo */}
          <DateProfile />

        </div>
        {/* -----Grids ----------*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6">
          {/* -----Reverse Countdown ----------*/}
          <div className="bg-white text-black p-6 rounded-3xl shadow-md sm:w-full h-[180px] md:w-[340px] border-solid border-2 border-gray-200">
            <h1 className="text-2xl font-bold mb-4">⏱️ Reverse Countdown</h1>
            <h4 className="text-5xl font-extrabold text-center mt-8">
              {timeLeft > 0
                ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
                    2,
                    "0"
                  )}:${String(seconds).padStart(2, "0")}`
                : "Time's up!"}
            </h4>
          </div>
          {/* -------Current Task ----------*/}
          <div className="bg-yellow-100 text-black p-6 rounded-3xl shadow-md sm:w-full h-[180px] md:w-[340px] border-solid border-2 border-yellow-300">
            <h1 className="text-2xl font-bold mb-4">🚀 Ongoing Task</h1>
            <div className="flex items-center">
              {/* Progress bar container */}
              <div className="w-[300px]">
                {/* Progress Bar */}
                <div className="relative bg-gray-600 rounded-full h-3 dark:bg-gray-700 mb-1">
                  <div
                    className={`${progressBarColor} h-2.5 rounded-full`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                {/* Title and Percentage Row */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold truncate">
                    Design architecture
                  </span>
                  <span className="text-gray-700 font-semibold">
                    {progress}%
                  </span>
                </div>
              </div>
            </div>
            <div className="text-sm text-red-800 mt-8">
              Due: 12-09-2024 at 11:00 AM
            </div>
          </div>
          {/* -------upcoming deadline ----------*/}
          <div className="bg-red-200 text-black p-6 rounded-3xl shadow-md sm:w-full h-[180px] md:w-[340px] border-solid border-2 border-red-300">
            <h1 className="text-2xl font-bold mb-4">⏰ Upcoming Deadline</h1>
            <ul>
              <li className="text-1xl font-semibold">E-commerce Web Application</li>
              <li className="text-sm">Status: Development</li>
              <br />
              <li className="text-xs">Due: 7-11-2024</li>
            </ul>
          </div>
          {/* -------to-do list status ----------*/}
          <div className="bg-white text-black p-6 rounded-3xl shadow-md sm:w-full h-[380px] md:w-[340px] divide-y divide-solid border-solid border-2 border-gray-200">
            <h1 className="text-2xl font-bold mb-4">✅ Today's To-Do List</h1>
            <ul>
              <li className="text-1xl font-bold">Brand color</li>
              <li className="text-sm mt-1 truncate">Establish Brand color</li>
            </ul>
            <br />
            <ul>
              <li className="text-1xl font-bold">Typography</li>
              <li className="text-sm mt-1 truncate">Define Typography Standards</li>
            </ul>
            <br />
            <ul>
              <li className="text-1xl font-bold">Iconography</li>
              <li className="text-sm mt-1 truncate">Set Iconography Guidelines</li>
            </ul>
            <br />
            <ul>
              <li className="text-1xl font-bold">Patterns</li>
              <li className="text-sm mt-1 truncate">Mapout Interaction Patterns</li>
            </ul>
          </div>
          {/* -------project status ----------*/}
          <div className="bg-white text-black p-6 rounded-3xl shadow-md sm:w-full h-[380px] md:w-[340px] divide-y divide-solid border-solid border-2 border-gray-200">
            <h1 className="text-2xl font-bold mb-4">📁 Project Status</h1>
            <ul>
              <li className="text-1xl font-bold">Mocha Website Re-design</li>
              <li className="text-sm mt-1">Status: Completed</li>
              <li className="text-xs">Completed: 7-11-2024</li>
            </ul>
            <br />
            <ul>
              <li className="text-1xl font-bold">E-commerce Web Application</li>
              <li className="text-sm mt-1">Status: Development</li>
              <li className="text-xs">Due: 7-11-2024</li>
            </ul>
            <br />
            <ul>
              <li className="text-1xl font-bold">Quest Web</li>
              <li className="text-sm mt-1">Status: Pending</li>
              <li className="text-xs">Due: 13-11-2024</li>
            </ul>
            <br />
          </div>
          {/* -------Notifications ----------*/}
          <div className="bg-white text-black p-6 rounded-3xl shadow-md sm:w-full h-[380px] md:w-[340px] divide-y divide-solid border-solid border-2 border-gray-200">
            <h1 className="text-2xl font-bold mb-4">🔔 Notifications</h1>
            <ul>
              <li className="text-1xl font-bold">Website</li>
              <li className="text-sm mt-1 truncate">
                project is 2 day behind the Due Date and
              </li>
            </ul>
            <br />
            <ul>
              <li className="text-1xl font-bold">QA</li>
              <li className="text-sm mt-1 truncate">
                Project complete but some errors persist
              </li>
            </ul>
            <br />
            <ul>
              <li className="text-1xl font-bold">Back-end</li>
              <li className="text-sm mt-1 truncate">
                Completed the code integration task
              </li>
            </ul>
            <br />
            <ul>
              <li className="text-1xl font-bold">Front-end team</li>
              <li className="text-sm mt-1 truncate">
                The app will not be fully mobile responsive
              </li>
            </ul>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
