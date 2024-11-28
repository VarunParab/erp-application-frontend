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
<<<<<<< Updated upstream
  if (!modalOpen) return null; // 
  
=======
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

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
              {projectDetails ? 'Project Details' : 'Add New Project'}
=======
              {isEditing ? "Project Details" : "Add New Project"}
>>>>>>> Stashed changes
            </h2>
            <form>
              {/* Project Name */}
              <div className="mb-4">
                <label className="block mb-1">Project Name</label>
                <input
                  type="text"
                  name="name"
<<<<<<< Updated upstream
                  value={projectDetails ? projectDetails.name : newProject.name}
=======
                  value={
                    isEditing ? projectDetails.projectName : newProject.name
                  }
>>>>>>> Stashed changes
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  disabled={!!projectDetails} // Disable if viewing details
                />
              </div>

              {/* Project Details */}
              <div className="mb-4">
                <label className="block mb-1">Details</label>
                <textarea
                  name="details"
<<<<<<< Updated upstream
                  value={projectDetails ? projectDetails.details : newProject.details}
=======
                  value={
                    isEditing ? projectDetails.details : newProject.details
                  }
>>>>>>> Stashed changes
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  disabled={!!projectDetails} // Disable if viewing details
                />
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="block mb-1">Status</label>
                <select
                  name="status"
<<<<<<< Updated upstream
                  value={projectDetails ? projectDetails.status : newProject.status}
=======
                  value={isEditing ? projectDetails.status : newProject.status}
>>>>>>> Stashed changes
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  disabled={!!projectDetails} // Disable if viewing details
                >
                  <option value="">Select Status</option>
                  <option value="🚀 In Progress">🚀 In Progress</option>
                  <option value="⏳ On Hold">⏳ On Hold</option>
                  <option value="✉️ New Project">✉️ New Project</option>
                </select>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <label className="block mb-1">Progress</label>
                <input
                  type="text"
                  name="progress"
<<<<<<< Updated upstream
                  value={projectDetails ? projectDetails.progress : newProject.progress}
=======
                  value={
                    isEditing ? projectDetails.progress : newProject.progress
                  }
>>>>>>> Stashed changes
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  disabled={!!projectDetails} // Disable if viewing details
                />
              </div>
<<<<<<< Updated upstream
              
              {/* Client Input */}
=======

              {/* Client */}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                  value={projectDetails ? projectDetails.client : newProject.client}
=======
                  value={isEditing ? projectDetails.client : newProject.client}
>>>>>>> Stashed changes
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border rounded-md"
                  placeholder="Enter Client Name"
                  disabled={!!projectDetails} // Disable if viewing details
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
<<<<<<< Updated upstream
                    value={projectDetails ? projectDetails.startDate : newProject.startDate}
=======
                    value={formattedStartDate}
>>>>>>> Stashed changes
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 border rounded-md"
                    disabled={!!projectDetails} // Disable if viewing details
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
<<<<<<< Updated upstream
                    value={projectDetails ? projectDetails.endDate : newProject.endDate}
=======
                    value={formattedEndDate}
>>>>>>> Stashed changes
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 border rounded-md"
                    disabled={!!projectDetails} // Disable if viewing details
                  />
                </div>
              </div>

              <div className="flex justify-end">
<<<<<<< Updated upstream
                {!projectDetails && (
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
                    onClick={handleAddProject}
=======
                {isEditing ? (
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
                    onClick={handleAddProject} // Ensure the correct function is passed
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
                    onClick={handleAddProject} // Ensure the correct function is passed
>>>>>>> Stashed changes
                  >
                    Add Project
                  </button>
                )}
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setModalOpen(false)}
                >
<<<<<<< Updated upstream
                  {projectDetails ? 'Close' : 'Cancel'}
=======
                  {isEditing ? "Close" : "Cancel"}
>>>>>>> Stashed changes
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
