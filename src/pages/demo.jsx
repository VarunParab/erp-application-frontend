import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../components/Dashboard";
import TaskModal from "../components/Modals/taskModal";
import UpdateTaskModal from "../components/Modals/updateTaskModal";

<<<<<<< Updated upstream
function TaskDemo() {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [taskId, setTaskId] = useState(null); // Task ID for updating
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
=======
const CategoryAndProjectList = () => {
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]); // Flat array of projects
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [projectDetails, setProjectDetails] = useState(null);
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
>>>>>>> Stashed changes

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/tasks"); // Replace with your API URL
        setTasks(response.data); // Assume the response data is an array of tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array ensures it runs only once on mount

  // Handle task addition by updating the state
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Add the new task to the tasks state
  };

  // Handle task update
  const handleUpdateTask = async (updatedTask) => {
    try {
      // Ensure updatedTask contains a valid _id and all necessary fields for the update
      if (!updatedTask._id) {
        console.error("No task ID found for updating");
        return;
      }

      console.log("Updating task with ID:", updatedTask._id);

      const response = await axios.patch(
        `http://localhost:4000/tasks/${updatedTask._id}`,
        updatedTask
      );

      console.log("Update response:", response.data);

      setTasks((prevTasks) => {
        return prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
      });

      setIsModalOpen(false); // Close the modal after a successful update
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update the task. Please try again."); // Optional alert for user feedback
    }
  };

<<<<<<< Updated upstream
=======
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
    setModalOpen(true);
  };

  // Render UI
>>>>>>> Stashed changes
  return (
    <div className="flex bg-gray-200">
      <div className="w-[242.01px]">
        <Dashboard />
      </div>
      <div className="min-h-screen p-7 w-full bg-white rounded-2xl mt-3 ml-3 mr-3">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl ml-2 font-extrabold">✅ Tasks</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-2xl shadow hover:bg-blue-600"
          >
            + Add New
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-black uppercase bg-gray-200">
              <tr>
                <th scope="col" className="p-4"></th>
                <th scope="col" className="px-6 py-3">
                  Task name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Project
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Assignee
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                const createdAtDate = new Date(task.createdAt)
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, "-");

                return (
                  <tr
                    key={task._id}
                    className="bg-white border-b bg-white hover:bg-gray-50"
                    onClick={() => {
                      if (task.status !== "Completed") {
                        console.log("Task clicked with ID:", task._id);
                        setIsModalOpen(true);
                        setTaskId(task._id);
                      } else {
                        console.log("Task is completed. Edit disabled.");
                      }
                    }}
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-${task._id}`}
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 checked:bg-green-500 focus:ring-green-500 focus:ring-2"
                          checked={task.status === "Completed"}
                          disabled={task.status === "Completed"} // Disable if already completed
                          onClick={(e) => e.stopPropagation()} // Prevent row click event
                          onChange={async () => {
                            if (task.status !== "Completed") {
                              try {
                                // Update the status to "Completed" in the backend
                                await axios.patch(
                                  `http://localhost:4000/tasks/${task._id}`,
                                  {
                                    status: "Completed",
                                  }
                                );

<<<<<<< Updated upstream
                                // Update the status in the state
                                setTasks((prevTasks) =>
                                  prevTasks.map((t) =>
                                    t._id === task._id
                                      ? { ...t, status: "Completed" }
                                      : t
                                  )
                                );
                              } catch (error) {
                                console.error(
                                  "Error updating task status:",
                                  error
                                );
                                alert(
                                  "Failed to update the task status. Please try again."
                                );
                              }
                            }
                          }}
                        />
                        <label
                          htmlFor={`checkbox-${task._id}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
=======
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
>>>>>>> Stashed changes
                    </td>

                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-black whitespace-nowrap overflow-hidden truncate max-w-[200px]"
                    >
                      {task.taskName}
                    </th>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${
                          task.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : task.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : task.status === "Overdue"
                            ? "bg-red-100 text-red-800"
                            : task.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-black">{task.project}</td>
                    <td className="px-6 py-4 text-black">{createdAtDate}</td>
                    <td className="px-6 py-4 text-black">
                      {new Date(task.dueDate)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "-")}
                    </td>
                    <td className="px-6 py-4 text-black">{task.assignee}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onTaskAdded={handleAddTask}
        />
        <UpdateTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          taskId={taskId}
          onTaskUpdated={handleUpdateTask}
        />
      </div>
<<<<<<< Updated upstream
=======
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
        projectDetails={projectDetails} 
      />
>>>>>>> Stashed changes
    </div>
  );
}

<<<<<<< Updated upstream
export default TaskDemo;
=======
export default CategoryAndProjectList;
>>>>>>> Stashed changes
