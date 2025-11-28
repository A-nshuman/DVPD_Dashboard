import React from "react";

const ProjectCard = ({ item, onClick }) => (
  <div
    onClick={() => onClick(item)}
    className="border border-gray-200 rounded-lg flex flex-col sm:flex-row overflow-hidden hover:shadow-lg hover:border-[#0D47A1]/50 cursor-pointer transition-all"
  >
    <div className="sm:w-32 sm:h-32 h-48 bg-gray-200 flex-shrink-0 overflow-hidden sm:rounded-full sm:m-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4 flex-1">
      <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{item.domain}</p>
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-gray-600">Members:</span>
        {item.studentNames.slice(0, 3).map((name, idx) => (
          <span
            key={idx}
            className="text-xs bg-[#2196F3] text-gray-100 px-2 py-1 rounded"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default ProjectCard;
