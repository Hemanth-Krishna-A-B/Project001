// App.js
import React, { useState } from "react"; 
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import LoginScreen from "./components/LoginScreen"; 
import ClientPage from "./components/ClientPage"; 
import AdminPage from "./components/AdminPage"; 
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isViewer, setIsViewer] = useState(false); 
  const [userRole, setUserRole] = useState(""); 

  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setIsViewer(role === "viewer");
  };

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<LoginScreen onLoginSuccess={handleLoginSuccess} />} />
        
        {/* Admin Dashboard */}
        <Route
          path="/dashboard"
          element={isLoggedIn && userRole === "admin" ? <AdminPage /> : <Navigate to="/" />}
        />
        
        {/* Viewer Client Page */}
        <Route
          path="/clientPage"
          element={isLoggedIn && isViewer ? <ClientPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
