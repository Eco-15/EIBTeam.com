import React from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { ArrowLeft, Star, Clock, ExternalLink, BookOpen, User, Calendar, Award } from 'lucide-react';

const BookDetailPage = () => {
  const { id } = useParams();
  
  const books = [
    {
      id: 1,
      title: 'Go Pro',
      author: 'Eric Worre',
      category: 'sales',
      description: 'The ultimate guide to network marketing and building a successful MLM business with proven strategies.',
      longSummary: `"Go Pro" by Eric Worre is the definitive guide to becoming a network marketing professional. Worre, who has over 20 years of experience in the industry, breaks down the essential skills needed to succeed in network marketing and MLM businesses.

The book covers seven core skills that every network marketing professional must master:

1. **Finding Prospects**: Learn how to identify and connect with potential customers and team members through various methods including warm market, cold market, and online strategies.

2. **Inviting Prospects**: Master the art of inviting people to look at your opportunity without being pushy or salesy. Worre provides scripts and techniques for different scenarios.

3. **Presenting Your Product or Opportunity**: Develop the ability to effectively present your products and business opportunity in a way that creates interest and excitement.

4. **Following Up**: Learn the critical skill of following up with prospects in a professional and persistent manner that builds relationships rather than destroys them.

5. **Helping Your Prospects Become Customers or Distributors**: Understand how to guide prospects through the decision-making process and help them see the value in what you're offering.

6. **Helping Your New Distributors Get Started Right**: Create systems and processes to ensure new team members have the best possible start in the business.

7. **Promoting Events**: Learn how to use events as a powerful tool for building your business and creating momentum in your organization.

Throughout the book, Worre emphasizes the importance of treating network marketing as a profession, not a hobby. He provides practical advice on mindset, skill development, and building systems that create long-term success. The book is filled with real-world examples, scripts, and actionable strategies that can be implemented immediately.

For insurance professionals at EIB Team, this book is particularly valuable because it teaches the fundamental skills of relationship building, prospecting, and team development that are essential in the insurance industry. The principles of professional networking and systematic business building directly apply to building a successful insurance practice.`,
      rating: 4.8,
      pages: 208,
      readingTime: '5 hours',
      status: 'completed',
      progress: 100,
      dateCompleted: '2024-01-10',
      amazonLink: 'https://www.amazon.com/Go-Pro-Network-Marketing-Million/dp/0988667908',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      recommended: true,
      publishedYear: 2013,
      keyTakeaways: [
        'Network marketing is a profession that requires specific skills',
        'Master the 7 core skills to become successful',
        'Treat your business professionally, not as a hobby',
        'Focus on helping others succeed to build your own success',
        'Use events as powerful business building tools'
      ],
      targetAudience: 'Network marketers, MLM professionals, insurance agents building teams',
      whyRecommended: 'Essential for understanding professional relationship building and team development in the insurance industry.'
    },
    {
      id: 2,
      title: 'How to Win Friends and Influence People',
      author: 'Dale Carnegie',
      category: 'personal',
      description: 'The classic guide to building relationships and influencing others through genuine interest and empathy.',
      longSummary: `Dale Carnegie's "How to Win Friends and Influence People" is one of the most influential self-help books ever written, with over 30 million copies sold worldwide. First published in 1936, this timeless classic provides practical advice on how to build meaningful relationships and positively influence others.

The book is divided into four main sections:

**Part 1: Fundamental Techniques in Handling People**
- Don't criticize, condemn, or complain
- Give honest and sincere appreciation
- Arouse in the other person an eager want

**Part 2: Six Ways to Make People Like You**
- Become genuinely interested in other people
- Smile and be pleasant
- Remember that a person's name is the sweetest sound to them
- Be a good listener and encourage others to talk about themselves
- Talk in terms of the other person's interests
- Make the other person feel important and do it sincerely

**Part 3: How to Win People to Your Way of Thinking**
- Avoid arguments and show respect for others' opinions
- If you're wrong, admit it quickly and emphatically
- Begin in a friendly way and get the other person saying "yes"
- Let others do most of the talking and try to see things from their perspective
- Appeal to nobler motives and dramatize your ideas
- Throw down a challenge when other methods fail

**Part 4: Be a Leader: How to Change People Without Giving Offense**
- Begin with praise and honest appreciation
- Call attention to mistakes indirectly
- Talk about your own mistakes before criticizing others
- Ask questions instead of giving direct orders
- Let others save face and praise improvement
- Give people a fine reputation to live up to

Carnegie emphasizes that success in business and personal relationships comes from understanding human nature and treating people with respect and dignity. The book is filled with real-life examples and anecdotes that illustrate these principles in action.

For insurance professionals, this book is invaluable because the insurance business is fundamentally about relationships. Whether you're working with clients, prospects, or team members, the ability to connect with people, understand their needs, and influence them positively is crucial for success. The principles in this book directly apply to client consultations, sales presentations, and team leadership.`,
      rating: 4.9,
      pages: 291,
      readingTime: '7 hours',
      status: 'reading',
      progress: 65,
      dateStarted: '2024-01-05',
      amazonLink: 'https://www.amazon.com/How-Win-Friends-Influence-People/dp/0937539007',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      recommended: true,
      publishedYear: 1936,
      keyTakeaways: [
        'Show genuine interest in others to build strong relationships',
        'Listen more than you speak to understand people better',
        'Make others feel important and appreciated',
        'Avoid criticism and instead focus on positive reinforcement',
        'Remember and use people\'s names in conversation'
      ],
      targetAudience: 'Anyone looking to improve their interpersonal skills and leadership abilities',
      whyRecommended: 'Essential for building client relationships and leading teams in the insurance industry.'
    },
    {
      id: 3,
      title: 'Think & Grow Rich',
      author: 'Napoleon Hill',
      category: 'finance',
      description: 'The timeless classic on achieving success through the power of thought and personal philosophy.',
      longSummary: `"Think and Grow Rich" by Napoleon Hill is one of the most influential books on personal success and wealth building ever written. Published in 1937, it was the result of Hill's 20-year study of successful individuals, including Andrew Carnegie, Henry Ford, and Thomas Edison.

The book outlines Hill's philosophy of success through 13 principles:

**1. Desire**: The starting point of all achievement is a burning desire for success. Hill emphasizes that you must have a definite, specific goal and an intense desire to achieve it.

**2. Faith**: Visualization and belief in the attainment of desire. Faith is the "eternal elixir" that gives life, power, and action to the impulse of thought.

**3. Auto-suggestion**: The medium for influencing the subconscious mind through repeated affirmations and visualization of your goals.

**4. Specialized Knowledge**: General knowledge is of little use in accumulating wealth. You need specialized knowledge in your chosen field or the ability to organize and direct those who have it.

**5. Imagination**: The workshop of the mind where all plans are created. Hill distinguishes between synthetic imagination (rearranging existing concepts) and creative imagination (creating something from nothing).

**6. Organized Planning**: The crystallization of desire into action requires definite, practical plans and the formation of a "Master Mind" alliance.

**7. Decision**: Successful people make decisions quickly and change them slowly, if at all. Procrastination is the opposite of decision.

**8. Persistence**: The sustained effort necessary to induce faith. Most people give up at the first sign of defeat, but persistence is essential for success.

**9. The Master Mind**: The coordination of knowledge and effort between two or more people working toward a definite purpose creates a "Master Mind."

**10. The Mystery of Sex Transmutation**: The transformation of sexual energy into creative energy and achievement.

**11. The Subconscious Mind**: The connecting link between the finite mind and Infinite Intelligence. It works continuously and can be directed through habit.

**12. The Brain**: A broadcasting and receiving station for thought vibrations.

**13. The Sixth Sense**: The door to the temple of wisdom, through which comes knowledge without effort.

Hill's central thesis is that thoughts become things, and by controlling your thoughts and maintaining a positive mental attitude, you can achieve any goal you set for yourself. The book emphasizes the power of the mind in creating wealth and success.

For insurance professionals, this book is particularly relevant because success in insurance requires the right mindset, persistence in the face of rejection, and the ability to visualize and work toward long-term goals. The principles of desire, faith, and persistence are essential for building a successful insurance practice.`,
      rating: 4.7,
      pages: 320,
      readingTime: '9 hours',
      status: 'to-read',
      progress: 0,
      amazonLink: 'https://www.amazon.com/Think-Grow-Rich-Landmark-Bestseller/dp/1585424331',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      recommended: true,
      publishedYear: 1937,
      keyTakeaways: [
        'Success begins with a burning desire and definite goals',
        'Faith and visualization are powerful tools for achievement',
        'Specialized knowledge is more valuable than general knowledge',
        'Persistence is essential for overcoming obstacles',
        'The Master Mind principle amplifies individual efforts'
      ],
      targetAudience: 'Entrepreneurs, business professionals, anyone seeking financial success',
      whyRecommended: 'Foundational mindset principles essential for building wealth in the insurance industry.'
    },
    // Continue with other books...
    {
      id: 4,
      title: 'The 7 Habits of Highly Effective People',
      author: 'Stephen R. Covey',
      category: 'leadership',
      description: 'A powerful lesson in personal change and leadership development.',
      longSummary: `Stephen Covey's "The 7 Habits of Highly Effective People" is a comprehensive guide to personal and professional effectiveness. Based on timeless principles of human effectiveness, this book has sold over 25 million copies worldwide and continues to be one of the most influential business books ever written.

Covey organizes the seven habits into three categories:

**Private Victory (Habits 1-3): Independence**

**Habit 1: Be Proactive**
Take responsibility for your life and responses to circumstances. Proactive people focus on their Circle of Influence rather than their Circle of Concern. They understand that between stimulus and response lies the freedom to choose.

**Habit 2: Begin with the End in Mind**
Start with a clear understanding of your destination and values. This habit involves developing a personal mission statement and aligning your actions with your deepest values and principles.

**Habit 3: Put First Things First**
Focus on what's important, not just what's urgent. This habit is about time management and prioritization, using Covey's famous Time Management Matrix to focus on Quadrant II activities (important but not urgent).

**Public Victory (Habits 4-6): Interdependence**

**Habit 4: Think Win-Win**
Seek mutually beneficial solutions in all interactions. This paradigm sees life as a cooperative arena, not a competitive one, where everyone can win.

**Habit 5: Seek First to Understand, Then to Be Understood**
Listen empathetically before seeking to be heard. This habit emphasizes the importance of empathetic listening and understanding others' perspectives before presenting your own.

**Habit 6: Synergize**
Combine the strengths of people through positive teamwork to achieve goals no one person could have done alone. Synergy is the highest activity in all life - the true test of leadership.

**Renewal (Habit 7): Continuous Improvement**

**Habit 7: Sharpen the Saw**
Balance and renew your resources, energy, and health to create a sustainable, long-term, effective lifestyle. This involves four dimensions: physical, mental, emotional/social, and spiritual.

Covey emphasizes that true effectiveness comes from character, not personality. He distinguishes between the "Personality Ethic" (techniques and quick fixes) and the "Character Ethic" (fundamental principles and character traits).

The book also introduces important concepts like:
- **Paradigm Shifts**: Changing how we see the world
- **The Maturity Continuum**: Moving from dependence to independence to interdependence
- **Emotional Bank Account**: Building trust in relationships through consistent deposits

For insurance professionals, these habits are crucial for building long-term client relationships, leading teams effectively, and maintaining personal effectiveness in a demanding industry. The principles of proactivity, prioritization, and win-win thinking are particularly relevant for insurance agents and managers.`,
      rating: 4.6,
      pages: 432,
      readingTime: '10 hours',
      status: 'completed',
      progress: 100,
      dateCompleted: '2023-12-15',
      amazonLink: 'https://www.amazon.com/Habits-Highly-Effective-People-Powerful/dp/1982137274',
      cover: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      recommended: true,
      publishedYear: 1989,
      keyTakeaways: [
        'Be proactive and take responsibility for your responses',
        'Start with the end in mind and align actions with values',
        'Put first things first by focusing on important activities',
        'Think win-win in all interactions and relationships',
        'Seek to understand others before seeking to be understood'
      ],
      targetAudience: 'Leaders, managers, professionals seeking personal effectiveness',
      whyRecommended: 'Essential leadership principles for managing teams and building client relationships in insurance.'
    }
    // Add more books with similar detailed structure...
  ];

  const book = books.find(b => b.id === parseInt(id || '1'));

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <DashboardSidebar />
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h1>
              <Link to="/books" className="text-yellow-600 hover:text-yellow-700">
                Return to Books
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Back Button */}
              <div className="mb-6">
                <Link
                  to="/books"
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to Books</span>
                </Link>
              </div>

              {/* Book Header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Book Cover */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-48 h-64 object-cover rounded-lg shadow-lg"
                        />
                        {book.recommended && (
                          <div className="absolute -top-3 -right-3 bg-yellow-500 text-black rounded-full p-2">
                            <Star className="h-4 w-4 fill-current" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Book Info */}
                    <div className="flex-1">
                      <div className="mb-4">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                        <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
                        <p className="text-gray-700 text-lg leading-relaxed">{book.description}</p>
                      </div>

                      {/* Book Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Star className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
                          <div className="text-lg font-bold text-gray-900">{book.rating}</div>
                          <div className="text-sm text-gray-600">Rating</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <BookOpen className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-gray-900">{book.pages}</div>
                          <div className="text-sm text-gray-600">Pages</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Clock className="h-5 w-5 text-green-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-gray-900">{book.readingTime}</div>
                          <div className="text-sm text-gray-600">Read Time</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Calendar className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-gray-900">{book.publishedYear}</div>
                          <div className="text-sm text-gray-600">Published</div>
                        </div>
                      </div>

                      {/* Status and Actions */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(book.status)}`}>
                            {getStatusText(book.status)}
                          </span>
                          <span className="text-sm text-gray-500 capitalize">{book.category}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <a
                            href={book.amazonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors flex items-center space-x-2"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>Buy on Amazon</span>
                          </a>
                        </div>
                      </div>

                      {/* Progress Bar (if reading) */}
                      {book.progress > 0 && book.status !== 'completed' && (
                        <div className="mt-6">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <span>Reading Progress</span>
                            <span>{book.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${book.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Summary */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Summary</h2>
                    <div className="prose prose-gray max-w-none">
                      {book.longSummary.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-gray-700 leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Key Takeaways */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Takeaways</h2>
                    <div className="space-y-3">
                      {book.keyTakeaways.map((takeaway, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="bg-yellow-100 rounded-full p-1 mt-1">
                            <Award className="h-4 w-4 text-yellow-600" />
                          </div>
                          <p className="text-gray-700 leading-relaxed">{takeaway}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Book Details */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">Author</div>
                          <div className="font-medium text-gray-900">{book.author}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">Published</div>
                          <div className="font-medium text-gray-900">{book.publishedYear}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <BookOpen className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">Pages</div>
                          <div className="font-medium text-gray-900">{book.pages}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">Reading Time</div>
                          <div className="font-medium text-gray-900">{book.readingTime}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Audience</h3>
                    <p className="text-gray-700 leading-relaxed">{book.targetAudience}</p>
                  </div>

                  {/* Why Recommended */}
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-600" />
                      <span>Why We Recommend This</span>
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{book.whyRecommended}</p>
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