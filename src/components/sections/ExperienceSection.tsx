import React, { useState } from 'react';
import { Plus, Trash2, Edit, Sparkles, Loader2, MapPin, Calendar } from 'lucide-react';
import { Experience } from '../../types/resume';

interface ExperienceSectionProps {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience, onChange }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [enhancingId, setEnhancingId] = useState<string | null>(null);
  const [enhancedContent, setEnhancedContent] = useState<{id: string, content: string} | null>(null);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      location: ''
    };
    onChange([...experience, newExperience]);
    setEditingId(newExperience.id);
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    onChange(experience.map(exp => 
      exp.id === id ? { ...exp, ...updates } : exp
    ));
  };

  const deleteExperience = (id: string) => {
    onChange(experience.filter(exp => exp.id !== id));
  };

  const handleEnhanceWithAI = async (exp: Experience) => {
    if (!exp.description.trim()) {
      alert('Please enter a job description first before enhancing with AI.');
      return;
    }

    setEnhancingId(exp.id);
    try {
      const response = await fetch('http://localhost:8000/ai-enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section: 'experience',
          content: exp.description
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setEnhancedContent({ id: exp.id, content: data.enhanced_content });
      } else {
        alert('Failed to enhance content. Please try again.');
      }
    } catch (error) {
      console.error('Enhancement error:', error);
      alert('Failed to enhance content. Please check your connection.');
    } finally {
      setEnhancingId(null);
    }
  };

  const handleAcceptEnhancement = () => {
    if (enhancedContent) {
      updateExperience(enhancedContent.id, { description: enhancedContent.content });
      setEnhancedContent(null);
    }
  };

  const handleRejectEnhancement = () => {
    setEnhancedContent(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Experience</h2>
          <p className="text-gray-600">
            Add your professional work experience, starting with the most recent.
          </p>
        </div>
        
        <button
          onClick={addExperience}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="space-y-4">
        {experience.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No work experience added yet.</p>
            <p className="text-sm">Click "Add Experience" to get started.</p>
          </div>
        ) : (
          experience.map((exp, index) => (
            <div key={exp.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              {editingId === exp.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Senior Software Developer"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., TechCorp Inc."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., San Francisco, CA"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, { endDate: e.target.value, current: !e.target.value })}
                        disabled={exp.current}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`current-${exp.id}`}
                        checked={exp.current}
                        onChange={(e) => updateExperience(exp.id, { current: e.target.checked, endDate: e.target.checked ? '' : exp.endDate })}
                        className="mr-2"
                      />
                      <label htmlFor={`current-${exp.id}`} className="text-sm text-gray-700">
                        I currently work here
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Job Description *
                      </label>
                      <button
                        onClick={() => handleEnhanceWithAI(exp)}
                        disabled={enhancingId === exp.id || !exp.description.trim()}
                        className="flex items-center space-x-1 px-3 py-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm rounded-md transition-colors"
                      >
                        {enhancingId === exp.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Sparkles className="w-3 h-3" />
                        )}
                        <span>{enhancingId === exp.id ? 'Enhancing...' : 'Enhance'}</span>
                      </button>
                    </div>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                      placeholder="Describe your key responsibilities and achievements..."
                    />
                  </div>

                  {/* Enhanced Content Preview */}
                  {enhancedContent && enhancedContent.id === exp.id && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-purple-600" />
                          <h4 className="font-medium text-purple-900">AI Enhanced Version</h4>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={handleAcceptEnhancement}
                            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-md transition-colors"
                          >
                            Accept
                          </button>
                          <button
                            onClick={handleRejectEnhancement}
                            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm rounded-md transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded border text-gray-800 whitespace-pre-wrap">
                        {enhancedContent.content}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => deleteExperience(exp.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {exp.position || 'Job Title'}
                        </h3>
                        <p className="text-blue-600 font-medium">
                          {exp.company || 'Company Name'}
                        </p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        {exp.startDate && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                              {exp.current ? ' Present' : exp.endDate ? ` ${new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : ' Present'}
                            </span>
                          </div>
                        )}
                        {exp.location && (
                          <div className="flex items-center space-x-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            <span>{exp.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {exp.description && (
                      <div className="text-gray-700 text-sm whitespace-pre-wrap">
                        {exp.description}
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setEditingId(exp.id)}
                    className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExperienceSection;