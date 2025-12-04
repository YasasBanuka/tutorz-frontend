import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import Button from '../../components/atoms/Button';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Fallback if user state is lost
  if (!user) {
    return <div className="p-10 text-center">Loading user profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-center">
          <h2 className="text-2xl font-semibold text-blue-800">
            Welcome, {user.firstName || user.email}!
          </h2>
          <p className="text-xl text-gray-700 mt-2">
            You are logged in as: <span className="font-bold uppercase text-blue-600">{user.role}</span>
          </p>
        </div>

        {/* Role Specific Content Section */}
        <div className="grid gap-6">
            {user.role === 'Tutor' && (
                <div className="p-4 border rounded-lg">
                    <h3 className="font-bold text-lg">Tutor Actions</h3>
                    <p>Manage your classes, students, and payments here.</p>
                </div>
            )}
            
            {user.role === 'Student' && (
                <div className="p-4 border rounded-lg">
                    <h3 className="font-bold text-lg">Student Learning Center</h3>
                    <p>View your upcoming classes and attendance.</p>
                </div>
            )}

            {user.role === 'Institute' && (
                <div className="p-4 border rounded-lg">
                    <h3 className="font-bold text-lg">Institute Management</h3>
                    <p>Manage your tutors and student reports.</p>
                </div>
            )}
        </div>

        <div className="mt-8 flex justify-end">
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;