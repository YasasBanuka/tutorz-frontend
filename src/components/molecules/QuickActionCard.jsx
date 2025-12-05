import React from 'react';

const QuickActionCard = ({ icon: Icon, label, colorClass, onClick }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100"
  >
    <Icon size={24} className={`mb-2 ${colorClass}`} />
    <span className="text-xs font-medium text-center">{label}</span>
  </button>
);

export default QuickActionCard;