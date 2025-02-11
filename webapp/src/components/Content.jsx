import React, { useState } from "react";
import { FiShare2, FiCheckCircle, FiUpload } from "react-icons/fi"; // Added upload icon
import "../styles/content.css";

const Content = () => {
  // Sample existing slides data
  const [slides, setSlides] = useState([
    { id: 1, name: "Slide 1", shared: false },
    { id: 2, name: "Slide 2", shared: false },
    { id: 3, name: "Slide 3", shared: false },
    { id: 4, name: "Slide 4", shared: false },
    { id: 5, name: "Slide 5", shared: false },
    { id: 6, name: "Slide 6", shared: false },
    { id: 7, name: "Slide 7", shared: false },
    { id: 8, name: "Slide 8", shared: false },
  ]);

  // State to track the popup visibility and slide being shared
  const [sharePopup, setSharePopup] = useState({ show: false, slideId: null });
  const [createSlidePopup, setCreateSlidePopup] = useState(false); // State for create slide popup
  const [file, setFile] = useState(null); // State to hold the uploaded file

  // Function to handle the share button click (Toggle Live)
  const handleShareClick = (id) => {
    setSlides((prevSlides) => {
      // Find the slide to toggle its shared state
      const updatedSlides = prevSlides.map((slide) =>
        slide.id === id
          ? { ...slide, shared: !slide.shared } // Toggle shared status
          : slide
      );

      // Sort slides: shared slides go to the top
      return updatedSlides.sort((a, b) => (b.shared ? 1 : 0) - (a.shared ? 1 : 0));
    });

    // Toggle the popup visibility when sharing
    setSharePopup({ show: true, slideId: id });

    // Close popup automatically after 2 seconds
    setTimeout(() => {
      setSharePopup({ show: false, slideId: null });
    }, 2000);
  };

  // Function to handle creating a new slide
  const handleCreateSlide = () => {
    setCreateSlidePopup(true); // Show the create slide popup
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      alert("File uploaded successfully!"); // Replace with actual file handling logic (e.g., saving it to a server)
      setCreateSlidePopup(false); // Close the popup after file upload
    }
  };

  return (
    <div className="content-box">
      {/* New Slide Creation Box */}
      <div className="new-slide-box">
        <h3>Create New Slide</h3>
        <button className="create-slide-btn" onClick={handleCreateSlide}>
          Create Slide
        </button>
      </div>

      {/* List of Existing Slides Box */}
      <div className="existing-slides-box">
        <h3>Existing Slides</h3>
        <ul className="slides-list">
          {slides.map((slide) => (
            <li key={slide.id}>
              {slide.shared && <FiCheckCircle className="shared-icon" />} {/* Show shared icon */}
              {slide.name}
              <button
                className={`live-btn ${slide.shared ? "active" : ""}`} // Apply 'active' class if shared
                onClick={() => handleShareClick(slide.id)}
              >
                <FiShare2 /> {slide.shared ? "Turn Off Live" : "Turn On Live"}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Share Popup */}
      {sharePopup.show && (
        <div className="share-popup">
          <span className="share-popup-text">Slide {sharePopup.slideId + 1} {slides[sharePopup.slideId].shared ? 'Shared!' : 'Live Off!'}</span>
          <button
            className="close-popup-btn"
            onClick={() => setSharePopup({ show: false, slideId: null })}
          >
            ✖
          </button>
        </div>
      )}

      {/* Create Slide Popup */}
      {createSlidePopup && (
        <div className="create-slide-popup">
          <div className="popup-content">
            <h4>Upload Your Slide</h4>
            <input
              type="file"
              accept=".ppt, .pptx, .pdf, .jpg, .png" // Add acceptable file types here
              onChange={handleFileUpload}
            />
            <button className="close-popup-btn" onClick={() => setCreateSlidePopup(false)}>
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
