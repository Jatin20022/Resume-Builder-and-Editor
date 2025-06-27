import React, { useState } from 'react';
import { Plus, Trash2, Edit, Award, ExternalLink, Calendar } from 'lucide-react';
import { Certification } from '../../types/resume';

interface CertificationsSectionProps {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications, onChange }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      url: '',
      expiryDate: ''
    };
    onChange([...certifications, newCertification]);
    setEditingId(newCertification.id);
  };

  const updateCertification = (id: string, updates: Partial<Certification>) => {
    onChange(certifications.map(cert => 
      cert.id === id ? { ...cert, ...updates } : cert
    ));
  };

  const deleteCertification = (id: string) => {
    onChange(certifications.filter(cert => cert.id !== id));
  };

  const isExpired = (expiryDate: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Certifications</h2>
          <p className="text-gray-600">
            Add your professional certifications and licenses.
          </p>
        </div>
        
        <button
          onClick={addCertification}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certification</span>
        </button>
      </div>

      <div className="space-y-4">
        {certifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Award className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No certifications added yet.</p>
            <p className="text-sm">Click "Add Certification" to get started.</p>
          </div>
        ) : (
          certifications.map((cert) => (
            <div key={cert.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              {editingId === cert.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certification Name *
                      </label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., AWS Certified Developer"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Issuing Organization *
                      </label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Amazon Web Services"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Issued *
                      </label>
                      <input
                        type="date"
                        value={cert.date}
                        onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date (Optional)
                      </label>
                      <input
                        type="date"
                        value={cert.expiryDate || ''}
                        onChange={(e) => updateCertification(cert.id, { expiryDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Certification URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={cert.url || ''}
                      onChange={(e) => updateCertification(cert.id, { url: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://verify.example.com/certificate"
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => deleteCertification(cert.id)}
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
                        <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                          <span>{cert.name || 'Certification Name'}</span>
                          {cert.expiryDate && isExpired(cert.expiryDate) && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                              Expired
                            </span>
                          )}
                        </h3>
                        <p className="text-blue-600 font-medium">
                          {cert.issuer || 'Issuing Organization'}
                        </p>
                        {cert.url && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm mt-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>View Certificate</span>
                          </a>
                        )}
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        {cert.date && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              Issued: {new Date(cert.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                            </span>
                          </div>
                        )}
                        {cert.expiryDate && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Calendar className="w-3 h-3" />
                            <span className={isExpired(cert.expiryDate) ? 'text-red-600' : 'text-gray-500'}>
                              Expires: {new Date(cert.expiryDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setEditingId(cert.id)}
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

export default CertificationsSection;