import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "../components/Dashboard";
import Modal from "../components/Modals/projectModal";
import FolderIcon from "@mui/icons-material/Folder";

const CategoryAndProjectList = () => {
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]); // Flat array of projects
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [newProject, setNewProject] = useState({
    name: "",
    details: "",
    status: "",
    progress: "",
    startDate: "",
    endDate: "",
    client: "",
    category: "",
  });

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
          setError("Categories data is not an array");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.message);
      }
    };

    fetchCategories();
  }, []); // Run only once to fetch categories

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
  }, [selectedCategory]); // Re-fetch projects whenever `selectedCategory` changes

    const handleInputChange = (e) => {
      console.log('adding')
      const { name, value } = e.target;
      setNewProject((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
    const handleEditInputChange = (e) => {
      const { name, value } = e.target;
      console.log("Before update:", projectDetails); // Check current state
      setProjectDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
      console.log("After update:", projectDetails); // Check updated state
    };
      

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        const response = await axios.post("http://localhost:4000/category", {
          categoryName: newCategory.trim(),
        });
        if (response.data.success) {
          setCategories([...categories, response.data.category]); // Add the newly created category
          setNewCategory(""); // Clear the input field
          setModalOpen(false); // Close the modal
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
        // Construct API URL based on selected category
        const apiUrl =
          selectedCategory === "All Projects"
            ? "http://localhost:4000/category/allProjects"
            : `http://localhost:4000/category/${encodeURIComponent(
                selectedCategory
              )}`;
  
        // Prepare request body
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
                categoryName: selectedCategory, // Include categoryName when it's not "All Projects"
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
        console.log("Response data:", response.data); // Log the response
  
        if (response.data.success) {
          if (response.data.project) {
            // Handle response for "All Projects" or when only a single project is returned
            const addedProject = response.data.project; // The newly created project from response
            setProjects((prevProjects) => [...prevProjects, addedProject]); // Add the new project to the list
          } else if (
            response.data.category &&
            response.data.category.projects
          ) {
            // Handle response for specific category
            const newProject =
              response.data.category.projects[
                response.data.category.projects.length - 1
              ]; // Last project is the newly added one
            setProjects((prevProjects) => [...prevProjects, newProject]);
          }
  
          // Close modal and reset form
          setModalOpen(false);
          setNewProject({
            name: "",
            details: "",
            status: "",
            progress: "",
            startDate: "",
            endDate: "",
            client: "",
            category: "",
          });
        } else {
          console.error(
            "Failed to add project: ",
            response.data.message || "Unknown error"
          );
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
  

  const handleProjectClick = (project) => {
    setModalType("project");
    setProjectDetails(project);
    console.log(project);
    setModalOpen(true);
  };

  // Render UI
  return (
    <div className="flex bg-gray-200">
      {/* Sidebar with Dashboard */}
      <div className="w-[242.01px]">
        <Dashboard />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl mt-3 ml-3 mr-3 overflow-hidden">
        <div className="flex items-center justify-between p-7">
          <h1 className="text-3xl font-extrabold ml-2">Projects</h1>
        </div>
        <hr className="h-px bg-gray-300 border-0 mb-4" />

        <div className="flex flex-grow overflow-y-auto">
          {/* Category List */}
          <div className="w-[200px] bg-white p-4 border-r border-gray-300 overflow-y-auto">
            {/* "All Projects" */}
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

            {/* Render Categories */}
            {categories.map((category) => (
              <div
                key={category.categoryName}
                className={`mb-1 font-semibold flex items-center cursor-pointer p-2 rounded-2xl ${
                  selectedCategory === category.categoryName
                    ? "bg-gray-100 text-blue-600"
                    : ""
                }`}
                onClick={() => setSelectedCategory(category.categoryName)}
              >
                <span className="mr-2 text-blue-500">
                  <FolderIcon />
                </span>
                <div className="truncate">{category.categoryName}</div>
              </div>
            ))}

            {/* Add Category */}
            <div>
              <span
                className="mb-1 ml-2 text-xs font-base text-gray-700 flex items-center cursor-pointer p-3 rounded-2xl"
                onClick={() => {
                  setModalOpen(true);
                  setModalType("category");
                }}
              >
                + Add Project Category
              </span>
            </div>
          </div>

          {/* Projects List */}
          <div className="flex-1 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-2xl font-bold mb-4">{selectedCategory}</h2>
              <button
                className="bg-green-600 hover:bg-green-700 text-white text-sm mb-4 font-medium py-2 px-4 rounded-full"
                onClick={() => {
                  setModalOpen(true);
                  setModalType("project");
                  setProjectDetails(null);
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
                  <th className="px-4 py-2 text-sm">Client</th>
                </tr>
              </thead>
              <tbody>
                {projects.length > 0 ? (
                  projects.map((project, index) => (
                    <tr
                      key={index}
                      className="cursor-pointer"
                      onClick={() => handleProjectClick(project)}
                    >
                      <td className="px-4 py-2 text-sm text-start w-2/6">
                        {project.projectName}
                      </td>
                      <td className="px-4 py-2 text-sm text-center">
                        {project.status}
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
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalType={modalType}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        newProject={newProject}
        handleInputChange={handleInputChange}
        handleAddCategory={handleAddCategory}
        handleAddProject={handleAddProject}
        handleEditInputChange={handleEditInputChange}
        projectDetails={projectDetails} // Pass project details to modal
      />
    </div>
  );
};

export default CategoryAndProjectList;
