import React from 'react';
import { X, Mail, Calendar, Award, TrendingUp } from 'lucide-react';

const ProjectModal = ({ selectedItem, activeTab, onClose }) => {
  if (!selectedItem) return null;

  return (
    <div 
      className="fixed inset-0 bg-black flex items-center justify-center p-4 z-50" 
      onClick={onClose}
    >
      <div 
        className="bg-gray-200 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Image */}
        <div className="relative h-64 w-full overflow-hidden rounded-t-2xl">
          <img 
            src={selectedItem.image} 
            alt={selectedItem.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-background rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-text mb-2">{selectedItem.name}</h2>
              <span className="inline-block bg-secondary text-primary text-sm px-4 py-1 rounded-full font-medium">
                {selectedItem.domain}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">About</h3>
            <p className="text-gray-700 leading-relaxed">{selectedItem.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Contact */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-700">Contact</h3>
              </div>
              <p className="text-primary font-medium">{selectedItem.contact}</p>
            </div>

            {/* Start Date */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-700">Started</h3>
              </div>
              <p className="text-gray-700">{selectedItem.startDate}</p>
            </div>

            {/* Status */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-700">Status</h3>
              </div>
              <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                {selectedItem.status}
              </span>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-700">
                  {activeTab === 'startup' ? 'Funding Stage' : 'Publications'}
                </h3>
              </div>
              <p className="text-gray-700">
                {activeTab === 'startup' ? selectedItem.fundingStage : `${selectedItem.publications} Published`}
              </p>
            </div>
          </div>

          {/* Team Members */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              {activeTab === 'startup' ? 'Team Members' : 'Research Team'}
            </h3>
            <div className="space-y-2">
              {selectedItem.studentNames.map((name, idx) => (
                <div key={idx} className="flex items-center justify-between bg-accent rounded-lg p-3">
                  <span className="font-medium text-text">{name}</span>
                  <span className="text-sm text-gray-600 bg-background px-3 py-1 rounded-full">
                    {selectedItem.students[idx]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Professor Info for Research */}
          {activeTab === 'research' && selectedItem.type === 'under_prof' && (
            <div className="bg-secondary/30 rounded-lg p-5 border-l-4 border-primary">
              <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Supervised By
              </h3>
              <p className="text-lg font-bold text-primary">{selectedItem.professor}</p>
              <p className="text-sm text-gray-600">{selectedItem.professorDept} Department</p>
            </div>
          )}

          {activeTab === 'research' && selectedItem.type === 'own' && (
            <div className="bg-accent rounded-lg p-5 border-l-4 border-yellow-500">
              <h3 className="text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">
                Independent Research
              </h3>
              <p className="text-sm text-gray-600">Self-guided research project</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
