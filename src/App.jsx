import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import React from "react";
import Homepage from "./pages/homepage";
import Task from "./pages/task";
import Chats from "./pages/chats";
import Projects from "./pages/project";
import Notifications from "./pages/notifications";
import Analytics from "./pages/analytics";
import Profile from "./pages/profile";
import Report from "./pages/report";
import Taskdemo from "./pages/demo";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/task" element={<Task />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/taskdemo" element={<Taskdemo />} />
      </Routes>
    </Router>
  );
}
export default App;