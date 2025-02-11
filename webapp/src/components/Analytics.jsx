import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiUsers } from "react-icons/fi"; // Users icon for student list
import "../styles/analytics.css";

const Analytics = () => {
  const [expandedSlide, setExpandedSlide] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [expandedPoll, setExpandedPoll] = useState(null);

  const activeSlides = [
    {
      id: 1,
      name: "Slide 1: Introduction to React",
      responses: 120,
      successRate: 85,
      students: [
        { name: "John", status: "online", answers: { true: 10, false: 2 } },
        { name: "Jane", status: "offline", answers: { true: 8, false: 5 } },
      ],
    },
    {
      id: 2,
      name: "Slide 2: React State Management",
      responses: 90,
      successRate: 70,
      students: [
        { name: "Alice", status: "online", answers: { true: 15, false: 3 } },
        { name: "Bob", status: "online", answers: { true: 12, false: 5 } },
      ],
    },
  ];

  const activeQuestions = [
    {
      id: 1,
      question: "What is React?",
      responses: 150,
      successRate: 92,
      students: [
        { name: "Tom", status: "online", answers: { true: 12, false: 0 } },
        { name: "Lucy", status: "offline", answers: { true: 9, false: 4 } },
      ],
    },
    {
      id: 2,
      question: "Explain the concept of Virtual DOM.",
      responses: 100,
      successRate: 75,
      students: [
        { name: "Eve", status: "online", answers: { true: 7, false: 1 } },
        { name: "Steve", status: "online", answers: { true: 10, false: 3 } },
      ],
    },
  ];

  const activePolls = [
    {
      id: 1,
      poll: "React Poll: Understanding Hooks",
      responses: 200,
      successRate: 80,
      students: [
        { name: "Sam", status: "online", answers: { true: 20, false: 5 } },
        { name: "Clara", status: "offline", answers: { true: 15, false: 7 } },
      ],
    },
    {
      id: 2,
      poll: "JavaScript Poll: Async/Await",
      responses: 130,
      successRate: 65,
      students: [
        { name: "Paul", status: "online", answers: { true: 11, false: 6 } },
        { name: "Rick", status: "online", answers: { true: 14, false: 2 } },
      ],
    },
  ];

  const handleExpandToggle = (type, id) => {
    if (type === "slide") {
      setExpandedSlide(expandedSlide === id ? null : id);
    } else if (type === "question") {
      setExpandedQuestion(expandedQuestion === id ? null : id);
    } else if (type === "poll") {
      setExpandedPoll(expandedPoll === id ? null : id);
    }
  };

  return (
    <div className="analytics-container">
      {/* Active Slides Box */}
      <div className="analytics-box">
        <h3>Active Slides</h3>
        <ul>
          {activeSlides.map((slide) => (
            <li
              key={slide.id}
              className="analytics-item"
              onClick={() => handleExpandToggle("slide", slide.id)} // Toggle expand for slides
            >
              {slide.name}
              <span className="expand-icon">
                {expandedSlide === slide.id ? <FiChevronUp /> : <FiChevronDown />}
              </span>
              {expandedSlide === slide.id && (
                <div className="analytics-details">
                  <p>Responses: {slide.responses}</p>
                  <p>Success Rate: {slide.successRate}%</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Active Questions Box */}
      <div className="analytics-box">
        <h3>Active Questions</h3>
        <ul>
          {activeQuestions.map((question) => (
            <li
              key={question.id}
              className="analytics-item"
              onClick={() => handleExpandToggle("question", question.id)} // Toggle expand for questions
            >
              {question.question}
              <span className="expand-icon">
                {expandedQuestion === question.id ? <FiChevronUp /> : <FiChevronDown />}
              </span>
              {expandedQuestion === question.id && (
                <div className="analytics-details">
                  <p>Responses: {question.responses}</p>
                  <p>Success Rate: {question.successRate}%</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Active Polls Box */}
      <div className="analytics-box">
        <h3>Active Polls</h3>
        <ul>
          {activePolls.map((poll) => (
            <li
              key={poll.id}
              className="analytics-item"
              onClick={() => handleExpandToggle("poll", poll.id)} // Toggle expand for polls
            >
              {poll.poll}
              <span className="expand-icon">
                {expandedPoll === poll.id ? <FiChevronUp /> : <FiChevronDown />}
              </span>
              {expandedPoll === poll.id && (
                <div className="analytics-details">
                  <p>Responses: {poll.responses}</p>
                  <p>Success Rate: {poll.successRate}%</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Student List Below Report Boxes */}
      <div className="students-list-box">
        <h3>Students Online</h3>
        <div className="students-list">
          <FiUsers /> {/* Icon for student list */}
          {expandedSlide && (
            <div>
              <h4>Students for Slide:</h4>
              {activeSlides
                .filter((slide) => slide.id === expandedSlide)
                .map((slide) => (
                  <div key={slide.id}>
                    <ul>
                      {slide.students
                        .filter((student) => student.status === "online")
                        .map((student, index) => (
                          <li key={index}>
                            {student.name} (True: {student.answers.true}, False:{" "}
                            {student.answers.false})
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
            </div>
          )}

          {expandedQuestion && (
            <div>
              <h4>Students for Question:</h4>
              {activeQuestions
                .filter((question) => question.id === expandedQuestion)
                .map((question) => (
                  <div key={question.id}>
                    <ul>
                      {question.students
                        .filter((student) => student.status === "online")
                        .map((student, index) => (
                          <li key={index}>
                            {student.name} (True: {student.answers.true}, False:{" "}
                            {student.answers.false})
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
            </div>
          )}

          {expandedPoll && (
            <div>
              <h4>Students for Poll:</h4>
              {activePolls
                .filter((poll) => poll.id === expandedPoll)
                .map((poll) => (
                  <div key={poll.id}>
                    <ul>
                      {poll.students
                        .filter((student) => student.status === "online")
                        .map((student, index) => (
                          <li key={index}>
                            {student.name} (True: {student.answers.true}, False:{" "}
                            {student.answers.false})
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
