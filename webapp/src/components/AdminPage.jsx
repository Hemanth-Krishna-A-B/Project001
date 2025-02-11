// components/AdminPage.jsx
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Analytics from "./Analytics";
import Questions from "./Questions";
import Reports from "./Reports";
import "../styles/adminpage.css";

const AdminPage = () => {
  const [selectedTab, setSelectedTab] = useState("slides");

  const renderContent = () => {
    switch (selectedTab) {
      case "analytics":
        return <Analytics />;
      case "questions":
        return <Questions />;
      case "reports":
        return <Reports />;
      default:
        return <Content />;
    }
  };

  return (
    <div className="admin-page">
      <Sidebar onMenuClick={setSelectedTab} />
      <div className="admin-page-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="content-container"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminPage;
