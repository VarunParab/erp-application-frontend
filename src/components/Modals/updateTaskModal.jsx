import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateTaskModal = ({ isOpen, onClose, taskId, onTaskUpdated }) => {
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("");
  const [project, setProject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");
  const [isCustomStatus, setIsCustomStatus] = useState(false); // State to toggle between select and input for label

  useEffect(() => {
    const fetchTask = async () => {
        if (taskId) {
          try {
            const response = await axios.get(`http://localhost:4000/tasks/${taskId}`);
            console.log("Fetched task:", response.data);  // Log the response data
            const task = response.data;
            setTaskName(task.taskName);
            setStatus(task.status);
            setProject(task.project);
            setDueDate(task.dueDate);
            setAssignee(task.assignee);
          } catch (error) {
            console.error("Error fetching task:", error);
          }
        }
      };
      

    fetchTask();
  }, [taskId]); // Fetch task when taskId changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = { taskName, status, project, dueDate, assignee };

    try {
      const response = await axios.patch(`http://localhost:4000/tasks/${taskId}`, updatedTask);
      console.log("Task updated successfully:", response.data);

      // Notify parent to update task list
      onTaskUpdated(response.data);

      // Close modal after task is updated
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Update Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Task Name</label>
            <input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Update task name here"
              className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Status</label>
            {/* Conditionally render input or select based on isCustomStatus */}
            {!isCustomStatus ? (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
                required
              >
                <option value="">Select a status</option>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Overdue">Overdue</option>
              </select>
            ) : (
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Enter custom status"
                className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
              />
            )}
          </div>

          {/* Button to toggle between select and input */}
          <div>
            <button
              type="button"
              onClick={() => setIsCustomStatus((prev) => !prev)}
              className="text-blue-500 mt-2"
            >
              {isCustomStatus ? "Select from list" : "Enter custom status"}
            </button>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Project</label>
            <input
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder="Update project name here"
              className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Assignee</label>
            <input
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              placeholder="Enter assignee here"
              className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
