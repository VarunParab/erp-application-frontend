import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // Import all Chart.js components
//import "chart.js/dist/Chart.css"; // Import Chart.js CSS
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS for styling

const LineChart = () => {
  // Sample data for total hours logged in each week for 3 months (12 weeks)
  const totalHoursLogged = Array.from({ length: 12 }, () => Math.floor(Math.random() * (55 - 36+ 1)) + 36); // Random hours between 20 to 40

  const data = {
    labels: Array.from({ length: 12 }, (_, index) => `Week ${index + 1}`),
    datasets: [
      {
        label: 'Total Hours Logged (Weekly)',
        data: totalHoursLogged,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,plugins: {
        legend: {
          display: false, // Hide legend for a cleaner look
        },
      },
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Weeks',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Hours',
          font:{
            size: 12,
            weight: 'bold',
          }
        },
      },
    },
  };

  return (
    <div className="bg-gray-50 h-72 rounded-3xl shadow-md p-5 relative border-solid border-2 border-gray-200">
      <div className="text-xl font-bold mb-4">
        <h2> Total Hours Logged in a Week (3 Months)</h2>
      </div>
      <div className="absolute bottom-0 right-0 m-4">
        <div className="h-[220px] w-[500px]">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
