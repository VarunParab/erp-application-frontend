import React, { useState } from "react";
import Dashboard from "../components/dashboard";
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';
  
function Notifications() {
  const [selectedCategory, setSelectedCategory] = useState("unread");

  // Sample messages with individual "isArchived" status
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet excepturi amet minus laudantium ratione perspiciatis voluptatibus officiis dolor veniam explicabo exercitationem inventore officia rerum aliquam vero repellat optio deserunt sunt sequi corporis, adipisci magni laborum error nulla? Cupiditate modi nesciunt est harum eligendi nisi enim esse nostrum quis eum illum cum voluptas obcaecati molestias beatae, deleniti deserunt odit rem itaque dignissimos exercitationem? Adipisci quibusdam possimus ea maiores aspernatur et veritatis eveniet repellat quia, commodi mollitia dolores deserunt voluptas explicabo deleniti illum neque omnis, consequatur quisquam quasi beatae sunt cumque. Libero repudiandae ipsa nam neque impedit nulla vitae ut repellat iusto.",
      status: "unread",
      time: "5 min ago",
      profilePicUrl: "https://th.bing.com/th/id/OIP.wtMo3mqObnVZsILIT2yekwHaLH?w=130&h=193&c=7&r=0&o=5&dpr=2&pid=1.7",
      isArchived: false,
    },
    { 
      id: 2, 
      text: "Read message 1", 
      status: "read", 
      profilePicUrl: "https://th.bing.com/th/id/OIP.Br17NUVA4jSXvNC4z2zkdAAAAA?w=178&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
      isArchived: false,
    },
    { 
      id: 3, 
      text: "Archived message 1", 
      status: "archived",
      profilePicUrl: "https://th.bing.com/th/id/OIP.wtMo3mqObnVZsILIT2yekwHaLH?w=130&h=193&c=7&r=0&o=5&dpr=2&pid=1.7",
      isArchived: true,
    },
    { 
      id: 4, 
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed labore ducimus veritatis minus voluptate quis libero exercitationem vel enim aliquam ullam ut illo vitae tenetur voluptatibus, dolor officiis eos nulla.2", 
      status: "unread",
      profilePicUrl: "https://th.bing.com/th/id/OIP.Br17NUVA4jSXvNC4z2zkdAAAAA?w=178&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
      time: "1 hour ago",
      isArchived: false,
    },
    { id: 5, text: "Read message 2", status: "read", isArchived: false },
    { id: 6, text: "Archived message 2", status: "archived", isArchived: true },
    { 
      id: 7, 
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed labore ducimus veritatis minus voluptate quis libero exercitationem vel enim aliquam ullam ut illo vitae tenetur voluptatibus, dolor officiis eos nulla.", 
      status: "unread",
      profilePicUrl: "https://th.bing.com/th?id=OIP.gM_KIguOi-mM9DHz_KSIDQAAAA&w=270&h=231&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2",
      time: "1:15 pm",
      isArchived: false,
    },
  ]);
  
  // Count messages by status
  const unreadCount = messages.filter((message) => message.status === "unread").length;
  const readCount = messages.filter((message) => message.status === "read").length;
  const archivedCount = messages.filter((message) => message.status === "archived").length;

  // Filter messages based on selected category
  const filteredMessages = messages.filter(
    (message) => message.status === selectedCategory
  );

  const handleArchive = (id) => {
    // Toggle the 'isArchived' state of the clicked message
    setMessages((prevMessages) => 
      prevMessages.map((message) =>
        message.id === id ? { ...message, isArchived: !message.isArchived } : message
      )
    );
  };

  return (
    <div className="flex bg-gray-200">
      {/* Sidebar with Dashboard */}
      <div className="w-[242.01px]">
        <Dashboard />
      </div>
      {/* Main Content Area */}
      <div className="min-h-screen p-7 w-full bg-white rounded-2xl mt-3 ml-3 mr-3">
        <h1 className="ml-3 mb-3 text-3xl font-extrabold">
          Your Notifications
        </h1>
        <div className="bg-gray-100 p-1 rounded-2xl mb-5">
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setSelectedCategory("unread")}
              className={`text-center p-3 rounded-2xl ${
                selectedCategory === "unread"
                  ? "bg-white text-red-500 font-semibold  border-solid border-2 border-red-200"
                  : "bg-gray-100"
              }`}
            >
              Unread
              <span
                className={`text-sm ml-1 ${
                  selectedCategory === "unread" ? "text-red-500" : "text-black"
                }`}
              >
                <span className="inline-block bg-gray-100 border-solid border-2 border-gray-200 px-1.5 py-0.8 rounded-lg">
                  {unreadCount}
                </span>
              </span>
            </button>
            <button
              onClick={() => setSelectedCategory("read")}
              className={`text-center p-3 rounded-2xl ${
                selectedCategory === "read"
                  ? "bg-white text-red-500 font-semibold border-solid border-2 border-red-200"
                  : "bg-gray-100"
              }`}
            >
              Read
              <span
                className={`text-sm ml-1 ${
                  selectedCategory === "read" ? "text-red-500" : "text-black"
                }`}
              >
                <span className="inline-block bg-gray-100 border-solid border-2 border-gray-200 px-1.5 py-0.8 rounded-lg">
                  {readCount}
                </span>
              </span>
            </button>
            <button
              onClick={() => setSelectedCategory("archived")}
              className={`text-center p-3 rounded-2xl ${
                selectedCategory === "archived"
                  ? "bg-white text-red-500 font-semibold border-solid border-2 border-red-200"
                  : "bg-gray-100"
              }`}
            >
              Archived
              <span
                className={`text-sm ml-1 mb-4 ${
                  selectedCategory === "archived"
                    ? "text-red-500"
                    : "text-black"
                }`}
              >
                <span className="inline-block bg-gray-100 border-solid border-2 border-gray-200 px-1.5 py-0.8 rounded-lg">
                  {archivedCount}
                </span>
              </span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                className="p-4 bg-gray-90 rounded-lg shadow-md flex items-start space-x-4"
              >
                {/* Profile Image */}
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                  <img
                    src={message.profilePicUrl} // Replace with the actual profile image URL from the message object
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Message Text */}
                <div className="flex-1">
                  <p>{message.text}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm mt-1.5 text-gray-500">{message.time}</p>

                    {/* Archive Button */}
                    <button
                      onClick={() => handleArchive(message.id)}
                      className="text-gray-600"
                    >
                      {message.isArchived ? (
                        <ArchiveIcon />
                      ) : (
                        <ArchiveOutlinedIcon />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No messages found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
