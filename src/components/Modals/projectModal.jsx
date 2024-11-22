import React from 'react';

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
  if (!modalOpen) return null; // 
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-2/3">
        {modalType === 'category' ? (
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
              {projectDetails ? 'Project Details' : 'Add New Project'}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block mb-1">Project Name</label>
                <input
                  type="text"
                  name="name"
                  value={projectDetails ? projectDetails.name : newProject.name}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  disabled={!!projectDetails} // Disable if viewing details
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Details</label>
                <textarea
                  name="details"
                  value={projectDetails ? projectDetails.details : newProject.details}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  disabled={!!projectDetails} // Disable if viewing details
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Status</label>
                <select
                  name="status"
                  value={projectDetails ? projectDetails.status : newProject.status}
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
              <div className="mb-4">
                <label className="block mb-1">Progress</label>
                <input
                  type="text"
                  name="progress"
                  value={projectDetails ? projectDetails.progress : newProject.progress}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  disabled={!!projectDetails} // Disable if viewing details
                />
              </div>
              
              {/* Client Input */}
              <div className="mb-4">
                <label htmlFor="client" className="block text-sm font-medium text-gray-700">
                  Client
                </label>
                <input
                  type="text"
                  id="client"
                  name="client"
                  value={projectDetails ? projectDetails.client : newProject.client}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-1 border rounded-md"
                  placeholder="Enter Client Name"
                  disabled={!!projectDetails} // Disable if viewing details
                />
              </div>

              {/* Start Date and End Date Side by Side */}
              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={projectDetails ? projectDetails.startDate : newProject.startDate}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 border rounded-md"
                    disabled={!!projectDetails} // Disable if viewing details
                  />
                </div>

                <div className="w-1/2">
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={projectDetails ? projectDetails.endDate : newProject.endDate}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 border rounded-md"
                    disabled={!!projectDetails} // Disable if viewing details
                  />
                </div>
              </div>

              <div className="flex justify-end">
                {!projectDetails && (
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
                    onClick={handleAddProject}
                  >
                    Add Project
                  </button>
                )}
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setModalOpen(false)}
                >
                  {projectDetails ? 'Close' : 'Cancel'}
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
