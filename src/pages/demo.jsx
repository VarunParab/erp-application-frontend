import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "../components/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import AddCategoryModal from "../components/Modals/addCategoryModal";
import AddProjectModal from "../components/Modals/addProjectModal";
import UpdateProjectModal from "../components/Modals/updateProjectModal";
function Demo() {
  const [projects, setProjects] = useState([]); // State to store tasks
  const [projectId, setProjectId] = useState(null); // Task ID for updating
  const [modalType, setModalType] = useState(""); // Modal type to handle different modals
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [categories, setCategories] = useState([]); // State to store categories
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [selectedProject,setSelectedProject]=useState(null)

  // Fetch categories and projects
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryResponse = await axios.get(
          "http://localhost:4000/category"
        );
        console.log("Categories fetched:", categoryResponse.data.categories);

        if (Array.isArray(categoryResponse.data.categories)) {
          setCategories(categoryResponse.data.categories);
        } else {
          alert("Categories data is not an array");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let response;
        if (selectedCategory === "All Projects") {
          response = await axios.get(
            "http://localhost:4000/category/allProjects"
          );
          setProjects(response.data.projects || []);
        } else {
          response = await axios.get(
            `http://localhost:4000/category/${selectedCategory}`
          );
          setProjects(response.data.category.projects || []);
        }

        console.log(
          "Projects fetched for category:",
          selectedCategory,
          response.data
        );
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
      }
    };

    fetchProjects();
  }, [selectedCategory]);

  // Function to handle adding a category (you can implement it later)
  const handleAddCategory = async (newCategory) => {
    if (newCategory.trim()) {
      try {
        const response = await axios.post("http://localhost:4000/category", {
          categoryName: newCategory.trim(),
        });
        if (response.data.success) {
          setCategories([...categories, response.data.category]); // Add the newly created category
          setModalType(""); // Close the modal
        } else {
          alert(response.data.message || "Failed to add category.");
        }
      } catch (error) {
        console.error("Error adding category:", error);
        alert("An error occurred while adding the category.");
      }
    } else {
      alert("Please enter a category name.");
    }
  };



  return (
    <div className="flex bg-gray-200">
      {/* Sidebar with Dashboard */}
      <div className="w-[242.01px]">
        <Dashboard />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl mt-3 ml-3 mr-3 overflow-hidden">
        <div className="flex items-center justify-between p-7">
          <h1 className="text-3xl font-extrabold ml-2">💻 Projects</h1>
        </div>

        <hr className="h-px bg-gray-300 border-0 mb-4" />
        <div className="flex flex-grow overflow-y-auto">
          {/* Category list */}
          <div className="w-[200px] bg-white p-4 border-r border-gray-300 overflow-y-auto">
            <div
              key="all-projects"
              className={`mb-1 font-semibold flex items-center cursor-pointer p-2 rounded-2xl ${
                selectedCategory === "All Projects"
                  ? "bg-gray-100 text-blue-600"
                  : ""
              }`}
              onClick={() => setSelectedCategory("All Projects")}
            >
              <div className="truncate">All Projects</div>
            </div>

            {categories.map((category, index) => (
              <div
                key={index}
                className={`mb-1 font-semibold flex items-center cursor-pointer p-2 rounded-2xl ${
                  selectedCategory === category.categoryName
                    ? "bg-gray-100 text-blue-600"
                    : ""
                }`}
                onClick={() => setSelectedCategory(category.categoryName)}
              >
                {category !== "All Projects" && (
                  <span className="mr-2 text-blue-500">
                    <FolderIcon />
                  </span>
                )}
                <div className="truncate">{category.categoryName}</div>
              </div>
            ))}

            <div>
              <span
                className="mb-1 ml-2 text-xs font-base text-gray-700 flex items-center cursor-pointer p-3 rounded-2xl"
                onClick={() => {
                  setIsModalOpen(true); // Open the modal
                  setModalType("addCategory"); // Set modal type to 'addCategory'
                }}
              >
                + add project category
              </span>
            </div>
          </div>
          {/* Project list */}
          <div className="flex-1 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-2xl font-bold mb-4">{selectedCategory}</h2>
              <button
                className="bg-green-600 hover:bg-green-700 text-white text-sm mb-4 font-medium py-2 px-4 rounded-full"
                onClick={() => {
                  setIsModalOpen(true);
                  setModalType("addProject");
                }}
              >
                + Add new
              </button>
            </div>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-sm">Project</th>
                  <th className="px-4 py-2 text-sm">Status</th>
                  <th className="px-4 py-2 text-sm">Progress</th>
                  <th className="px-4 py-2 text-sm">Start Date</th>
                  <th className="px-4 py-2 text-sm">End Date</th>
                  <th className="px-4 py-2 text-sm">Client Name</th>
                </tr>
              </thead>
              <tbody>
                {projects.length > 0 ? (
                  projects.map((project, index) => (
                    <tr
                      key={index}
                      className="cursor-pointer"
                      onClick={()=>{
                        setSelectedProject(project);  // Set the selected project
    setIsModalOpen(true);
    setModalType("updateProject");
    // Open the modal
                      }}
                    >
                      <td className="px-4 py-2 text-sm text-start w-2/6">
                        {project.projectName}
                      </td>
                      <td className="px-4 py-2 text-sm text-center">
  {project.status === "In Progress" ? "🚀 In Progress" : 
   project.status === "On Hold" ? "⏳ On Hold" : 
   project.status === "New Project" ? "✉️ New Project" : project.status}
</td>


                      <td className="px-4 py-2 text-sm text-center">
                        {project.progress}%
                      </td>
                      <td className="px-4 py-2 text-sm text-center">
                        {" "}
                        {new Date(project.startDate)
                          .toLocaleDateString("en-GB")
                          .replace(/\//g, "-")}
                      </td>
                      <td className="px-4 py-2 text-sm text-center">
                        {new Date(project.endDate)
                          .toLocaleDateString("en-GB")
                          .replace(/\//g, "-")}
                      </td>
                      <td className="px-4 py-2 text-sm text-center w-1/6">
                        {project.client}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-2 text-center text-gray-500"
                    >
                      No projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modal Handling */}
      {isModalOpen && modalType === "addCategory" && (
        <AddCategoryModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false); // Close the modal
            setModalType(""); // Reset modal type
          }}
          onSave={handleAddCategory} // Pass the save handler for AddCategory
        />
      )}
      {isModalOpen && modalType === "addProject" && (
        <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false); // Close the modal
          setModalType(""); // Reset modal type
        }}
        selectedCategory={selectedCategory}
        setProjects={setProjects}// Pass the save handler for AddCategory
        />
      )}
      {isModalOpen && modalType === "updateProject" && (
       <UpdateProjectModal
       isOpen={isModalOpen}
       onClose={() => {
        setSelectedProject(null); 
        setIsModalOpen(false); // Close the modal
        setModalType(""); // Reset modal type
      }}
      selectedCategory={selectedCategory}
      selectedProject={selectedProject}  // Pass the selected project here
       setProjects={setProjects}
     />
      )}
    </div>
  );
}

export default Demo;
