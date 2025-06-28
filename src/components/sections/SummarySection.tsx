import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface SummarySectionProps {
  summary: string;
  onChange: (summary: string) => void;
}

const SummarySection: React.FC<SummarySectionProps> = ({ summary, onChange }) => {
  const [enhancing, setEnhancing] = useState(false);
  const [enhancedContent, setEnhancedContent] = useState<string>('');

  const handleEnhanceWithAI = async () => {
    if (!summary.trim()) {
      alert('Please enter some content first before enhancing with AI.');
      return;
    }

    setEnhancing(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/ai-enhance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section: 'summary',
          content: summary
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setEnhancedContent(data.enhanced_content);
      } else {
        console.error('Enhancement failed');
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
    onChange(enhancedContent);
    setEnhancedContent('');
  };

  const handleRejectEnhancement = () => {
    setEnhancedContent('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Summary</h2>
          <p className="text-gray-600">
            A brief overview of your professional background and key strengths.
          </p>
        </div>
        
        <button
          onClick={handleEnhanceWithAI}
          disabled={enhancing || !summary.trim()}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
        >
          {enhancing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span>{enhancing ? 'Enhancing...' : 'Enhance with AI'}</span>
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
            Summary
          </label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => onChange(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
            placeholder="Write a compelling summary of your professional experience, skills, and career objectives..."
          />
        </div>

        {/* Enhanced Content Preview */}
        {enhancedContent && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <h3 className="font-medium text-purple-900">AI Enhanced Version</h3>
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
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h3 className="font-medium text-blue-900 mb-2">💡 Tips for a great summary:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Keep it concise (3-4 sentences)</li>
          <li>• Highlight your most relevant experience</li>
          <li>• Include key skills and achievements</li>
          <li>• Tailor it to your target role</li>
          <li>• Use action words and specific metrics</li>
        </ul>
      </div>
    </div>
  );
};

export default SummarySection;