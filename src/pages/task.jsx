import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../components/dashboard";
import TaskModal from "../components/Modals/taskModal";
import UpdateTaskModal from "../components/Modals/updateTaskModal";

function TaskDemo() {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [taskId, setTaskId] = useState(null); // Task ID for updating
  const [modalType, setModalType] = useState("");
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
    <div className="flex bg-gray-200 fixed w-full h-full">
      {/* Sidebar with Dashboard */}
      <div className="w-[242px] h-full bg-gray-200 shadow-lg">
        <Dashboard />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-7 bg-white rounded-2xl mt-3 ml-3 mr-3">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl ml-2 font-extrabold">✅ Tasks</h1>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setModalType("add");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-2xl shadow hover:bg-blue-600"
          >
            + Add New
          </button>
        </div>

        {/* Scrollable Table */}
        <div
          className="relative overflow-y-auto shadow-md sm:rounded-lg mt-4"
          style={{ maxHeight: "calc(100vh - 150px)" }}
        >
            <div className="relative">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-black uppercase bg-gray-200 sticky top-0 z-10">
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
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, "-");

                return (
                  <tr
                    key={task._id}
                    className="bg-white border-b bg-white hover:bg-gray-50"
                    onClick={() => {
                      if (task.status !== "Completed") {
                        console.log("Task clicked with ID:", task._id);
                        setIsModalOpen(true);
                        setModalType("update");
                        setTaskId(task._id);
                      } else {
                        console.log("Task is completed. Edit disabled.");
                      }
                    }}
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-${task._id}`}
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 checked:bg-green-500 focus:ring-green-500 focus:ring-2"
                          checked={task.status === "Completed"}
                          disabled={task.status === "Completed"} // Disable if already completed
                          onClick={(e) => e.stopPropagation()} // Prevent row click event
                          onChange={async () => {
                            if (task.status !== "Completed") {
                              try {
                                // Update the status to "Completed" in the backend
                                await axios.patch(
                                  `http://localhost:4000/tasks/${task._id}`,
                                  {
                                    status: "Completed",
                                  }
                                );

                                // Update the status in the state
                                setTasks((prevTasks) =>
                                  prevTasks.map((t) =>
                                    t._id === task._id
                                      ? { ...t, status: "Completed" }
                                      : t
                                  )
                                );
                              } catch (error) {
                                console.error(
                                  "Error updating task status:",
                                  error
                                );
                                alert(
                                  "Failed to update the task status. Please try again."
                                );
                              }
                            }
                          }}
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
                      className="px-6 py-4 font-medium text-black whitespace-nowrap overflow-hidden truncate max-w-[200px]"
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
                            : task.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-black">{task.project}</td>
                    <td className="px-6 py-4 text-black">{createdAtDate}</td>
                    <td className="px-6 py-4 text-black">
                      {new Date(task.dueDate)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "-")}
                    </td>
                    <td className="px-6 py-4 text-black">{task.assignee}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
        {modalType === "add" && (
          <TaskModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onTaskAdded={handleAddTask}
          />
        )}

        {modalType === "update" && (
          <UpdateTaskModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            taskId={taskId}
            onTaskUpdated={handleUpdateTask}
          />
        )}
      </div>
    </div>
  );
}

export default TaskDemo;
