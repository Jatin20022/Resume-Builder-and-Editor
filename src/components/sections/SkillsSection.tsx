import React, { useState } from 'react';
import { Plus, Trash2, Edit, Code, Sparkles, Loader2 } from 'lucide-react';
import { Skill } from '../../types/resume';

interface SkillsSectionProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, onChange }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [enhancing, setEnhancing] = useState(false);
  const [enhancedContent, setEnhancedContent] = useState<string>('');

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;
  const skillCategories = [
    'Programming', 'Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 
    'Mobile', 'Design', 'Project Management', 'Other'
  ];

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate',
      category: 'Programming'
    };
    onChange([...skills, newSkill]);
    setEditingId(newSkill.id);
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    onChange(skills.map(skill => 
      skill.id === id ? { ...skill, ...updates } : skill
    ));
  };

  const deleteSkill = (id: string) => {
    onChange(skills.filter(skill => skill.id !== id));
  };

  const handleEnhanceWithAI = async () => {
    if (skills.length === 0) {
      alert('Please add some skills first before enhancing with AI.');
      return;
    }

    setEnhancing(true);
    try {
      const skillsContent = skills.map(skill => `${skill.name} (${skill.level})`).join('\n');
      
      const response = await fetch('http://localhost:8000/ai-enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section: 'skills',
          content: skillsContent
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setEnhancedContent(data.enhanced_content);
      } else {
        alert('Failed to enhance content. Please try again.');
      }
    } catch (error) {
      console.error('Enhancement error:', error);
      alert('Failed to enhance content. Please check your connection.');
    } finally {
      setEnhancing(false);
    }
  };

  const handleAcceptEnhancement = () => {
    // This is a simplified version - in a real app, you might parse the enhanced content
    // and update individual skills or add them as a formatted description
    setEnhancedContent('');
    alert('Enhancement accepted! In a full implementation, this would update your skills section.');
  };

  const handleRejectEnhancement = () => {
    setEnhancedContent('');
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-yellow-100 text-yellow-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-green-100 text-green-800';
      case 'Expert': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills</h2>
          <p className="text-gray-600">
            Showcase your technical and professional skills.
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={handleEnhanceWithAI}
            disabled={enhancing || skills.length === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            {enhancing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{enhancing ? 'Enhancing...' : 'Enhance with AI'}</span>
          </button>
          
          <button
            onClick={addSkill}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </button>
        </div>
      </div>

      {/* Enhanced Content Preview */}
      {enhancedContent && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <h3 className="font-medium text-purple-900">AI Enhanced Skills Description</h3>
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
            {enhancedContent}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {skills.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Code className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No skills added yet.</p>
            <p className="text-sm">Click "Add Skill" to get started.</p>
          </div>
        ) : (
          <>
            {/* Editing Form */}
            {editingId && (
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <h3 className="font-medium text-blue-900 mb-4">
                  {skills.find(s => s.id === editingId)?.name ? 'Edit Skill' : 'Add New Skill'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skill Name *
                    </label>
                    <input
                      type="text"
                      value={skills.find(s => s.id === editingId)?.name || ''}
                      onChange={(e) => updateSkill(editingId, { name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., JavaScript"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Proficiency Level
                    </label>
                    <select
                      value={skills.find(s => s.id === editingId)?.level || 'Intermediate'}
                      onChange={(e) => updateSkill(editingId, { level: e.target.value as Skill['level'] })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {skillLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={skills.find(s => s.id === editingId)?.category || 'Programming'}
                      onChange={(e) => updateSkill(editingId, { category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {skillCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-4">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      if (!skills.find(s => s.id === editingId)?.name) {
                        deleteSkill(editingId);
                      }
                      setEditingId(null);
                    }}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Skills Display */}
            <div className="space-y-6">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category}>
                  <h3 className="font-semibold text-gray-900 mb-3">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categorySkills.map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{skill.name}</div>
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(skill.level)}`}>
                            {skill.level}
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => setEditingId(skill.id)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => deleteSkill(skill.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;