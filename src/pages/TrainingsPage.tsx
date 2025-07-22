import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { BookOpen, Play, CheckCircle, Clock, Star, Award, Filter, Search } from 'lucide-react';

const TrainingsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');


  const trainings = [
    {
      id: 1,
      title: '1. Welcome',
      description: 'Introduction to EIB Team, our mission, values, and what to expect in your journey with us.',
      duration: '30 minutes',
      difficulty: 'Beginner',
      progress: 100,
      completed: true,
      rating: 4.8,
      instructor: 'Jason Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4'
    },
    {
      id: 2,
      title: '2. Builder\'s Mindset',
      description: 'Develop the entrepreneurial mindset needed to build a successful insurance business.',
      duration: '45 minutes',
      difficulty: 'Beginner',
      progress: 65,
      completed: false,
      rating: 4.9,
      instructor: 'Jason Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz'
    },
    {
      id: 3,
      title: '3. Mental Toughness',
      description: 'Build resilience and mental strength to overcome challenges in the insurance industry.',
      duration: '40 minutes',
      difficulty: 'Beginner',
      progress: 0,
      completed: false,
      rating: 4.7,
      instructor: 'Jason Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4'
    },
    {
      id: 4,
      title: '4. 6 Steps (PCA/Schedule)',
      description: 'Master the 6-step process for client acquisition and appointment scheduling.',
      duration: '1 hour',
      difficulty: 'Intermediate',
      progress: 30,
      completed: false,
      rating: 4.6,
      instructor: 'Nataly Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz'
    },
    {
      id: 5,
      title: '5. RI (Referral Interview)',
      description: 'Learn the referral interview process to expand your client base through warm referrals.',
      duration: '50 minutes',
      difficulty: 'Intermediate',
      progress: 0,
      completed: false,
      rating: 4.5,
      instructor: 'Jason Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4'
    },
    {
      id: 6,
      title: '6. KTP (Know the Person)',
      description: 'Understand your clients deeply to provide personalized financial solutions.',
      duration: '45 minutes',
      difficulty: 'Intermediate',
      progress: 0,
      completed: false,
      rating: 4.8,
      instructor: 'Nataly Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz'
     },
     {
       id: 7,
       title: '7. FS (Financial Survey)',
       description: 'Conduct comprehensive financial surveys to identify client needs and opportunities.',
       duration: '1 hour',
       difficulty: 'Intermediate',
       progress: 0,
       completed: false,
       rating: 4.7,
       instructor: 'Jason Graziani',
       thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4'
     },
     {
       id: 8,
       title: '8. Goal Setting / Business Plan',
       description: 'Create actionable goals and develop a comprehensive business plan for success.',
       duration: '1.5 hours',
       difficulty: 'Intermediate',
       progress: 0,
       completed: false,
       rating: 4.9,
       instructor: 'Jason Graziani',
       thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz'
     },
     {
       id: 9,
       title: '9. What We Do / (HTCW)',
       description: 'Understand our products, services, and how to communicate our value proposition.',
       duration: '1 hour',
       difficulty: 'Beginner',
       progress: 0,
       completed: false,
       rating: 4.6,
       instructor: 'Nataly Graziani',
       thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4'
     },
     {
       id: 10,
       title: '10. How to Get Promoted',
       description: 'Learn the pathway to advancement and leadership opportunities within EIB Team.',
       duration: '45 minutes',
       difficulty: 'Advanced',
       progress: 0,
       completed: false,
       rating: 4.8,
       instructor: 'Jason Graziani',
       thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz'
    }
  ];

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const completedCount = trainings.filter(t => t.completed).length;
  const inProgressCount = trainings.filter(t => t.progress > 0 && !t.completed).length;
  const totalHours = trainings.reduce((acc, t) => {
    const duration = t.duration.includes('hour') ? 
      parseFloat(t.duration) : 
      parseFloat(t.duration) / 60;
    return acc + duration;
  }, 0);

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
                      <p className="text-sm font-medium text-gray-600">In Progress</p>
                      <p className="text-3xl font-bold text-yellow-600">{inProgressCount}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Hours</p>
                      <p className="text-3xl font-bold text-blue-600">{totalHours}</p>
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
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="h-5 w-5 text-gray-400" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              {/* Training Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTrainings.map((training) => (
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
                      {training.completed && (
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
                      
                      {training.progress > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{training.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${training.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">By {training.instructor}</span>
                        <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          training.completed
                            ? 'bg-green-100 text-green-800'
                            : training.progress > 0
                            ? 'bg-yellow-500 text-black hover:bg-yellow-600'
                            : 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-600 hover:to-yellow-700'
                        }`}>
                          {training.completed ? 'Review' : training.progress > 0 ? 'Continue' : 'Start'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrainingsPage;