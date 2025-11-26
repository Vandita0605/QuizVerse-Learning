import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import ModuleContent from "./pages/ModuleContent";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/module/:id" element={<ModuleContent />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;