import React, { useState } from 'react';
import { FileText, Upload, User, Settings, Briefcase, GraduationCap, Lightbulb, Code, FolderOpen, Award, Lightbulb as ProTip } from 'lucide-react';
import FileUpload from './components/FileUpload';
import PersonalInfoSection from './components/sections/PersonalInfoSection';
import SummarySection from './components/sections/SummarySection';
import ExperienceSection from './components/sections/ExperienceSection';
import EducationSection from './components/sections/EducationSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import CertificationsSection from './components/sections/CertificationsSection';
import { ResumeData } from './types/resume';

function App() {
  const [activeSection, setActiveSection] = useState<string>('upload');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  const handleFileUpload = (mockData: ResumeData) => {
    setResumeData(mockData);
    setActiveSection('personal');
  };

  const handleNewResume = () => {
    const newResumeData: ResumeData = {
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedIn: '',
        website: ''
      },
      summary: '',
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: []
    };
    setResumeData(newResumeData);
    setActiveSection('personal');
  };

  const navigationItems = [
    { id: 'upload', label: 'Upload Resume', icon: Upload, color: 'text-blue-600' },
    { id: 'personal', label: 'Personal Info', icon: User, color: 'text-gray-600' },
    { id: 'summary', label: 'Summary', icon: Settings, color: 'text-gray-600' },
    { id: 'experience', label: 'Experience', icon: Briefcase, color: 'text-gray-600' },
    { id: 'education', label: 'Education', icon: GraduationCap, color: 'text-gray-600' },
    { id: 'skills', label: 'Skills', icon: Lightbulb, color: 'text-gray-600' },
    { id: 'projects', label: 'Projects', icon: Code, color: 'text-gray-600' }
  ];

  const renderActiveSection = () => {
    if (!resumeData && activeSection !== 'upload') {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Resume Data</h3>
            <p className="text-gray-500 mb-4">Please upload a resume or create a new one to get started.</p>
            <button
              onClick={() => setActiveSection('upload')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Upload
            </button>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case 'upload':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Resume</h2>
              <p className="text-gray-600">
                Upload your existing resume or start from scratch
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Upload className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Upload Existing</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Have an existing resume? Upload your PDF or DOCX file.
                </p>
                <FileUpload onFileUpload={handleFileUpload} />
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <FileText className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Start Fresh</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Create a new resume from scratch with our editor.
                </p>
                <button
                  onClick={handleNewResume}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Create New Resume
                </button>
              </div>
            </div>
          </div>
        );
      case 'personal':
        return resumeData && (
          <PersonalInfoSection
            personalInfo={resumeData.personalInfo}
            onChange={(personalInfo) => setResumeData({ ...resumeData, personalInfo })}
          />
        );
      case 'summary':
        return resumeData && (
          <SummarySection
            summary={resumeData.summary}
            onChange={(summary) => setResumeData({ ...resumeData, summary })}
          />
        );
      case 'experience':
        return resumeData && (
          <ExperienceSection
            experience={resumeData.experience}
            onChange={(experience) => setResumeData({ ...resumeData, experience })}
          />
        );
      case 'education':
        return resumeData && (
          <EducationSection
            education={resumeData.education}
            onChange={(education) => setResumeData({ ...resumeData, education })}
          />
        );
      case 'skills':
        return resumeData && (
          <SkillsSection
            skills={resumeData.skills}
            onChange={(skills) => setResumeData({ ...resumeData, skills })}
          />
        );
      case 'projects':
        return resumeData && (
          <ProjectsSection
            projects={resumeData.projects}
            onChange={(projects) => setResumeData({ ...resumeData, projects })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Resume</h1>
              <p className="text-sm text-gray-500">Editor</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              const isUpload = item.id === 'upload';
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive
                      ? isUpload 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  disabled={!resumeData && item.id !== 'upload'}
                >
                  <Icon className={`w-5 h-5 ${isActive && isUpload ? 'text-blue-600' : item.color}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Pro Tip */}
          <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-start space-x-3">
              <div className="bg-yellow-100 p-1 rounded">
                <ProTip className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Pro Tip</h4>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Use the "Enhance with AI" buttons to improve your content with professional language and industry best practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Resume Editor</h1>
              <p className="text-gray-600">Create and enhance your professional resume with AI assistance</p>
            </div>
            
            {resumeData && (
              <div className="flex space-x-3">
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch('${import.meta.env.VITE_API_URL}/save-resume', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    resume_data: resumeData,
    resume_id: `resume_${Date.now()}`
  }),
});

                      if (response.ok) {
                        alert('Resume saved successfully!');
                      }
                    } catch (error) {
                      console.error('Save failed:', error);
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Save Resume
                </button>
                
                <div className="relative group">
                  <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
                    Download
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                    <div className="py-2">
                      <button
                        onClick={() => {
                          const dataStr = JSON.stringify(resumeData, null, 2);
                          const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                          const exportFileDefaultName = `${resumeData.personalInfo.fullName || 'resume'}_${new Date().toISOString().split('T')[0]}.json`;
                          const linkElement = document.createElement('a');
                          linkElement.setAttribute('href', dataUri);
                          linkElement.setAttribute('download', exportFileDefaultName);
                          linkElement.click();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Download as JSON
                      </button>
                      <button
                        onClick={async () => {
                          const { jsPDF } = await import('jspdf');
                          const doc = new jsPDF();
                          
                          // Add content to PDF
                          let yPosition = 20;
                          
                          // Personal Info
                          doc.setFontSize(20);
                          doc.text(resumeData.personalInfo.fullName || 'Your Name', 20, yPosition);
                          yPosition += 10;
                          
                          doc.setFontSize(12);
                          doc.text(resumeData.personalInfo.email || '', 20, yPosition);
                          yPosition += 6;
                          doc.text(resumeData.personalInfo.phone || '', 20, yPosition);
                          yPosition += 6;
                          doc.text(resumeData.personalInfo.location || '', 20, yPosition);
                          yPosition += 15;
                          
                          // Summary
                          if (resumeData.summary) {
                            doc.setFontSize(16);
                            doc.text('Professional Summary', 20, yPosition);
                            yPosition += 8;
                            doc.setFontSize(11);
                            const summaryLines = doc.splitTextToSize(resumeData.summary, 170);
                            doc.text(summaryLines, 20, yPosition);
                            yPosition += summaryLines.length * 5 + 10;
                          }
                          
                          // Experience
                          if (resumeData.experience.length > 0) {
                            doc.setFontSize(16);
                            doc.text('Work Experience', 20, yPosition);
                            yPosition += 8;
                            
                            resumeData.experience.forEach((exp) => {
                              doc.setFontSize(12);
                              doc.text(`${exp.position} at ${exp.company}`, 20, yPosition);
                              yPosition += 6;
                              doc.setFontSize(10);
                              doc.text(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, 20, yPosition);
                              yPosition += 6;
                              if (exp.description) {
                                const descLines = doc.splitTextToSize(exp.description, 170);
                                doc.text(descLines, 20, yPosition);
                                yPosition += descLines.length * 4 + 8;
                              }
                            });
                          }
                          
                          doc.save(`${resumeData.personalInfo.fullName || 'resume'}.pdf`);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Download as PDF
                      </button>
                      <button
                        onClick={async () => {
                          const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import('docx');
                          const { saveAs } = await import('file-saver');
                          
                          const doc = new Document({
                            sections: [{
                              properties: {},
                              children: [
                                new Paragraph({
                                  text: resumeData.personalInfo.fullName || 'Your Name',
                                  heading: HeadingLevel.HEADING_1,
                                }),
                                new Paragraph({
                                  children: [
                                    new TextRun(resumeData.personalInfo.email || ''),
                                    new TextRun(' | '),
                                    new TextRun(resumeData.personalInfo.phone || ''),
                                    new TextRun(' | '),
                                    new TextRun(resumeData.personalInfo.location || ''),
                                  ],
                                }),
                                new Paragraph({ text: '' }),
                                ...(resumeData.summary ? [
                                  new Paragraph({
                                    text: 'Professional Summary',
                                    heading: HeadingLevel.HEADING_2,
                                  }),
                                  new Paragraph({
                                    text: resumeData.summary,
                                  }),
                                  new Paragraph({ text: '' }),
                                ] : []),
                                ...(resumeData.experience.length > 0 ? [
                                  new Paragraph({
                                    text: 'Work Experience',
                                    heading: HeadingLevel.HEADING_2,
                                  }),
                                  ...resumeData.experience.flatMap(exp => [
                                    new Paragraph({
                                      children: [
                                        new TextRun({ text: `${exp.position} at ${exp.company}`, bold: true }),
                                      ],
                                    }),
                                    new Paragraph({
                                      text: `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
                                    }),
                                    new Paragraph({
                                      text: exp.description || '',
                                    }),
                                    new Paragraph({ text: '' }),
                                  ])
                                ] : []),
                              ],
                            }],
                          });
                          
                          const blob = await Packer.toBlob(doc);
                          saveAs(blob, `${resumeData.personalInfo.fullName || 'resume'}.docx`);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Download as DOCX
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-auto">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
}

export default App;