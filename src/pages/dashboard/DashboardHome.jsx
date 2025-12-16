import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';

// Tutor Specific Components
import { QrCode, Plus } from 'lucide-react';
import StatsGrid from '../../components/organisms/StatsGrid';
import UpcomingClasses from '../../components/organisms/UpcomingClasses';
import QuickActions from '../../components/organisms/QuickActions';

const DashboardHome = () => {
  const { user } = useAuth();

  // --- TUTOR DASHBOARD CONTENT ---
  const renderTutorDashboard = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Overview of your institute activities</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <QrCode size={18} />
            <span>Scan Student QR</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            <Plus size={18} />
            <span>Create Class</span>
          </button>
        </div>
      </div>
      
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UpcomingClasses />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>
      <p>Welcome, {user?.firstName}! Here are your enrolled classes.</p>
    </div>
  );

  const renderInstituteDashboard = () => (
    <div className="p-4">
        <h1 className="text-2xl font-bold">Institute Dashboard</h1>
        <p>Manage your tutors and payments here.</p>
    </div>
  );

  // --- SWITCH LOGIC ---
  // If you want to FORCE Tutor view for now, uncomment the line below:
  // return renderTutorDashboard(); 

  switch (user?.role) {
    case ROLES.TUTOR:
      return renderTutorDashboard();
    case ROLES.STUDENT:
      return renderStudentDashboard();
    case ROLES.INSTITUTE:
      return renderInstituteDashboard();
    default:
      // Fallback: If role is missing or unknown, show Tutor view (or error)
      return renderTutorDashboard(); 
  }
};

export default DashboardHome;