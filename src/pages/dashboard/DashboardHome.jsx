import React from 'react';
import { QrCode, Plus } from 'lucide-react';
import StatsGrid from '../../components/organisms/StatsGrid.jsx'; // Added .jsx extension
import UpcomingClasses from '../../components/organisms/UpcomingClasses.jsx'; // Added .jsx extension
import QuickActions from '../../components/organisms/QuickActions.jsx'; // Added .jsx extension

// Path: D:\Tutorz\tutorz-frontend\src\pages\dashboard\DashboardHome.jsx
const DashboardHome = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
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
};

export default DashboardHome;