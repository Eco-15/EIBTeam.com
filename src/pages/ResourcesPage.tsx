import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { FileText, ExternalLink, Search, Filter, Users, BookOpen, Shield, Building, MessageSquare, MapPin, HelpCircle, User, TrendingUp } from 'lucide-react';

const ResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [completedResources, setCompletedResources] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          window.location.href = '/agent-login';
          return;
        }
        setCurrentUser(user);
        
        // Load completed resources from localStorage for now
        const saved = localStorage.getItem(`completed_resources_${user.id}`);
        if (saved) {
          setCompletedResources(new Set(JSON.parse(saved)));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const categories = [
    { id: 'all', name: 'All Resources', count: 0 },
    { id: 'licensing', name: 'Licensing', count: 0 },
    { id: 'training', name: 'Training', count: 0 },
    { id: 'tools', name: 'Tools & Systems', count: 0 },
    { id: 'support', name: 'Support', count: 0 },
  ];

  const resources = [
    {
      id: 1,
      title: 'State Specific Licensing Sheet',
      category: 'licensing',
      type: 'Document',
      icon: () => <img src="https://via.placeholder.com/24x24/6B7280/FFFFFF?text=📄" alt="Document" className="h-6 w-6" />,
      link: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfMylrxaWwS0j4D1ydoNBhk8RHX5asGlYQ39i',
      featured: true
    },
    {
      id: 2,
      title: 'ExamFX Study Material',
      description: 'Sign up for comprehensive study materials to prepare for your insurance licensing exam.',
      category: 'licensing',
      type: 'External Link',
      icon: () => <img src="https://via.placeholder.com/24x24/6B7280/FFFFFF?text=📚" alt="Study" className="h-6 w-6" />,
      link: 'https://www.examfx.com',
      featured: true
    },
    {
      id: 3,
      title: 'Booking License Exam',
      description: 'Schedule your insurance licensing exam through Pearson VUE testing centers.',
      category: 'licensing',
      type: 'External Link',
      icon: () => <img src="https://via.placeholder.com/24x24/6B7280/FFFFFF?text=📝" alt="Exam" className="h-6 w-6" />,
      link: 'https://www.pearsonvue.com',
      featured: true
    },
    {
      id: 4,
      title: 'Applying for State License',
      description: 'Complete your state license application through the SIRCON system.',
      category: 'licensing',
      type: 'External Link',
      icon: () => <img src="https://via.placeholder.com/24x24/6B7280/FFFFFF?text=🛡️" alt="License" className="h-6 w-6" />,
      link: 'https://www.sircon.com',
      featured: false
    },
    {
      id: 5,
      title: 'PHP RegEd',
      description: 'Sign up for continuing education courses required to maintain your license.',
      category: 'licensing',
      type: 'External Link',
      icon: () => <img src="https://via.placeholder.com/24x24/6B7280/FFFFFF?text=EDU" alt="Education" className="h-6 w-6" />,
      link: 'https://reged.com/phpagency',
      featured: false
    },
    {
      id: 6,
      title: 'Start Contracting',
      description: 'Step-by-step guide on filling out contracting paperwork with insurance carriers.',
      category: 'licensing',
      type: 'Guide',
      icon: () => <img src="https://via.placeholder.com/24x24/6B7280/FFFFFF?text=GUIDE" alt="Guide" className="h-6 w-6" />,
      link: '#',
      featured: false
    },
    {
      id: 7,
      title: 'Annuity Training',
      description: 'Access annuity PSTs (Product Specific Training) resources and certification materials.',
      category: 'training',
      type: 'Training',
      icon: () => <img src="https://via.placeholder.com/24x24/6B7280/FFFFFF?text=TRAIN" alt="Training" className="h-6 w-6" />,
      link: '#',
      featured: true
    },
    {
      id: 8,
      title: 'GroupMe',
      description: 'Join our team communication platform for instant messaging and updates.',
      category: 'support',
      type: 'Communication',
      icon: () => <img src="https://via.placeholder.com/24x24/6B7280/FFFFFF?text=MSG" alt="Message" className="h-6 w-6" />,
      link: 'https://groupme.com/join_group/59856202/7Hc1ACOc',
      featured: false
    },
    {
      id: 9,
      title: 'Field Underwriting',
      description: 'Guidelines and best practices for field underwriting and case preparation.',
      category: 'training',
      type: 'Guide',
      icon: () => <img src="https://via.placeholder.com/24x24/6B7280/FFFFFF?text=UW" alt="Underwriting" className="h-6 w-6" />,
      link: '#',
      featured: false
    },
    {
      id: 10,
      title: 'EIB Team Instagram',
      description: 'Follow our main team account for updates and company news.',
      category: 'support',
      type: 'Social Media',
      icon: () => <img src="https://a479266c5n.ufs.sh/f/shgffwCK3PoBE1f1N4XkzTZq6n0mcauCyHvYApfhoDKMU8Fr" alt="GroupMe" className="h-6 w-6" />,
      icon: MessageSquare,
      category: 'support',
      type: 'Social Media',
     icon: () => <img src="https://a479266c5n.ufs.sh/f/shgffwCK3PoBRWlGICOgVTcCQpk6nHjugZ8JUy5LYNeKEvhB" alt="Instagram" className="h-6 w-6" />,
      link: 'https://www.instagram.com/jason.graziani?igsh=MTZobTlvcDQwdTA0NA==',
      featured: false
    },
    {
      id: 12,
      title: 'Nataly Graziani Instagram',
      description: 'Follow our co-founder Nataly Graziani for business development tips.',
      category: 'support',
      type: 'Social Media',
     icon: () => <img src="https://a479266c5n.ufs.sh/f/shgffwCK3PoBRWlGICOgVTcCQpk6nHjugZ8JUy5LYNeKEvhB" alt="Instagram" className="h-6 w-6" />,
      link: 'https://www.instagram.com/nataly.graziani?igsh=MTh0cTYybHBpcGx2NQ==',
      featured: false
    },
    {
      id: 13,
      title: 'Iconic Women Instagram',
      description: 'Follow our women\'s empowerment and leadership development account.',
      category: 'support',
      type: 'Social Media',
     icon: () => <img src="https://a479266c5n.ufs.sh/f/shgffwCK3PoBRWlGICOgVTcCQpk6nHjugZ8JUy5LYNeKEvhB" alt="Instagram" className="h-6 w-6" />,
      link: 'https://www.instagram.com/iconic.women._?igsh=eGxzenJpYmFoYWJv',
      featured: false
    },
    {
      id: 14,
      title: 'Bamboo',
      description: 'HR system for payroll, benefits, time tracking, and employee information.',
      category: 'tools',
      type: 'System',
      icon: () => <img src="https://via.placeholder.com/24x24/6B7280/FFFFFF?text=HR" alt="HR System" className="h-6 w-6" />,
      link: 'https://app.phpbamboo.com/agent/signin',
      featured: false
    },
    {
      id: 15,
      title: 'Office Locator',
      description: 'Find EIB Agency office locations and contact information across all markets.',
      category: 'support',
      type: 'Directory',
      icon: () => <img src="https://via.placeholder.com/24x24/6B7280/FFFFFF?text=MAP" alt="Map" className="h-6 w-6" />,
      link: '/office-locations',
      featured: false
    }
  ];

  const handleCompletionToggle = (resourceId: number, isCompleted: boolean) => {
    if (!currentUser) return;

    const newCompleted = new Set(completedResources);
    if (isCompleted) {
      newCompleted.add(resourceId);
    } else {
      newCompleted.delete(resourceId);
    }
    
    setCompletedResources(newCompleted);
    localStorage.setItem(`completed_resources_${currentUser.id}`, JSON.stringify([...newCompleted]));
  };

  // Calculate category counts dynamically
  const getCompletedCountByCategory = (category: string) => {
    return resources.filter(resource => 
      resource.category === category && completedResources.has(resource.id)
    ).length;
  };

  const licensingResourcesCompleted = getCompletedCountByCategory('licensing');
  const trainingResourcesCompleted = getCompletedCountByCategory('training');
  const toolsResourcesCompleted = getCompletedCountByCategory('tools');
  const supportResourcesCompleted = getCompletedCountByCategory('support');

  // Update categories with dynamic counts
  const updatedCategories = categories.map(category => {
    let count = 0;
    switch (category.id) {
      case 'all':
        count = completedResources.size;
        break;
      case 'licensing':
        count = licensingResourcesCompleted;
        break;
      case 'training':
        count = trainingResourcesCompleted;
        break;
      case 'tools':
        count = toolsResourcesCompleted;
        break;
      case 'support':
        count = supportResourcesCompleted;
        break;
    }
    return { ...category, count };
  });

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const completedCount = completedResources.size;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resources...</p>
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
                <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
                <p className="mt-2 text-gray-600">Access licensing information, training materials, and operational tools to support your success.</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Licensing Resources</p>
                      <p className="text-3xl font-bold text-blue-600">{licensingResourcesCompleted}</p>
                    </div>
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Training Materials</p>
                      <p className="text-3xl font-bold text-green-600">{trainingResourcesCompleted}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tools & Systems</p>
                      <p className="text-3xl font-bold text-purple-600">{toolsResourcesCompleted}</p>
                    </div>
                    <Building className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-3xl font-bold text-yellow-600">{completedCount}</p>
                    </div>
                    <FileText className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
              </div>


              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                    <div className="space-y-2">
                      {updatedCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === category.id
                              ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{category.name}</span>
                            <span className={`text-sm ${
                              selectedCategory === category.id ? 'text-black' : 'text-gray-400'
                            }`}>
                              {category.count}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                    <div className="space-y-3">
                      <a href="#" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-yellow-600 transition-colors">
                        <Shield className="h-4 w-4" />
                        <span>Licensing Help</span>
                      </a>
                      <a href="#" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-yellow-600 transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        <span>Support Chat</span>
                      </a>
                      <a href="#" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-yellow-600 transition-colors">
                        <HelpCircle className="h-4 w-4" />
                        <span>Contact IT</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                  {/* Search and Filter */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search resources..."
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

                  {/* Resource List */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">All Resources</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {filteredResources.map((resource) => (
                        <div key={resource.id} className="p-6 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start space-x-4">
                            <div className="bg-gray-100 p-3 rounded-lg">
                              <resource.icon />
                                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                                    {resource.title}
                                  </h4>
                                  <p className="text-gray-600 mb-3">{resource.description}</p>
                                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span className="flex items-center space-x-1">
                                      <FileText className="h-4 w-4" />
                                      <span>{resource.type}</span>
                                    </span>
                                    <span className="capitalize">{resource.category}</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2 ml-4">
                                  <div className="flex items-center space-x-2 mr-4">
                                    <span className="text-sm font-medium text-gray-700">Completed:</span>
                                    <button
                                      onClick={() => handleCompletionToggle(resource.id, true)}
                                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                        completedResources.has(resource.id)
                                          ? 'bg-green-500 text-white'
                                          : 'bg-gray-200 text-gray-700 hover:bg-green-100'
                                      }`}
                                    >
                                      Yes
                                    </button>
                                    <button
                                      onClick={() => handleCompletionToggle(resource.id, false)}
                                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                        !completedResources.has(resource.id)
                                          ? 'bg-red-500 text-white'
                                          : 'bg-gray-200 text-gray-700 hover:bg-red-100'
                                      }`}
                                    >
                                      No
                                    </button>
                                  </div>
                                  <a
                                    href={resource.link}
                                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors flex items-center space-x-2"
                                  >
                                    <span>Access</span>
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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

export default ResourcesPage;