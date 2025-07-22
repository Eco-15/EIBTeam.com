import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { BookOpen, Star, Clock, CheckCircle, Search, Filter, ExternalLink } from 'lucide-react';

const BooksPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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
      cover: 'https://m.media-amazon.com/images/I/71wSEW6WohL._SY522_.jpg',
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
      cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREjJyx78LcnCIapxebJQ3OxJfXHJrMdbsNSg&s',
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
      cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRifXDpAVQjkoGwF6nt96sPBCGXbtGTV6lxdw&s',
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
      cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT03AHJeDiOeFQ5Rtq_0X24fhLyzPgJeVP8_A&s',
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
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnZ3q517CoJ8al2Ln3qhY1jXVbCwIOStx7fH9P',
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
      cover: 'https://m.media-amazon.com/images/I/41D6HT9Kn8L._SY445_SX342_.jpg',
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
      cover: 'https://m.media-amazon.com/images/I/41tjU69-NSL._SY445_SX342_.jpg',
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
      cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDdD4_MYgAkDZwQMfWklaw2vlrvRqt8h1smw&s',
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
      cover: 'https://m.media-amazon.com/images/I/41UXoaMiscL._SY445_SX342_.jpg',
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
      cover: 'https://m.media-amazon.com/images/I/41iZulVq18L._SY445_SX342_.jpg',
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
      cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNZbPnOcGbFhItWwmD8etb_veGaCCDqWrFzw&s',
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
      amazonLink: 'https://www.goodreads.com/book/show/6114738-coach',
      cover: 'data:image/jpeg;base64,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',
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
      cover: 'https://m.media-amazon.com/images/I/41Dn20bdaAL._SY445_SX342_.jpg',
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
      cover: 'https://m.media-amazon.com/images/I/31hSni7bS6L._SY445_SX342_.jpg',
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
      cover: 'https://m.media-amazon.com/images/I/61WzxIOuqyL._SY522_.jpg',
      recommended: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Books', count: 20 },
    { id: 'sales', name: 'Sales & Marketing', count: books.filter(b => b.category === 'sales').length },
    { id: 'finance', name: 'Finance & Wealth', count: books.filter(b => b.category === 'finance').length },
    { id: 'leadership', name: 'Leadership & Management', count: books.filter(b => b.category === 'leadership').length },
    { id: 'personal', name: 'Personal Development', count: books.filter(b => b.category === 'personal').length },
    { id: 'business', name: 'Business Strategy', count: books.filter(b => b.category === 'business').length },
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
              <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
                {categories.map((category) => (
                  <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{category.name}</p>
                        <p className="text-3xl font-bold text-blue-600">{category.count}</p>
                      </div>
                      <BookOpen className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                ))}
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