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
      cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442726934i/4865.jpg',
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
      cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbh5NGbQ9BuattUET-oMSyVDoz5PIB6nQijw&s',
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
      cover: 'https://m.media-amazon.com/images/I/41f3shLJf5L._SY445_SX342_.jpg',
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
      cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD1VLfo7Ra1asodsWkcKmkjmi7QYjCEbAa6Q&s',
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