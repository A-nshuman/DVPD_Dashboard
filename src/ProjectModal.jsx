import React from "react";
import { X, Mail, Calendar, Award, TrendingUp } from "lucide-react";

const ProjectModal = ({ item, activeTab, onClose }) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-100 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-t-2xl">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="p-4 sm:p-8">
          <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
          <span className="bg-[#E3F2FD] text-[#0D47A1] px-4 py-1 rounded-full font-medium text-sm">
            {item.domain}
          </span>

          <p className="mt-4 mb-6 text-gray-700">{item.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Info icon={Mail} label="Contact" value={item.contact} />
            <Info icon={Calendar} label="Started" value={item.startDate} />
            <Info icon={Award} label="Status" value={item.status} />
            <Info
              icon={TrendingUp}
              label={activeTab === "startup" ? "Funding Stage" : "Publications"}
              value={
                activeTab === "startup"
                  ? item.fundingStage
                  : `${item.publications} Published`
              }
            />
          </div>

          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">
            {activeTab === "startup" ? "Team Members" : "Research Team"}
          </h3>
          <div className="space-y-2 mb-6">
            {item.studentNames.map((name, idx) => (
              <div
                key={idx}
                className="flex justify-between bg-[#2196F3] rounded-lg p-3"
              >
                <span className="font-medium text-gray-100">{name}</span>
                <span className="text-sm bg-white px-3 py-1 rounded-full">
                  {item.students[idx]}
                </span>
              </div>
            ))}
          </div>

          {activeTab === "research" && item.type === "under_prof" && (
            <div className="bg-[#E3F2FD]/30 rounded-lg p-5 border-l-4 border-[#0D47A1]">
              <p className="font-semibold text-[#0D47A1]">{item.professor}</p>
              <p className="text-sm text-gray-600">
                {item.professorDept} Department
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Info = ({ icon: Icon, label, value }) => (
  <div className="bg-white rounded-lg p-4">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-5 h-5 text-[#0D47A1]" />
      <h3 className="font-semibold text-gray-700">{label}</h3>
    </div>
    <p className="text-gray-700">{value}</p>
  </div>
);

export default ProjectModal;
