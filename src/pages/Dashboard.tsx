import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { TrendingUp, Users, DollarSign, Calendar, Bell, BookOpen, FileText, Target, Plus, X, CheckCircle, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { DatabaseService, SalesActivity, Appointment, Announcement, ScheduleEvent } from '@/lib/database';

const Dashboard = () => {
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [salesActivities, setSalesActivities] = useState<SalesActivity[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>([]);
  const [totalMonthlySales, setTotalMonthlySales] = useState(0);
  const [activeClients, setActiveClients] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activityForm, setActivityForm] = useState({
    clientName: '',
    policyType: '',
    premium: '',
    commission: '',
    notes: ''
  });
  const [appointmentForm, setAppointmentForm] = useState({
    clientName: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    type: '',
    notes: ''
  });
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    message: '',
    priority: 'medium',
    targetAudience: 'all'
  });
  const [scheduleForm, setScheduleForm] = useState({
    title: '', description: '', eventType: '', dayOfWeek: '', startTime: '', 
    endTime: '', zoomLink: '', passcode: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load user data and dashboard stats
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          window.location.href = '/agent-login';
          return;
        }

        setCurrentUser(user);
        
        // Auto-create admin user if this is the admin email
        if (user.email === 'Eliyahucohen101@gmail.com') {
          await DatabaseService.createAdminUser();
        }

        // Create admin user if it's the admin email and doesn't exist in roles
        if (user.email === 'Eliyahucohen101@gmail.com') {
          const existingRole = await DatabaseService.getUserRole(user.id);
          if (!existingRole) {
            console.log('Creating admin user role...');
            await DatabaseService.createAdminUser();
          }
        }

        // Check if user is admin
        const adminStatus = await DatabaseService.isAdmin(user.id);
        setIsAdmin(adminStatus);

        // Load sales activities
        const activities = await DatabaseService.getSalesActivities(user.id);
        setSalesActivities(activities);

        // Load monthly sales total
        const monthlyTotal = await DatabaseService.getMonthlySalesTotal(user.id);
        setTotalMonthlySales(monthlyTotal);

        // Load active clients count
        const clientsCount = await DatabaseService.getActiveClientsCount(user.id);
        setActiveClients(clientsCount);

        // Load announcements
        const announcementsList = await DatabaseService.getAnnouncements();
        setAnnouncements(announcementsList);

        // Load schedule events
        const scheduleList = await DatabaseService.getScheduleEvents();
        setScheduleEvents(scheduleList);

      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const stats = [
    { 
      name: 'Monthly Sales', 
      value: totalMonthlySales > 0 ? `$${totalMonthlySales.toLocaleString()}` : '$0', 
      change: totalMonthlySales > 0 ? `${salesActivities.length} sales this month` : 'Start selling!', 
      icon: DollarSign, 
      color: 'text-green-600' 
    },
    { 
      name: 'Active Clients', 
      value: activeClients.toString(), 
      change: activeClients > 0 ? `${activeClients} clients served` : 'Build your base', 
      icon: Users, 
      color: 'text-blue-600' 
    },
    { name: 'Training Hours', value: '0', change: 'Start learning', icon: BookOpen, color: 'text-yellow-600' },
  ];

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const weeklySchedule = [
    { 
      title: 'EIB Hierarchy Call', 
      day: 'Monday', 
      time: '9:00 PM CST', 
      type: 'hierarchy',
      zoomLink: 'https://us02web.zoom.us/j/86232767445?pwd=cW5EOG4yTjE5SEhHKzh6WFVqMElCUT09',
      passcode: '013145'
    },
    { 
      title: 'BOM', 
      day: 'Wednesday', 
      time: '7:00 PM CST', 
      type: 'bom',
      zoomLink: null,
      passcode: null
    },
    { 
      title: 'EIB Sales Call', 
      day: 'Friday', 
      time: '12:00 PM CST', 
      type: 'sales',
      zoomLink: 'https://us02web.zoom.us/j/82582694921?pwd=0Bur6DbLWieEqLHcHIWw6zEU2G71xS.1',
      passcode: '226744'
    },
    { 
      title: 'BOM', 
      day: 'Saturday', 
      time: '7:00 AM CST', 
      type: 'bom',
      zoomLink: null,
      passcode: null
    },
  ];

  const handleActivitySubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    
    setIsSubmitting(true);
    
    try {
      // Create sales activity in database
      const newActivity = await DatabaseService.createSalesActivity({
        user_id: currentUser.id,
        client_name: activityForm.clientName,
        policy_type: activityForm.policyType,
        annual_premium: parseFloat(activityForm.premium) || 0,
        commission_earned: parseFloat(activityForm.commission) || 0,
        notes: activityForm.notes,
        status: 'completed'
      });

      if (newActivity) {
        // Update local state
        setSalesActivities(prev => [newActivity, ...prev]);
        setTotalMonthlySales(prev => prev + (parseFloat(activityForm.premium) || 0));
        
        // Create client record if it doesn't exist
        await DatabaseService.createClient({
          user_id: currentUser.id,
          first_name: activityForm.clientName.split(' ')[0] || activityForm.clientName,
          last_name: activityForm.clientName.split(' ').slice(1).join(' ') || '',
          status: 'active',
          source: 'referral'
        });
        
        // Update active clients count
        const clientsCount = await DatabaseService.getActiveClientsCount(currentUser.id);
        setActiveClients(clientsCount);
        
        setSubmitSuccess(true);
        setShowActivityForm(false);
        setActivityForm({ clientName: '', policyType: '', premium: '', commission: '', notes: '' });
        
        // Reset success message after 3 seconds
        setTimeout(() => setSubmitSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error creating sales activity:', error);
      alert('Error saving sales activity. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    
    setIsSubmitting(true);
    
    try {
      // Create appointment in database
      const newAppointment = await DatabaseService.createAppointment({
        user_id: currentUser.id,
        client_name: appointmentForm.clientName,
        client_phone: appointmentForm.phone,
        client_email: appointmentForm.email,
        appointment_date: appointmentForm.date,
        appointment_time: appointmentForm.time,
        appointment_type: appointmentForm.type,
        notes: appointmentForm.notes,
        status: 'scheduled'
      });

      if (newAppointment) {
        setSubmitSuccess(true);
        setShowAppointmentForm(false);
        setAppointmentForm({ clientName: '', phone: '', email: '', date: '', time: '', type: '', notes: '' });
        
        // Reset success message after 3 seconds
        setTimeout(() => setSubmitSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Error booking appointment. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser || !isAdmin) return;
    
    setIsSubmitting(true);
    
    try {
      const newAnnouncement = await DatabaseService.createAnnouncement({
        title: announcementForm.title,
        message: announcementForm.message,
        priority: announcementForm.priority as any,
        author_id: currentUser.id,
        author_name: currentUser.email?.split('@')[0] || 'Admin',
        target_audience: announcementForm.targetAudience as any,
        is_active: true
      });

      if (newAnnouncement) {
        setAnnouncements(prev => [newAnnouncement, ...prev]);
        setSubmitSuccess(true);
        setShowAnnouncementForm(false);
        setAnnouncementForm({ title: '', message: '', priority: 'medium', targetAudience: 'all' });
        setTimeout(() => setSubmitSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error creating announcement:', error);
      alert('Error creating announcement. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser || !isAdmin) return;
    
    setIsSubmitting(true);
    
    try {
      const newEvent = await DatabaseService.createScheduleEvent({
        title: scheduleForm.title,
        description: scheduleForm.description,
        event_type: scheduleForm.eventType as any,
        day_of_week: scheduleForm.dayOfWeek,
        start_time: scheduleForm.startTime,
        end_time: scheduleForm.endTime || undefined,
        zoom_link: scheduleForm.zoomLink || undefined,
        passcode: scheduleForm.passcode || undefined,
        created_by: currentUser.id,
        is_active: true,
        is_recurring: true,
        timezone: 'CST'
      });

      if (newEvent) {
        setScheduleEvents(prev => [...prev, newEvent]);
        setSubmitSuccess(true);
        setShowScheduleForm(false);
        setScheduleForm({ title: '', description: '', eventType: '', dayOfWeek: '', startTime: '', endTime: '', zoomLink: '', passcode: '' });
        setTimeout(() => setSubmitSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error creating schedule event:', error);
      alert('Error creating schedule event. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <DashboardSidebar />
      
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser?.email?.split('@')[0] || 'Agent'}!</h1>
                <p className="mt-2 text-gray-600">
                  {isAdmin ? 'Admin Dashboard - Manage your team and announcements' : 'Ready to start your journey with EIB Team? Let\'s build your success together!'}
                </p>
                
                {submitSuccess && (
                  <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <p className="text-green-700 font-medium">Successfully submitted! Your activity has been recorded.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {stats.map((stat) => (
                  <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                        <p className={`text-sm mt-2 ${stat.color}`}>{stat.change}</p>
                      </div>
                      <div className={`p-3 rounded-lg bg-gray-50`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Admin Controls */}
              {isAdmin && (
                <div className="mb-8 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                  <h2 className="text-xl font-bold text-purple-900 mb-4">Admin Controls</h2>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setShowAnnouncementForm(true)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2"
                    >
                      <Bell className="h-4 w-4" />
                      <span>Create Announcement</span>
                    </button>
                    <button
                      onClick={() => setShowScheduleForm(true)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Manage Schedule</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                      <button
                        onClick={() => setShowActivityForm(true)}
                        className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Log Sale</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    {salesActivities.length === 0 ? (
                      <div className="text-center py-8">
                        <DollarSign className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">No sales activity yet</p>
                        <p className="text-sm text-gray-400">Log your first sale to start tracking your progress!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {salesActivities.slice(0, 5).map((activity) => (
                          <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="p-2 rounded-full bg-green-100">
                              <DollarSign className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">
                                  Sold {activity.policy_type} policy to {activity.client_name}
                                </p>
                                {activity.commission_earned && (
                                  <p className="text-sm font-semibold text-green-600">
                                    ${activity.commission_earned.toLocaleString()}
                                  </p>
                                )}
                              </div>
                              <p className="text-xs text-gray-600 mt-1">
                                Premium: ${activity.annual_premium.toLocaleString()} • {activity.policy_type}
                              </p>
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-xs text-gray-500">
                                  {formatTimeAgo(new Date(activity.created_at))}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                        {salesActivities.length > 5 && (
                          <div className="text-center pt-4">
                            <p className="text-sm text-gray-500">
                              Showing 5 of {salesActivities.length} activities
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Weekly Schedule */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Weekly Schedule</h3>
                      <button
                        onClick={() => setShowAppointmentForm(true)}
                        className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Book Appointment</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {scheduleEvents.map((event, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className={`p-2 rounded-full ${
                            event.event_type === 'hierarchy' ? 'bg-purple-100' :
                            event.event_type === 'sales' ? 'bg-green-100' :
                            event.event_type === 'bom' ? 'bg-blue-100' :
                            'bg-purple-100'
                          }`}>
                            <Calendar className={`h-4 w-4 ${
                              event.event_type === 'hierarchy' ? 'text-purple-600' :
                              event.event_type === 'sales' ? 'text-green-600' :
                              event.event_type === 'bom' ? 'text-blue-600' :
                              'text-purple-600'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900">{event.title}</h4>
                                <p className="text-sm text-gray-600">{event.day_of_week} at {event.start_time} {event.timezone}</p>
                              </div>
                              {event.zoomLink && (
                                <div className="flex items-center space-x-2">
                                  <a
                                    href={event.zoomLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center space-x-1"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                    <span>Join</span>
                                  </a>
                                  <span className="text-xs text-gray-500">Code: {event.passcode}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Announcements Section */}
              {announcements.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Announcements</h3>
                  <div className="space-y-4">
                    {announcements.slice(0, 3).map((announcement) => (
                      <div key={announcement.id} className={`p-4 rounded-lg border-l-4 ${
                        announcement.priority === 'urgent' ? 'bg-red-50 border-red-500' :
                        announcement.priority === 'high' ? 'bg-orange-50 border-orange-500' :
                        announcement.priority === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                        'bg-blue-50 border-blue-500'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                            <p className="text-gray-600 mt-1">{announcement.message}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm text-gray-500">By {announcement.author_name}</span>
                              <span className="text-xs text-gray-400">
                                {new Date(announcement.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            announcement.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                            announcement.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                            announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {announcement.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <a href="/calendar" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <Calendar className="h-8 w-8 text-yellow-600 mb-3" />
                    <h4 className="font-semibold text-gray-900">View Calendar</h4>
                    <p className="text-sm text-gray-600 mt-1">Check your schedule</p>
                  </a>
                  <a href="/trainings" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <BookOpen className="h-8 w-8 text-blue-600 mb-3" />
                    <h4 className="font-semibold text-gray-900">Start Training</h4>
                    <p className="text-sm text-gray-600 mt-1">Continue learning</p>
                  </a>
                  <a href="/resources" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <FileText className="h-8 w-8 text-green-600 mb-3" />
                    <h4 className="font-semibold text-gray-900">Resources</h4>
                    <p className="text-sm text-gray-600 mt-1">Access materials</p>
                  </a>
                  <a href="/books" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <BookOpen className="h-8 w-8 text-purple-600 mb-3" />
                    <h4 className="font-semibold text-gray-900">Reading List</h4>
                    <p className="text-sm text-gray-600 mt-1">Recommended books</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Activity Form Modal */}
        {showActivityForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Log Sales Activity</h3>
                  <button
                    onClick={() => setShowActivityForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleActivitySubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={activityForm.clientName}
                    onChange={(e) => setActivityForm({...activityForm, clientName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter client name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Policy Type *</label>
                  <select
                    required
                    value={activityForm.policyType}
                    onChange={(e) => setActivityForm({...activityForm, policyType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Select policy type</option>
                    <option value="Term Life">Term Life Insurance</option>
                    <option value="Whole Life">Whole Life Insurance</option>
                    <option value="IUL">Indexed Universal Life</option>
                    <option value="Annuity">Annuity</option>
                    <option value="Health">Health Insurance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Premium *</label>
                  <input
                    type="number"
                    required
                    value={activityForm.premium}
                    onChange={(e) => setActivityForm({...activityForm, premium: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter annual premium"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Commission Earned</label>
                  <input
                    type="number"
                    value={activityForm.commission}
                    onChange={(e) => setActivityForm({...activityForm, commission: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter commission amount"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={activityForm.notes}
                    onChange={(e) => setActivityForm({...activityForm, notes: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                    placeholder="Additional notes about this sale..."
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowActivityForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Log Sale'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Appointment Form Modal */}
        {showAppointmentForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Book Appointment</h3>
                  <button
                    onClick={() => setShowAppointmentForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleAppointmentSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={appointmentForm.clientName}
                    onChange={(e) => setAppointmentForm({...appointmentForm, clientName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter client name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={appointmentForm.phone}
                    onChange={(e) => setAppointmentForm({...appointmentForm, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={appointmentForm.email}
                    onChange={(e) => setAppointmentForm({...appointmentForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="client@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    required
                    value={appointmentForm.date}
                    onChange={(e) => setAppointmentForm({...appointmentForm, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                  <input
                    type="time"
                    required
                    value={appointmentForm.time}
                    onChange={(e) => setAppointmentForm({...appointmentForm, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type *</label>
                  <select
                    required
                    value={appointmentForm.type}
                    onChange={(e) => setAppointmentForm({...appointmentForm, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Select appointment type</option>
                    <option value="Initial Consultation">Initial Consultation</option>
                    <option value="Policy Review">Policy Review</option>
                    <option value="Claims Assistance">Claims Assistance</option>
                    <option value="Follow-up">Follow-up Meeting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={appointmentForm.notes}
                    onChange={(e) => setAppointmentForm({...appointmentForm, notes: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                    placeholder="Additional notes about this appointment..."
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAppointmentForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Booking...' : 'Book Appointment'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Announcement Form Modal */}
        {showAnnouncementForm && isAdmin && (
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
              
              <form onSubmit={handleAnnouncementSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={announcementForm.title}
                    onChange={(e) => setAnnouncementForm({...announcementForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Announcement title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    required
                    value={announcementForm.message}
                    onChange={(e) => setAnnouncementForm({...announcementForm, message: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Announcement message..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={announcementForm.priority}
                    onChange={(e) => setAnnouncementForm({...announcementForm, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Users</option>
                    <option value="agents">Agents Only</option>
                    <option value="managers">Managers Only</option>
                  </select>
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
                    className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Announcement'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Schedule Form Modal */}
        {showScheduleForm && isAdmin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Create Schedule Event</h3>
                  <button
                    onClick={() => setShowScheduleForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleScheduleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={scheduleForm.title}
                    onChange={(e) => setScheduleForm({...scheduleForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Event title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={scheduleForm.description}
                    onChange={(e) => setScheduleForm({...scheduleForm, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Event description..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Type *</label>
                    <select
                      required
                      value={scheduleForm.eventType}
                      onChange={(e) => setScheduleForm({...scheduleForm, eventType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select type</option>
                      <option value="meeting">Meeting</option>
                      <option value="training">Training</option>
                      <option value="call">Call</option>
                      <option value="bom">BOM</option>
                      <option value="hierarchy">Hierarchy</option>
                      <option value="sales">Sales</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Day *</label>
                    <select
                      required
                      value={scheduleForm.dayOfWeek}
                      onChange={(e) => setScheduleForm({...scheduleForm, dayOfWeek: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select day</option>
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
                      value={scheduleForm.startTime}
                      onChange={(e) => setScheduleForm({...scheduleForm, startTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                    <input
                      type="time"
                      value={scheduleForm.endTime}
                      onChange={(e) => setScheduleForm({...scheduleForm, endTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zoom Link</label>
                  <input
                    type="url"
                    value={scheduleForm.zoomLink}
                    onChange={(e) => setScheduleForm({...scheduleForm, zoomLink: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://zoom.us/j/..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passcode</label>
                  <input
                    type="text"
                    value={scheduleForm.passcode}
                    onChange={(e) => setScheduleForm({...scheduleForm, passcode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Meeting passcode"
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowScheduleForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Event'}
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

export default Dashboard;