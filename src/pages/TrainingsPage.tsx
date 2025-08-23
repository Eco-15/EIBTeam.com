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

  // Recruiting and Building Section
  const recruitingAndBuildingTrainings = [
    {
      id: 1,
      title: 'Welcome',
      description: 'Introduction to EIB Team, our mission, values, and what to expect in your journey with us.',
      duration: '30 minutes',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlmOrmln8EfQTV7ApbyFLmjY5GCZhaPcN4nzo'
    },
    {
      id: 2,
      title: 'Builders Mindset',
      description: 'Develop the entrepreneurial mindset needed to build a successful insurance business.',
      duration: '20 minutes',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWA9m6kwDoEgx6u7dLy8etIN1pvK3aPWcf5AR'
    },
    {
      id: 3,
      title: '8 Expectations',
      description: 'Learn the 8 key expectations for success in the insurance industry.',
      duration: '25 minutes',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWyr2rmwDoEgx6u7dLy8etIN1pvK3aPWcf5AR'
    },
    {
      id: 4,
      title: 'Goal Settings',
      description: 'Create actionable goals and develop a comprehensive business plan for success.',
      duration: '1.5 hours',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnd7spMIl7cmdASPKDVwuU18xgjXi5O4RQaH2I'
    },
    {
      id: 5,
      title: '6 Steps of our Business',
      description: 'Master the 6-step process for client acquisition and appointment scheduling.',
      duration: '30 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz'
    },
    {
      id: 6,
      title: 'How a Part Timer',
      description: 'Learn how to succeed as a part-time agent and maximize your earning potential.',
      duration: '35 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4'
    },
    {
      id: 7,
      title: 'Captain System',
      description: 'Understand the captain system and how to lead and manage your team effectively.',
      duration: '40 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlmOrmln8EfQTV7ApbyFLmjY5GCZhaPcN4nzo'
    },
    {
      id: 8,
      title: 'EXCHANGE PRince',
      description: 'Master the exchange process and become a prince of exchanges.',
      duration: '30 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWA9m6kwDoEgx6u7dLy8etIN1pvK3aPWcf5AR'
    },
    {
      id: 9,
      title: 'Being A LEADER ...',
      description: 'Develop leadership skills and learn how to inspire and motivate your team.',
      duration: '45 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWyr2rmwDoEgx6u7dLy8etIN1pvK3aPWcf5AR'
    },
    {
      id: 10,
      title: 'HOW TO HIT MD',
      description: 'Learn the strategies and techniques to achieve Managing Director status.',
      duration: '50 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnd7spMIl7cmdASPKDVwuU18xgjXi5O4RQaH2I'
    },
    {
      id: 11,
      title: 'HOW TO SPEAK FROM stage',
      description: 'Master public speaking and presentation skills for leadership and training.',
      duration: '40 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz'
    },
    {
      id: 12,
      title: 'HANDLING OFPICE DRAMA',
      description: 'Learn how to handle office politics and maintain a positive work environment.',
      duration: '30 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4'
    },
    {
      id: 13,
      title: 'MONEY',
      description: 'Understand money management, compensation structures, and financial planning.',
      duration: '35 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlmOrmln8EfQTV7ApbyFLmjY5GCZhaPcN4nzo'
    }
  ];

  // Service and Sales Section
  const serviceAndSalesTrainings = [
    {
      id: 14,
      title: 'TYPES OF LIFE INSURANCE',
      description: 'Comprehensive overview of all life insurance products and their applications.',
      duration: '45 minutes',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWA9m6kwDoEgx6u7dLy8etIN1pvK3aPWcf5AR'
    },
    {
      id: 15,
      title: 'Final Expense',
      description: 'Learn about final expense insurance and how to serve this important market.',
      duration: '30 minutes',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWyr2rmwDoEgx6u7dLy8etIN1pvK3aPWcf5AR'
    },
    {
      id: 16,
      title: 'LIVING BENEFITS',
      description: 'Understand living benefits and how they add value to life insurance policies.',
      duration: '25 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnd7spMIl7cmdASPKDVwuU18xgjXi5O4RQaH2I'
    },
    {
      id: 17,
      title: 'ANNUITIES',
      description: 'Master annuity products and retirement planning strategies.',
      duration: '50 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz'
    },
    {
      id: 18,
      title: 'TAX Circles',
      description: 'Learn about tax implications and strategies for insurance and financial products.',
      duration: '40 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4'
    },
    {
      id: 19,
      title: 'Tax Free Access',
      description: 'Understand tax-free access strategies for life insurance and retirement planning.',
      duration: '35 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlmOrmln8EfQTV7ApbyFLmjY5GCZhaPcN4nzo'
    },
    {
      id: 20,
      title: '7 SMART STATEMENTS',
      description: 'Master the 7 smart statements for effective client communication.',
      duration: '30 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWA9m6kwDoEgx6u7dLy8etIN1pvK3aPWcf5AR'
    },
    {
      id: 21,
      title: 'CLIENT QUESTIONS',
      description: 'Learn how to handle common client questions and objections effectively.',
      duration: '40 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWyr2rmwDoEgx6u7dLy8etIN1pvK3aPWcf5AR'
    },
    {
      id: 22,
      title: 'X-CURVE',
      description: 'Understand the X-Curve methodology for client presentations and sales.',
      duration: '45 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnd7spMIl7cmdASPKDVwuU18xgjXi5O4RQaH2I'
    },
    {
      id: 23,
      title: 'OFFENSE/ DEFENSE',
      description: 'Learn offensive and defensive strategies for sales and client retention.',
      duration: '35 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz'
    },
    {
      id: 24,
      title: 'Financial GOAL Setting',
      description: 'Help clients set and achieve their financial goals through proper planning.',
      duration: '40 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4'
    },
    {
      id: 25,
      title: 'How TO EARN $100k',
      description: 'Strategies and techniques to reach the $100,000 annual income milestone.',
      duration: '50 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlmOrmln8EfQTV7ApbyFLmjY5GCZhaPcN4nzo'
    },
    {
      id: 26,
      title: 'How TO BE A strong, CFT',
      description: 'Learn how to become a strong and effective CFT (Certified Financial Trainer).',
      duration: '45 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWA9m6kwDoEgx6u7dLy8etIN1pvK3aPWcf5AR'
    },
    {
      id: 27,
      title: 'BEST ANSWERS For Closers',
      description: 'Master the best responses and closing techniques for successful sales.',
      duration: '40 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWyr2rmwDoEgx6u7dLy8etIN1pvK3aPWcf5AR'
    }
  ];

  // Coming Soon Section
  const comingSoonTrainings = [
    {
      id: 101,
      title: 'RI (Coming Soon)',
      description: 'Learn the referral interview process to expand your client base through warm referrals.',
      duration: '50 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ',
      comingSoon: true
    },
    {
      id: 102,
      title: 'KTP 1 (Coming Soon)',
      description: 'Know The Person - Part 1: Understanding your clients deeply to provide personalized solutions.',
      duration: '45 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ',
      comingSoon: true
    },
    {
      id: 103,
      title: 'KTP 2 (Coming Soon)',
      description: 'Know The Person - Part 2: Advanced client relationship building and needs analysis.',
      duration: '45 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ',
      comingSoon: true
    },
    {
      id: 104,
      title: 'FS (Coming Soon)',
      description: 'Conduct comprehensive financial surveys to identify client needs and opportunities.',
      duration: '1 hour',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ',
      comingSoon: true
    },
    {
      id: 105,
      title: 'What We Do (Coming Soon)',
      description: 'Understand our products, services, and how to communicate our value proposition.',
      duration: '1 hour',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ',
      comingSoon: true
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

  // Filter function for search and difficulty
  const filterTrainings = (trainings: any[]) => {
    return trainings.filter(training => {
      const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           training.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'all' || training.difficulty === selectedDifficulty;
      return matchesSearch && matchesDifficulty;
    });
  };

  const filteredRecruitingTrainings = filterTrainings(recruitingAndBuildingTrainings);
  const filteredServiceTrainings = filterTrainings(serviceAndSalesTrainings);
  const filteredComingSoonTrainings = filterTrainings(comingSoonTrainings);

  const completedCount = trainingProgress.filter(t => t.completed).length || 0;
  const totalTrainings = recruitingAndBuildingTrainings.length + serviceAndSalesTrainings.length + comingSoonTrainings.length;
  const totalHours = [...recruitingAndBuildingTrainings, ...serviceAndSalesTrainings, ...comingSoonTrainings].reduce((acc, t) => {
    const duration = t.duration.includes('hour') ? 
      parseFloat(t.duration) : 
      parseFloat(t.duration) / 60;
    return acc + duration;
  }, 0).toFixed(2);

  const renderTrainingCard = (training: any, isComingSoon = false) => {
    const completed = isTrainingCompleted(training.id);
    
    return (
      <div key={training.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <img
            src={training.thumbnail}
            alt={training.title}
            className={`w-full h-48 object-cover ${isComingSoon ? 'grayscale' : ''}`}
          />
          <div className={`absolute inset-0 ${isComingSoon ? 'bg-black bg-opacity-60' : 'bg-black bg-opacity-40'} flex items-center justify-center`}>
            {isComingSoon ? (
              <div className="text-center">
                <Clock className="h-8 w-8 text-white mx-auto mb-2" />
                <span className="text-white font-medium">Coming Soon</span>
              </div>
            ) : (
              <button className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all">
                <Play className="h-6 w-6 text-gray-900 ml-1" />
              </button>
            )}
          </div>
          {completed && !isComingSoon && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Completed
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className={`text-lg font-semibold ${isComingSoon ? 'text-gray-700' : 'text-gray-900'}`}>
              {training.title}
            </h3>
          </div>
          
          <p className={`text-sm mb-4 ${isComingSoon ? 'text-gray-500' : 'text-gray-600'}`}>
            {training.description}
          </p>
          
          <div className={`flex items-center justify-between text-sm mb-4 ${isComingSoon ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className={`px-2 py-1 rounded-full text-xs ${
              isComingSoon ? 'bg-gray-100 text-gray-500' :
              training.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
              training.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {training.difficulty}
            </span>
          </div>
          
          <div className={`flex items-center justify-between mb-4 ${isComingSoon ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className="text-sm">By {training.instructor}</span>
          </div>

          <div className="flex items-center justify-center">
            {isComingSoon ? (
              <button
                disabled
                className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg font-medium text-sm cursor-not-allowed"
              >
                Coming Soon
              </button>
            ) : (
              <a
                href={`/training/${training.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
              >
                View More
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

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
                      <p className="text-3xl font-bold text-yellow-600">{totalTrainings - completedCount}</p>
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

              {/* Recruiting and Building Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recruiting and Building</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredRecruitingTrainings.map((training) => renderTrainingCard(training))}
                </div>
              </div>

              {/* Service and Sales Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Service and Sales</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredServiceTrainings.map((training) => renderTrainingCard(training))}
                </div>
              </div>

              {/* Coming Soon Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Trainings Coming Soon</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredComingSoonTrainings.map((training) => renderTrainingCard(training, true))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrainingsPage;