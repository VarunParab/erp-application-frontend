import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {useAuthStore} from "../store/useAuthStore"
const DateProfile = () => {
  const {authUser} = useAuthStore();
  const [currentDate, setCurrentDate] = useState({
    day: "",
    date: "",
    month: "",
  });

  const updateDate =() => {
    const date = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    setCurrentDate({
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()],
    });
  };
  useEffect(() => {
    updateDate(); // Initial call to set the date
    const timer = setInterval(() => {
      updateDate(); // Update date every 60 seconds
    }, 60000); // 1 minute interval

    return () => clearInterval(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <div className="flex items-center space-x-4 mr-5">
      {/* Date Block */}
      <div className="flex items-center bg-white text-black rounded-2xl py-1 px-2 shadow-md">
      <div className="bg-white border-solid border-2 border-gray-300 rounded-full px-2 py-1.5">
        <span className="text-2xl font-bold">{currentDate.date}</span>
        </div>
        <div className="flex items-center bg-white text-black">
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold ml-2">{currentDate.day}</span>
          <span className="text-xs text-gray-500 font-bold mr-1.5">{currentDate.month}</span>
        </div>
      </div>
      </div>

      {/* Profile Block */}
      <div className="flex items-center bg-white py-1 px-2 rounded-2xl shadow-md">
        <Link to="/profile" className="w-12 -12 rounded-full overflow-hidden">
          <img
          src={authUser.profilePic || "/avatar.png"}
          alt="User Profile"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
    </div>
  );
};

export default DateProfile;
