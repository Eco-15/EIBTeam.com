import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { BookOpen, Play, CheckCircle, Clock, Star, Award, Search, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { DatabaseService } from '@/lib/database';

const TrainingsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [trainingProgress, setTrainingProgress] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const trainings = [
    {
      id: 1,
      title: 'Video 1 - Welcome To EIB',
      description: 'Introduction to EIB Team, our mission, values, and what to expect in your journey with us.',
      fullDescription: 'Welcome to EIB Agency! This comprehensive introduction training will walk you through our company mission, core values, and what you can expect as you begin your journey with us. You\'ll learn about our history, our commitment to excellence, and how we support our agents in achieving their goals. This training covers the foundational knowledge every EIB Agency member needs to succeed.',
      duration: '30 minutes',
      difficulty: 'Beginner',
      rating: 4.8,
      instructor: 'Jason Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      learningObjectives: [
        'Understand EIB Agency\'s mission and values',
        'Learn about company history and culture',
        'Discover available resources and support systems',
        'Set expectations for your career journey'
      ]
    },
    {
      id: 2,
      title: 'Video 2 – Builder\'s Mindset',
      description: 'Develop the entrepreneurial mindset needed to build a successful insurance business.',
      duration: '20 minutes',
      difficulty: 'Beginner',
      rating: 4.9,
      instructor: 'Jason Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz'
    },
    {
      id: 3,
      title: 'Video 3 – Mental Toughness',
      description: 'Build resilience and mental strength to overcome challenges in the insurance industry.',
      duration: '15 minutes',
      difficulty: 'Beginner',
      rating: 4.7,
      instructor: 'Jason Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4'
    },
    {
      id: 4,
      title: 'Video 4 – 6 Steps (PCA/Schedule)',
      description: 'Master the 6-step process for client acquisition and appointment scheduling.',
      duration: '30 minutes',
      difficulty: 'Intermediate',
      rating: 4.6,
      instructor: 'Nataly Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz'
    },
    {
      id: 5,
      title: 'Video 5 – RI',
      description: 'Learn the referral interview process to expand your client base through warm referrals.',
      duration: '50 minutes',
      difficulty: 'Intermediate',
      rating: 4.5,
      instructor: 'Jason Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4'
    },
    {
      id: 6,
      title: 'Video 6 – KTP',
      description: 'Understand your clients deeply to provide personalized financial solutions.',
      duration: '45 minutes',
      difficulty: 'Intermediate',
      rating: 4.8,
      instructor: 'Nataly Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz'
    },
    {
      id: 7,
      title: 'Video 7 – FS',
      description: 'Conduct comprehensive financial surveys to identify client needs and opportunities.',
      duration: '1 hour',
      difficulty: 'Intermediate',
      rating: 4.7,
      instructor: 'Jason Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4'
    },
    {
      id: 8,
      title: 'Video 8 – Goal Setting / Business Plan',
      description: 'Create actionable goals and develop a comprehensive business plan for success.',
      duration: '1.5 hours',
      difficulty: 'Intermediate',
      rating: 4.9,
      instructor: 'Jason Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz'
    },
    {
      id: 9,
      title: 'Video 9 – What we do / (HTCW)',
      description: 'Understand our products, services, and how to communicate our value proposition.',
      duration: '1 hour',
      difficulty: 'Beginner',
      rating: 4.6,
      instructor: 'Nataly Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4'
    },
    {
      id: 10,
      title: 'Video 10 – How to Get Promoted',
      description: 'Learn the pathway to advancement and leadership opportunities within EIB Team.',
      duration: '45 minutes',
      difficulty: 'Advanced',
      rating: 4.8,
      instructor: 'Jason Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz'
    }
  ];

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          window.location.href = '/agent-login';
          return;
        }

        setCurrentUser(user);
        const progress = await DatabaseService.getTrainingProgress(user.id);
        setTrainingProgress(progress);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleCompletionToggle = async (trainingId: number, trainingTitle: string, isCompleted: boolean) => {
    if (!currentUser) return;

    try {
      await DatabaseService.updateTrainingProgress(currentUser.id, trainingId, {
        training_title: trainingTitle,
        completed: isCompleted,
        progress_percentage: isCompleted ? 100 : 0,
        completed_at: isCompleted ? new Date().toISOString() : null,
        last_accessed: new Date().toISOString()
      });

      // Refresh progress data
      const updatedProgress = await DatabaseService.getTrainingProgress(currentUser.id);
      setTrainingProgress(updatedProgress);
    } catch (error) {
      console.error('Error updating training progress:', error);
    }
  };

  const isTrainingCompleted = (trainingId: number) => {
    const progress = trainingProgress.find(p => p.training_id === trainingId);
    return progress?.completed || false;
  };

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || training.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const completedCount = trainingProgress.filter(t => t.completed).length || 0;
  const totalHours = trainings.reduce((acc, t) => {
    const duration = t.duration.includes('hour') ? 
      parseFloat(t.duration) : 
      parseFloat(t.duration) / 60;
    return acc + duration;
  }, 0).toFixed(2);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trainings...</p>
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
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Training Center</h1>
                <p className="mt-2 text-gray-600">Enhance your skills with our comprehensive training programs.</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-3xl font-bold text-green-600">{completedCount}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Remaining</p>
                      <p className="text-3xl font-bold text-yellow-600">{trainings.length - completedCount}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Hours</p>
                      <p className="text-3xl font-bold text-blue-600">{parseFloat(totalHours)}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Certificates</p>
                      <p className="text-3xl font-bold text-purple-600">{completedCount}</p>
                    </div>
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search trainings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  <div className="relative">
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors appearance-none bg-white pr-8"
                    >
                      <option value="all">All Levels</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                    <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Training Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTrainings.map((training) => {
                  const completed = isTrainingCompleted(training.id);
                  
                  return (
                    <div key={training.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src={training.thumbnail}
                          alt={training.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                          <button className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all">
                            <Play className="h-6 w-6 text-gray-900 ml-1" />
                          </button>
                        </div>
                        {completed && (
                          <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Completed
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">{training.title}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{training.rating}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4">{training.description}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span>{training.duration}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            training.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            training.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {training.difficulty}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-gray-500">By {training.instructor}</span>
                        </div>

                        <div className="flex items-center justify-center">
                          <a
                            href={`/training/${training.id}`}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
                          >
                            View More
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrainingsPage;