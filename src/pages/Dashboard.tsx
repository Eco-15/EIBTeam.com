import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { TrendingUp, Users, DollarSign, Calendar, Bell, BookOpen, FileText, Target } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { name: 'Monthly Sales', value: '$12,450', change: '+12%', icon: DollarSign, color: 'text-green-600' },
    { name: 'Active Clients', value: '47', change: '+3', icon: Users, color: 'text-blue-600' },
    { name: 'Conversion Rate', value: '23%', change: '+5%', icon: Target, color: 'text-purple-600' },
    { name: 'Training Hours', value: '18', change: '+2', icon: BookOpen, color: 'text-yellow-600' },
  ];

  const recentActivities = [
    { type: 'sale', message: 'New policy sold to Johnson Family', time: '2 hours ago', amount: '$2,400' },
    { type: 'training', message: 'Completed IUL Advanced Training', time: '1 day ago', amount: null },
    { type: 'meeting', message: 'Client consultation with Smith Corp', time: '2 days ago', amount: null },
    { type: 'sale', message: 'Term life policy renewal', time: '3 days ago', amount: '$1,800' },
  ];

  const upcomingEvents = [
    { title: 'Team Meeting', date: 'Today, 2:00 PM', type: 'meeting' },
    { title: 'Product Training: Annuities', date: 'Tomorrow, 10:00 AM', type: 'training' },
    { title: 'Client Presentation', date: 'Friday, 3:00 PM', type: 'client' },
    { title: 'Monthly Review', date: 'Next Monday, 9:00 AM', type: 'review' },
  ];

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
                <p className="mt-2 text-gray-600">Here's what's happening with your business today.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                  <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                        <p className={`text-sm mt-2 ${stat.color}`}>{stat.change} from last month</p>
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
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  </div>
                  <div className="p-6">
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
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {upcomingEvents.map((event, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${
                            event.type === 'meeting' ? 'bg-yellow-100' :
                            event.type === 'training' ? 'bg-blue-100' :
                            event.type === 'client' ? 'bg-green-100' :
                            'bg-purple-100'
                          }`}>
                            <Calendar className={`h-4 w-4 ${
                              event.type === 'meeting' ? 'text-yellow-600' :
                              event.type === 'training' ? 'text-blue-600' :
                              event.type === 'client' ? 'text-green-600' :
                              'text-purple-600'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{event.title}</p>
                            <p className="text-xs text-gray-500">{event.date}</p>
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
      </div>
    </div>
  );
};

export default Dashboard;