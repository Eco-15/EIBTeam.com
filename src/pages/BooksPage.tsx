import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { BookOpen, Star, Clock, CheckCircle, Search, Filter, ExternalLink } from 'lucide-react';

const BooksPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Books', count: 18 },
    { id: 'sales', name: 'Sales & Marketing', count: 6 },
    { id: 'finance', name: 'Finance & Insurance', count: 5 },
    { id: 'leadership', name: 'Leadership', count: 4 },
    { id: 'personal', name: 'Personal Development', count: 3 },
  ];

  const books = [
    {
      id: 1,
      title: 'The Millionaire Agent',
      author: 'Gary Keller',
      category: 'sales',
      description: 'A comprehensive guide to building a successful real estate and insurance business.',
      rating: 4.8,
      pages: 320,
      readingTime: '8 hours',
      status: 'completed',
      progress: 100,
      dateCompleted: '2024-01-10',
      amazonLink: 'https://amazon.com',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      recommended: true
    },
    {
      id: 2,
      title: 'The Psychology of Selling',
      author: 'Brian Tracy',
      category: 'sales',
      description: 'Master the art and science of selling with proven psychological techniques.',
      rating: 4.9,
      pages: 288,
      readingTime: '7 hours',
      status: 'reading',
      progress: 65,
      dateStarted: '2024-01-05',
      amazonLink: 'https://amazon.com',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      recommended: true
    },
    {
      id: 3,
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      category: 'finance',
      description: 'Learn what the rich teach their kids about money that the poor and middle class do not.',
      rating: 4.7,
      pages: 336,
      readingTime: '8 hours',
      status: 'to-read',
      progress: 0,
      amazonLink: 'https://amazon.com',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      recommended: true
    },
    {
      id: 4,
      title: 'The 7 Habits of Highly Effective People',
      author: 'Stephen Covey',
      category: 'leadership',
      description: 'A powerful lesson in personal change and leadership development.',
      rating: 4.6,
      pages: 432,
      readingTime: '10 hours',
      status: 'completed',
      progress: 100,
      dateCompleted: '2023-12-15',
      amazonLink: 'https://amazon.com',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      recommended: false
    },
    {
      id: 5,
      title: 'How to Win Friends and Influence People',
      author: 'Dale Carnegie',
      category: 'personal',
      description: 'The classic guide to building relationships and influencing others.',
      rating: 4.5,
      pages: 291,
      readingTime: '7 hours',
      status: 'reading',
      progress: 30,
      dateStarted: '2024-01-12',
      amazonLink: 'https://amazon.com',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      recommended: true
    },
    {
      id: 6,
      title: 'The Insurance Professional\'s Guide',
      author: 'Michael Johnson',
      category: 'finance',
      description: 'Essential knowledge for insurance professionals and agents.',
      rating: 4.4,
      pages: 256,
      readingTime: '6 hours',
      status: 'to-read',
      progress: 0,
      amazonLink: 'https://amazon.com',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      recommended: false
    }
  ];

  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const completedBooks = books.filter(b => b.status === 'completed').length;
  const currentlyReading = books.filter(b => b.status === 'reading').length;
  const recommendedBooks = books.filter(b => b.recommended).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'reading': return 'text-yellow-600 bg-yellow-100';
      case 'to-read': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'reading': return 'Reading';
      case 'to-read': return 'To Read';
      default: return 'Unknown';
    }
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
                <h1 className="text-3xl font-bold text-gray-900">Books to Read</h1>
                <p className="mt-2 text-gray-600">Expand your knowledge with our curated reading list for insurance professionals.</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-3xl font-bold text-green-600">{completedBooks}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Currently Reading</p>
                      <p className="text-3xl font-bold text-yellow-600">{currentlyReading}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Books</p>
                      <p className="text-3xl font-bold text-blue-600">{books.length}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Recommended</p>
                      <p className="text-3xl font-bold text-purple-600">{recommendedBooks}</p>
                    </div>
                    <Star className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Currently Reading */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Currently Reading</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {books.filter(book => book.status === 'reading').map((book) => (
                    <div key={book.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-20 h-28 object-cover rounded-lg shadow-md"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
                          <p className="text-gray-600 mb-2">by {book.author}</p>
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{book.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${book.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors">
                            Continue Reading
                          </button>
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
                          placeholder="Search books..."
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

                  {/* Books Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredBooks.map((book) => (
                      <div key={book.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="relative">
                              <img
                                src={book.cover}
                                alt={book.title}
                                className="w-20 h-28 object-cover rounded-lg shadow-md"
                              />
                              {book.recommended && (
                                <div className="absolute -top-2 -right-2 bg-yellow-500 text-black rounded-full p-1">
                                  <Star className="h-3 w-3 fill-current" />
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
                              <p className="text-gray-600 mb-2">by {book.author}</p>
                              <p className="text-sm text-gray-600 mb-3">{book.description}</p>
                              
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span>{book.rating}</span>
                                </div>
                                <span>{book.pages} pages</span>
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{book.readingTime}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(book.status)}`}>
                                  {getStatusText(book.status)}
                                </span>
                                <a
                                  href={book.amazonLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                  <span>View on Amazon</span>
                                </a>
                              </div>
                              
                              {book.progress > 0 && book.status !== 'completed' && (
                                <div className="mt-3">
                                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                    <span>Progress</span>
                                    <span>{book.progress}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transition-all duration-300"
                                      style={{ width: `${book.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}
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
        </main>
      </div>
    </div>
  );
};

export default BooksPage;