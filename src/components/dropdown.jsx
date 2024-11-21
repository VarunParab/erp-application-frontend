import React, { useState } from "react";

function Dropdown() {
  const [duration, setDuration] = useState("0"); // Default to "Last 7 Days"

  // Handle duration change
  const handleDurationChange = (event) => {
    setDuration(event.target.value);
    // Here you can trigger the chart update logic based on the selected duration
    console.log("Selected Duration:", event.target.value);
  };

  return (
    <div className="ml-0 absolute bottom-0 left-0 m-3 ml-2">
      {/* Select Dropdown for Duration */}
      <select
        value={duration}
        onChange={handleDurationChange}
        className="p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-24"
      >
        <option value="0">Duration</option>
        <option value="7">7 Days</option>
        <option value="30">30 Days</option>
        <option value="60">60 Days</option>
        <option value="90">90 Days</option>
      </select>
    </div>
  );
}

export default Dropdown;
