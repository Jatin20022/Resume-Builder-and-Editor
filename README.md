# Resume Editor

A comprehensive web-based Resume Editor built with React frontend and FastAPI backend. This application allows users to create, edit, enhance, and export professional resumes with AI-powered content improvement.

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
  - Certifications
- 🤖 **AI Enhancement**: Improve resume content with AI-powered suggestions
- 💾 **Auto Save**: Save resume data to backend
- 📥 **Export**: Download resume as JSON file
- 📱 **Responsive Design**: Works on all device sizes
- 🎨 **Modern UI**: Clean, professional interface with smooth animations

### Backend (FastAPI + Python)
- 🚀 **AI Enhancement API**: Mock AI service for content improvement
- 💾 **Resume Storage**: Save and retrieve resume data
- 🔒 **CORS Support**: Proper cross-origin request handling
- 📊 **RESTful API**: Clean API design with proper error handling

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
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment (recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the backend server:**
   ```bash
   python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

The backend API will be available at `http://localhost:8000`

### Running Both Services

For convenience, you can run both frontend and backend simultaneously:

```bash
npm run dev:full
```

## API Endpoints

### POST `/ai-enhance`
Enhance resume content using mock AI.

**Request:**
```json
{
  "section": "summary",
  "content": "Experienced developer with 5 years of experience..."
}
```

**Response:**
```json
{
  "enhanced_content": "Dynamic and results-driven experienced developer with 5 years of experience, demonstrating exceptional leadership and problem-solving capabilities."
}
```

### POST `/save-resume`
Save complete resume data.

**Request:**
```json
{
  "resume_data": {
    "personalInfo": { ... },
    "summary": "...",
    "experience": [ ... ],
    // ... other sections
  },
  "resume_id": "optional_custom_id"
}
```

**Response:**
```json
{
  "message": "Resume saved successfully",
  "resume_id": "resume_20240101_120000"
}
```

### GET `/resume/{resume_id}`
Retrieve a saved resume by ID.

### GET `/resumes`
List all saved resumes.

## Project Structure

```
resume-editor/
├── src/
│   ├── components/
│   │   ├── sections/          # Resume section components
│   │   ├── FileUpload.tsx     # File upload component
│   │   └── ResumeEditor.tsx   # Main editor component
│   ├── types/
│   │   └── resume.ts          # TypeScript interfaces
│   ├── App.tsx                # Main app component
│   └── main.tsx              # App entry point
├── backend/
│   ├── main.py               # FastAPI application
│   └── requirements.txt      # Python dependencies
├── public/                   # Static assets
└── package.json             # Node.js dependencies
```

## Features in Detail

### File Upload
- Supports PDF and DOCX file formats
- Mock parsing with sample resume data
- Drag-and-drop interface
- File validation and error handling

### Resume Sections
- **Personal Info**: Contact details and links
- **Summary**: Professional summary with AI enhancement
- **Experience**: Work history with AI-powered improvements
- **Education**: Academic background
- **Skills**: Technical and soft skills with proficiency levels
- **Projects**: Personal and professional projects
- **Certifications**: Professional certifications and licenses

### AI Enhancement
- Section-specific content improvement
- Mock AI responses with realistic enhancements
- Accept/reject enhanced content
- Different enhancement strategies per section type

### Data Management
- Local storage for draft changes
- Backend persistence for saved resumes
- JSON export functionality
- Resume versioning and metadata

## Development

### Adding New Features
1. Create new components in `src/components/`
2. Add TypeScript interfaces in `src/types/`
3. Update the backend API in `backend/main.py`
4. Add new routes and handlers as needed

### Styling
- Uses Tailwind CSS for styling
- Custom color scheme with professional appearance
- Responsive design with mobile-first approach
- Consistent spacing and typography

### Backend Development
- FastAPI auto-generates OpenAPI documentation at `/docs`
- Mock AI enhancement can be replaced with real AI services
- File storage can be upgraded to cloud storage or databases

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- Real AI integration (OpenAI, Claude, etc.)
- PDF export functionality
- Resume templates and themes
- Real-time collaboration
- Cloud storage integration
- Advanced analytics and insights