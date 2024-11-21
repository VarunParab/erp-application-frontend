import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PerformanceChart = () => {
  const chartRef = useRef(null);

  // Example data for the chart
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"], // Time periods
    datasets: [
      {
        label: "Tasks Completed",
        data: [10, 20, 35, 45],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        fill: false, // Removes area fill
        borderWidth: 2,
        pointRadius: 4,
      },
      {
        label: "Deadlines Met",
        data: [8, 15, 28, 40],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
        fill: false,
        borderWidth: 2,
        pointRadius: 4,
      },
      {
        label: "Overdue Tasks",
        data: [5, 3, 2, 1],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
        fill: false,
        borderWidth: 2,
        pointRadius: 4,
      },
      {
        label: "Average Task Time (hrs)",
        data: [6, 5.5, 5, 4.8],
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        tension: 0.4,
        fill: false,
        borderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Show legend for clarity
      },
      title: {
        display: false,
        text: "Performance Metrics Over Time",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Metric Value",
          font: {
            size: 13,
            weight: "bold",
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Time Period",
          font: {
            size: 13,
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <div className="bg-gray-50 rounded-3xl shadow-md p-5 border-solid border-2 border-gray-200">
      <h2 className="text-xl font-bold mb-4">Performance Metrics</h2>
      <div>
        {/* Larger container for better visibility */}
        <div className="ml-10 h-[200px] w-full">
          <Line ref={chartRef} data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
