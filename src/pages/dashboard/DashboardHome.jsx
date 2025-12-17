import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';

// Services & Hooks
import useApi from '../../hooks/useApi';
import * as tutorService from '../../services/api/tutorService';

// Icons & Components
import { QrCode, Plus } from 'lucide-react';
import StatsGrid from '../../components/organisms/StatsGrid';
import UpcomingClasses from '../../components/organisms/UpcomingClasses';
import QuickActions from '../../components/organisms/QuickActions';
import ClassFormModal from '../../components/organisms/ClassFormModal';
import ConfirmationModal from '../../components/molecules/ConfirmationModal'; // Import Confirmation

// Import Pages for Navigation
import ClassesPage from './ClassesPage';

const DashboardHome = ({ activePage, setActivePage }) => {
  const { user } = useAuth();
  
  // -- State for Dashboard Quick Actions --
  const [isClassModalOpen, setClassModalOpen] = useState(false);
  
  // Confirmation States
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  // API Hooks
  const { request: saveClass, loading: isSaving } = useApi();

  // --- NAVIGATION SWITCHER ---
  // If Sidebar selected 'classes', show the Classes Page immediately
  if (activePage === 'classes') {
     return <ClassesPage />;
  }

  // --- DASHBOARD HANDLERS ---
  
  // 1. Intercept Submit
  const handleClassSubmit = (formData) => {
    setPendingFormData(formData);
    setIsConfirmOpen(true);
  };

  // 2. Confirm Save
  const handleConfirmSave = async () => {
    const result = await saveClass(tutorService.createClass, pendingFormData);
    if (result.data) {
      setIsConfirmOpen(false);
      setClassModalOpen(false);
      setPendingFormData(null);
      setIsSuccessOpen(true);
      // We don't reload here, user can refresh if needed or we update context
    }
  };

  const handleSuccessClose = () => {
      setIsSuccessOpen(false);
      window.location.reload(); // Reload to show new stats/classes
  };

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
          
          <button 
            onClick={() => setClassModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
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

      {/* --- DASHBOARD MODALS --- */}
      <ClassFormModal 
        isOpen={isClassModalOpen} 
        onClose={() => setClassModalOpen(false)} 
        onSubmit={handleClassSubmit}
        isSubmitting={isSaving}
      />

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmSave}
        title="Create Class"
        message="Are you sure you want to create this new class?"
        confirmLabel="Create"
        cancelLabel="Cancel"
        variant="primary"
      />

      <ConfirmationModal
        isOpen={isSuccessOpen}
        onClose={handleSuccessClose}
        onConfirm={handleSuccessClose}
        title="Success"
        message="Class added successfully!"
        confirmLabel="OK"
        cancelLabel="Close"
        variant="success"
      />
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

  switch (user?.role) {
    case ROLES.TUTOR:
      return renderTutorDashboard();
    case ROLES.STUDENT:
      return renderStudentDashboard();
    case ROLES.INSTITUTE:
      return renderInstituteDashboard();
    default:
      return renderTutorDashboard(); 
  }
};

export default DashboardHome;