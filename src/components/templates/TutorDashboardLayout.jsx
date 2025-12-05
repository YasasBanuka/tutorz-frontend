import React from 'react';
import Sidebar from '../organisms/SideBar.jsx'; // Added .jsx extension
import TopNavbar from '../organisms/TopNavbar.jsx'; // Corrected name and added .jsx extension

// Path: D:\Tutorz\tutorz-frontend\src\components\templates\TutorDashboardLayout.jsx
const TutorDashboardLayout = ({ children, isCollapsed, toggleSidebar, activePage, setActivePage }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar 
        isCollapsed={isCollapsed} 
        toggleSidebar={toggleSidebar} 
        activePage={activePage}
        setActivePage={setActivePage}
      />
      
      <TopNavbar 
        isCollapsed={isCollapsed} 
        toggleSidebar={toggleSidebar}
      />

      <main 
        className={`
          pt-20 px-4 md:px-6 pb-8 min-h-screen transition-all duration-300
          ${isCollapsed ? 'md:ml-20' : 'md:ml-64'}
        `}
      >
        {children}
      </main>
    </div>
  );
};

export default TutorDashboardLayout;