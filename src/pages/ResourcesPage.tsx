import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { FileText, ExternalLink, Search, Filter, Users, BookOpen, Shield, Building, MessageSquare, MapPin, HelpCircle, User, TrendingUp } from 'lucide-react';

const ResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Resources', count: 15 },
    { id: 'licensing', name: 'Licensing', count: 6 },
    { id: 'training', name: 'Training', count: 2 },
    { id: 'tools', name: 'Tools & Systems', count: 4 },
    { id: 'support', name: 'Support', count: 3 },
  ];

  const resources = [
    {
      id: 1,
      title: 'State Specific Licensing Sheet',
      description: 'Comprehensive overview of licensing requirements for all states where EIB Team operates.',
      category: 'licensing',
      type: 'Document',
      icon: Shield,
      link: '#',
      featured: true
    },
    {
      id: 2,
      title: 'ExamFX Study Material',
      description: 'Sign up for comprehensive study materials to prepare for your insurance licensing exam.',
      category: 'licensing',
      type: 'External Link',
      icon: BookOpen,
      link: 'https://www.examfx.com',
      featured: true
    },
    {
      id: 3,
      title: 'Booking License Exam',
      description: 'Schedule your insurance licensing exam through Pearson VUE testing centers.',
      category: 'licensing',
      type: 'External Link',
      icon: FileText,
      link: 'https://www.pearsonvue.com',
      featured: true
    },
    {
      id: 4,
      title: 'Applying for State License',
      description: 'Complete your state license application through the SIRCON system.',
      category: 'licensing',
      type: 'External Link',
      icon: Shield,
      link: 'https://www.sircon.com',
      featured: false
    },
    {
      id: 5,
      title: 'PHP RegEd',
      description: 'Sign up for continuing education courses required to maintain your license.',
      category: 'licensing',
      type: 'External Link',
      icon: BookOpen,
      link: '#',
      featured: false
    },
    {
      id: 6,
      title: 'Start Contracting',
      description: 'Step-by-step guide on filling out contracting paperwork with insurance carriers.',
      category: 'licensing',
      type: 'Guide',
      icon: FileText,
      link: '#',
      featured: false
    },
    {
      id: 7,
      title: 'Annuity Training',
      description: 'Access annuity PSTs (Product Specific Training) resources and certification materials.',
      category: 'training',
      type: 'Training',
      icon: TrendingUp,
      link: '#',
      featured: true
    },
    {
      id: 8,
      title: 'GroupMe',
      description: 'Join our team communication platform for instant messaging and updates.',
      category: 'support',
      type: 'Communication',
      icon: MessageSquare,
      link: '#',
      featured: false
    },
    {
      id: 9,
      title: 'Field Underwriting',
      description: 'Guidelines and best practices for field underwriting and case preparation.',
      category: 'training',
      type: 'Guide',
      icon: FileText,
      link: '#',
      featured: false
    },
    {
      id: 10,
      title: 'Social Media Links',
      description: 'Access all official EIB Team social media accounts and approved content.',
      category: 'support',
      type: 'Links',
      icon: Users,
      link: '#',
      featured: false
    },
    {
      id: 11,
      title: 'Office Locator',
      description: 'Find EIB Team office locations and contact information across all markets.',
      category: 'support',
      type: 'Directory',
      icon: MapPin,
      link: '#',
      featured: false
    },
    {
      id: 12,
      title: 'FAQ',
      description: 'Frequently asked questions about licensing, contracting, and operations.',
      category: 'support',
      type: 'Help',
      icon: HelpCircle,
      link: '#',
      featured: false
    },
    {
      id: 13,
      title: 'Bamboo',
      description: 'HR system for payroll, benefits, time tracking, and employee information.',
      category: 'tools',
      type: 'System',
      icon: User,
      link: '#',
      featured: false
    },
    {
      id: 14,
      title: 'Client Flow',
      description: 'CRM system for managing client relationships, leads, and sales pipeline.',
      category: 'tools',
      type: 'CRM',
      icon: Users,
      link: '#',
      featured: true
    },
    {
      id: 15,
      title: 'Recruits Flow',
      description: 'Recruitment management system for tracking prospects and team building.',
      category: 'tools',
      type: 'Recruitment',
      icon: TrendingUp,
      link: '#',
      featured: false
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter(r => r.featured);
  const licensingResources = resources.filter(r => r.category === 'licensing').length;
  const trainingResources = resources.filter(r => r.category === 'training').length;
  const toolsResources = resources.filter(r => r.category === 'tools').length;

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
                      <p className="text-3xl font-bold text-blue-600">{licensingResources}</p>
                    </div>
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Training Materials</p>
                      <p className="text-3xl font-bold text-green-600">{trainingResources}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tools & Systems</p>
                      <p className="text-3xl font-bold text-purple-600">{toolsResources}</p>
                    </div>
                    <Building className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Resources</p>
                      <p className="text-3xl font-bold text-yellow-600">{resources.length}</p>
                    </div>
                    <FileText className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
              </div>

              {/* Featured Resources */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Essential Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredResources.map((resource) => (
                    <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-lg">
                          <resource.icon className="h-6 w-6 text-black" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {resource.type}
                            </span>
                            <a
                              href={resource.link}
                              className="flex items-center space-x-1 text-sm text-yellow-600 hover:text-yellow-700 font-medium"
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

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
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
                              <resource.icon className="h-6 w-6 text-gray-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                                    {resource.title}
                                    {resource.featured && (
                                      <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Essential
                                      </span>
                                    )}
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