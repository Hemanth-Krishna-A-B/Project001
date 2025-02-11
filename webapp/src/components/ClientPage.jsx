// src/components/ClientDashboard.js

import React, { useState } from 'react';
import { FaPoll, FaRegQuestionCircle, FaRegFilePowerpoint, FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/ClientPage.css';  // Ensure this file contains the necessary styles

const ClientPage = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState({
        slides: false,
        questions: false,
        polls: false
    });

    // Simulate new notifications appearing (for testing purposes)
    const handleNewNotification = (type) => {
        setNotifications({ ...notifications, [type]: true });
    };

    const handleNavigation = (path, type) => {
        setNotifications({ ...notifications, [type]: false }); // Clear notification when navigating
        navigate(path); // Navigate to the specified path
    };

    return (
        <div className="client-dashboard-container">
            <h2>Client Dashboard</h2>
            <div className="dashboard-boxes">
                <div className="dashboard-box" onClick={() => handleNavigation('/slides', 'slides')}>
                    <FaRegFilePowerpoint className="dashboard-icon" />
                    <p>Slides Shared</p>
                    {notifications.slides && <span className="notification-dot"></span>}
                </div>
                <div className="dashboard-box" onClick={() => handleNavigation('/questions', 'questions')}>
                    <FaRegQuestionCircle className="dashboard-icon" />
                    <p>Questions Shared</p>
                    {notifications.questions && <span className="notification-dot"></span>}
                </div>
                <div className="dashboard-box" onClick={() => handleNavigation('/polls', 'polls')}>
                    <FaPoll className="dashboard-icon" />
                    <p>Polls</p>
                    {notifications.polls && <span className="notification-dot"></span>}
                </div>
            </div>

            {/* Notification Bell */}
            <div className="notification-bell" onClick={() => handleNavigation('/notifications')}>
                <FaBell className="bell-icon" />
                {(notifications.slides || notifications.questions || notifications.polls) && (
                    <span className="notification-badge"></span>
                )}
            </div>
        </div>
    );
};

export default ClientPage;
