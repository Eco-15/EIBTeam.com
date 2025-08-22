import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { Play, ArrowLeft, Clock, Star, CheckCircle, User, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { DatabaseService } from '@/lib/database';

const TrainingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isCompleted, setIsCompleted] = useState(false);
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
      video: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOncjwWJYXABiZ5cudwgVeLkIK6oqazNlQhtEn2',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      objectives: [
        'Understand EIB Team\'s mission and values',
        'Understand EIB Agency\'s mission and values',
        'Learn about company history and culture',
        'Discover available support systems',
        'Set expectations for your journey'
      ],
      topics: [
        'Company Overview',
        'Mission & Values',
        'Support Systems',
        'Getting Started'
      ]
    },
    {
      id: 2,
      title: 'Video 2 – Builder\'s Mindset',
      description: 'Develop the entrepreneurial mindset needed to build a successful insurance business.',
      fullDescription: 'Building a successful insurance business requires more than just product knowledge - it requires an entrepreneurial mindset. This training will help you develop the mental framework needed to think like a business owner, take calculated risks, and build long-term success. You\'ll learn about goal setting, persistence, and the importance of continuous learning and adaptation.',
      duration: '20 minutes',
      difficulty: 'Beginner',
      rating: 4.9,
      instructor: 'Jason Graziani',
      video: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnwlRDPoMy1pgcSeV6YWjXk7P5qlCr3doJtfQF',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      objectives: [
        'Develop entrepreneurial thinking',
        'Learn goal-setting strategies',
        'Understand risk management',
        'Build persistence and resilience'
      ],
      topics: [
        'Entrepreneurial Mindset',
        'Goal Setting',
        'Risk Assessment',
        'Building Resilience'
      ]
    },
    {
      id: 3,
      title: 'Video 3 – Mental Toughness',
      description: 'Build resilience and mental strength to overcome challenges in the insurance industry.',
      fullDescription: 'The insurance industry can be challenging, and success requires mental toughness and resilience. This training focuses on building the psychological tools you need to handle rejection, overcome obstacles, and maintain motivation during difficult times. You\'ll learn stress management techniques, how to reframe negative experiences, and strategies for maintaining a positive outlook.',
      duration: '40 minutes',
      difficulty: 'Beginner',
      rating: 4.7,
      video: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnrlMhqsg9IxL6na5HN8Cmj2VAkDRBdih9JyY4',
      instructor: 'Jason Graziani',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      objectives: [
        'Build mental resilience',
        'Learn stress management',
        'Handle rejection effectively',
        'Maintain positive mindset'
      ],
      topics: [
        'Mental Toughness',
        'Stress Management',
        'Handling Rejection',
        'Positive Psychology'
      ]
    },
    {
      id: 4,
      title: 'Video 4 – 6 Steps (PCA/Schedule)',
      description: 'Master the 6-step process for client acquisition and appointment scheduling.',
      fullDescription: 'Client acquisition is the lifeblood of any successful insurance business. This training breaks down our proven 6-step process for finding, qualifying, and scheduling appointments with potential clients. You\'ll learn prospecting techniques, how to make effective initial contact, qualification questions, and strategies for converting prospects into scheduled appointments.',
      duration: '1 hour',
      difficulty: 'Intermediate',
      rating: 4.6,
      instructor: 'Nataly Graziani',
     video: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnKzAH3dacAFKG9eElgqCBYdjR8u1wULtHy6cQ',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      objectives: [
        'Master the 6-step acquisition process',
        'Learn prospecting techniques',
        'Develop qualification skills',
        'Improve appointment conversion rates'
      ],
      topics: [
        'Prospecting Methods',
        'Initial Contact',
        'Qualification Process',
        'Appointment Setting'
      ]
    },
    {
      id: 5,
      title: 'Video 5 – RI',
      description: 'Learn the referral interview process to expand your client base through warm referrals.',
      fullDescription: 'Referrals are one of the most effective ways to grow your business. This training teaches you how to conduct referral interviews that naturally lead to warm introductions to new prospects. You\'ll learn when and how to ask for referrals, how to make the process comfortable for your clients, and strategies for following up on referral opportunities.',
      duration: '50 minutes',
      difficulty: 'Intermediate',
      rating: 4.5,
      instructor: 'Jason Graziani',
      video: '',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      objectives: [
        'Master referral interview techniques',
        'Learn timing for referral requests',
        'Develop comfort with asking',
        'Create referral systems'
      ],
      topics: [
        'Referral Psychology',
        'Interview Techniques',
        'Timing Strategies',
        'Follow-up Systems'
      ]
    },
    {
      id: 6,
      title: 'Video 6 – KTP',
      description: 'Understand your clients deeply to provide personalized financial solutions.',
      fullDescription: 'Every client is unique, with different needs, goals, and financial situations. This training teaches you how to truly understand your clients through active listening, asking the right questions, and identifying both spoken and unspoken needs. You\'ll learn how to build rapport, gather comprehensive information, and use that understanding to provide truly personalized solutions.',
      duration: '45 minutes',
      difficulty: 'Intermediate',
      rating: 4.8,
      instructor: 'Nataly Graziani',
      video: '',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      objectives: [
        'Develop active listening skills',
        'Learn effective questioning techniques',
        'Identify client needs and goals',
        'Build stronger client relationships'
      ],
      topics: [
        'Active Listening',
        'Questioning Techniques',
        'Needs Analysis',
        'Relationship Building'
      ]
    },
    {
      id: 7,
      title: 'Video 7 – FS',
      description: 'Conduct comprehensive financial surveys to identify client needs and opportunities.',
      fullDescription: 'A thorough financial survey is the foundation of excellent client service. This training covers how to conduct comprehensive financial surveys that uncover all aspects of your client\'s financial situation. You\'ll learn what questions to ask, how to organize the information, and how to identify opportunities for additional products and services.',
      duration: '1 hour',
      difficulty: 'Intermediate',
      rating: 4.7,
      instructor: 'Jason Graziani',
      video: '',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      objectives: [
        'Master financial survey techniques',
        'Learn comprehensive questioning',
        'Identify cross-selling opportunities',
        'Organize client information effectively'
      ],
      topics: [
        'Survey Structure',
        'Financial Analysis',
        'Opportunity Identification',
        'Data Organization'
      ]
    },
    {
      id: 8,
      title: 'Video 8 – Goal Setting / Business Plan',
      description: 'Create actionable goals and develop a comprehensive business plan for success.',
      fullDescription: 'Success in the insurance industry requires clear goals and a solid business plan. This comprehensive training will guide you through creating SMART goals, developing action plans, and building a business plan that will drive your success. You\'ll learn about different types of goals, how to break them down into actionable steps, and how to track your progress.',
      duration: '1.5 hours',
      difficulty: 'Intermediate',
      rating: 4.9,
      instructor: 'Jason Graziani',
     video: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnPNglm3EAdscr0bGLESYikhm9wWV6MUX84gjF',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      objectives: [
        'Create SMART goals',
        'Develop action plans',
        'Build comprehensive business plan',
        'Learn progress tracking methods'
      ],
      topics: [
        'Goal Setting Framework',
        'Action Planning',
        'Business Plan Development',
        'Progress Tracking'
      ]
    },
    {
      id: 9,
      title: 'Video 9 – What we do / (HTCW)',
      description: 'Understand our products, services, and how to communicate our value proposition.',
      fullDescription: 'To be successful, you need to thoroughly understand all the products and services we offer. This training provides a comprehensive overview of our product portfolio, including life insurance, annuities, and other financial products. You\'ll learn the features and benefits of each product, who they\'re best suited for, and how to communicate our value proposition effectively.',
      duration: '1 hour',
      difficulty: 'Beginner',
      rating: 4.6,
      instructor: 'Nataly Graziani',
      video: '',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      objectives: [
        'Learn all product offerings',
        'Understand features and benefits',
        'Identify target markets',
        'Communicate value effectively'
      ],
      topics: [
        'Product Portfolio',
        'Features & Benefits',
        'Target Markets',
        'Value Proposition'
      ]
    },
    {
      id: 10,
      title: 'Video 10 – How to Get Promoted',
      description: 'Learn the pathway to advancement and leadership opportunities within EIB Team.',
      fullDescription: 'EIB Agency offers numerous opportunities for career advancement and leadership development. This training outlines the various career paths available, from senior agent roles to management and leadership positions. You\'ll learn about the requirements for advancement, the skills needed for leadership, and how to position yourself for growth within the organization.',
      duration: '45 minutes',
      difficulty: 'Advanced',
      rating: 4.8,
      instructor: 'Jason Graziani',
      video: '',
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      objectives: [
        'Understand career pathways',
        'Learn advancement requirements',
        'Develop leadership skills',
        'Plan career progression'
      ],
      topics: [
        'Career Pathways',
        'Advancement Criteria',
        'Leadership Development',
        'Career Planning'
      ]
    }
  ];

  const training = trainings.find(t => t.id === parseInt(id || '0'));

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/agent-login');
          return;
        }

        setCurrentUser(user);
        
        if (training) {
          const progress = await DatabaseService.getTrainingProgress(user.id);
          const trainingProgress = progress.find(p => p.training_id === training.id);
          setIsCompleted(trainingProgress?.completed || false);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [id, training, navigate]);

  const handleCompletionToggle = async (isCompleted: boolean) => {
    if (!currentUser || !training) return;

    try {
      await DatabaseService.updateTrainingProgress(currentUser.id, training.id, {
        training_title: training.title,
        completed: isCompleted,
        progress_percentage: isCompleted ? 100 : 0,
        completed_at: isCompleted ? new Date().toISOString() : null,
        last_accessed: new Date().toISOString()
      });

      setIsCompleted(isCompleted);
    } catch (error) {
      console.error('Error updating training progress:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading training...</p>
        </div>
      </div>
    );
  }

  if (!training) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Training Not Found</h1>
          <p className="text-gray-600 mb-4">The training you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/trainings')}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors"
          >
            Back to Trainings
          </button>
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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Back Button */}
              <button
                onClick={() => navigate('/trainings')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Trainings</span>
              </button>

              {/* Training Header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                <div className="relative">
                  {training.video ? (
                    <div className="relative">
                      <video
                        controls
                        className="w-full h-64 object-cover"
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
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <button className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all">
                          <Play className="h-8 w-8 text-gray-900 ml-1" />
                        </button>
                      </div>
                    </>
                  )}
                  {isCompleted && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4" />
                      <span>Completed</span>
                    </div>
                  )}
                </div>
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{training.title}</h1>
                      <p className="text-lg text-gray-600 mb-4">{training.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{training.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{training.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{training.instructor}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          training.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          training.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {training.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Completion Toggle */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-medium text-gray-900">Mark as completed:</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleCompletionToggle(true)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            isCompleted
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-green-200'
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => handleCompletionToggle(false)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            !isCompleted
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-red-200'
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Training Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Description */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Training</h2>
                    <p className="text-gray-600 leading-relaxed">{training.fullDescription}</p>
                  </div>

                  {/* Learning Objectives */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Learning Objectives</h2>
                    <ul className="space-y-3">
                      {training.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Training Info */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium text-gray-900">{training.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Difficulty:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          training.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          training.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {training.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-900">{training.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Instructor:</span>
                        <span className="font-medium text-gray-900">{training.instructor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Topics Covered */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Topics Covered</h3>
                    <ul className="space-y-2">
                      {training.topics.map((topic, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-600">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-center">
                    <h3 className="text-lg font-bold text-black mb-2">Ready to Start?</h3>
                    <p className="text-black mb-4 text-sm">Begin this training and advance your career with EIB Agency.</p>
                    <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors w-full">
                      Start Training
                    </button>
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

export default TrainingDetailPage;