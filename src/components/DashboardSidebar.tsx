import React from 'react';
import { Calendar, BookOpen, FileText, Library, Home, BarChart3, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { DatabaseService } from '@/lib/database';

interface DashboardSidebarProps {
  isMobileMenuOpen?: boolean;
  onMobileMenuClose?: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  isMobileMenuOpen = false, 
  onMobileMenuClose 
}) => {
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const adminStatus = await DatabaseService.isAdmin(user.id);
        setIsAdmin(adminStatus);
      }
    };

    checkAdminStatus();
  }, []);

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, current: window.location.pathname === '/dashboard' },
    { name: 'Calendar & Announcements', href: '/calendar', icon: Calendar, current: window.location.pathname === '/calendar' },
    { name: 'Trainings', href: '/trainings', icon: BookOpen, current: window.location.pathname === '/trainings' },
    { name: 'Resources', href: '/resources', icon: FileText, current: window.location.pathname === '/resources' },
    { name: 'Books to Read', href: '/books', icon: Library, current: window.location.pathname === '/books' },
  ];

  // Add admin-only menu items
  if (isAdmin) {
    menuItems.push({
      name: 'Admin Dashboard',
      href: '/admin/dashboard',
      icon: BarChart3,
      current: window.location.pathname === '/admin/dashboard'
    });
    menuItems.push({
      name: 'Manage Users',
      href: '/admin/users',
      icon: Users,
      current: window.location.pathname === '/admin/users'
    });
  }

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onMobileMenuClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:inset-0 md:pt-20
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex h-full flex-col bg-gray-50 border-r border-gray-200 pt-20 md:pt-0">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
              <img 
                src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ" 
                alt="EIB Team Logo" 
                className="h-8 w-8 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-bold text-black">EIB Agency</h2>
                <p className="text-xs text-gray-600">Agent Portal</p>
              </div>
            </div>
            <button
              onClick={onMobileMenuClose}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

      <div className="flex-1 flex flex-col min-h-0 bg-gray-50 border-r border-gray-200">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={onMobileMenuClose}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  item.current
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-6 w-6 ${
                    item.current ? 'text-black' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        
        {/* Bottom section */}
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  EIB Agency Agent Portal
                </p>
                <p className="text-xs text-gray-400">v2.1.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
    </div>
  );
};

export default DashboardSidebar;