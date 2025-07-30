import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { DatabaseService } from '@/lib/database';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { BookOpen, Play, CheckCircle, Clock, Star, Award, FileText, ArrowRight, TrendingUp, Users, Calendar, MessageSquare } from 'lucide-react';

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [agentProfile, setAgentProfile] = useState<any>(null);
  const [trainingProgress, setTrainingProgress] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          window.location.href = '/agent-login';
          return;
        }

        setCurrentUser(user);

        // Load agent profile
        const profile = await DatabaseService.getAgentProfile(user.id);
        setAgentProfile(profile);

        // Load training progress
        const progress = await DatabaseService.getTrainingProgress(user.id);
        setTrainingProgress(progress);

        // Load recent announcements
        const announcementsList = await DatabaseService.getAnnouncements();
        setAnnouncements(announcementsList.slice(0, 3)); // Show only 3 most recent
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Sample training data
  const featuredTrainings = [
    {
      id: 1,
      title: 'Video 1 - Welcome To EIB',
      description: 'Introduction to EIB Team, our mission, values, and what to expect.',
      duration: '30 minutes',
      difficulty: 'Beginner',
      instructor: 'Jason Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4'
    },
    {
      id: 2,
      title: 'Video 2 – Builder\'s Mindset',
      description: 'Develop the entrepreneurial mindset needed for success.',
      duration: '45 minutes',
      difficulty: 'Beginner',
      instructor: 'Jason Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz'
    },
    {
      id: 8,
      title: 'Video 8 – Goal Setting / Business Plan',
      description: 'Create actionable goals and develop a comprehensive business plan.',
      duration: '1.5 hours',
      difficulty: 'Intermediate',
      instructor: 'Jason Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz'
    }
  ];

  // Sample books data
  const featuredBooks = [
    {
      id: 1,
      title: 'Go Pro',
      author: 'Eric Worre',
      category: 'sales',
      rating: 4.8,
      cover: 'https://m.media-amazon.com/images/I/81gfrYfKBoL._SY522_.jpg'
    },
    {
      id: 2,
      title: 'How to Win Friends and Influence People',
      author: 'Dale Carnegie',
      category: 'personal',
      rating: 4.9,
      cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442726934i/4865.jpg'
    },
    {
      id: 10,
      title: 'Rich Dad, Poor Dad',
      author: 'Robert T. Kiyosaki',
      category: 'finance',
      rating: 4.7,
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnZ3q517CoJ8al2Ln3qhY1jXVbCwIOStx7fH9P'
    }
  ];

  // Sample resources data
  const featuredResources = [
    {
      id: 1,
      title: 'State Specific Licensing Sheet',
      description: 'Comprehensive overview of licensing requirements for all states.',
      category: 'licensing',
      icon: FileText
    },
    {
      id: 2,
      title: 'ExamFX Study Material',
      description: 'Sign up for comprehensive study materials for your licensing exam.',
      category: 'licensing',
      icon: BookOpen
    },
    {
      id: 14,
      title: 'Client Flow',
      description: 'CRM system for managing client relationships and sales pipeline.',
      category: 'tools',
      icon: Users
    }
  ];

  const isTrainingCompleted = (trainingId: number) => {
    const progress = trainingProgress.find(p => p.training_id === trainingId);
    return progress?.completed || false;
  };

  const completedTrainings = trainingProgress.filter(t => t.completed).length || 0;
  const totalTrainings = 10; // Total number of trainings available

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
              {/* Welcome Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {agentProfile?.first_name || currentUser?.email?.split('@')[0] || 'Agent'}!
                </h1>
                <p className="mt-2 text-gray-600">Continue your learning journey and access your resources.</p>
              </div>

              {/* Learning Progress Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Trainings Completed</p>
                      <p className="text-3xl font-bold text-green-600">{completedTrainings}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Remaining Trainings</p>
                      <p className="text-3xl font-bold text-yellow-600">{totalTrainings - completedTrainings}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Progress</p>
                      <p className="text-3xl font-bold text-blue-600">{Math.round((completedTrainings / totalTrainings) * 100)}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Certificates</p>
                      <p className="text-3xl font-bold text-purple-600">{completedTrainings}</p>
                    </div>
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Featured Trainings */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">Continue Learning</h2>
                        <a
                          href="/trainings"
                          className="text-yellow-600 hover:text-yellow-700 font-medium text-sm flex items-center space-x-1"
                        >
                          <span>View All</span>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-6">
                        {featuredTrainings.map((training) => {
                          const completed = isTrainingCompleted(training.id);
                          
                          return (
                            <div key={training.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                              <div className="relative">
                                <img
                                  src={training.thumbnail}
                                  alt={training.title}
                                  className="w-20 h-14 object-cover rounded-lg"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                                  <Play className="h-5 w-5 text-white" />
                                </div>
                                {completed && (
                                  <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                                    <CheckCircle className="h-3 w-3" />
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{training.title}</h3>
                                <p className="text-gray-600 text-sm mb-2">{training.description}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span>{training.duration}</span>
                                  <span>{training.difficulty}</span>
                                  <span>By {training.instructor}</span>
                                </div>
                              </div>
                              
                              <div className="flex-shrink-0">
                                <a
                                  href={`/training/${training.id}`}
                                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors"
                                >
                                  {completed ? 'Review' : 'Start'}
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Quick Resources */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Quick Resources</h3>
                        <a
                          href="/resources"
                          className="text-yellow-600 hover:text-yellow-700 font-medium text-sm flex items-center space-x-1"
                        >
                          <span>View All</span>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-4">
                        {featuredResources.map((resource) => (
                          <div key={resource.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="bg-gray-200 p-2 rounded-lg">
                              <resource.icon className="h-4 w-4 text-gray-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 text-sm">{resource.title}</h4>
                              <p className="text-gray-600 text-xs mt-1">{resource.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Featured Books */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Recommended Reading</h3>
                        <a
                          href="/books"
                          className="text-yellow-600 hover:text-yellow-700 font-medium text-sm flex items-center space-x-1"
                        >
                          <span>View All</span>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-4">
                        {featuredBooks.map((book) => (
                          <div key={book.id} className="flex items-start space-x-3">
                            <img
                              src={book.cover}
                              alt={book.title}
                              className="w-12 h-16 object-cover rounded-lg shadow-sm"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 text-sm">{book.title}</h4>
                              <p className="text-gray-600 text-xs">by {book.author}</p>
                              <div className="flex items-center space-x-1 mt-1">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-500">{book.rating}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-center">
                    <h3 className="text-lg font-bold text-black mb-2">Need Help?</h3>
                    <div className="space-y-4">
                      {announcements.length > 0 ? (
                        announcements.map((announcement) => (
                          <div key={announcement.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                              <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <h4 className="font-medium text-blue-900 text-sm">{announcement.title}</h4>
                                <p className="text-blue-700 text-xs mt-1">{announcement.message}</p>
                                <p className="text-blue-600 text-xs mt-2">
                                  {new Date(announcement.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-center">
                          <h3 className="text-lg font-bold text-black mb-2">Need Help?</h3>
                          <p className="text-black mb-4 text-sm">Contact support for assistance with training or resources.</p>
                          <a
                            href="mailto:admin@eibagency.com"
                            className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm inline-block"
                          >
                            Contact Support
                          </a>
                        </div>
                      )}
              </div>

              {/* Learning Path Section */}
              <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Your Learning Path</h2>
                </div>
                
                <div className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <a
                      href="/trainings"
                      className="group bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Training Center</h3>
                      <p className="text-gray-600 text-sm mb-3">Complete your training modules and earn certificates</p>
                      <div className="text-blue-600 font-medium text-sm flex items-center space-x-1">
                        <span>Continue Learning</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </a>

                    <a
                      href="/resources"
                      className="group bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Resources</h3>
                      <p className="text-gray-600 text-sm mb-3">Access licensing info, tools, and operational resources</p>
                      <div className="text-green-600 font-medium text-sm flex items-center space-x-1">
                        <span>Browse Resources</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </a>

                    <a
                      href="/books"
                      className="group bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Reading List</h3>
                      <p className="text-gray-600 text-sm mb-3">Expand your knowledge with our curated book collection</p>
                      <div className="text-purple-600 font-medium text-sm flex items-center space-x-1">
                        <span>Start Reading</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </a>
                  </div>
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