import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto"; // Auto import for Chart.js

const BarChartComponent = () => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null); // Keep track of the Chart.js instance
  const [duration, setDuration] = useState("5"); // Default to "5 Clients"
  
  const updateChartData = (duration) => {
    let labels = [];
    let data = [];

    // Example data based on the duration selected
    if (duration === "5") {
      labels = ["Client-1", "Client-2", "Client-3", "Client-4", "Client-5"];
      data = [25, 40, 70, 80, 60];
    } else if (duration === "7") {
      labels = ["Client-1", "Client-2", "Client-3", "Client-4", "Client-5","Client-6", "Client-7"];
      data = [10, 50, 30, 70, 90,60,50];
    } else if (duration === "10") {
      labels = ["Client-1", "Client-2", "Client-3", "Client-4", "Client-5","Client-6", "Client-7","Client-8", "Client-9", "Client-10"];
      data = [40, 60, 20, 55, 85,60,20,40,56,33];
    } else {
      labels = [];
      data = [];
    }

    const ctx = chartRef.current.getContext("2d");

    // Create gradient colors
    const backgroundColors = data.map((value) => createGradient(ctx, value));

    return {
      labels,
      datasets: [
        {
          label: " Value",
          data,
          backgroundColor: backgroundColors,
          borderColor: ["white"],
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    };
  };

  const createGradient = (ctx, value) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    if (value <= 25) {
      gradient.addColorStop(0, "rgba(255, 0, 0, 0.9)");
      gradient.addColorStop(1, "rgba(255, 99, 71, 0.3)");
    } else if (value <= 50) {
      gradient.addColorStop(0, "rgba(255, 255, 0, 0.9)");
      gradient.addColorStop(1, "rgba(255, 223, 0, 0.3)");
    } else if (value <= 75) {
      gradient.addColorStop(0, "rgba(255, 165, 0, 0.9)");
      gradient.addColorStop(1, "rgba(255, 140, 0, 0.3)");
    } else {
      gradient.addColorStop(0, "rgba(0, 255, 0, 0.9)");
      gradient.addColorStop(1, "rgba(0, 128, 0, 0.3)");
    }
    return gradient;
  };

  useEffect(() => {
    // Destroy previous chart instance if it exists
    if (chartInstance) {
      chartInstance.destroy();
    }

    const newChartInstance = new Chart(chartRef.current.getContext("2d"), {
      type: "bar",
      data: updateChartData(duration),
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              display: true,
            },
            title: {
              display: true,
              text: "Progress (%)",
              font: {
                size: 12,
                weight: "bold",
              },
              color: "#000",
              padding: {
                top: 10,
              },
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });

    setChartInstance(newChartInstance);
  }, [duration]); // Recreate the chart whenever `duration` changes

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  return (
    <div className="bg-gray-50 h-72 rounded-3xl shadow-md p-5 relative border-solid border-2 border-gray-200">
      <div className="text-xl font-bold mb-4">
        <h2>Project Status</h2>
      </div>
      <div className="ml-5 text-xs absolute top-12 left-0 m-4">
        <h2 className="text-gray-900 text-sm">Progress %-</h2>
        <h2 className="text-gray-600">🟥 0  - 25%</h2>
        <h2 className="text-gray-600">🟨 26 - 50%</h2>
        <h2 className="text-gray-600">🟧 51 - 75%</h2>
        <h2 className="text-gray-600">🟩 76 - 100%</h2>
      </div>
      <div className="ml-0 absolute bottom-0 left-0 m-4 ml-2 mb-3">
        <div className="ml-0 absolute bottom-0 left-0 m-3 ml-2">
          <select
            value={duration}
            onChange={handleDurationChange}
            className="p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-24"
          >
            <option value="5">5 Clients</option>
            <option value="7">7 Clients</option>
            <option value="10">10 Clients</option>
          </select>
        </div>
      </div>
      <div className="absolute bottom-0 right-10 m-4">
        <div className="w-[350px] h-[200px]">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default BarChartComponent;
