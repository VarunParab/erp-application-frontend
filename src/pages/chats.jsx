import React,{useEffect} from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Chats/Sidebar";
import ChatContainer from "../components/Chats/ChatContainer";
import NoChatSelected from "../components/Chats/NoChatSelected";
import Dashboard from "../components/dashboard";
function Chats(){
  const { selectedUser,setSelectedUser,users } = useChatStore();
  useEffect(() => {
    if (users.length > 0 && !selectedUser) {
      setSelectedUser(users[0]); // Select the first user from the list
    }
  }, [users, selectedUser]);
  return (
    <div className="flex bg-gray-200 fixed w-full">
      {/* Sidebar with Dashboard */}
      <div className="w-[242.01px]">
        <Dashboard />
      </div>

      {/* Main Content Area */}
      <div className="min-h-screen p-7 w-full bg-white rounded-2xl mt-3 ml-3 mr-3">
      <div className="h-screen">
      <div className="flex items-center justify-center pt-5 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {selectedUser ? <ChatContainer user={selectedUser} /> : <NoChatSelected />}
            </div>
        </div>
      </div>
    </div>
      </div>
</div>
  );
}
export default Chats;