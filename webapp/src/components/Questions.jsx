import React, { useState } from "react";
import { FiShare2, FiCheckCircle } from "react-icons/fi"; // Share icon and check icon for shared
import "../styles/questions.css";

const Questions = () => {
  // Sample data for both questions and polls
  const [questions, setQuestions] = useState([
    { id: 1, question: "What is React?", shared: false },
    { id: 2, question: "Explain Virtual DOM.", shared: false },
    { id: 3, question: "What are hooks?", shared: false },
  ]);

  const [polls, setPolls] = useState([
    { id: 1, question: "Which framework do you prefer?", shared: false },
    { id: 2, question: "Do you like JavaScript?", shared: false },
  ]);

  // State to track the popup visibility and item being shared
  const [sharePopup, setSharePopup] = useState({ show: false, itemId: null, type: "" });

  // Function to handle share/unshare button for questions and polls
  const handleShareClick = (id, type) => {
    if (type === "question") {
      setQuestions((prevQuestions) => {
        const updatedQuestions = prevQuestions.map((question) =>
          question.id === id
            ? { ...question, shared: !question.shared } // Toggle shared status
            : question
        );

        // Sort questions: shared questions go to the top
        return updatedQuestions.sort((a, b) => (b.shared ? 1 : 0) - (a.shared ? 1 : 0));
      });
    } else if (type === "poll") {
      setPolls((prevPolls) => {
        const updatedPolls = prevPolls.map((poll) =>
          poll.id === id
            ? { ...poll, shared: !poll.shared } // Toggle shared status
            : poll
        );

        // Sort polls: shared polls go to the top
        return updatedPolls.sort((a, b) => (b.shared ? 1 : 0) - (a.shared ? 1 : 0));
      });
    }

    // Toggle the popup visibility when sharing
    setSharePopup({ show: true, itemId: id, type: type });

    // Close popup automatically after 2 seconds
    setTimeout(() => {
      setSharePopup({ show: false, itemId: null, type: "" });
    }, 2000);
  };

  // Helper function to get the correct question/poll text for the popup
  const getSharedText = (id, type) => {
    if (type === "question") {
      const question = questions.find(q => q.id === id);
      return `Question: "${question?.question}" ${question?.shared ? "Shared!" : "Unshared!"}`;
    } else if (type === "poll") {
      const poll = polls.find(p => p.id === id);
      return `Poll: "${poll?.question}" ${poll?.shared ? "Shared!" : "Unshared!"}`;
    }
    return "";
  };

  return (
    <div className="content-box">
      <div className="create-container">
        {/* Create Question and Poll Box */}
        <div className="create-box">
          <h3>Create Question and Poll</h3>
          <div className="create-options">
            <button className="create-question-btn">Create Question</button>
            <button className="create-poll-btn">Create Poll</button>
          </div>
        </div>
      </div>

      <div className="existing-container">
        {/* Existing Questions Box */}
        <div className="existing-questions-box">
          <h3>Existing Questions</h3>
          <ul className="questions-list">
            {questions.map((question) => (
              <li key={question.id}>
                {question.shared && <FiCheckCircle className="shared-icon" />} {/* Show shared icon */}
                {question.question}
                <button
                  className={`share-btn ${question.shared ? "active" : ""}`}
                  onClick={() => handleShareClick(question.id, "question")}
                >
                  <FiShare2 /> {question.shared ? "Unshare" : "Share"}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Existing Polls Box */}
        <div className="existing-polls-box">
          <h3>Existing Polls</h3>
          <ul className="polls-list">
            {polls.map((poll) => (
              <li key={poll.id}>
                {poll.shared && <FiCheckCircle className="shared-icon" />} {/* Show shared icon */}
                {poll.question}
                <button
                  className={`share-btn ${poll.shared ? "active" : ""}`}
                  onClick={() => handleShareClick(poll.id, "poll")}
                >
                  <FiShare2 /> {poll.shared ? "Unshare" : "Share"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Share Popup */}
      {sharePopup.show && (
        <div className="share-popup">
          <span className="share-popup-text">
            {getSharedText(sharePopup.itemId, sharePopup.type)}
          </span>
          <button
            className="close-popup-btn"
            onClick={() => setSharePopup({ show: false, itemId: null, type: "" })}
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
};

export default Questions;
