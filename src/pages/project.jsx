import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
//import Modal from "../components/Modals/projectModal";

const Projects = () => {
  const [categories, setCategories] = useState(["All Projects"]);
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [newCategory, setNewCategory] = useState("");
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
  const [projectDetails, setProjectDetails] = useState(null); // State for selected project details

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "status" && value === "✉️ New Project") {
      setNewProject({
        ...newProject,
        [name]: value,
        progress: 0,
      });
    } else {
      setNewProject((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
      setModalOpen(false);
    } else {
      alert("Please enter a category name.");
    }
  };

  const handleAddProject = () => {
    if (
      newProject.name &&
      newProject.details &&
      newProject.status &&
      newProject.progress &&
      newProject.startDate &&
      newProject.endDate &&
      newProject.client
    ) {
      setProjects([...projects, { ...newProject, category: selectedCategory }]);
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
      alert("Please fill all fields.");
    }
  };

  const handleProjectClick = (project) => {
    setModalType("project");
    setProjectDetails(project);
    setModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="w-[242.01px]">
        <Dashboard />
      </div>

      <div className="flex-1 flex flex-col bg-white rounded-2xl mt-3 ml-3 mr-3 overflow-hidden">
        <div className="flex items-center justify-between p-7">
          <h1 className="text-3xl font-extrabold ml-2">Projects</h1>
        </div>

        <hr className="h-px bg-gray-300 border-0 mb-4" />

        <div className="flex flex-grow overflow-y-auto">
          <div className="w-[200px] bg-white p-4 border-r border-gray-300 overflow-y-auto">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`mb-1 font-semibold flex items-center cursor-pointer p-2 rounded-2xl ${
                  selectedCategory === category
                    ? "bg-gray-100 text-blue-600"
                    : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category !== "All Projects" && (
                  <span className="mr-2 text-blue-500">
                    <FolderIcon />
                  </span>
                )}
                <div className="truncate">{category}</div>
              </div>
            ))}

            <div>
              <span
                className="mb-1 ml-2 text-xs font-base text-gray-700 flex items-center cursor-pointer p-3 rounded-2xl"
                onClick={() => {
                  setModalOpen(true);
                  setModalType("category");
                  setProjectDetails(null);
                }}
              >
                + add project category
              </span>
            </div>
          </div>

          <div className="flex-1 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-2xl font-bold mb-4">
                {selectedCategory === "All Projects"
                  ? "All Projects"
                  : selectedCategory}
              </h2>
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
                {projects
                  .filter((project) =>
                    selectedCategory === "All Projects"
                      ? true
                      : project.category === selectedCategory
                  )
                  .map((project, index) => (
                    <tr
                      key={index}
                      className="cursor-pointer"
                      onClick={() => handleProjectClick(project)}
                    >
                      <td className="px-4 py-2 text-sm max-w-[150px] truncate border-r">{project.name}</td>
                      <td className="px-4 py-2 text-sm max-w-[90px] truncate border-r text-center">{project.status}</td>
                      <td className="px-4 py-2 text-sm max-w-[70px] truncate border-r text-center">{project.progress}%</td>
                      <td className="px-4 py-2 text-sm max-w-[90px] truncate border-r">{project.startDate}</td>
                      <td className="px-4 py-2 text-sm max-w-[90px] truncate border-r">{project.endDate}</td>
                      <td className="px-4 py-2 text-sm max-w-[120px] truncate">{project.client}</td>
                    </tr>
                  ))}
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
        projectDetails={projectDetails} // Pass project details to modal
      />
    </div>
  );
};

export default Projects;