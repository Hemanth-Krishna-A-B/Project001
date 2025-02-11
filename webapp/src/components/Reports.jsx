import React, { useState } from "react";
import { FiDownload, FiChevronDown, FiChevronUp } from "react-icons/fi";
import "../styles/reports.css";

const Reports = () => {
  const [expandedReport, setExpandedReport] = useState(null);

  const reports = [
    { id: 1, name: "Poll: React Basics", date: "2025-02-10", status: "Completed" },
    { id: 2, name: "Slide: JavaScript Advanced", date: "2025-02-09", status: "Pending" },
    { id: 3, name: "Poll: React Router", date: "2025-02-08", status: "In Progress" },
  ];

  const handleExpandToggle = (id) => {
    setExpandedReport(expandedReport === id ? null : id);
  };

  const handleExport = (reportName) => {
    alert(`Exporting report: ${reportName}`);
  };

  return (
    <div className="content-box">
      <h3>Reports and Logs</h3>
      <ul className="report-list">
        {reports.map((report) => (
          <li key={report.id} className="report-item">
            {/* Left icon (Export) */}
            <FiDownload
              className="export-icon"
              onClick={() => handleExport(report.name)}
            />
            <div className="report-info">
              <span className="report-name">{"   " + report.name}</span>
              <span className="report-date">{"   " + report.date}</span>
            </div>
            <button
              className="expand-btn"
              onClick={() => handleExpandToggle(report.id)}
            >
              {expandedReport === report.id ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {expandedReport === report.id && (
              <div className="report-status">
                <strong>Status:</strong> {report.status}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
