import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import React,{useEffect} from "react";
import Homepage from "./pages/homepage";
import TaskDemo from "./pages/task";
import Chats from "./pages/chats";
import Projects from "./pages/project";
import Notifications from "./pages/notifications";
import Analytics from "./pages/analytics";
import Profile from "./pages/profile";
import Report from "./pages/report";
import SignUp from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import {useAuthStore} from "./store/useAuthStore.js";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ProtectedRoute.jsx";
function App() {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore()
  console.log({onlineUsers});
  
    useEffect(() =>{
      checkAuth();
    },[checkAuth]);
    if (isCheckingAuth && !authUser)
      return (
        <div className="flex items-center justify-center h-screen">
          <Loader className="size-10 animate-spin" />
        </div>
      );
  return (
    <Router>
      <Routes>
        <Route path="/" element={authUser?<Homepage />:<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<Homepage />} />} />
        <Route path="/task" element={<ProtectedRoute element={<TaskDemo />} />} />
        <Route path="/chats" element={<ProtectedRoute element={<Chats />} />} />
        <Route path="/project" element={<ProtectedRoute element={<Projects />} />} />
        <Route path="/notifications" element={<ProtectedRoute element={<Notifications />} />} />
        <Route path="/analytics" element={<ProtectedRoute element={<Analytics />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/reports" element={<ProtectedRoute element={<Report />} />} />
      </Routes>
      <Toaster />
    </Router>
  );
}
export default App;