import React from 'react';

const StatsCard = ({ title, value, icon: Icon, gradient }) => {
  return (
    <div className={`${gradient} rounded-xl p-6 shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${gradient.includes('from-[#0369a0]') ? 'text-blue-100' : 'text-gray-700'}`}>
            {title}
          </p>
          <p className={`text-3xl font-bold mt-2 ${gradient.includes('from-[#0369a0]') ? 'text-white' : 'text-[#121212]'}`}>
            {value}
          </p>
        </div>
        <Icon className={`w-12 h-12 ${gradient.includes('from-[#0369a0]') ? 'text-blue-200' : 'text-[#0369a0]'}`} />
      </div>
    </div>
  );
};

export default StatsCard;
