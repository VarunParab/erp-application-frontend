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
    // Log the selected project at the start of the function
    console.log("Selected Project at handleUpdateProject: ", selectedProject);
  
    // Ensure selectedProject is defined and has _id before proceeding
    if (!selectedProject) {
      console.error("Error: selectedProject is undefined.");
      alert("Please select a project.");
      return;
    }
  
    if (!selectedProject._id) {
      console.error("Error: selectedProject._id is missing.");
      alert("Project ID is missing.");
      return;
    }
  
    // Ensure that all fields in updatedProject are filled
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
  
    // Prepare the request body based on category
    const requestBody =
      selectedCategory === "All Projects"
        ? {
            projectName: updatedProject.name,
            details: updatedProject.details,
            status: updatedProject.status,
            progress: updatedProject.progress,
            startDate: updatedProject.startDate,
            endDate: updatedProject.endDate,
            client: updatedProject.client,
          }
        : {
            categoryName: selectedCategory,
            projectName: updatedProject.name,
            details: updatedProject.details,
            status: updatedProject.status,
            progress: updatedProject.progress,
            startDate: updatedProject.startDate,
            endDate: updatedProject.endDate,
            client: updatedProject.client,
          };
  
    try {
      // Log the request body for debugging purposes
      console.log("Request Body: ", requestBody);
  
      const apiUrl = `http://localhost:4000/category/projects/${selectedProject._id}`;
      console.log("Making PUT request to:", apiUrl);
  
      // Make the PUT request to update the project
      const response = await axios.put(apiUrl, requestBody);
  
      if (response.data.success) {
        const updated = response.data.project;
        console.log("Updated Project: ", updated);
  
        // Update the projects state with the updated project
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project._id === updated._id ? updated : project
          )
        );
  
        // Close modal and reset form
        onClose();
      } else {
        console.error("API Error:", response.data.message || "Failed to update project.");
        alert(response.data.message || "Failed to update project.");
      }
    } catch (error) {
      // Log detailed error for debugging
      console.error("Error updating project:", error.response ? error.response.data : error.message);
      alert("There was an error updating the project.");
    }
  };  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Update Project</h2>
        <input
          type="text"
          name="name"
          value={updatedProject.name}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          placeholder="Project Name"
        />
        <textarea
          name="details"
          value={updatedProject.details}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          placeholder="Details"
        />
        <input
          type="text"
          name="status"
          value={updatedProject.status}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          placeholder="Status"
        />
        <input
          type="text"
          name="progress"
          value={updatedProject.progress}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          placeholder="Progress"
        />
        <input
          type="date"
          name="startDate"
          value={
            updatedProject.startDate
              ? updatedProject.startDate.split("T")[0]
              : ""
          }
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />
        <input
          type="date"
          name="endDate"
          value={
            updatedProject.endDate ? updatedProject.endDate.split("T")[0] : ""
          }
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <input
          type="text"
          name="client"
          value={updatedProject.client}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          placeholder="Client"
        />
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
