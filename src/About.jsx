import React from "react";
import { X } from 'lucide-react';

const AboutPopup = ({ isOpen, onClose }) => {
  const teamMembers = [
    {
      id: 1,
      name: "Anshuman Bhardwaj",
      rollNumber: "24103017",
      branch: "Computer Science",
      photo: "src/assets/anshuman.jpg", 
    },
    {
      id: 2,
      name: "Abhishek Bhatti",
      rollNumber: "24103004",
      branch: "Computer Science",
      photo: "src/assets/bhatti.png",
    },
    {
      id: 3,
      name: "Javin Chutani",
      rollNumber: "24117014",
      branch: "Data Science",
      photo: "src/assets/javin.webp",
    },
    {
      id: 4,
      name: "Jashan Aneja",
      rollNumber: "24117013",
      branch: "Data Science",
      photo: "src/assets/jashan.jpg",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Developers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* FIX 1: Map over 'teamMembers', not 'team' */}
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-xl border hover:shadow-md transition-shadow"
              >
                <img
                  // FIX 2: Use 'member.photo' instead of 'member.image'
                  src={member.photo} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow-sm"
                  // Add fallback for broken images
                  onError={(e) => {e.target.src = "https://via.placeholder.com/150"}} 
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {member.name}
                </h3>
                {/* FIX 3: Use 'member.rollNumber' */}
                <p className="text-sm text-[#0D47A1] font-medium">
                  {member.rollNumber}
                </p>
                {/* FIX 4: Use 'member.branch' */}
                <p className="text-sm text-gray-600">{member.branch}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPopup;