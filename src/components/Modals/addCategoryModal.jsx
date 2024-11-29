import React, { useState } from "react";

function AddCategoryModal({ isOpen, onClose, onSave }) {
  const [categoryName, setCategoryName] = useState("");
  const handleSave = () => {
    if (categoryName.trim()) {
      onSave(categoryName); // Pass the new category back to the parent
      setCategoryName(""); // Reset the input field
      onClose(); // Close the modal
    } else {
      alert("Category name cannot be empty.");
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Add Project Category</h2>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          placeholder="Category Name"
        />
        <div className="flex justify-end">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
            onClick={handleSave}
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryModal;
