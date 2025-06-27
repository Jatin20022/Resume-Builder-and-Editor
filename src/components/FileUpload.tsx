import React, { useCallback, useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { ResumeData } from '../types/resume';

interface FileUploadProps {
  onFileUpload: (resumeData: ResumeData) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Mock resume data for demonstration
  const mockResumeData: ResumeData = {
    personalInfo: {
      fullName: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedIn: 'linkedin.com/in/sarahjohnson',
      website: 'sarahjohnson.dev'
    },
    summary: 'Experienced software developer with 5+ years of expertise in full-stack development. Passionate about creating scalable web applications and leading cross-functional teams.',
    experience: [
      {
        id: '1',
        company: 'TechCorp Inc.',
        position: 'Senior Software Developer',
        startDate: '2021-03',
        endDate: '',
        current: true,
        description: 'Led development of microservices architecture\nImplemented CI/CD pipelines\nMentored junior developers',
        location: 'San Francisco, CA'
      },
      {
        id: '2',
        company: 'StartupXYZ',
        position: 'Full Stack Developer',
        startDate: '2019-06',
        endDate: '2021-02',
        current: false,
        description: 'Built responsive web applications using React and Node.js\nIntegrated third-party APIs\nOptimized database performance',
        location: 'Remote'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2015-08',
        endDate: '2019-05',
        gpa: '3.8',
        honors: 'Magna Cum Laude'
      }
    ],
    skills: [
      { id: '1', name: 'JavaScript', level: 'Expert', category: 'Programming' },
      { id: '2', name: 'React', level: 'Expert', category: 'Frontend' },
      { id: '3', name: 'Node.js', level: 'Advanced', category: 'Backend' },
      { id: '4', name: 'Python', level: 'Advanced', category: 'Programming' },
      { id: '5', name: 'AWS', level: 'Intermediate', category: 'Cloud' }
    ],
    projects: [
      {
        id: '1',
        name: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with React frontend and Node.js backend',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        url: 'https://example-ecommerce.com',
        github: 'https://github.com/sarahjohnson/ecommerce',
        startDate: '2023-01',
        endDate: '2023-06'
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        date: '2023-03',
        url: 'https://aws.amazon.com/certification/'
      }
    ]
  };

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];

    if (!allowedTypes.includes(file.type)) {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
      return;
    }

    setUploading(true);
    setUploadStatus('idle');

    // Mock file processing delay
    setTimeout(() => {
      setUploading(false);
      setUploadStatus('success');
      
      // Simulate file parsing and return mock data
      setTimeout(() => {
        onFileUpload(mockResumeData);
      }, 1000);
    }, 2000);
  }, [onFileUpload]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  }, [handleFiles]);

  return (
    <div className="space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
          dragActive
            ? 'border-blue-400 bg-blue-50'
            : uploadStatus === 'error'
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 hover:border-gray-400 bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.docx,.doc"
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
        
        <div className="space-y-4">
          {uploading ? (
            <div className="flex flex-col items-center space-y-3">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-blue-600 font-medium">Processing your resume...</p>
            </div>
          ) : uploadStatus === 'success' ? (
            <div className="flex flex-col items-center space-y-3">
              <CheckCircle className="w-12 h-12 text-green-600" />
              <p className="text-green-600 font-medium">Resume uploaded successfully!</p>
            </div>
          ) : uploadStatus === 'error' ? (
            <div className="flex flex-col items-center space-y-3">
              <AlertCircle className="w-12 h-12 text-red-600" />
              <p className="text-red-600 font-medium">Please upload a PDF or DOCX file</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-gray-200 p-4 rounded-full">
                <Upload className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Upload your resume
                </h3>
                <p className="text-gray-600 mb-1">
                  Drag and drop your resume file here, or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Supports PDF and DOCX files
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;