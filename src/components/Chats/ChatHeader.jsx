import { X } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import { Search } from "lucide-react";
import { useState } from "react";


const ChatHeader = () => {
  const { navigateHighlight, highlightedIndexes } = useChatStore();
  const { selectedUser, setSelectedUser } = useChatStore();
  const { setSearchTerm } = useChatStore();  // Access searchTerm from the store
  const { onlineUsers } = useAuthStore();
  // State to toggle the search input field visibility
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Function to handle the search button click
  const toggleSearch = () => {
    setIsSearchVisible((prev) => {
      if (prev) {
        // If search box is being closed, clear the search term
        setSearchTerm("");
      }
      return !prev;
    });
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);  // Update the searchTerm in the store directly
  };


  return (
    <div className="p-2.5 border-b border-gray-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="w-10 h-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Button Container for Search and Close */}
        <div className="flex items-center gap-4">
          {/* Search Input Field */}
          {isSearchVisible && (
  <div className="relative w-72"> {/* Relative container to position items */}
    <input
      type="text"
      placeholder="Search messages..."
      className="p-2 border rounded-3xl w-full pr-10" // Add padding-right for icons
      onChange={handleSearchChange}
    />

    {/* Chevron Up Icon */}
    <button className="absolute right-8 top-2 cursor-pointer" onClick={() => navigateHighlight(-1)}>
      <ChevronUp
        className={`w-6 h-6 ${
          highlightedIndexes.length === 0 ? "text-gray-400" : "text-black"
        }`} // Adjust icon color based on disabled state
      />
    </button>

    {/* Chevron Down Icon */}
    <button className="absolute right-2 top-2 cursor-pointer" onClick={() => navigateHighlight(1)}>
      <ChevronDown
        className={`w-6 h-6 ${
          highlightedIndexes.length === 0 ? "text-gray-400" : "text-black"
        }`} // Adjust icon color based on disabled state
      />
    </button>
  </div>
)}

          {/* Search button */}
          <button onClick={toggleSearch}>
            <Search />
          </button>

          {/* X (Close) button */}
          <button onClick={() => setSelectedUser(null)}>
            <X />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;