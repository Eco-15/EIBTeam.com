import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { FileText, Download, Search, Filter, Folder, Star, Eye, Calendar } from 'lucide-react';

const ResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Resources', count: 45 },
    { id: 'presentations', name: 'Presentations', count: 12 },
    { id: 'brochures', name: 'Brochures', count: 15 },
    { id: 'forms', name: 'Forms', count: 8 },
    { id: 'guides', name: 'Guides', count: 10 },
  ];

  const resources = [
    {
      id: 1,
      title: 'IUL Product Presentation',
      description: 'Comprehensive presentation deck for Indexed Universal Life insurance products.',
      category: 'presentations',
      type: 'PowerPoint',
      size: '2.4 MB',
      downloads: 156,
      rating: 4.8,
      dateAdded: '2024-01-10',
      featured: true,
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4'
    },
    {
      id: 2,
      title: 'Term Life Insurance Brochure',
      description: 'Client-friendly brochure explaining term life insurance benefits and features.',
      category: 'brochures',
      type: 'PDF',
      size: '1.2 MB',
      downloads: 203,
      rating: 4.9,
      dateAdded: '2024-01-08',
      featured: true,
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz'
    },
    {
      id: 3,
      title: 'Client Intake Form',
      description: 'Standard form for collecting client information and insurance needs assessment.',
      category: 'forms',
      type: 'PDF',
      size: '0.8 MB',
      downloads: 89,
      rating: 4.6,
      dateAdded: '2024-01-05',
      featured: false,
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4'
    },
    {
      id: 4,
      title: 'Annuities Sales Guide',
      description: 'Step-by-step guide for selling annuity products to different client segments.',
      category: 'guides',
      type: 'PDF',
      size: '3.1 MB',
      downloads: 134,
      rating: 4.7,
      dateAdded: '2024-01-03',
      featured: false,
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz'
    },
    {
      id: 5,
      title: 'Whole Life Comparison Chart',
      description: 'Visual comparison of different whole life insurance products and carriers.',
      category: 'presentations',
      type: 'Excel',
      size: '1.5 MB',
      downloads: 78,
      rating: 4.5,
      dateAdded: '2024-01-01',
      featured: false,
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4'
    },
    {
      id: 6,
      title: 'Medicare Supplement Brochure',
      description: 'Informational brochure about Medicare supplement insurance options.',
      category: 'brochures',
      type: 'PDF',
      size: '2.0 MB',
      downloads: 167,
      rating: 4.8,
      dateAdded: '2023-12-28',
      featured: true,
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter(r => r.featured);
  const totalDownloads = resources.reduce((acc, r) => acc + r.downloads, 0);

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
                <p className="mt-2 text-gray-600">Access marketing materials, forms, and sales tools to help you succeed.</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Resources</p>
                      <p className="text-3xl font-bold text-blue-600">{resources.length}</p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Downloads</p>
                      <p className="text-3xl font-bold text-green-600">{totalDownloads}</p>
                    </div>
                    <Download className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Categories</p>
                      <p className="text-3xl font-bold text-purple-600">{categories.length - 1}</p>
                    </div>
                    <Folder className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Featured</p>
                      <p className="text-3xl font-bold text-yellow-600">{featuredResources.length}</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
              </div>

              {/* Featured Resources */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredResources.map((resource) => (
                    <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src={resource.thumbnail}
                          alt={resource.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <span>{resource.type} • {resource.size}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span>{resource.rating}</span>
                          </div>
                        </div>
                        <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors flex items-center justify-center space-x-2">
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </button>
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
                            <img
                              src={resource.thumbnail}
                              alt={resource.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                                    {resource.title}
                                    {resource.featured && (
                                      <Star className="inline-block h-4 w-4 text-yellow-400 fill-current ml-2" />
                                    )}
                                  </h4>
                                  <p className="text-gray-600 mb-3">{resource.description}</p>
                                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span className="flex items-center space-x-1">
                                      <FileText className="h-4 w-4" />
                                      <span>{resource.type}</span>
                                    </span>
                                    <span>{resource.size}</span>
                                    <span className="flex items-center space-x-1">
                                      <Download className="h-4 w-4" />
                                      <span>{resource.downloads} downloads</span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                      <Calendar className="h-4 w-4" />
                                      <span>{new Date(resource.dateAdded).toLocaleDateString()}</span>
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2 ml-4">
                                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Eye className="h-5 w-5" />
                                  </button>
                                  <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors flex items-center space-x-2">
                                    <Download className="h-4 w-4" />
                                    <span>Download</span>
                                  </button>
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