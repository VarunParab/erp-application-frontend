import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { formatMessageTime } from "../../lib/utils";

function ChatContainer() {
  const {
    messages,
    searchTerm,
    getMessages,
    isMessageLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    highlightedIndexes,
    currentIndex,
  } = useChatStore();

  const { authUser } = useAuthStore();

  const messageRefs = useRef([]); // Dynamic refs for each message
  const messageEndRef = useRef(null); // Ref for scrolling to the last message

  const [selectedImage, setSelectedImage] = useState(null); // State to track selected image

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }

    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (highlightedIndexes.length > 0 && currentIndex >= 0) {
      const messageToScroll = messageRefs.current[highlightedIndexes[currentIndex]];
      messageToScroll?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightedIndexes, currentIndex]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  const highlightText = (text) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="bg-yellow-300">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); // Set the clicked image to the state
  };

  const closeImagePreview = () => {
    setSelectedImage(null); // Close the image preview by resetting the state
  };

  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={(el) => (messageRefs.current[index] = el)} // Ref for each message
          >
            {/* Profile picture */}
            <div className="chat-image avatar">
              <div className="w-8 h-8 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>

            {/* Message header */}
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>

            {/* Message content */}
            <div
              className={`chat-bubble flex flex-col ${
                message.senderId === authUser._id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {/* Attachment */}
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2 cursor-pointer"
                  onClick={() => handleImageClick(message.image)} // Handle image click
                />
              )}
              {/* Highlighted text */}
              {message.text && <p>{highlightText(message.text)}</p>}
            </div>
          </div>
        ))}
        {/* Scroll to the last message */}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
      
      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeImagePreview} // Close image when clicking on the background
        >
          <div className="relative max-w-3xl max-h-full">
            <img
              src={selectedImage}
              alt="Enlarged Image"
              className="max-w-full max-h-full object-contain"
            />
            <button
              className="absolute top-2 right-2 text-white bg-black px-2 py-1 rounded-full"
              onClick={closeImagePreview} // Close image preview when clicking the close button
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatContainer;
