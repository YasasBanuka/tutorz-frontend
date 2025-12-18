import React from 'react';

const InstituteDashboard = ({ user }) => {
  return (
    <div className="p-4 animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-900">Institute Dashboard</h1>
        <p className="text-gray-500">Manage your tutors and payments here.</p>
         {/* Add Institute specific widgets here later */}
    </div>
  );
};

export default InstituteDashboard;