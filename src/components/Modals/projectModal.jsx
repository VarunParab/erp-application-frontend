import React, { useState, useEffect } from "react";

const Modal = ({
  modalOpen,
  setModalOpen,
  modalType,
  newCategory,
  setNewCategory,
  newProject,
  handleInputChange,
  handleAddCategory,
  handleAddProject,
  projectDetails,
}) => {
  if (!modalOpen) return null;

  // Manage editing state based on projectDetails being passed
  const [isEditing, setIsEditing] = useState(projectDetails != null);

  // Set start date and end date based on the project details or new project
  const formattedStartDate = projectDetails
    ? projectDetails.startDate.split("T")[0]
    : newProject.startDate.split("T")[0];
  const formattedEndDate = projectDetails
    ? projectDetails.endDate.split("T")[0]
    : newProject.endDate.split("T")[0];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        {modalType === "category" ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Add Project Category</h2>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full border p-2 rounded mb-4"
              placeholder="Category Name"
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
                onClick={handleAddCategory}
              >
                Add Category
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? "Project Details" : "Add New Project"}
            </h2>
            <form>
              {/* Project Name */}
              <div className="mb-4">
                <label className="block mb-1">Project Name</label>
                <input
                  type="text"
                  name="name"
                  value={
                    isEditing ? projectDetails.projectName : newProject.name
                  }
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Project Details */}
              <div className="mb-4">
                <label className="block mb-1">Details</label>
                <textarea
                  name="details"
                  value={
                    isEditing ? projectDetails.details : newProject.details
                  }
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="block mb-1">Status</label>
                <select
                  name="status"
                  value={isEditing ? projectDetails.status : newProject.status}
                  onChange={handleInputChange}
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
                  type="text"
                  name="progress"
                  value={
                    isEditing ? projectDetails.progress : newProject.progress
                  }
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Client */}
              <div className="mb-4">
                <label
                  htmlFor="client"
                  className="block text-sm font-medium text-gray-700"
                >
                  Client
                </label>
                <input
                  type="text"
                  id="client"
                  name="client"
                  value={isEditing ? projectDetails.client : newProject.client}
                  onChange={handleInputChange}
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
                    value={formattedStartDate}
                    onChange={handleInputChange}
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
                    value={formattedEndDate}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 border rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                {isEditing ? (
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
                    onClick={handleAddProject} // Ensure the correct function is passed
                  >
                    Edit Project
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
                    onClick={handleAddProject} // Ensure the correct function is passed
                  >
                    Add Project
                  </button>
                )}
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setModalOpen(false)}
                >
                  {isEditing ? "Close" : "Cancel"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
