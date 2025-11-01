import React from 'react';

const ProjectCard = ({ item, activeTab, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer bg-background hover:border-primary/50 group"
    >
      {/* Image Holder */}
      <div className="w-full h-48 bg-gray-200 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-text mb-2 line-clamp-1">
          {item.name}
        </h3>
        
        <span className="inline-block bg-secondary text-primary text-xs px-3 py-1 rounded-full font-medium mb-3">
          {item.domain}
        </span>

        <div className="space-y-2">
          <div>
            <p className="text-xs text-gray-600 font-medium mb-1">
              {activeTab === 'startup' ? 'Team Members:' : 'Researchers:'}
            </p>
            <div className="flex flex-wrap gap-1">
              {item.studentNames.slice(0, 2).map((name, idx) => (
                <span key={idx} className="text-xs bg-accent text-text px-2 py-1 rounded">
                  {name}
                </span>
              ))}
              {item.studentNames.length > 2 && (
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  +{item.studentNames.length - 2} more
                </span>
              )}
            </div>
          </div>

          {activeTab === 'research' && item.type === 'under_prof' && (
            <div>
              <p className="text-xs text-gray-600 font-medium mb-1">Under Professor:</p>
              <p className="text-sm text-primary font-medium">{item.professor}</p>
            </div>
          )}

          {activeTab === 'research' && item.type === 'own' && (
            <div>
              <p className="text-xs text-gray-600 font-medium">Independent Research</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
