import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { BookOpen, Star, Clock, CheckCircle, Search, Filter, ExternalLink } from 'lucide-react';

const BooksPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Books', count: 20 },
    { id: 'sales', name: 'Sales & Marketing', count: 3 },
    { id: 'finance', name: 'Finance & Wealth', count: 3 },
    { id: 'leadership', name: 'Leadership', count: 6 },
    { id: 'personal', name: 'Personal Development', count: 5 },
    { id: 'business', name: 'Business Strategy', count: 3 },
  ];

  const books = [
    {
      id: 1,
      title: 'Go Pro',
      author: 'Eric Worre',
      category: 'sales',
      description: 'The ultimate guide to network marketing and building a successful MLM business with proven strategies.',
      rating: 4.8,
      pages: 208,
      readingTime: '5 hours',
      status: 'completed',
      dateCompleted: '2024-01-10',
      amazonLink: 'https://www.amazon.com/Go-Pro-Network-Marketing-Million/dp/0988667908',
      cover: 'https://m.media-amazon.com/images/I/81gfrYfKBoL._SY522_.jpg',
      recommended: true
    },
    {
      id: 2,
      title: 'How to Win Friends and Influence People',
      author: 'Dale Carnegie',
      category: 'personal',
      description: 'The classic guide to building relationships and influencing others through genuine interest and empathy.',
      rating: 4.9,
      pages: 291,
      readingTime: '7 hours',
      status: 'reading',
      dateStarted: '2024-01-05',
      amazonLink: 'https://www.amazon.com/How-Win-Friends-Influence-People/dp/0671027034/ref=sr_1_1?crid=3IIALYX0SZAGN&dib=eyJ2IjoiMSJ9.Qgn-N_y0ZylQLOnQEdlfbzqJ0y3t7CL1TOdA9UheUoyK-GWXqjKzhEhWDtJ4lJstw7KDxhAVuZiJoPWM5oMhjwziiuslyQ5XZSxvJuQYqsau5yiWxu6CaMrGywoDm9XArwPTATTxCKs0xZd5oIfp0u50z4sWjHBsH2VJnRto9qCPRap49_w4GleF2FxAL4EcvuEqwsLygIatIwbMigLpEk-vEOoKOpOGDMKoAlm_pXI.nrhDOLyf_YXnG3laEdvB2jk-d4wHnm4IU9aXsByXI_8&dib_tag=se&keywords=how+to+win+friends+and+influence+people&qid=1753140566&s=books&sprefix=How+t%2Cstripbooks%2C146&sr=1-1',
      cover: 'data:image/png;base64,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',
      recommended: true
    },
    {
      id: 3,
      title: 'Think & Grow Rich',
      author: 'Napoleon Hill',
      category: 'finance',
      description: 'The timeless classic on achieving success through the power of thought and personal philosophy.',
      rating: 4.7,
      pages: 320,
      readingTime: '9 hours',
      status: 'to-read',
      amazonLink: 'https://www.amazon.com/Think-Grow-Rich-Landmark-Bestseller/dp/1585424331',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      recommended: true
    },
    {
      id: 4,
      title: 'The 7 Habits of Highly Effective People',
      author: 'Stephen R. Covey',
      category: 'leadership',
      description: 'A powerful lesson in personal change and leadership development.',
      rating: 4.6,
      pages: 432,
      readingTime: '10 hours',
      status: 'completed',
      dateCompleted: '2023-12-15',
      amazonLink: 'https://www.amazon.com/Habits-Highly-Effective-People-Powerful/dp/1982137274',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      recommended: true
    },
    {
      id: 5,
      title: 'Good to Great',
      author: 'Jim Collins',
      category: 'leadership',
      description: 'Why some companies make the leap from good to great while others don\'t, based on extensive research.',
      rating: 4.6,
      pages: 320,
      readingTime: '8 hours',
      status: 'reading',
      dateStarted: '2024-01-12',
      amazonLink: 'https://www.amazon.com/Good-Great-Some-Companies-Others/dp/0066620996',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      recommended: true
    },
    {
      id: 6,
      title: 'The Tipping Point',
      author: 'Malcolm Gladwell',
      category: 'personal',
      description: 'How little things can make a big difference in creating trends and social epidemics.',
      rating: 4.5,
      pages: 301,
      readingTime: '6 hours',
      status: 'to-read',
      amazonLink: 'https://www.amazon.com/Tipping-Point-Little-Things-Difference/dp/0316346624',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      recommended: true
    },
    {
      id: 7,
      title: 'The Five Dysfunctions of a Team',
      author: 'Patrick Lencioni',
      category: 'leadership',
      description: 'A leadership fable about overcoming the five dysfunctions that plague teams and organizations.',
      rating: 4.7,
      pages: 229,
      readingTime: '5 hours',
      status: 'to-read',
      amazonLink: 'https://www.amazon.com/Five-Dysfunctions-Team-Leadership-Fable/dp/0787960756',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      recommended: true
    },
    {
      id: 8,
      title: 'E-Myth Revisited',
      author: 'Michael E. Gerber',
      category: 'business',
      description: 'Why most small businesses don\'t work and what to do about it - essential for entrepreneurs.',
      rating: 4.6,
      pages: 288,
      readingTime: '7 hours',
      status: 'completed',
      dateCompleted: '2023-11-20',
      amazonLink: 'https://www.amazon.com/Myth-Revisited-Small-Businesses-About/dp/0887307280',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      recommended: true
    },
    {
      id: 9,
      title: 'Crucial Conversations',
      author: 'Joseph Grenny',
      category: 'personal',
      description: 'Tools for talking when stakes are high - master difficult conversations with confidence.',
      rating: 4.8,
      pages: 288,
      readingTime: '7 hours',
      status: 'reading',
      dateStarted: '2024-01-08',
      amazonLink: 'https://www.amazon.com/Crucial-Conversations-Talking-Stakes-Second/dp/1469266822',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      recommended: true
    },
    {
      id: 10,
      title: 'Rich Dad, Poor Dad',
      author: 'Robert T. Kiyosaki',
      category: 'finance',
      description: 'What the rich teach their kids about money that the poor and middle class do not.',
      rating: 4.7,
      pages: 336,
      readingTime: '8 hours',
      status: 'completed',
      dateCompleted: '2023-10-15',
      amazonLink: 'https://www.amazon.com/Rich-Dad-Poor-Teach-Middle/dp/1612680194',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      recommended: true
    },
    {
      id: 11,
      title: '21 Irrefutable Laws of Leadership',
      author: 'John C. Maxwell',
      category: 'leadership',
      description: 'Follow them and people will follow you - the definitive guide to leadership principles.',
      rating: 4.8,
      pages: 320,
      readingTime: '8 hours',
      status: 'to-read',
      amazonLink: 'https://www.amazon.com/21-Irrefutable-Laws-Leadership-Follow/dp/0785288376',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      recommended: true
    },
    {
      id: 12,
      title: 'The Greatest Salesman in the World',
      author: 'Og Mandino',
      category: 'sales',
      description: 'A timeless tale of success and the ten ancient scrolls that hold the secrets to wealth.',
      rating: 4.6,
      pages: 128,
      readingTime: '3 hours',
      status: 'completed',
      dateCompleted: '2023-12-05',
      amazonLink: 'https://www.amazon.com/Greatest-Salesman-World-Og-Mandino/dp/055327757X',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      recommended: true
    },
    {
      id: 13,
      title: 'The Four Agreements',
      author: 'Miguel Ruiz',
      category: 'personal',
      description: 'A practical guide to personal freedom based on ancient Toltec wisdom.',
      rating: 4.5,
      pages: 160,
      readingTime: '4 hours',
      status: 'reading',
      dateStarted: '2024-01-14',
      amazonLink: 'https://www.amazon.com/Four-Agreements-Practical-Personal-Freedom/dp/1878424319',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      recommended: true
    },
    {
      id: 14,
      title: 'Secrets of the Millionaire Mind',
      author: 'T. Harv Eker',
      category: 'finance',
      description: 'Mastering the inner game of wealth - how your thoughts create your financial reality.',
      rating: 4.6,
      pages: 224,
      readingTime: '5 hours',
      status: 'to-read',
      amazonLink: 'https://www.amazon.com/Secrets-Millionaire-Mind-Mastering-Wealth/dp/0060763280',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      recommended: true
    },
    {
      id: 15,
      title: 'Start with Why',
      author: 'Simon Sinek',
      category: 'leadership',
      description: 'How great leaders inspire everyone to take action by starting with why.',
      rating: 4.7,
      pages: 256,
      readingTime: '6 hours',
      status: 'completed',
      dateCompleted: '2023-09-22',
      amazonLink: 'https://www.amazon.com/Start-Why-Leaders-Inspire-Everyone/dp/1591846447',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      recommended: true
    },
    {
      id: 16,
      title: 'Your Next 5 Moves',
      author: 'Patrick Bet-David',
      category: 'business',
      description: 'Master the art of business strategy - think like a chess master in business and life.',
      rating: 4.8,
      pages: 320,
      readingTime: '8 hours',
      status: 'reading',
      dateStarted: '2024-01-16',
      amazonLink: 'https://www.amazon.com/Your-Next-Five-Moves-Business/dp/1982154810',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      recommended: true
    },
    {
      id: 17,
      title: 'Coach',
      author: 'AL Williams',
      category: 'sales',
      description: 'The legendary insurance industry leader shares his secrets to building a winning team.',
      rating: 4.9,
      pages: 240,
      readingTime: '6 hours',
      status: 'to-read',
      amazonLink: 'https://www.amazon.com/Coach-AL-Williams/dp/0892212845',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      recommended: true
    },
    {
      id: 18,
      title: 'Principles',
      author: 'Ray Dalio',
      category: 'business',
      description: 'Life and work principles from one of the world\'s most successful investors and entrepreneurs.',
      rating: 4.7,
      pages: 592,
      readingTime: '15 hours',
      status: 'to-read',
      amazonLink: 'https://www.amazon.com/Principles-Life-Work-Ray-Dalio/dp/1501124021',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      recommended: true
    },
    {
      id: 19,
      title: '48 Laws of Power',
      author: 'Robert Greene',
      category: 'personal',
      description: 'The definitive guide to power dynamics and strategic thinking in all areas of life.',
      rating: 4.5,
      pages: 496,
      readingTime: '12 hours',
      status: 'completed',
      dateCompleted: '2023-08-10',
      amazonLink: 'https://www.amazon.com/48-Laws-Power-Robert-Greene/dp/0140280197',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      recommended: false
    },
    {
      id: 20,
      title: 'Wooden on Leadership',
      author: 'John Wooden',
      category: 'leadership',
      description: 'Leadership lessons from the legendary UCLA basketball coach who won 10 NCAA championships.',
      rating: 4.8,
      pages: 304,
      readingTime: '7 hours',
      status: 'to-read',
      amazonLink: 'https://www.amazon.com/Wooden-Leadership-Create-Winning-Organization/dp/0071453393',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      recommended: true
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
                                <div className="flex items-center space-x-2">
                                  <a
                                    href={`/books/${book.id}`}
                                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-3 py-1 rounded-lg text-sm font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors"
                                  >
                                    View Details
                                  </a>
                                  <a
                                    href={book.amazonLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                    <span>Amazon</span>
                                  </a>
                                </div>
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