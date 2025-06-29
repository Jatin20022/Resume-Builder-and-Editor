# Resume Editor

A comprehensive web-based Resume Editor built with React frontend and FastAPI backend. This application allows users to create, edit, enhance, and export professional resumes with AI-powered content improvement.

Steps to start the application:

1.  Start the frontend: npm run dev
2.  Start the backend: python main.py

## Features

### Frontend (React + TypeScript)

- 📤 **File Upload**: Upload PDF/DOCX resume files with mock parsing
- ✏️ **Resume Editor**: Edit all resume sections including:
  - Personal Information
  - Professional Summary
  - Work Experience
  - Education
  - Skills
  - Projects

### Backend (FastAPI + Python)

Mock AI service for content improvement
Save and retrieve resume data
Proper cross-origin request handling
Clean API design with proper error handling

## Technology Stack

### Frontend

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for development and building
- **Lucide React** for icons
- **ESLint** for code quality

### Backend

- **FastAPI** for API framework
- **Python 3.8+**
- **Pydantic** for data validation
- **Uvicorn** for ASGI server

## Installation & Setup

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- pip (Python package manager)

### Frontend Setup

1. **Install dependencies:**

   npm install

2. **Start development server:**

   npm run dev

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. **Navigate to backend directory:**

   cd backend

2. **Create virtual environment (recommended):**

   python -m venv venv
   source venv/bin/activate # On Windows: venv\Scripts\activate

3. **Install dependencies:**

   pip install -r requirements.txt

4. **Start the backend server:**

   python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

The backend API will be available at `http://localhost:8000`

### Running Both Services

For convenience, you can run both frontend and backend simultaneously:

npm run dev:full

## API Endpoints

### POST `/ai-enhance`

Enhance resume content using mock AI.

### GET `/resume/{resume_id}`

Retrieve a saved resume by ID.

### GET `/resumes`

List all saved resumes.

```


```
