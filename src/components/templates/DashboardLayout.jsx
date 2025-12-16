import React, { useState } from 'react';
import Sidebar from '../organisms/SideBar'; 
import TopNavbar from '../organisms/TopNavbar'; 

const DashboardLayout = ({ children }) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 768);
  const [activePage, setActivePage] = useState('dashboard');

  const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <TopNavbar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />

      <main
        className={`
          pt-20 px-4 md:px-6 pb-8 min-h-screen transition-all duration-300
          ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}
        `}
      >
        {/* This is where the Role-Based content will be injected */}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;