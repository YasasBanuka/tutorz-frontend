import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  DollarSign, 
  FileText, 
  QrCode, 
  Settings, 
  ChevronRight, 
  ChevronLeft, 
  LogOut 
} from 'lucide-react';
import SidebarItem from '../molecules/SidebarItem';
import { MOCK_USER } from '../../utils/mockData';

const Sidebar = ({ isCollapsed, toggleSidebar, activePage, setActivePage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'classes', label: 'My Classes', icon: BookOpen },
    { id: 'students', label: 'Students & Medals', icon: Users },
    { id: 'attendance', label: 'Mark Attendance', icon: Calendar },
    { id: 'financials', label: 'Financials & Invoices', icon: DollarSign },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'profile', label: 'Profile & QR', icon: QrCode },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      <aside 
        className={`
          bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-30 transition-all duration-300 ease-in-out
          ${isCollapsed ? '-translate-x-full md:translate-x-0 md:w-20' : 'w-64'}
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
          <div className="flex items-center gap-2 font-bold text-xl text-blue-700">
             <span>Tutorz</span>
          </div>
          <button 
            onClick={toggleSidebar}
            className="hidden md:block p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-500"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
          
          {/* Mobile Close Button */}
          <button 
            onClick={toggleSidebar}
            className="md:hidden p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-500"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* User Mini Profile */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'md:justify-center' : ''}`}>
            <img src={MOCK_USER.profileImage} alt="Profile" className="w-10 h-10 rounded-full" />
            {!isCollapsed && (
              <div className="overflow-hidden">
                <h4 className="font-semibold text-sm text-gray-800 truncate">{MOCK_USER.name}</h4>
                <p className="text-xs text-gray-500">{MOCK_USER.tutorId}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 mt-2 flex-1 overflow-y-auto h-[calc(100vh-180px)]">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activePage === item.id}
              isCollapsed={isCollapsed}
              onClick={() => {
                setActivePage(item.id);
                // On mobile, close sidebar after selection
                if (window.innerWidth < 768) toggleSidebar();
              }}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100 bg-white">
          <button className={`
            w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors
            ${isCollapsed ? 'justify-center' : ''}
          `}>
            <LogOut size={20} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;