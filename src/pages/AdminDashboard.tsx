import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { Users, Plus, Bell, Calendar, BarChart3, Shield, CheckCircle, AlertCircle, Clock, X, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { DatabaseService, Announcement, ScheduleEvent, UserInvitation } from '@/lib/database';
import { AdminService } from '@/lib/adminService';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [invitations, setInvitations] = useState<UserInvitation[]>([]);
  
  // Form states
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');

  // Form data

  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    message: '',
    priority: 'medium',
    targetAudience: 'all',
    expiresAt: ''
  });

  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    eventType: 'meeting',
    dayOfWeek: 'Monday',
    startTime: '',
    endTime: '',
    timezone: 'CST',
    zoomLink: '',
    passcode: ''
  });

  const [createAccountForm, setCreateAccountForm] = useState({
    email: '',
    temporaryPassword: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'agent'
  });

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          window.location.href = '/agent-login';
          return;
        }

        setCurrentUser(user);

        // Check if user is admin
        const adminStatus = await DatabaseService.isAdmin(user.id);
        setIsAdmin(adminStatus);

        if (!adminStatus) {
          window.location.href = '/dashboard';
          return;
        }

        // Load admin data
        await loadAllData();
      } catch (error) {
        console.error('Error loading admin data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAdminData();
  }, []);

  const loadAllData = async () => {
    try {
      const [announcementsList, eventsList] = await Promise.all([
        DatabaseService.getAnnouncements(),
        DatabaseService.getScheduleEvents()
      ]);

      // Load invitations using admin service
      const invitationsList = await AdminService.getUserInvitations();

      setAnnouncements(announcementsList);
      setEvents(eventsList);
      setInvitations(invitationsList);
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  };


  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !isAdmin) return;

    setIsSubmitting(true);

    try {
      const announcement = await DatabaseService.createAnnouncement({
        title: announcementForm.title,
        message: announcementForm.message,
        priority: announcementForm.priority as 'low' | 'medium' | 'high' | 'urgent',
        target_audience: announcementForm.targetAudience as 'all' | 'agents' | 'managers',
        expires_at: announcementForm.expiresAt || null,
        author_name: `${currentUser.email?.split('@')[0] || 'Admin'}`
      });

      if (announcement) {
        setSubmitSuccess('Announcement created successfully!');
        setAnnouncementForm({ title: '', message: '', priority: 'medium', targetAudience: 'all', expiresAt: '' });
        setShowAnnouncementForm(false);
        await loadAllData();
        
        setTimeout(() => setSubmitSuccess(''), 5000);
      } else {
        alert('Error creating announcement');
      }
    } catch (error) {
      console.error('Error creating announcement:', error);
      alert('Error creating announcement');
    }

    setIsSubmitting(false);
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !isAdmin) return;

    setIsSubmitting(true);

    try {
      const event = await DatabaseService.createScheduleEvent({
        title: eventForm.title,
        description: eventForm.description,
        event_type: eventForm.eventType as 'meeting' | 'training' | 'call' | 'bom' | 'hierarchy' | 'sales',
        day_of_week: eventForm.dayOfWeek,
        start_time: eventForm.startTime,
        end_time: eventForm.endTime || null,
        timezone: eventForm.timezone,
        zoom_link: eventForm.zoomLink || null,
        passcode: eventForm.passcode || null,
        is_recurring: true,
        is_active: true
      });

      if (event) {
        setSubmitSuccess('Event created successfully!');
        setEventForm({ title: '', description: '', eventType: 'meeting', dayOfWeek: 'Monday', startTime: '', endTime: '', timezone: 'CST', zoomLink: '', passcode: '' });
        setShowEventForm(false);
        await loadAllData();
        
        setTimeout(() => setSubmitSuccess(''), 5000);
      } else {
        alert('Error creating event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event');
    }

    setIsSubmitting(false);
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate passwords match
    if (createAccountForm.temporaryPassword !== createAccountForm.confirmPassword) {
      alert('Passwords do not match. Please try again.');
      setIsSubmitting(false);
      return;
    }

    // Validate password strength
    if (createAccountForm.temporaryPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await AdminService.createUser({
        email: createAccountForm.email,
        temporaryPassword: createAccountForm.temporaryPassword,
        firstName: createAccountForm.firstName,
        lastName: createAccountForm.lastName,
        role: createAccountForm.role as 'admin' | 'agent' | 'manager'
      });

      if (result.success) {
        setSubmitSuccess('Account created successfully! The user can now log in with their credentials.');
        
        // Reset form
        setCreateAccountForm({
          email: '',
          temporaryPassword: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          role: 'agent'
        });
        setShowCreateAccountForm(false);
        await loadAllData();
        
        setTimeout(() => setSubmitSuccess(''), 5000);
      } else {
        alert(`Account creation failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Account creation error:', error);
      alert('An error occurred during account creation. Please try again.');
    }

    setIsSubmitting(false);
  };


  const handleDeleteAnnouncement = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;

    try {
      await DatabaseService.deleteAnnouncement(id);
      await loadAllData();
    } catch (error) {
      console.error('Error deleting announcement:', error);
      alert('Error deleting announcement');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      await DatabaseService.deleteScheduleEvent(id);
      await loadAllData();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  const activeInvitations = invitations.filter(inv => inv.is_active);
  const pendingInvitations = activeInvitations.filter(inv => !inv.accepted_at);
  const activeAnnouncements = announcements.filter(ann => ann.is_active);
  const activeEvents = events.filter(evt => evt.is_active);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <DashboardSidebar />
      
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="mt-2 text-gray-600">Manage users, announcements, and events for the EIB Agency platform.</p>
                
                {submitSuccess && (
                  <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <p className="text-green-700 font-medium">{submitSuccess}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-3xl font-bold text-blue-600">{activeInvitations.length}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Invites</p>
                      <p className="text-3xl font-bold text-yellow-600">{pendingInvitations.length}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Announcements</p>
                      <p className="text-3xl font-bold text-green-600">{activeAnnouncements.length}</p>
                    </div>
                    <Bell className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Scheduled Events</p>
                      <p className="text-3xl font-bold text-purple-600">{activeEvents.length}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {[
                      { id: 'overview', name: 'Overview', icon: BarChart3 },
                      { id: 'users', name: 'User Management', icon: Users },
                      { id: 'announcements', name: 'Announcements', icon: Bell },
                      { id: 'events', name: 'Events', icon: Calendar }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab.id
                            ? 'border-purple-500 text-purple-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <tab.icon className="h-5 w-5" />
                        <span>{tab.name}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Activity */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                          <div className="space-y-3">
                            {activeAnnouncements.slice(0, 3).map((announcement) => (
                              <div key={announcement.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">{announcement.title}</p>
                                  <p className="text-xs text-gray-500">{new Date(announcement.created_at).toLocaleDateString()}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                          <div className="space-y-3">
                            <button
                              onClick={() => setShowAnnouncementForm(true)}
                              className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                            >
                              <Bell className="h-5 w-5 text-green-600" />
                              <span className="text-green-700 font-medium">Add Announcement</span>
                            </button>
                            <button
                              onClick={() => setShowEventForm(true)}
                              className="w-full flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                            >
                              <Calendar className="h-5 w-5 text-purple-600" />
                              <span className="text-purple-700 font-medium">Schedule Event</span>
                            </button>
                            <button
                              onClick={() => setShowCreateAccountForm(true)}
                              className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                              <Users className="h-5 w-5 text-blue-600" />
                              <span className="text-blue-700 font-medium">Create Account</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Users Tab */}
                  {activeTab === 'users' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                        <a
                          href="/admin/users"
                          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-colors flex items-center space-x-2"
                        >
                          <Users className="h-4 w-4" />
                          <span>Manage Users</span>
                        </a>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invited</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {activeInvitations.map((invitation) => (
                              <tr key={invitation.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                                      <span className="text-white font-medium text-sm">
                                        {invitation.first_name?.[0] || invitation.email[0].toUpperCase()}
                                      </span>
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        {invitation.first_name && invitation.last_name 
                                          ? `${invitation.first_name} ${invitation.last_name}`
                                          : invitation.email
                                        }
                                      </div>
                                      <div className="text-sm text-gray-500">{invitation.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    invitation.role === 'admin' ? 'bg-red-100 text-red-800' :
                                    invitation.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                                    'bg-green-100 text-green-800'
                                  }`}>
                                    {invitation.role}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    invitation.accepted_at ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {invitation.accepted_at ? 'Active' : 'Pending'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {new Date(invitation.invited_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button className="text-red-600 hover:text-red-900 transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Announcements Tab */}
                  {activeTab === 'announcements' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Announcements</h3>
                        <button
                          onClick={() => setShowAnnouncementForm(true)}
                          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-colors flex items-center space-x-2"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add Announcement</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {activeAnnouncements.map((announcement) => (
                          <div key={announcement.id} className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="text-lg font-semibold text-gray-900">{announcement.title}</h4>
                                  <span className={`px-2 py-1 text-xs rounded-full ${
                                    announcement.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                    announcement.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                    announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {announcement.priority}
                                  </span>
                                </div>
                                <p className="text-gray-600 mb-3">{announcement.message}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span>By {announcement.author_name}</span>
                                  <span>{new Date(announcement.created_at).toLocaleDateString()}</span>
                                  <span>Target: {announcement.target_audience}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteAnnouncement(announcement.id)}
                                  className="text-red-400 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Events Tab */}
                  {activeTab === 'events' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Scheduled Events</h3>
                        <button
                          onClick={() => setShowEventForm(true)}
                          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-colors flex items-center space-x-2"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add Event</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeEvents.map((event) => (
                          <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h4>
                                <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteEvent(event.id)}
                                  className="text-red-400 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            
                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>{event.day_of_week}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4" />
                                <span>{event.start_time} {event.timezone}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  event.event_type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                                  event.event_type === 'training' ? 'bg-green-100 text-green-800' :
                                  event.event_type === 'call' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-purple-100 text-purple-800'
                                }`}>
                                  {event.event_type}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>


        {/* Create Announcement Modal */}
        {showAnnouncementForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Create Announcement</h3>
                  <button
                    onClick={() => setShowAnnouncementForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleCreateAnnouncement} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={announcementForm.title}
                    onChange={(e) => setAnnouncementForm({...announcementForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Announcement title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={announcementForm.message}
                    onChange={(e) => setAnnouncementForm({...announcementForm, message: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="Announcement message"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={announcementForm.priority}
                      onChange={(e) => setAnnouncementForm({...announcementForm, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                    <select
                      value={announcementForm.targetAudience}
                      onChange={(e) => setAnnouncementForm({...announcementForm, targetAudience: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="all">All Users</option>
                      <option value="agents">Agents Only</option>
                      <option value="managers">Managers Only</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expires At (Optional)</label>
                  <input
                    type="datetime-local"
                    value={announcementForm.expiresAt}
                    onChange={(e) => setAnnouncementForm({...announcementForm, expiresAt: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAnnouncementForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Announcement'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Create Event Modal */}
        {showEventForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Schedule Event</h3>
                  <button
                    onClick={() => setShowEventForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleCreateEvent} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
                  <input
                    type="text"
                    required
                    value={eventForm.title}
                    onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Weekly Team Meeting"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={3}
                    value={eventForm.description}
                    onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Event description"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                    <select
                      value={eventForm.eventType}
                      onChange={(e) => setEventForm({...eventForm, eventType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="meeting">Meeting</option>
                      <option value="training">Training</option>
                      <option value="call">Call</option>
                      <option value="bom">BOM</option>
                      <option value="hierarchy">Hierarchy</option>
                      <option value="sales">Sales</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Day of Week</label>
                    <select
                      value={eventForm.dayOfWeek}
                      onChange={(e) => setEventForm({...eventForm, dayOfWeek: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
                    <input
                      type="time"
                      required
                      value={eventForm.startTime}
                      onChange={(e) => setEventForm({...eventForm, startTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                    <input
                      type="time"
                      value={eventForm.endTime}
                      onChange={(e) => setEventForm({...eventForm, endTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zoom Link (Optional)</label>
                  <input
                    type="url"
                    value={eventForm.zoomLink}
                    onChange={(e) => setEventForm({...eventForm, zoomLink: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://zoom.us/j/..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passcode (Optional)</label>
                  <input
                    type="text"
                    value={eventForm.passcode}
                    onChange={(e) => setEventForm({...eventForm, passcode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Meeting passcode"
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEventForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Create Account Modal */}
        {showCreateAccountForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Create Account</h3>
                  <button
                    onClick={() => setShowCreateAccountForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleCreateAccount} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      value={createAccountForm.firstName}
                      onChange={(e) => setCreateAccountForm({...createAccountForm, firstName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={createAccountForm.lastName}
                      onChange={(e) => setCreateAccountForm({...createAccountForm, lastName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={createAccountForm.email}
                    onChange={(e) => setCreateAccountForm({...createAccountForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                  <input
                    type="password"
                    required
                    value={createAccountForm.temporaryPassword}
                    onChange={(e) => setCreateAccountForm({...createAccountForm, temporaryPassword: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Temporary password (minimum 6 characters)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                  <input
                    type="password"
                    required
                    value={createAccountForm.confirmPassword}
                    onChange={(e) => setCreateAccountForm({...createAccountForm, confirmPassword: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                  <select
                    value={createAccountForm.role}
                    onChange={(e) => setCreateAccountForm({...createAccountForm, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="agent">Agent</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900 mb-1">Secure Registration</h4>
                      <p className="text-xs text-blue-700">
                        Account information is encrypted and secure. The user will receive a temporary password to log in.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateAccountForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;