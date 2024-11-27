import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CircleIcon from "@mui/icons-material/Circle";
function Chats() {
  const [selectedContact, setSelectedContact] = useState(0);
  const [messageInput, setMessageInput] = useState("");
  const [file, setFile] = useState(null);

  // Example contacts with messages and a timestamp for the last message
  const contacts = [
    {
      name: "John Doe",
      status: "Online",
      statuscolor: "green-300",
      messages: [
        { text: "Hi, how are you?", timestamp: "09:00 AM" },
        { text: "I'm good, thanks!", timestamp: "09:05 AM" },
        { text: "Hi, how are you?", timestamp: "09:00 AM" },
        { text: "I'm good, thanks!", timestamp: "09:05 AM" },
        { text: "Hi, how are you?", timestamp: "09:00 AM" },
        { text: "I'm good, thanks!", timestamp: "09:05 AM" },
        { text: "Hi, how are you?", timestamp: "09:00 AM" },
        { text: "I'm good, thanks!", timestamp: "09:05 AM" },
        { text: "Hi, how are you?", timestamp: "09:00 AM" },
        { text: "I'm good, thanks!", timestamp: "09:05 AM" },
        { text: "Hi, how are you?", timestamp: "09:00 AM" },
        { text: "I'm good, thanks!", timestamp: "09:10 AM" },
      ],
      unreadMessages: 3,
      lastMessageTime: "4m ago",
      src: "https://th.bing.com/th/id/OIP.wtMo3mqObnVZsILIT2yekwHaLH?w=130&h=193&c=7&r=0&o=5&dpr=2&pid=1.7",
    },
    {
      name: "Jane Smith",
      status: "Offline",
      statuscolor: "red-300",
      messages: [
        { text: "Hey, what's up?", timestamp: "09:10 AM" },
        { text: "Not much! 😅", timestamp: "09:12 AM" },
      ],
      unreadMessages: 2,
      lastMessageTime: "10m ago",
      src: "https://th.bing.com/th/id/OIP.Br17NUVA4jSXvNC4z2zkdAAAAA?w=178&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
    },
    {
      name: "Alex Johnson",
      status: "Away",
      statuscolor: "yellow-300",
      messages: [
        { text: "Hello!", timestamp: "09:15 AM" },
        { text: "How's it going?", timestamp: "09:20 AM" },
      ],
      unreadMessages: 1,
      lastMessageTime: "15m ago",
      src: "https://th.bing.com/th?id=OIP.gM_KIguOi-mM9DHz_KSIDQAAAA&w=270&h=231&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2",
    },
    {
      name: "Alex Johnson",
      messages: [
        { text: "Hello!", timestamp: "09:15 AM" },
        { text: "How's it going?", timestamp: "09:20 AM" },
      ],
      unreadMessages: 1,
      lastMessageTime: "15m ago",
      src: "https://th.bing.com/th?id=OIP.gM_KIguOi-mM9DHz_KSIDQAAAA&w=270&h=231&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2",
    },
    {
      name: "Alex Johnson",
      messages: [
        { text: "Hello!", timestamp: "09:15 AM" },
        { text: "How's it going?", timestamp: "09:20 AM" },
      ],
      unreadMessages: 1,
      lastMessageTime: "15m ago",
      src: "https://th.bing.com/th?id=OIP.gM_KIguOi-mM9DHz_KSIDQAAAA&w=270&h=231&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2",
    },
    {
      name: "Alex Johnson",
      messages: [
        { text: "Hello!", timestamp: "09:15 AM" },
        { text: "How's it going?", timestamp: "09:20 AM" },
      ],
      unreadMessages: 1,
      lastMessageTime: "15m ago",
      src: "https://th.bing.com/th?id=OIP.gM_KIguOi-mM9DHz_KSIDQAAAA&w=270&h=231&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2",
    },
    {
      name: "Alex Johnson",
      messages: [
        { text: "Hello!", timestamp: "09:15 AM" },
        { text: "How's it going?", timestamp: "09:20 AM" },
      ],
      unreadMessages: 1,
      lastMessageTime: "15m ago",
      src: "https://th.bing.com/th?id=OIP.gM_KIguOi-mM9DHz_KSIDQAAAA&w=270&h=231&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2",
    },
    {
      name: "Alex Johnson",
      messages: [
        { text: "Hello!", timestamp: "09:15 AM" },
        { text: "How's it going?", timestamp: "09:20 AM" },
      ],
      unreadMessages: 1,
      lastMessageTime: "15m ago",
      src: "https://th.bing.com/th?id=OIP.gM_KIguOi-mM9DHz_KSIDQAAAA&w=270&h=231&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2",
    },
    {
      name: "Alex Johnson",
      messages: [
        { text: "Hello!", timestamp: "09:15 AM" },
        { text: "How's it going?", timestamp: "09:20 AM" },
      ],
      unreadMessages: 1,
      lastMessageTime: "15m ago",
      src: "https://th.bing.com/th?id=OIP.gM_KIguOi-mM9DHz_KSIDQAAAA&w=270&h=231&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2",
    },
  ];

  const handleContactClick = (index) => {
    setSelectedContact(index); // Set the selected contact's index
  };

  const handleMessageSend = () => {
    if (selectedContact !== null && messageInput.trim() !== "") {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      contacts[selectedContact].messages.push({
        text: messageInput,
        timestamp: currentTime,
      });
      setMessageInput(""); // Clear the input field after sending
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="flex bg-gray-200">
      {/* Sidebar with Dashboard */}
      <div className="w-[242.01px]">
        <Dashboard />
      </div>

      {/* Main Content Area */}
      <div className="min-h-screen p-7 w-full bg-white rounded-2xl mt-3 ml-3 mr-3">
        <div className="flex">
          {/* Left Side: List of Contacts */}
          <div className="w-1/3 h-[730px] bg-gray-100 rounded-2xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              {/* Left Section: Heading */}
              <h2 className="text-2xl ml-3 font-bold">💬 All Chats</h2>

              {/* Right Section: + Button */}
              <button className="text-white bg-gray-400 pb-1.5 hover:bg-gray-500 px-3 py-1 rounded-full shadow">
                +
              </button>
            </div>{" "}
            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className={`relative flex items-center justify-between p-2 rounded-xl cursor-pointer ${
                    selectedContact === index ? "bg-gray-200" : "bg-white"
                  }`}
                  onClick={() => handleContactClick(index)} // Select contact on click
                >
                  {/* Profile Icon */}
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                      <img
                        src={contact.src}
                        alt="User Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    {/* Contact Name */}
                    <span className="text-base">{contact.name}</span>

                    {/* Timestamp (e.g., "4m ago") */}
                    <div className="absolute top-1 right-2 text-xs text-gray-400">
                      {contact.lastMessageTime}
                    </div>

                    {/* Truncated Last Message */}
                    <div className="text-xs text-gray-400">
                      {contact.messages[contact.messages.length - 1].text
                        .length > 20
                        ? `${contact.messages[
                            contact.messages.length - 1
                          ].text.slice(0, 20)}...`
                        : contact.messages[contact.messages.length - 1].text}
                    </div>
                  </div>

                  {/* Unread Messages Indicator (Bottom-Right) */}
                  {contact.unreadMessages > 0 && (
                    <div className="absolute bottom-1 right-2 bg-red-500 text-white text-xs px-1 py-0 rounded-full">
                      {contact.unreadMessages}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Chat Window */}
          <div className="w-2/3 h-[730px] bg-gray-100 p-4 rounded-2xl ml-4 flex flex-col">
            {selectedContact !== null ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center mb-4 border-b pb-2">
                  {/* Selected Contact's Profile Picture */}
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 mr-3">
                    <img
                      src={contacts[selectedContact].src}
                      alt="Selected User Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Selected Contact's Name */}
                  <div>
                    <h3 className="text-lg font-semibold">
                      {contacts[selectedContact].name}
                    </h3>
                    <p className="text-xs">
                      <CircleIcon
                        style={{ fontSize: "15px" }}
                        className={`px-0.5 py-0.5 mb-0.5 ${
                          {
                            Online: "text-green-500",
                            Offline: "text-red-500",
                            Away: "text-yellow-500",
                          }[contacts[selectedContact].status] || "text-black" // Default color
                        }`}
                      />
                      {contacts[selectedContact].status}
                    </p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <div className="flex flex-col space-y-4">
                    {contacts[selectedContact].messages.map(
                      (message, index) => {
                        const isMyMessage = index % 2 !== 0; // Alternate for demo

                        return (
                          <div
                            key={index}
                            className={`flex items-center ${
                              isMyMessage ? "justify-end" : "justify-start"
                            }`}
                          >
                            {/* User Profile Icon */}
                            {!isMyMessage && (
                              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 mr-2">
                                <img
                                  src={contacts[selectedContact].src}
                                  alt="User Profile"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}

                            {/* Message Bubble */}
                            <div className="flex flex-col items-end">
                              {/* Message Bubble */}
                              <div
                                className={`${
                                  isMyMessage
                                    ? "bg-blue-500 text-white"
                                    : "bg-white"
                                } p-3 rounded-2xl max-w-xs`}
                              >
                                <p>{message.text}</p>
                              </div>

                              {/* Timestamp */}
                              <div className="text-xs text-gray-400 mt-1 mr-2 text-right">
                                {message.timestamp}
                              </div>
                            </div>

                            {/* My Profile Icon */}
                            {isMyMessage && (
                              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 ml-2">
                                <img
                                  src="https://imgv3.fotor.com/images/gallery/a-man-profile-picture-with-blue-and-green-background-made-by-LinkedIn-Profile-Picture-Maker.jpg"
                                  alt="My Profile"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Chat Input */}
                <div className="flex items-center border-t pt-4">
                  {/* File Attachment*/}
                  <label htmlFor="file-upload" className="cursor-pointer mr-2">
                    <span className="text-gray-500">
                      <AttachFileRoundedIcon />
                    </span>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>

                  {/* Message Input */}
                  <input
                    type="text"
                    placeholder="Type a message"
                    className="w-full p-3 rounded-xl border border-gray-300 outline-none"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />

                  {/* Send Button */}
                  <button
                    onClick={handleMessageSend}
                    className="ml-3 p-2 bg-blue-500 text-white rounded-full"
                  >
                    <SendRoundedIcon />
                  </button>
                </div>
              </>
            ) : (
              <p>Select a contact to start chatting.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Chats;
