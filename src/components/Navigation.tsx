import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  GraduationCap 
} from 'lucide-react';
import { AppPage } from '../types';

interface NavigationProps {
  currentPage: AppPage;
  setCurrentPage: (page: AppPage) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'dashboard' as AppPage, label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'tasks' as AppPage, label: 'Tasks', icon: <CheckSquare size={20} /> },
    { id: 'calendar' as AppPage, label: 'Calendar', icon: <Calendar size={20} /> },
    { id: 'marks' as AppPage, label: 'Marks', icon: <GraduationCap size={20} /> },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-blue-600">SennaFloww</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`${
                    currentPage === item.id
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500">Built by Tejash</span>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="grid grid-cols-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`${
                currentPage === item.id
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              } flex flex-col items-center justify-center py-2`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;