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
    setCurrentIndex,
  } = useChatStore();

  const { authUser } = useAuthStore();

  // Dynamic refs for each message
  const messageRefs = useRef([]);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (highlightedIndexes.length > 0 && currentIndex >= 0) {
      const messageToScroll = messageRefs.current[highlightedIndexes[currentIndex]];
      messageToScroll?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightedIndexes, currentIndex]);

  const highlightText = (text) => {
    if (!searchTerm) return text;

    // Create a regular expression to match the search term
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
            ref={(el) => (messageRefs.current[index] = el)} // Assign ref dynamically
          >
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
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div
              className={`chat-bubble flex flex-col ${
                message.senderId === authUser._id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{highlightText(message.text)}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
