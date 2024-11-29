import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateProjectModal({
  isOpen,
  onClose,
  selectedCategory,
  selectedProject,
  setProjects,
}) {
  const [updatedProject, setUpdatedProject] = useState({
    name: "",
    details: "",
    status: "",
    progress: "",
    startDate: "",
    endDate: "",
    client: "",
  });

  // When the modal is opened, pre-populate the fields with the selected project data
  useEffect(() => {
    if (isOpen && selectedProject) {
      setUpdatedProject({
        name: selectedProject.projectName || "",
        details: selectedProject.details || "",
        status: selectedProject.status || "",
        progress: selectedProject.progress || "",
        startDate: selectedProject.startDate || "",
        endDate: selectedProject.endDate || "",
        client: selectedProject.client || "",
      });
    }
  }, [isOpen, selectedProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProject = async () => {
    console.log("Selected Project at handleUpdateProject: ", selectedProject);
  
    // Check if selectedProject is defined
    if (!selectedProject || !selectedProject._id) {
      console.error("Error: selectedProject or selectedProject._id is missing.");
      alert("Please select a valid project.");
      return;
    }
  
    // Check if all required fields are filled
    if (
      !updatedProject.name ||
      !updatedProject.details ||
      !updatedProject.status ||
      !updatedProject.progress ||
      !updatedProject.startDate ||
      !updatedProject.endDate ||
      !updatedProject.client
    ) {
      alert("Please fill all fields.");
      return;
    }
  
    // Include the categoryName if the project has a category
    const requestBody = {
      projectName: updatedProject.name,
      details: updatedProject.details,
      status: updatedProject.status,
      progress: updatedProject.progress,
      startDate: updatedProject.startDate,
      endDate: updatedProject.endDate,
      client: updatedProject.client,
      categoryName: selectedCategory === "All Projects"
        ? selectedProject.categoryName
        : selectedCategory || null,
    };
  
    try {
      console.log("Category Name: ", selectedProject.categoryName);
      console.log("Request Body: ", requestBody);
  
      const apiUrl = `http://localhost:4000/category/projects/${selectedProject._id}`;
      console.log("Making PUT request to:", apiUrl);
  
      const response = await axios.put(apiUrl, requestBody);
  
      // Check if the response is successful and contains the updated project data
      if (response.data.success) {
        const updated = response.data.project;  // Assuming the response contains updated project data
        console.log("Updated Project: ", updated);
  
        // Update the projects list using the response data
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project._id === updated._id ? updated : project
          )
        );
  
        onClose(); // Close the modal after update 
      } else {
        // Log a meaningful message if success flag is true but project data is not updated
        console.error("API Error: ", response.data.message || "Project update failed.");
        alert(response.data.message || "Project update failed.");
      }
    } catch (error) {
      console.error("Error updating project:", error.response ? error.response.data : error.message);
      alert("There was an error updating the project.");
    }
  };
  
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Update Project</h2>
        <div className="mb-4">
          <label className="block mb-1">Project Name</label>
          <input
            type="text"
            name="name"
            value={updatedProject.name}
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
            value={updatedProject.details}
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
            value={updatedProject.status}
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
            value={updatedProject.progress}
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
            value={updatedProject.client}
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
              value={
            updatedProject.startDate
              ? updatedProject.startDate.split("T")[0]
              : ""
          }
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
              value={
            updatedProject.endDate ? updatedProject.endDate.split("T")[0] : ""
          }
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
            onClick={handleUpdateProject}
          >
            Update Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProjectModal;
