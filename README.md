# Resume Extractor AI Documentation

This document provides an overview of the installation process and instructions for using the Resume Extractor AI application.

This was made with stremlit to-
procedure-

1. Create an .env file and save your openai key and hugging face key
2. then simply go to terminal and run 
```bash
   uvicorn main:app --reload
   ```

## Installation

Follow these steps to install and set up the Resume Extractor AI application:

1. Clone the Repository: 
   Clone the GitHub repository to your local machine using the following command:
   ```bash
   git clone https://github.com/Dope-Otaku/Resume-Extractor_AI-2.0.git
   ```

2. Navigate to the Project Directory: 
   Use the `cd` command to move into the project directory:
   ```bash
   cd Resume-Extractor-AI
   ```

3. Install Backend Dependencies: 
   Navigate to the `backend` directory and install the necessary Python dependencies using pip. It's recommended to use a virtual environment:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. Run Backend Server: 
   Start the FastAPI server by running the following command:
   ```bash
   uvicorn main:app --reload
   ```

5. Install Frontend Dependencies: 
   Navigate to the `frontend` directory and install the necessary npm modules:
   ```bash
   cd ../frontend
   npm install
   ```

6. Run Frontend Application: 
   Start the frontend application using the script provided:
   ```bash
   npm run dev
   ```

7. Access the Application: 
   Once both the backend and frontend servers are running, access the application in your web browser by navigating to `http://localhost:3000`.

## Usage

Follow these instructions to use the Resume Extractor AI application:

1. Upload Resume File: 
   Click on the "Upload" button to select a PDF or DOCX file containing the resume you want to extract information from.

2. Process the Resume: 
   After selecting the file, click on the "Upload" button to upload the resume file to the application. The application will process the resume and extract relevant information.

3. View Extracted Information: 
   The extracted information, such as personal details, education, work experience, skills, etc., will be displayed on the screen.

4. Ask Questions: 
   You can ask questions about the extracted information using the chat interface provided. Type your question in the input box and press "Enter" or click on the "Send" button to get a response.

5. View Chat History: 
   The chat history will be displayed below the input box, showing the conversation between you and the chatbot.

6. Repeat Steps: 
   You can repeat the process by uploading another resume file or asking additional questions about the extracted information.

## Contributing

If you'd like to contribute to the development of the Resume Extractor AI application, feel free to fork the repository, make your changes, and submit a pull request.

---

This concludes the documentation for the Resume Extractor AI application. If you encounter any difficulties during the installation or usage process, refer back to this document for assistance.