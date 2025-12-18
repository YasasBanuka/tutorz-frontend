import React from 'react';

const StudentDashboard = ({ user }) => {
  return (
    <div className="p-4 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
      <p className="text-gray-500">Welcome, {user?.firstName}! Here are your enrolled classes.</p>
      {/* Add Student specific widgets here later */}
    </div>
  );
};

export default StudentDashboard;