import React, { useState } from "react";
import Dashboard from "../components/dashboard";

// Reusable TaskCard Component
const TaskCard = ({ content, category, label, dueDate }) => {
  const [isChecked, setIsChecked] = useState(false);

  const bgColor = {
    Completed: "bg-green-200 border-solid border-2 border-green-300",
    Overdue: "bg-gray-300 border-solid border-2 border-gray-300",
    InProgress: "bg-yellow-100 border-solid border-2 border-yellow-300",
    New: "bg-blue-100 border-solid border-2 border-blue-300",
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  if (isChecked) {
    return null; // When checked, return null to hide the TaskCard completely
  }

  return (
    <div
      className={`text-black p-4 rounded-2xl shadow-md w-[240px] h-[140px] ${bgColor[category]} flex flex-col relative ml-6`}
    >
      {/* Title with truncation */}
      <div
        className={`font-semibold text-sm overflow-hidden text-ellipsis line-clamp-2 ${
          category === "Completed" ? "w-full" : "pr-8"
        }`}
      >
        {content}
      </div>

      {/* Conditionally render checkbox based on category */}
      {category !== "Completed" && (
        <div
          className="absolute top-2 right-2 w-6 h-6 bg-white border-2 border-gray-500 rounded-lg flex items-center justify-center"
          onClick={handleCheckboxChange}
        >
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="appearance-none w-4 h-4 rounded-sm checked:bg-green-500 checked:border-transparent"
          />
        </div>
      )}

      {/* Label and Due Date */}
      <div className="mt-4 mr-2 flex items-center justify-start">
        {label ? (
          <div
            className={`text-white text-xs px-2 py-1 rounded-lg ${
              label === "Completed" || label === "completed"
                ? "bg-green-500"
                : label === "ASAP" || label === "asap"
                ? "bg-red-500"
                : "bg-blue-500"
            }`}
          >
            {label}
          </div>
        ) : (
          <div className="h-6" /> // Placeholder for spacing when label is empty
        )}
      </div>
      <div className="mt-2 text-xs text-gray-500">{dueDate}</div>
    </div>
  );
};

const Task = () => {
  // Define task data for each category
  const tasks = {
    New: [
      {
        content: "Review and comment website design",
        label: "ASAP",
        dueDate: "6 days left",
      },
      {
        content: "Prepare design files for web developer developer",
        label: "",
        dueDate: "3 days left",
      },
      {
        content: "Send new website link to the team",
        label: "Feedback",
        dueDate: "5 days left",
      },
    ],
    InProgress: [
      {
        content: "Design the entire web in a chosen style",
        label: "ASAP",
        dueDate: "1 day left",
      },
      {
        content: "Write meta title and meta description",
        label: "Low Priority",
        dueDate: "4 days left",
      },
      {
        content: "Develop website using CMS platform",
        label: "",
        dueDate: "2 days left",
      },
    ],
    Overdue: [
      {
        content: "Write website copy in a detailed manner",
        label: "Low Priority",
        dueDate: "2 days ago",
      },
      {
        content: "Design drafts in 3 different styles",
        label: "",
        dueDate: "5 days ago",
      },
    ],
    Completed: [
      {
        content: "Develop a structure for a new website",
        label: "Completed",
        dueDate: "1 day ago",
      },
    ],
  };

  // Find the maximum number of tasks in any category to set the row count
  const maxTasks = Math.max(
    ...Object.values(tasks).map((category) => category.length)
  );

  return (
    <div className="flex bg-gray-200">
      {/* Sidebar with Dashboard */}
      <div className="w-[242.01px]">
        <Dashboard />
      </div>

      {/* Main Content Area */}
      <div className="min-h-screen p-7 w-full bg-white rounded-2xl mt-3 ml-3 mr-3">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-extrabold ml-2">Tasks</h1>
          <button className="bg-green-600 hover:bg-green-700 text-white text-sm mt-1 font-medium py-2 px-4 rounded-full">
            + Add new
          </button>
        </div>

        <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-400" />

        {/* Categories Header */}
        <div className="grid grid-cols-4 gap-2 text-center">
          {["New Task", "In progress", "Overdue", "Completed"].map(
            (category, index) => (
              <div key={index} className="col-span-1 font-semibold">
                {category}
              </div>
            )
          )}
        </div>

        <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-400" />

        {/* Task Grid */}
        <div className="grid grid-cols-4 gap-4 divide-x divide-gray-300">
          {Object.keys(tasks).map((category, index) => (
            <div key={index} className="grid gap-4">
              {tasks[category].map((task, i) => (
                <TaskCard
                  content={task.content}
                  category={category}
                  label={task.label}
                  dueDate={task.dueDate}
                  key={i}
                /> // Pass task content, label, and due date
              ))}
              {/* Only render empty placeholders if there are fewer tasks than maxTasks */}
              {tasks[category].length < maxTasks &&
                Array.from({ length: maxTasks - tasks[category].length }).map(
                  (_, i) => (
                    <div
                      key={`empty-placeholder-${i}`}
                      className="w-[265px] h-[150px]"
                    ></div> // Placeholder div
                  )
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Task;