import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { ArrowLeft, Star, Clock, ExternalLink, BookOpen, CheckCircle, User, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const books = [
    {
      id: 1,
      title: 'Go Pro',
      author: 'Eric Worre',
      category: 'sales',
      description: 'The ultimate guide to network marketing and building a successful MLM business with proven strategies.',
      fullDescription: 'Go Pro by Eric Worre is the definitive guide to network marketing success. This comprehensive book provides proven strategies, techniques, and mindset shifts needed to build a thriving MLM business. Worre shares his decades of experience in the industry, offering practical advice on prospecting, presenting, following up, and building a team. The book covers everything from overcoming objections to developing leadership skills, making it an essential read for anyone serious about network marketing success.',
      rating: 4.8,
      pages: 208,
      readingTime: '5 hours',
      status: 'completed',
      dateCompleted: '2024-01-10',
      amazonLink: 'https://www.amazon.com/Go-Pro-Network-Marketing-Million/dp/0988667908',
      cover: 'https://m.media-amazon.com/images/I/81gfrYfKBoL._SY522_.jpg',
      recommended: true,
      keyTakeaways: [
        'Master the fundamentals of network marketing',
        'Develop effective prospecting techniques',
        'Learn to handle objections professionally',
        'Build and lead a successful team'
      ],
      topics: [
        'Network Marketing Basics',
        'Prospecting Strategies',
        'Presentation Skills',
        'Team Building'
      ]
    },
    {
      id: 2,
      title: 'How to Win Friends and Influence People',
      author: 'Dale Carnegie',
      category: 'personal',
      description: 'The classic guide to building relationships and influencing others through genuine interest and empathy.',
      fullDescription: 'Dale Carnegie\'s timeless classic provides fundamental techniques for handling people, making people like you, winning people to your way of thinking, and being a leader. This book has helped millions of people achieve their maximum potential in their personal and professional lives. Carnegie\'s principles are based on understanding human nature and building genuine relationships through empathy, respect, and authentic interest in others.',
      rating: 4.9,
      pages: 291,
      readingTime: '7 hours',
      status: 'reading',
      dateStarted: '2024-01-05',
      amazonLink: 'https://www.amazon.com/How-Win-Friends-Influence-People/dp/0671027034',
      cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442726934i/4865.jpg',
      recommended: true,
      keyTakeaways: [
        'Become genuinely interested in other people',
        'Make others feel important and appreciated',
        'Avoid criticism and condemnation',
        'Lead by example and inspiration'
      ],
      topics: [
        'Human Relations',
        'Communication Skills',
        'Leadership Principles',
        'Influence Techniques'
      ]
    },
    {
      id: 3,
      title: 'Think & Grow Rich',
      author: 'Napoleon Hill',
      category: 'finance',
      description: 'The timeless classic on achieving success through the power of thought and personal philosophy.',
      fullDescription: 'Napoleon Hill\'s Think and Grow Rich is one of the best-selling books of all time. Hill spent 20 years interviewing over 500 successful people, including Andrew Carnegie, Henry Ford, and Thomas Edison, to discover the secrets of their success. The book outlines 13 principles for achieving wealth and success, emphasizing the power of thought, desire, faith, and persistence in achieving one\'s goals.',
      rating: 4.7,
      pages: 320,
      readingTime: '9 hours',
      status: 'to-read',
      amazonLink: 'https://www.amazon.com/Think-Grow-Rich-Landmark-Bestseller/dp/1585424331',
      cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbh5NGbQ9BuattUET-oMSyVDoz5PIB6nQijw&s',
      recommended: true,
      keyTakeaways: [
        'Develop a burning desire for your goals',
        'Use the power of faith and belief',
        'Create detailed plans for achievement',
        'Persist through temporary defeat'
      ],
      topics: [
        'Success Philosophy',
        'Goal Achievement',
        'Wealth Building',
        'Personal Development'
      ]
    }
    // Add more books as needed...
  ];

  const book = books.find(b => b.id === parseInt(id || '0'));

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/agent-login');
          return;
        }

        setCurrentUser(user);
        
        if (book) {
          // Load completion status from localStorage
          const saved = localStorage.getItem(`completed_books_${user.id}`);
          if (saved) {
            const completedBooks = new Set(JSON.parse(saved));
            setIsCompleted(completedBooks.has(book.id));
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [id, book, navigate]);

  const handleCompletionToggle = (completed: boolean) => {
    if (!currentUser || !book) return;

    try {
      // Load current completed books
      const saved = localStorage.getItem(`completed_books_${currentUser.id}`);
      const completedBooks = saved ? new Set(JSON.parse(saved)) : new Set();

      if (completed) {
        completedBooks.add(book.id);
      } else {
        completedBooks.delete(book.id);
      }

      // Save updated completed books
      localStorage.setItem(`completed_books_${currentUser.id}`, JSON.stringify([...completedBooks]));
      setIsCompleted(completed);
    } catch (error) {
      console.error('Error updating book completion:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading book...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h1>
          <p className="text-gray-600 mb-4">The book you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/books')}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors"
          >
            Back to Books
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
                onClick={() => navigate('/books')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Books</span>
              </button>

              {/* Book Header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                <div className="p-8">
                  <div className="flex items-start space-x-8">
                    <div className="relative">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-48 h-64 object-cover rounded-lg shadow-lg"
                      />
                      {book.recommended && (
                        <div className="absolute -top-2 -right-2 bg-yellow-500 text-black rounded-full p-2">
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                      )}
                      {isCompleted && (
                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
                      <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
                      <p className="text-lg text-gray-600 mb-6">{book.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{book.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{book.pages} pages</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{book.readingTime}</span>
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
                        <a
                          href={book.amazonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors flex items-center space-x-2"
                        >
                          <span>Buy on Amazon</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Description */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Book</h2>
                    <p className="text-gray-600 leading-relaxed">{book.fullDescription}</p>
                  </div>

                  {/* Key Takeaways */}
                  {book.keyTakeaways && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Takeaways</h2>
                      <ul className="space-y-3">
                        {book.keyTakeaways.map((takeaway, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Book Info */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Pages:</span>
                        <span className="font-medium text-gray-900">{book.pages}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Reading Time:</span>
                        <span className="font-medium text-gray-900">{book.readingTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-900">{book.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium text-gray-900 capitalize">{book.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Topics Covered */}
                  {book.topics && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Topics Covered</h3>
                      <ul className="space-y-2">
                        {book.topics.map((topic, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-gray-600">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-center">
                    <h3 className="text-lg font-bold text-black mb-2">Ready to Read?</h3>
                    <p className="text-black mb-4 text-sm">Start reading this book and expand your knowledge with EIB Team.</p>
                    <a
                      href={book.amazonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors w-full inline-block"
                    >
                      Get This Book
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

export default BookDetailPage;