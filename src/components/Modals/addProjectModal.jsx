import React, { useState } from "react";
import axios from "axios";

function AddProjectModal({ isOpen, onClose, selectedCategory, setProjects }) {
  const [newProject, setNewProject] = useState({
    name: "",
    details: "",
    status: "",
    progress: "",
    startDate: "",
    endDate: "",
    client: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProject = async () => {
    if (
      newProject.name &&
      newProject.details &&
      newProject.status &&
      newProject.progress &&
      newProject.startDate &&
      newProject.endDate &&
      newProject.client
    ) {
      try {
        const apiUrl =
          selectedCategory === "All Projects"
            ? "http://localhost:4000/category/allProjects"
            : `http://localhost:4000/category/${encodeURIComponent(
                selectedCategory
              )}`;

        const requestBody =
          selectedCategory === "All Projects"
            ? {
                projectName: newProject.name,
                details: newProject.details,
                status: newProject.status,
                progress: newProject.progress,
                startDate: newProject.startDate,
                endDate: newProject.endDate,
                client: newProject.client,
              }
            : {
                categoryName: selectedCategory,
                projectName: newProject.name,
                details: newProject.details,
                status: newProject.status,
                progress: newProject.progress,
                startDate: newProject.startDate,
                endDate: newProject.endDate,
                client: newProject.client,
              };

        // Make the POST request
        const response = await axios.post(apiUrl, requestBody);

        if (response.data.success) {
          const addedProject =
            response.data.project ||
            response.data.category.projects.slice(-1)[0];

          setProjects((prevProjects) => [...prevProjects, addedProject]);

          // Close modal and reset form
          onClose();
          setNewProject({
            name: "",
            details: "",
            status: "",
            progress: "",
            startDate: "",
            endDate: "",
            client: "",
          });
        } else {
          alert(response.data.message || "Failed to add project.");
        }
      } catch (error) {
        console.error("Error adding project:", error);
        alert("An error occurred while adding the project.");
      }
    } else {
      alert("Please fill all fields.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Add Project</h2>
        {/* Project Name */}
        <div className="mb-4">
          <label className="block mb-1">Project Name</label>
          <input
            type="text"
            name="name"
            value={newProject.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Project Name"
          />
        </div>

        {/* Details */}
        <div className="mb-4">
          <label className="block mb-1">Details</label>
          <textarea
            name="details"
            value={newProject.details}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Details"
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={newProject.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Status</option>
            <option value="In Progress">🚀 In Progress</option>
            <option value="On Hold">⏳ On Hold</option>
            <option value="New Project">✉️ New Project</option>
          </select>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <label className="block mb-1">Progress</label>
          <input
            type="number"
            name="progress"
            value={newProject.progress}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Progress"
            min="0"
            max="100"
          />
        </div>

        {/* Client */}
        <div className="mb-4">
          <label
            htmlFor="client"
            className="block text-sm font-medium text-gray-700"
          >
            Client Name
          </label>
          <input
            type="text"
            id="client"
            name="client"
            value={newProject.client}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
            placeholder="Enter Client Name"
          />
        </div>

        {/* Start Date and End Date */}
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={newProject.startDate}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>

          <div className="w-1/2">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={newProject.endDate}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleAddProject}
          >
            Add Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProjectModal;
