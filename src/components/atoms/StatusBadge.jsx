import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = status === "Starting Soon" 
    ? "bg-green-100 text-green-700" 
    : "bg-gray-100 text-gray-600";
    
  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${styles}`}>
      {status}
    </span>
  );
};

export default StatusBadge;