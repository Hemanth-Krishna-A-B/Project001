import React from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { SiGoogleslides } from "react-icons/si";
import { TbReportAnalytics, TbMessageQuestion } from "react-icons/tb";
import { FiDatabase } from "react-icons/fi";
import "../styles/sidebar.css";

const Sidebar = ({ onMenuClick }) => {
  const menuItems = [
    { id: "slides", icon: <SiGoogleslides />, label: "My Slides" },
    { id: "analytics", icon: <TbReportAnalytics />, label: "Analytics" },
    { id: "questions", icon: <TbMessageQuestion />, label: "Questions" },
    { id: "reports", icon: <FiDatabase />, label: "Report And Log" },
  ];

  return (
    <nav className="menu">
      <div className="logo">
        <BiCategoryAlt className="logo-icon" aria-hidden="true" />
        <h2>Present_IT</h2>
      </div>

      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item.id} className="items">
            <button onClick={() => onMenuClick(item.id)} className="menu-button">
              {item.icon}
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
