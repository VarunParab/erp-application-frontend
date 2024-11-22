import React, { useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = () => {
  const chartRef = useRef(null);

  // Set initial chart data to 7-day data
  const initialData = {
    labels: ["Total tasks completed", "Total tasks pending"],
    datasets: [
      {
        label: " Value",
        data: [80, 20], // 7-day data
        backgroundColor: ["green", "red"],
        borderColor: ["white", "white"],
        borderWidth: 4,
        borderRadius: 8,
      },
    ],
  };

  const [chartData, setChartData] = useState(initialData);
  const [duration, setDuration] = useState("7");

  // Handle duration change
  const handleDurationChange = (event) => {
    const value = event.target.value;
    setDuration(value);

    // Update the chart data based on the selected duration
    if (value === "7") {
      setChartData({
        labels: ["Total tasks completed", "Total tasks pending"],
        datasets: [
          {
            label: "Value",
            data: [80, 20], // Example values for 7 days
            backgroundColor: ["green", "red"],
            borderColor: ["white", "white"],
            borderWidth: 4,
            borderRadius: 8,
          },
        ],
      });
    } else if (value === "30") {
      setChartData({
        labels: ["Total tasks completed", "Total tasks pending"],
        datasets: [
          {
            label: "Value",
            data: [70, 30], // Example values for 30 days
            backgroundColor: ["green", "red"],
            borderColor: ["white", "white"],
            borderWidth: 4,
            borderRadius: 8,
          },
        ],
      });
    } else if (value === "60") {
      setChartData({
        labels: ["Total tasks completed", "Total tasks pending"],
        datasets: [
          {
            label: "Value",
            data: [85, 15], // Example values for 60 days
            backgroundColor: ["green", "red"],
            borderColor: ["white", "white"],
            borderWidth: 4,
            borderRadius: 8,
          },
        ],
      });
    } else if (value === "90") {
      setChartData({
        labels: ["Total tasks completed", "Total tasks pending"],
        datasets: [
          {
            label: "Value",
            data: [65, 35], // Example values for 90 days
            backgroundColor: ["green", "red"],
            borderColor: ["white", "white"],
            borderWidth: 4,
            borderRadius: 8,
          },
        ],
      });
    } else {
      setChartData(initialData); // Default data
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "white",
        font: {
          size: 16,
          weight: "bold",
        },
        formatter: (value) => `${value}%`,
      },
    },
  };

  return (
    <div className="bg-gray-50 h-72 rounded-3xl shadow-md p-5 relative border-solid border-2 border-gray-200">
      <div className="text-xl font-bold mb-4">
        <h2>Total Task Status</h2>
      </div>
      <div className="ml-5 absolute top-12 left-0 m-4">
        <h2 className="text-gray-600">🟩 Total tasks completed</h2>
        <h2 className="text-gray-600">🟥 Total tasks pending</h2>
      </div>
      <div className="ml-0 absolute bottom-0 left-0 m-3 ml-4 mb-6">
        <select
          value={duration}
          onChange={handleDurationChange}
          className="p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-24"
        >
          <option value="7">7 Days</option>
          <option value="30">30 Days</option>
          <option value="60">60 Days</option>
          <option value="90">90 Days</option>
        </select>
      </div>
      <div className="absolute bottom-0 right-0 m-4">
        <div className="h-[220px] w-[220px]">
          <Pie ref={chartRef} data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PieChart;