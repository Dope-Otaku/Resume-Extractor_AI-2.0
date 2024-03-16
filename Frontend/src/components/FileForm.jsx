import { useState } from "react";
import "./FileForm.css";
import logo from "../assets/AI Planet Logo.png";

function FileForm() {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  // Function to handle the file input change
  const handleInputFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const error = "Invalid file type. Please select a PDF or DOCX file.";
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      console.log(selectedFile);
      setFile(selectedFile);
      setErrorMessage("");
    } else {
      console.log(error);
      setErrorMessage(error);
    }
  };

  // Function to handle the form submission for uploading PDF
  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("pdf_file", file);

    try {
      const endpoint = "http://localhost:8000/upload/";
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("File uploaded successfully");
      } else {
        console.log("File upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to handle the form submission for querying chatbot
  const handleChat = async (event) => {
    event.preventDefault();

    try {
      const endpoint = `http://localhost:8000/chat/?user_question=${userQuestion}`;
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setChatHistory([...chatHistory, data]); // Append new message to chat history
      } else {
        console.log("Chat retrieval failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-left">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="logo"></img>
          </a>
        </div>
        <div className="navbar-right">
          {/* File upload form */}
          <form onSubmit={handleUpload} className="file-upload-form">
            <input
              type="file"
              onChange={handleInputFileChange}
              className="file-input"
            />
            <button type="submit" className="upload-button">
              Upload
            </button>
          </form>
        </div>
      </nav>

      {/* Chat container */}
      <div className="chat-container">
        {/* Chat history */}
        <div className="chat-history">
          {chatHistory.map((message, index) => (
            <div className="message" key={index}>
              <p className="message-text">{message}</p>
            </div>
          ))}
        </div>
        {/* Chat input */}
        <form onSubmit={handleChat} className="chat-input-form">
          <input
            type="text"
            value={userQuestion}
            onChange={(event) => setUserQuestion(event.target.value)}
            placeholder="Ask a question..."
            className="chat-input"
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
      {/* Error message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {/* File name */}
      {file && <p className="file-name">{file.name}</p>}
    </div>
  );
}

export default FileForm;
