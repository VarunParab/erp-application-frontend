import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../components/Dashboard";
import TaskModal from "../components/Modals/taskModal";
import UpdateTaskModal from "../components/Modals/updateTaskModal";

function TaskDemo() {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [taskId, setTaskId] = useState(null); // Task ID for updating
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/tasks"); // Replace with your API URL
        setTasks(response.data); // Assume the response data is an array of tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array ensures it runs only once on mount

  // Handle task addition by updating the state
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Add the new task to the tasks state
  };

  // Handle task update
  const handleUpdateTask = async (updatedTask) => {
    try {
      // Ensure updatedTask contains a valid _id and all necessary fields for the update
      if (!updatedTask._id) {
        console.error("No task ID found for updating");
        return;
      }
  
      console.log("Updating task with ID:", updatedTask._id);
  
      const response = await axios.patch(
        `http://localhost:4000/tasks/${updatedTask._id}`,
        updatedTask
      );
  
      console.log("Update response:", response.data);
  
      setTasks((prevTasks) => {
        return prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
      });
  
      setIsModalOpen(false); // Close the modal after a successful update
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update the task. Please try again."); // Optional alert for user feedback
    }
  };
  

  return (
    <div className="flex bg-gray-100">
      <div className="w-[242.01px]">
        <Dashboard />
      </div>
      <div className="min-h-screen p-7 w-full bg-white rounded-2xl mt-3 ml-3 mr-3">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold">✅ Tasks</h1>
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
                <th scope="col" className="px-6 py-3">Task name</th>
                <th scope="col" className="px-6 py-3 text-center">Status</th>
                <th scope="col" className="px-6 py-3">Project</th>
                <th scope="col" className="px-6 py-3">Created At</th>
                <th scope="col" className="px-6 py-3">Due Date</th>
                <th scope="col" className="px-6 py-3">Assignee</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                const createdAtDate = new Date(task.createdAt)
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, "-");

                return (
                  <tr
                    key={task._id}
                    className="bg-white border-b bg-white hover:bg-gray-50"
                    onClick={() => {
                      console.log("Task clicked with ID:", task._id);
                      setIsModalOpen(true);
                      setTaskId(task._id);
                    }}
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-${task._id}`}
                          type="checkbox"
                          className="w-4 h-4 text-black bg-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`checkbox-${task._id}`} className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
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
                    <td className="px-6 py-4 text-black">{createdAtDate}</td>
                    <td className="px-6 py-4 text-black">
                      {new Date(task.dueDate).toLocaleDateString("en-GB").replace(/\//g, "-")}
                    </td>
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
        <UpdateTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          taskId={taskId}
          onTaskUpdated={handleUpdateTask}
        />
      </div>
    </div>
  );
}

export default TaskDemo;
