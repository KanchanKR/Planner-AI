# AI-Powered Lesson Planner

This project is an AI-powered lesson planner built using **React.js (Vite)**, **ShadCN** components, and **TailwindCSS**. It integrates the **Google Gemini API** to dynamically generate lesson content based on user inputs, and allows users to download their lesson plans as PDFs. The project also includes bonus features such as **Dark Mode Toggle**, **Local Storage**, and a **Drag-and-Drop Editor** for easy modifications.

### 🔗 **Live Demo**: [Visit the AI-Powered Lesson Planner](https://your-live-site-link.com)

## 📖 Table of Contents
- [Features](#features)
- [Bonus Features](#bonus-features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [How to Use](#how-to-use)
- [API Integration](#api-integration-google-gemini)
- [License](#license)

## 🚀 Features

1. **Dummy Login Page**: Users can log in using the credentials:
   - **Email**: `demouser`
   - **Password**: `demopass`
2. **Lesson Plan Input Form**:
   - Topic, Grade Level, Main Concept & Subtopics, Materials Needed, Learning Objectives, Lesson Outline.
   - Implemented using **ShadCN** components like `Input`, `Textarea`, `Accordion`, `Button`, and `Card`.
3. **AI-Generated Lesson Plan**:
   - Dynamically generated lesson content using the **Google Gemini API**.
   - Content includes detailed lesson instructions, suggested classroom activities, and assessment questions.
4. **Edit & Format the Lesson Plan**:
   - Users can manually edit the AI-generated content using ShadCN UI components.
5. **Download as PDF**:
   - The structured lesson plan can be downloaded as a PDF using **jsPDF**.

## 🎉 Bonus Features
1. **Dark Mode Toggle**: Switch between light and dark themes using TailwindCSS’s dark mode utilities.
2. **Local Storage**: Saves the lesson plans in local storage to retain content after a page refresh.
3. **Drag-and-Drop Editor**: Enables easy editing and rearranging of lesson content through drag-and-drop functionality.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite)
- **UI Components**: ShadCN + TailwindCSS
- **AI Integration**: Google Gemini API (free version)
- **State Management**: React State
- **PDF Handling**: jsPDF
- **Dark Mode**: TailwindCSS

## 🖥️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/KanchanKR/Planner-AI.git
cd Planner-AI
```

## 2. Install dependencies

```bash
npm install
```

## 3. Run the application on a local server

```bash
npm run dev
```

## 📋 How to Use

**Login:**
- Open the application and log in using the demo credentials:
- Email: demouser
- Password: demopass

**Enter Lesson Details:**
- Fill in the details for the lesson plan (Topic, Grade Level, etc.).

**Generate Lesson Plan:**
- Click on the "Generate Lesson Plan" button to fetch AI-generated content from the Google Gemini API.

**Edit & Format:**
- Use the editor to manually adjust the lesson content. You can make modifications using text fields, accordions, and drag-and-drop features.

**Download as PDF:**
- Once satisfied with the lesson plan, click "Download as PDF" to save the lesson plan to your device.

**Dark Mode:**
-Use the dark mode toggle to switch between light and dark themes.

## 🌐 API Integration (Google Gemini)
The Google Gemini API is used to dynamically generate lesson content based on the input provided by the user. The API fetches:

- Detailed lesson content.
- Suggested classroom activities.
- Assessment questions.

API requests are handled using React's fetch function with proper error handling to ensure robustness.

## 📄 License
This project is licensed under the MIT License.