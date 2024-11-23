import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../components/Dashboard";
import TaskModal from "../components/Modals/taskModal";
function TaskDemo() {
  const [tasks, setTask] = useState([]); // State to store products
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get("http://localhost:4000/tasks"); // Replace with your API URL
        setTask(response.data); // Assume the response data is an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchTask();
  }, []);

  const handleAddTask = (newTask) => {
    setTask((prevTasks) => [...prevTasks, newTask]); // Update tasks with the new task
  };

  return (
    <div className="flex bg-gray-100">
      <div className="w-[242.01px]">
        <Dashboard />
      </div>
      <div className="min-h-screen p-7 w-full bg-white rounded-2xl mt-3 ml-3 mr-3">
        <div className="flex justify-between items-center">
          {/* Left-aligned heading */}
          <h1 className="text-3xl font-extrabold">✅ Tasks</h1>
          {/* Right-aligned button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-2xl shadow hover:bg-blue-600"
          >
            + Add New
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-black uppercase bg-gray-300">
              <tr>
                <th scope="col" className="p-4"></th>
                <th scope="col" className="px-6 py-3">
                  Task name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Project
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Assignee
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                const createdAtDate = new Date(task.createdAt)
                .toLocaleDateString("en-GB") // Use "en-GB" for DD/MM/YYYY format
                .replace(/\//g, "-"); // Replace "/" with "-"

                return (
                  <tr
                    key={task._id} // Use unique identifier from backend
                    className="bg-white border-b bg-white hover:bg-gray-50"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-${task._id}`}
                          type="checkbox"
                          className="w-4 h-4 text-black bg-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`checkbox-${task._id}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-black whitespace-nowrap "
                    >
                      {task.taskName}
                    </th>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${
                          task.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : task.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : task.status === "Overdue"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-black">{task.project}</td>
                    <td className="px-6 py-4 text-black">
                      {createdAtDate}
                    </td>{" "}
                    {/* Formatted createdAt */}
                    <td className="px-6 py-4 text-black">
  {new Date(task.dueDate).toLocaleDateString("en-GB").replace(/\//g, "-")}
</td>
                    {/* Formatted dueDate */}
                    <td className="px-6 py-4 text-black">{task.assignee}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onTaskAdded={handleAddTask}
        />
      </div>
    </div>
  );
}

export default TaskDemo;
