import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { TrendingUp, Users, DollarSign, Calendar, Bell, BookOpen, FileText, Target, Plus, X, CheckCircle, ExternalLink } from 'lucide-react';

const Dashboard = () => {
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const stats = [
    { name: 'Monthly Sales', value: '$0', change: 'Start selling!', icon: DollarSign, color: 'text-green-600' },
    { name: 'Active Clients', value: '0', change: 'Build your base', icon: Users, color: 'text-blue-600' },
    { name: 'Conversion Rate', value: '0%', change: 'Track progress', icon: Target, color: 'text-purple-600' },
    { name: 'Training Hours', value: '0', change: 'Start learning', icon: BookOpen, color: 'text-yellow-600' },
  ];

  const recentActivities = [];

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
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setShowActivityForm(false);
    setActivityForm({ clientName: '', policyType: '', premium: '', commission: '', notes: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setShowAppointmentForm(false);
    setAppointmentForm({ clientName: '', phone: '', email: '', date: '', time: '', type: '', notes: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

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
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, Eliyahu!</h1>
                <p className="mt-2 text-gray-600">Ready to start your journey with EIB Team? Let's build your success together!</p>
                
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                    {recentActivities.length === 0 ? (
                      <div className="text-center py-8">
                        <DollarSign className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">No sales activity yet</p>
                        <p className="text-sm text-gray-400">Log your first sale to start tracking your progress!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className={`p-2 rounded-full ${
                              activity.type === 'sale' ? 'bg-green-100' :
                              activity.type === 'training' ? 'bg-blue-100' :
                              'bg-purple-100'
                            }`}>
                              {activity.type === 'sale' ? (
                                <DollarSign className="h-4 w-4 text-green-600" />
                              ) : activity.type === 'training' ? (
                                <BookOpen className="h-4 w-4 text-blue-600" />
                              ) : (
                                <Calendar className="h-4 w-4 text-purple-600" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-xs text-gray-500">{activity.time}</p>
                                {activity.amount && (
                                  <p className="text-sm font-semibold text-green-600">{activity.amount}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
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
                      {weeklySchedule.map((event, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className={`p-2 rounded-full ${
                            event.type === 'hierarchy' ? 'bg-purple-100' :
                            event.type === 'sales' ? 'bg-green-100' :
                            event.type === 'bom' ? 'bg-blue-100' :
                            'bg-purple-100'
                          }`}>
                            <Calendar className={`h-4 w-4 ${
                              event.type === 'hierarchy' ? 'text-purple-600' :
                              event.type === 'sales' ? 'text-green-600' :
                              event.type === 'bom' ? 'text-blue-600' :
                              'text-purple-600'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900">{event.title}</h4>
                                <p className="text-sm text-gray-600">{event.day} at {event.time}</p>
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
      </div>
    </div>
  );
};

export default Dashboard;