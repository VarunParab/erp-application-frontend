import React, { useState } from "react";
import axios from "axios";

const TaskModal = ({ isOpen, onClose, onTaskAdded }) => {
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [label, setLabel] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isCustomLabel, setIsCustomLabel] = useState(false); // State to toggle between select and input for label

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit");
    const task = { category, content, label, dueDate };

    try {
      const response = await axios.post("http://localhost:4000/tasks", task);

      console.log("Task added successfully:", response.data);

      // Notify parent to update task list
      onTaskAdded(response.data);

      // Reset fields
      setCategory("");
      setContent("");
      setLabel("");
      setDueDate("");

      // Close modal after task is added
      console.log("Attempting to close modal");
      onClose();
    } catch (error) {
      console.error(
        "Error adding task:",
        error.response ? error.response.data : error.message
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
              required
            >
              <option value="">Select a category</option>
              <option value="New">New Task</option>
              <option value="InProgress">InProgress</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter task content"
              className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Label</label>
            {/* Conditionally render input or select based on isCustomLabel */}
            {!isCustomLabel ? (
              <select
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
                required
              >
                <option value="">Select a category</option>
                <option value="ASAP">ASAP</option>
                <option value="Low Priority">Low Priority</option>
                <option value="Feedback">Feedback</option>
              </select>
            ) : (
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Enter custom label"
                className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
              />
            )}
          </div>

          {/* Button to toggle between select and input */}
          <div>
            <button
              type="button"
              onClick={() => setIsCustomLabel((prev) => !prev)}
              className="text-blue-500 mt-2"
            >
              {isCustomLabel ? "Select from list" : "Enter custom label"}
            </button>
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
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
