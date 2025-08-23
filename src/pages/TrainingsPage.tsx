import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { BookOpen, Play, CheckCircle, Clock, Star, Award, Search, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { DatabaseService } from '@/lib/database';

const TrainingsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [trainingProgress, setTrainingProgress] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Recruiting and Building Section
  const recruitingAndBuildingTrainings = [
    {
      id: 1,
      title: 'Video 1 - Welcome To EIB',
      description: 'Introduction to EIB Team, our mission, values, and what to expect in your journey with us.',
      duration: '30 minutes',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // Video link to be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlmOrmln8EfQTV7ApbyFLmjY5GCZhaPcN4nzo',
      section: 'recruiting'
    },
    {
      id: 2,
      title: 'Video 2 – Builder\'s Mindset',
      description: 'Develop the entrepreneurial mindset needed to build a successful insurance business.',
      duration: '20 minutes',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // Video link to be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWA9m6kwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      section: 'recruiting'
    },
    {
      id: 3,
      title: 'Video 3 – Mental Toughness',
      description: 'Build resilience and mental strength to overcome challenges in the insurance industry.',
      duration: '15 minutes',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // Video link to be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWyr2rmwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      section: 'recruiting'
    },
    {
      id: 4,
      title: 'Video 4 – 6 Steps (PCA/Schedule)',
      description: 'Master the 6-step process for client acquisition and appointment scheduling.',
      duration: '30 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // Video link to be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      section: 'recruiting'
    },
    {
      id: 5,
      title: 'Video 5 – Goal Setting / Business Plan',
      description: 'Create actionable goals and develop a comprehensive business plan for success.',
      duration: '1.5 hours',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // Video link to be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnd7spMIl7cmdASPKDVwuU18xgjXi5O4RQaH2I',
      section: 'recruiting'
    },
    {
      id: 6,
      title: 'Video 6 – How to Get Promoted',
      description: 'Learn the pathway to advancement and leadership opportunities within EIB Team.',
      duration: '45 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // Video link to be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      section: 'recruiting'
    }
  ];

  // Service and Sales Section
  const serviceAndSalesTrainings = [
    {
      id: 7,
      title: 'Video 7 – RI (Referral Interview)',
      description: 'Learn the referral interview process to expand your client base through warm referrals.',
      duration: '50 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // Video link to be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ',
      section: 'service'
    },
    {
      id: 8,
      title: 'Video 8 – KTP (Know The Person)',
      description: 'Understand your clients deeply to provide personalized financial solutions.',
      duration: '45 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // Video link to be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ',
      section: 'service'
    },
    {
      id: 9,
      title: 'Video 9 – FS (Financial Survey)',
      description: 'Conduct comprehensive financial surveys to identify client needs and opportunities.',
      duration: '1 hour',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // Video link to be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ',
      section: 'service'
    }
  ];

  // Coming Soon Section
  const comingSoonTrainings = [
    {
      id: 10,
      title: 'Video 10 – What we do / (HTCW)',
      description: 'Understand our products, services, and how to communicate our value proposition.',
      duration: '1 hour',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // Video link to be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ',
      section: 'coming-soon',
      comingSoon: true
    }
  ];

  const sections = [
    { id: 'all', name: 'All Trainings', count: 0 },
    { id: 'recruiting', name: 'Recruiting and Building', count: recruitingAndBuildingTrainings.length },
    { id: 'service', name: 'Service and Sales', count: serviceAndSalesTrainings.length },
    { id: 'coming-soon', name: 'Coming Soon', count: comingSoonTrainings.length }
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

  const getAllTrainings = () => {
    return [...recruitingAndBuildingTrainings, ...serviceAndSalesTrainings, ...comingSoonTrainings];
  };

  const getFilteredTrainings = () => {
    let trainings = [];
    
    switch (selectedSection) {
      case 'recruiting':
        trainings = recruitingAndBuildingTrainings;
        break;
      case 'service':
        trainings = serviceAndSalesTrainings;
        break;
      case 'coming-soon':
        trainings = comingSoonTrainings;
        break;
      default:
        trainings = getAllTrainings();
    }

    return trainings.filter(training => {
      const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           training.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  };

  const completedCount = trainingProgress.filter(t => t.completed).length || 0;
  const totalTrainings = getAllTrainings().length;
  const totalHours = getAllTrainings().reduce((acc, t) => {
    const duration = t.duration.includes('hour') ? 
      parseFloat(t.duration) : 
      parseFloat(t.duration) / 60;
    return acc + duration;
  }, 0).toFixed(1);

  // Update sections with dynamic counts
  const updatedSections = sections.map(section => {
    let count = 0;
    switch (section.id) {
      case 'all':
        count = totalTrainings;
        break;
      case 'recruiting':
        count = recruitingAndBuildingTrainings.length;
        break;
      case 'service':
        count = serviceAndSalesTrainings.length;
        break;
      case 'coming-soon':
        count = comingSoonTrainings.length;
        break;
    }
    return { ...section, count };
  });

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

  const renderTrainingCard = (training: any) => {
    const completed = isTrainingCompleted(training.id);
    const isComingSoon = training.comingSoon;
    
    return (
      <div key={training.id} className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${isComingSoon ? 'opacity-75' : ''}`}>
        <div className="relative">
          {training.video && !isComingSoon ? (
            <div className="relative">
              <video
                controls
                className="w-full h-48 object-cover"
                poster={training.thumbnail}
              >
                <source src={training.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <>
              <img
                src={training.thumbnail}
                alt={training.title}
                className={`w-full h-48 object-cover ${isComingSoon ? 'grayscale' : ''}`}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
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
            </>
          )}
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
            <div className="flex items-center space-x-1">
              <Star className={`h-4 w-4 ${isComingSoon ? 'text-gray-400' : 'text-yellow-400 fill-current'}`} />
              <span className={`text-sm ${isComingSoon ? 'text-gray-400' : 'text-gray-600'}`}>
                {training.rating}
              </span>
            </div>
          </div>
          
          <p className={`text-sm mb-4 ${isComingSoon ? 'text-gray-500' : 'text-gray-600'}`}>
            {training.description}
          </p>
          
          <div className="flex items-center justify-between text-sm mb-4">
            <span className={isComingSoon ? 'text-gray-400' : 'text-gray-500'}>
              {training.duration}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              isComingSoon ? 'bg-gray-100 text-gray-500' :
              training.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
              training.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {training.difficulty}
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <span className={`text-sm ${isComingSoon ? 'text-gray-400' : 'text-gray-500'}`}>
              By {training.instructor}
            </span>
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
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors text-sm"
              >
                View Training
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

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
                      <p className="text-sm font-medium text-gray-600">Total Trainings</p>
                      <p className="text-3xl font-bold text-blue-600">{totalTrainings}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Hours</p>
                      <p className="text-3xl font-bold text-purple-600">{totalHours}</p>
                    </div>
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Certificates</p>
                      <p className="text-3xl font-bold text-yellow-600">{completedCount}</p>
                    </div>
                    <Award className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Sections</h3>
                    <div className="space-y-2">
                      {updatedSections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => setSelectedSection(section.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedSection === section.id
                              ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{section.name}</span>
                            <span className={`text-sm ${
                              selectedSection === section.id ? 'text-black' : 'text-gray-400'
                            }`}>
                              {section.count}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
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
                    </div>
                  </div>

                  {/* Recruiting and Building Section */}
                  {(selectedSection === 'all' || selectedSection === 'recruiting') && (
                    <div className="mb-12">
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Recruiting and Building</h2>
                        <p className="text-gray-600">Foundation training for building your insurance business and developing leadership skills.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recruitingAndBuildingTrainings
                          .filter(training => 
                            training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            training.description.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map(renderTrainingCard)}
                      </div>
                    </div>
                  )}

                  {/* Service and Sales Section */}
                  {(selectedSection === 'all' || selectedSection === 'service') && (
                    <div className="mb-12">
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Service and Sales</h2>
                        <p className="text-gray-600">Advanced training focused on client service, sales techniques, and relationship building.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {serviceAndSalesTrainings
                          .filter(training => 
                            training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            training.description.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map(renderTrainingCard)}
                      </div>
                    </div>
                  )}

                  {/* Coming Soon Section */}
                  {(selectedSection === 'all' || selectedSection === 'coming-soon') && (
                    <div className="mb-12">
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
                        <p className="text-gray-600">Additional training modules currently in development.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {comingSoonTrainings
                          .filter(training => 
                            training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            training.description.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map(renderTrainingCard)}
                      </div>
                    </div>
                  )}

                  {/* No Results */}
                  {getFilteredTrainings().length === 0 && (
                    <div className="text-center py-12">
                      <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No trainings found</h3>
                      <p className="text-gray-600">Try adjusting your search terms or section filter.</p>
                    </div>
                  )}
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