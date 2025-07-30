import React, { useState, useEffect } from 'react';
import { Bell, User, LogOut, Menu, X, CheckCircle, AlertCircle, Calendar, MessageSquare } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { DatabaseService } from '@/lib/database';

const DashboardHeader = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        console.log('Current user in header:', user?.email);
        setCurrentUser(user);
        
        if (user) {
          const adminStatus = await DatabaseService.isAdmin(user.id);
          console.log('Admin status for user:', user.email, adminStatus);
          setIsAdmin(adminStatus);
          
          // Check if currently on admin page
          setIsAdminMode(window.location.pathname.startsWith('/admin/dashboard'));
        }
      } catch (error) {
        console.error('Error getting current user:', error);
      }
    };

    getCurrentUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Training Completed',
      message: 'You completed "Video 1 - Welcome" training',
      time: '2 hours ago',
      read: false,
      icon: CheckCircle
    },
    {
      id: 2,
      type: 'info',
      title: 'New Announcement',
      message: 'Monthly team meeting scheduled for next Friday',
      time: '1 day ago',
      read: false,
      icon: MessageSquare
    },
    {
      id: 3,
      type: 'warning',
      title: 'License Renewal',
      message: 'Your insurance license expires in 30 days',
      time: '3 days ago',
      read: true,
      icon: AlertCircle
    },
    {
      id: 4,
      type: 'info',
      title: 'Appointment Reminder',
      message: 'Client meeting with John Smith tomorrow at 2 PM',
      time: '1 week ago',
      read: true,
      icon: Calendar
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ" 
              alt="EIB Team Logo" 
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-black">EIB Agency Portal</h1>
              <p className="text-sm text-gray-600">
                {isAdminMode ? 'Admin Dashboard' : 'Agent Dashboard'}
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Admin Toggle */}
            {isAdmin && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Admin Mode</span>
                <button
                  onClick={() => {
                    if (isAdminMode) {
                      window.location.href = '/admin/dashboard';
                    } else {
                      window.location.href = '/dashboard';
                    }
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                    isAdminMode ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isAdminMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            )}

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-sm text-gray-500">{unreadCount} unread</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-1 rounded-full ${getNotificationColor(notification.type)}`}>
                            <notification.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="h-8 w-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-black" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {currentUser?.email?.split('@')[0] || 'Agent'}
                  </p>
                  <p className="text-xs text-gray-500">Agent</p>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {currentUser?.email?.split('@')[0] || 'Agent'}
                    </p>
                    <p className="text-xs text-gray-500">{currentUser?.email || ''}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;