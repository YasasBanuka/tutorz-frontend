import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  DollarSign, 
  FileText, 
  Settings, 
  QrCode 
} from 'lucide-react';
import TutorDashboardLayout from './components/templates/TutorDashboardLayout.jsx';
import DashboardHome from './pages/dashboard/DashboardHome.jsx';

const App = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 768);
  const [activePage, setActivePage] = useState('dashboard');

  const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

  return (
    <TutorDashboardLayout
      isCollapsed={isSidebarCollapsed}
      toggleSidebar={toggleSidebar}
      activePage={activePage}
      setActivePage={setActivePage}
    >
      {activePage === 'dashboard' ? (
        <DashboardHome />
      ) : (
        // Placeholder for other routes
        <div className="flex flex-col items-center justify-center h-96 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
           <div className="p-6 bg-white rounded-full shadow-sm mb-4">
             {activePage === 'classes' && <BookOpen size={48} />}
             {activePage === 'students' && <Users size={48} />}
             {activePage === 'attendance' && <Calendar size={48} />}
             {activePage === 'financials' && <DollarSign size={48} />}
             {activePage === 'reports' && <FileText size={48} />}
             {activePage === 'settings' && <Settings size={48} />}
             {activePage === 'profile' && <QrCode size={48} />}
           </div>
           <h2 className="text-xl font-semibold text-gray-600 capitalize">{activePage.replace('-', ' ')}</h2>
           <p className="mt-2 text-sm">Component content goes here</p>
        </div>
      )}
    </TutorDashboardLayout>
  );
};

export default App;