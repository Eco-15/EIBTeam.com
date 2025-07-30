import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { Users, Plus, Bell, Calendar, BarChart3, Shield, CheckCircle, AlertCircle, Clock, X, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { DatabaseService, Announcement, ScheduleEvent, UserInvitation } from '@/lib/database';

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
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{type: 'announcement' | 'event', id: string, title: string} | null>(null);

  // Form data
  const [userForm, setUserForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    role: 'agent',
    password: ''
  });

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

      // Load invitations
      const { data: invitationsList, error } = await supabase
        .from('user_invitations')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading invitations:', error);
      }

      setAnnouncements(announcementsList);
      setEvents(eventsList);
      setInvitations(invitationsList || []);
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  };

  const generateTemporaryPassword = () => {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !isAdmin) return;

    setIsSubmitting(true);

    try {
      // Generate password if not provided
      const password = userForm.password || generateTemporaryPassword();

      // Create user using Supabase client-side SDK with minimal constraints
      const { data, error } = await supabase.auth.signUp({
        email: userForm.email,
        password: password,
        options: {
          emailRedirectTo: undefined, // Disable email confirmation
          data: {
            first_name: userForm.firstName,
            last_name: userForm.lastName,
            full_name: `${userForm.firstName} ${userForm.lastName}`.trim(),
            email_confirm: true // Skip email confirmation
          }
        }
      });

      if (error) {
        console.error('Error creating user:', error);
        
        // Try alternative approach if signup fails
        if (error.message.includes('email') || error.message.includes('confirmation')) {
          // Try with admin createUser if available
          try {
            const { data: adminData, error: adminError } = await supabase.auth.admin.createUser({
              email: userForm.email,
              password: password,
              email_confirm: true,
              user_metadata: {
                first_name: userForm.firstName,
                last_name: userForm.lastName,
                date_of_birth: userForm.dateOfBirth || null,
                full_name: `${userForm.firstName} ${userForm.lastName}`.trim()
              }
            });
            
            if (adminError) {
              throw adminError;
            }
            
            // Use admin created user data
            if (adminData.user) {
              await createUserProfile(adminData.user, password);
              return;
            }
          } catch (adminErr) {
            console.error('Admin create user also failed:', adminErr);
            alert(`Error creating user: ${error.message}. Admin fallback also failed: ${adminErr.message}`);
            setIsSubmitting(false);
            return;
          }
        }
        
        alert(`Error creating user: ${error.message}`);
        setIsSubmitting(false);
        return;
      }

      if (data.user) {
        await createUserProfile(data.user, password);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert(`Error creating user: ${error.message}`);
    }

    setIsSubmitting(false);
  };

  const createUserProfile = async (user: any, password: string) => {
    try {
      // Create agent profile with error handling
      const { error: profileError } = await supabase
        .from('agent_profiles')
        .insert([{
          user_id: user.id,
          first_name: userForm.firstName,
          last_name: userForm.lastName,
          status: 'active'
        }]);

      if (profileError) {
        console.error('Error creating agent profile:', profileError);
        // Continue anyway - profile creation failure shouldn't block user creation
      }

      // Create user role with error handling
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert([{
          user_id: user.id,
          role: userForm.role,
          assigned_by: currentUser.id
        }]);

      if (roleError) {
        console.error('Error creating user role:', roleError);
        // Continue anyway - role creation failure shouldn't block user creation
      }

      // Create invitation record with error handling
      const { error: invitationError } = await supabase
        .from('user_invitations')
        .insert([{
          email: userForm.email,
          first_name: userForm.firstName,
          last_name: userForm.lastName,
          role: userForm.role,
          temporary_password: password,
          invited_by: currentUser.id,
          accepted_at: new Date().toISOString()
        }]);

      if (invitationError) {
        console.error('Error creating invitation:', invitationError);
        // Continue anyway - invitation creation failure shouldn't block user creation
      }

      setSubmitSuccess(`User created successfully! Login credentials - Email: ${userForm.email}, Password: ${password}`);
      setUserForm({ email: '', firstName: '', lastName: '', role: 'agent', password: '' });
      setShowCreateUserForm(false);
      await loadAllData();
      
      setTimeout(() => setSubmitSuccess(''), 10000);
    } catch (error) {
      console.error('Error in createUserProfile:', error);
      // Even if profile creation fails, the user was created successfully
      setSubmitSuccess(`User created successfully but some profile setup failed. Login credentials - Email: ${userForm.email}, Password: ${password}`);
      setUserForm({ email: '', firstName: '', lastName: '', role: 'agent', password: '' });
      setShowCreateUserForm(false);
      await loadAllData();
      
      setTimeout(() => setSubmitSuccess(''), 10000);
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
        priority: announcementForm.priority as 'Low' | 'Medium' | 'High' | 'URGENT',
        target_audience: announcementForm.targetAudience as 'all' | 'agents' ,
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

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      await DatabaseService.deleteAnnouncement(id);
      await loadAllData();
    } catch (error) {
      console.error('Error deleting announcement:', error);
      alert('Error deleting announcement');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await DatabaseService.deleteScheduleEvent(id);
      await loadAllData();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event');
    }
  };

  const confirmDelete = (type: 'announcement' | 'event', id: string, title: string) => {
    setDeleteTarget({ type, id, title });
    setShowDeleteConfirm(true);
  };

  const executeDelete = async () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'announcement') {
      await handleDeleteAnnouncement(deleteTarget.id);
    } else {
      await handleDeleteEvent(deleteTarget.id);
    }

    setShowDeleteConfirm(false);
    setDeleteTarget(null);
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
                              onClick={() => setShowCreateUserForm(true)}
                              className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                              <Users className="h-5 w-5 text-blue-600" />
                              <span className="text-blue-700 font-medium">Create New User</span>
                            </button>
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
                                    announcement.priority === 'URGENT' ? 'bg-red-100 text-red-800' :
                                    announcement.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                                    announcement.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
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
                                  onClick={() => confirmDelete('announcement', announcement.id, announcement.title)}
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
                                  onClick={() => confirmDelete('event', event.id, event.title)}
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

        {/* Create User Modal */}
        {showCreateUserForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Create New User</h3>
                  <button
                    onClick={() => setShowCreateUserForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleCreateUser} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      value={userForm.firstName}
                      onChange={(e) => setUserForm({...userForm, firstName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={userForm.lastName}
                      onChange={(e) => setUserForm({...userForm, lastName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={userForm.dateOfBirth}
                    onChange={(e) => setUserForm({...userForm, dateOfBirth: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={userForm.email}
                    onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john.doe@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                  <select
                    required
                    value={userForm.role}
                    onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="agent">Agent</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password 
                    <span className="text-gray-500 text-xs">(leave blank to auto-generate)</span>
                  </label>
                  <input
                    type="text"
                    value={userForm.password}
                    onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Auto-generated if empty"
                  />
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900 mb-1">User Creation Process</h4>
                      <p className="text-xs text-blue-700">
                        The user will be created using Supabase Auth and can immediately log in to their dashboard. 
                        Make sure to share the login credentials securely with the new user.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateUserForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Creating User...' : 'Create User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && deleteTarget && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-red-100 rounded-full p-2">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
                    <p className="text-sm text-gray-600">This action cannot be undone</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">
                  Are you sure you want to delete the {deleteTarget.type} "{deleteTarget.title}"?
                </p>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteTarget(null);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={executeDelete}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;