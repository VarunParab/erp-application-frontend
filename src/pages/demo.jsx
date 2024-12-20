import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../components/dashboard";
import TaskModal from "../components/Modals/taskModal";
import CheckIcon from '@mui/icons-material/Check';
const TaskCard = ({ content, category, label, dueDate, onTaskDeleted, task }) => {
  const [isChecked, setIsChecked] = useState(false);

  const bgColor = {
    Completed: "bg-green-200 border-solid border-2 border-green-300",
    Overdue: "bg-gray-300 border-solid border-2 border-gray-300",
    InProgress: "bg-yellow-100 border-solid border-2 border-yellow-300",
    New: "bg-blue-100 border-solid border-2 border-blue-300",
  };

  const handleCheckboxChange = async () => {
    console.log("Task ID:", task._id); // Log the task ID to ensure it's valid
    if (!isChecked) {
      try {
        console.log(`Deleting task with ID: http://localhost:4000/tasks/${task._id}`);
        await axios.delete(`http://localhost:4000/tasks/${task._id}`);
        onTaskDeleted(task._id); // Notify parent to update the task list
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
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
          className="absolute top-2 right-2 w-6 h-6 bg-white hover:bg-green-100 border-2 border-gray-500 rounded-full flex items-center justify-center"
          onClick={handleCheckboxChange}
        >
          <CheckIcon />
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
              label === "Completed"
                ? "bg-green-500"
                : label === "ASAP"
                ? "bg-red-500"
                :label === "Feedback"
                ? "bg-blue-500"
                : "bg-gray-500"
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

function Taskdemo() {
  const [tasks, setTasks] = useState({}); // Initialize as an empty object
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks }; // Copy the previous state
      if (!updatedTasks[newTask.category]) {
        updatedTasks[newTask.category] = []; // If category doesn't exist, create it
      }
      updatedTasks[newTask.category].push(newTask); // Add the new task to the appropriate category
      return updatedTasks;
    });
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/tasks");
        const tasksArray = response.data;

        // Group tasks by category
        const groupedTasks = tasksArray.reduce((acc, task) => {
          if (!acc[task.category]) {
            acc[task.category] = [];
          }
          acc[task.category].push(task);
          return acc;
        }, {});

        setTasks(groupedTasks); // Set the grouped tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskDeleted = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      // Remove the task from the appropriate category
      for (const category in updatedTasks) {
        updatedTasks[category] = updatedTasks[category].filter(
          (task) => task._id !== taskId
        );
      }
      return updatedTasks;
    });
  };

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar with Dashboard */}
      <div className="w-[242.01px]">
        <Dashboard />
      </div>

      {/* Main Content Area */}
      <div className="min-h-screen p-7 w-full bg-white rounded-2xl mt-3 ml-3 mr-3">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-extrabold ml-2">Tasks</h1>
          <button onClick={()=>setIsModalOpen(true)} className="bg-green-600 hover:bg-green-700 text-white text-sm mt-1 font-medium py-2 px-4 rounded-full">
            + Add new
          </button>
          <TaskModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onTaskAdded={handleTaskAdded}
          />
        </div>

        <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-400" />

        {/* Categories Header */}
        <div className="grid grid-cols-4 gap-2 text-center">
          {["New", "InProgress", "Overdue", "Completed"].map(
            (category, index) => (
              <div key={index} className="col-span-1 font-semibold">
                {category}
              </div>
            )
          )}
        </div>
        <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-400" />
        
        {/* Grid with category wise task distribution */}
        <div className="grid grid-cols-4 gap-4 divide-x divide-gray-300">
          {["New", "InProgress", "Overdue", "Completed"].map((category) => (
            <div key={category} className="grid gap-4">
              {/* Render each task in the category */}
              {tasks[category]?.map((task) => (
                <TaskCard
                  task={task}
                  content={task.content}
                  category={category}
                  label={task.label}
                  dueDate={task.dueDate} // Ensure consistent casing of keys
                  key={task._id} // Use a unique key
                  onTaskDeleted={handleTaskDeleted}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Taskdemo;
