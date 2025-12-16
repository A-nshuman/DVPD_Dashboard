import React from "react";
import { X } from 'lucide-react';

const AboutPopup = ({ isOpen, onClose }) => {
  const teamMembers = [
    {
      id: 1,
      name: "Anshuman Bhardwaj",
      rollNumber: "24103017",
      branch: "Computer Science",
      photo: "https://raw.githubusercontent.com/A-nshuman/DVPD_Dashboard/refs/heads/main/src/assets/anshuman.jpg", 
    },
    {
      id: 2,
      name: "Abhishek Bhatti",
      rollNumber: "24103004",
      branch: "Computer Science",
      photo: "https://raw.githubusercontent.com/A-nshuman/DVPD_Dashboard/refs/heads/main/src/assets/bhatti.png",
    },
    {
      id: 3,
      name: "Javin Chutani",
      rollNumber: "24117014",
      branch: "Data Science",
      photo: "https://media.licdn.com/dms/image/v2/D4D03AQFgQR2lMXJrnQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727542556872?e=1767225600&v=beta&t=xzs7e_8h2dgjTDuNB2bqvP3seCPGoPrAFUSIncOYvqY",
    },
    {
      id: 4,
      name: "Jashan Aneja",
      rollNumber: "24117013",
      branch: "Data Science",
      photo: "https://raw.githubusercontent.com/A-nshuman/DVPD_Dashboard/refs/heads/main/src/assets/jashan.jpg",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
      {/* Container: Added max-height and flex-col for internal scrolling */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        {/* Fixed Header: Title and Close button stay at the top */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-100 shrink-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Developers
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content: Only this part scrolls */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
              >
                <img
                  src={member.photo} 
                  alt={member.name}
                  // Responsive sizing: w-20 on mobile, w-24 on desktop
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-3 sm:mb-4 border-4 border-white shadow-sm"
                  onError={(e) => {e.target.src = "https://via.placeholder.com/150"}} 
                />
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 text-center">
                  {member.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#0D47A1] font-medium mt-1">
                  {member.rollNumber}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 text-center">
                  {member.branch}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPopup;