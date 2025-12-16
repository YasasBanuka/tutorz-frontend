import React from 'react';

const StatCard = ({ label, value, icon: Icon, color, change }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={22} />
      </div>
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${change.startsWith('+') ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
        {change}
      </span>
    </div>
    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    <p className="text-sm text-gray-500 mt-1">{label}</p>
  </div>
);

export default StatCard;