import React from "react";

const StatsCard = ({ title, value, gradient, textColor }) => (
  <div className={`rounded-lg p-4 ${gradient}`}>
    <p className="text-sm font-medium text-gray-100">{title}</p>
    <p className={`text-3xl font-bold mt-1 ${textColor || "text-white"}`}>
      {value}
    </p>
  </div>
);

export default StatsCard;
