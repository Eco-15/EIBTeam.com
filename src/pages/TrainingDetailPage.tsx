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

  // All trainings from the restructured sections
  const trainings = [
    // Recruiting and Building Section
    {
      id: 1,
      title: 'Welcome',
      description: 'Introduction to EIB Team, our mission, values, and what to expect in your journey with us.',
      fullDescription: 'Welcome to EIB Agency! This comprehensive introduction training will walk you through our company mission, core values, and what you can expect as you begin your journey with us. You\'ll learn about our history, our commitment to excellence, and how we support our agents in achieving their goals. This training covers the foundational knowledge every EIB Agency member needs to succeed.',
      duration: '30 minutes',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOncjwWJYXABiZ5cudwgVeLkIK6oqazNlQhtEn2', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnBfTbyGNs1dDP4Ioh850ny67VtNg3mlwEuFpx',
      section: 'Recruiting and Building',
      objectives: [
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
      title: 'Builders Mindset',
      description: 'Develop the entrepreneurial mindset needed to build a successful insurance business.',
      fullDescription: 'Building a successful insurance business requires more than just product knowledge - it requires an entrepreneurial mindset. This training will help you develop the mental framework needed to think like a business owner, take calculated risks, and build long-term success. You\'ll learn about goal setting, persistence, and the importance of continuous learning and adaptation.',
      duration: '20 minutes',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWA9m6kwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      section: 'Recruiting and Building',
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
      title: '8 Expectations',
      description: 'Learn the 8 key expectations for success in the insurance industry.',
      fullDescription: 'Success in the insurance industry requires understanding and meeting specific expectations. This training outlines the 8 fundamental expectations that every successful agent must embrace. You\'ll learn about professionalism, work ethic, continuous learning, client service, and the mindset needed to excel in this competitive field.',
      duration: '25 minutes',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWyr2rmwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      section: 'Recruiting and Building',
      objectives: [
        'Understand the 8 key expectations',
        'Learn professional standards',
        'Develop work ethic principles',
        'Build client service excellence'
      ],
      topics: [
        'Professional Standards',
        'Work Ethic',
        'Client Service',
        'Success Mindset'
      ]
    },
    {
      id: 4,
      title: 'Goal Settings',
      description: 'Create actionable goals and develop a comprehensive business plan for success.',
      fullDescription: 'Success in the insurance industry requires clear goals and a solid business plan. This comprehensive training will guide you through creating SMART goals, developing action plans, and building a business plan that will drive your success. You\'ll learn about different types of goals, how to break them down into actionable steps, and how to track your progress.',
      duration: '1.5 hours',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnd7spMIl7cmdASPKDVwuU18xgjXi5O4RQaH2I',
      section: 'Recruiting and Building',
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
      id: 5,
      title: '6 Steps of our Business',
      description: 'Master the 6-step process for client acquisition and appointment scheduling.',
      fullDescription: 'Client acquisition is the lifeblood of any successful insurance business. This training breaks down our proven 6-step process for finding, qualifying, and scheduling appointments with potential clients. You\'ll learn prospecting techniques, how to make effective initial contact, qualification questions, and strategies for converting prospects into scheduled appointments.',
      duration: '30 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      section: 'Recruiting and Building',
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
      id: 6,
      title: 'How a Part Timer',
      description: 'Learn how to succeed as a part-time agent and maximize your earning potential.',
      fullDescription: 'Not everyone can commit to full-time insurance sales immediately. This training is specifically designed for part-time agents who want to build a successful insurance business while maintaining other commitments. You\'ll learn time management strategies, how to maximize your limited hours, and techniques for building momentum even with a part-time schedule.',
      duration: '35 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      section: 'Recruiting and Building',
      objectives: [
        'Learn part-time success strategies',
        'Master time management',
        'Maximize limited hours',
        'Build consistent momentum'
      ],
      topics: [
        'Time Management',
        'Part-Time Strategies',
        'Efficiency Techniques',
        'Building Momentum'
      ]
    },
    {
      id: 7,
      title: 'Captain System',
      description: 'Understand the captain system and how to lead and manage your team effectively.',
      fullDescription: 'The Captain System is EIB Agency\'s proven leadership and team management methodology. This training will teach you how to effectively lead a team, manage performance, and create a culture of success. You\'ll learn about delegation, motivation techniques, and how to develop other agents into leaders.',
      duration: '40 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlmOrmln8EfQTV7ApbyFLmjY5GCZhaPcN4nzo',
      section: 'Recruiting and Building',
      objectives: [
        'Understand the Captain System',
        'Learn team leadership skills',
        'Master performance management',
        'Develop other leaders'
      ],
      topics: [
        'Leadership Principles',
        'Team Management',
        'Performance Coaching',
        'Leader Development'
      ]
    },
    {
      id: 8,
      title: 'EXCHANGE Prince',
      description: 'Master the exchange process and become a prince of exchanges.',
      fullDescription: 'The exchange process is a critical skill for maximizing client value and building long-term relationships. This training will teach you how to identify exchange opportunities, present them effectively to clients, and execute exchanges that benefit both the client and your business. You\'ll learn the technical aspects as well as the sales techniques needed to excel.',
      duration: '30 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWA9m6kwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      section: 'Recruiting and Building',
      objectives: [
        'Master exchange processes',
        'Identify exchange opportunities',
        'Learn presentation techniques',
        'Execute successful exchanges'
      ],
      topics: [
        'Exchange Fundamentals',
        'Opportunity Identification',
        'Client Presentation',
        'Execution Strategies'
      ]
    },
    {
      id: 9,
      title: 'Being A LEADER',
      description: 'Develop leadership skills and learn how to inspire and motivate your team.',
      fullDescription: 'True leadership goes beyond managing people - it\'s about inspiring and motivating others to achieve their best. This training focuses on developing authentic leadership skills, building trust with your team, and creating an environment where everyone can thrive. You\'ll learn communication techniques, motivation strategies, and how to lead by example.',
      duration: '45 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWyr2rmwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      section: 'Recruiting and Building',
      objectives: [
        'Develop authentic leadership',
        'Learn motivation techniques',
        'Build team trust',
        'Create thriving environments'
      ],
      topics: [
        'Leadership Fundamentals',
        'Team Motivation',
        'Trust Building',
        'Leading by Example'
      ]
    },
    {
      id: 10,
      title: 'HOW TO HIT MD',
      description: 'Learn the strategies and techniques to achieve Managing Director status.',
      fullDescription: 'Reaching Managing Director (MD) status is the pinnacle of success in our organization. This training reveals the specific strategies, mindset, and actions required to achieve this elite level. You\'ll learn about the requirements, the journey, and the mindset shifts needed to reach and maintain MD status.',
      duration: '50 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnd7spMIl7cmdASPKDVwuU18xgjXi5O4RQaH2I',
      section: 'Recruiting and Building',
      objectives: [
        'Understand MD requirements',
        'Learn success strategies',
        'Develop elite mindset',
        'Master advanced techniques'
      ],
      topics: [
        'MD Requirements',
        'Success Strategies',
        'Elite Mindset',
        'Advanced Techniques'
      ]
    },
    {
      id: 11,
      title: 'HOW TO SPEAK FROM STAGE',
      description: 'Master public speaking and presentation skills for leadership and training.',
      fullDescription: 'Public speaking and stage presence are essential skills for leaders in our industry. This training will help you overcome speaking fears, develop compelling presentations, and command attention when speaking to groups. You\'ll learn techniques for engaging audiences, structuring presentations, and delivering messages with confidence and impact.',
      duration: '40 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      section: 'Recruiting and Building',
      objectives: [
        'Overcome speaking fears',
        'Develop presentation skills',
        'Learn audience engagement',
        'Build stage presence'
      ],
      topics: [
        'Public Speaking',
        'Presentation Structure',
        'Audience Engagement',
        'Stage Presence'
      ]
    },
    {
      id: 12,
      title: 'HANDLING OFFICE DRAMA',
      description: 'Learn how to handle office politics and maintain a positive work environment.',
      fullDescription: 'Office dynamics and interpersonal conflicts are inevitable in any workplace. This training teaches you how to navigate office politics, resolve conflicts professionally, and maintain a positive work environment. You\'ll learn communication strategies, conflict resolution techniques, and how to stay focused on your goals despite workplace challenges.',
      duration: '30 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      section: 'Recruiting and Building',
      objectives: [
        'Navigate office politics',
        'Resolve conflicts professionally',
        'Maintain positive environment',
        'Stay focused on goals'
      ],
      topics: [
        'Office Politics',
        'Conflict Resolution',
        'Professional Communication',
        'Goal Focus'
      ]
    },
    {
      id: 13,
      title: 'MONEY',
      description: 'Understand money management, compensation structures, and financial planning.',
      fullDescription: 'Understanding money - how to earn it, manage it, and grow it - is fundamental to success in the financial services industry. This training covers compensation structures, money management principles, and financial planning strategies. You\'ll learn how to maximize your earnings and build long-term wealth.',
      duration: '35 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlmOrmln8EfQTV7ApbyFLmjY5GCZhaPcN4nzo',
      section: 'Recruiting and Building',
      objectives: [
        'Understand compensation structures',
        'Learn money management',
        'Develop financial planning skills',
        'Build wealth strategies'
      ],
      topics: [
        'Compensation Structure',
        'Money Management',
        'Financial Planning',
        'Wealth Building'
      ]
    },

    // Service and Sales Section
    {
      id: 14,
      title: 'TYPES OF LIFE INSURANCE',
      description: 'Comprehensive overview of all life insurance products and their applications.',
      fullDescription: 'Understanding the different types of life insurance is fundamental to serving your clients effectively. This comprehensive training covers term life, whole life, universal life, and indexed universal life insurance. You\'ll learn the features, benefits, and ideal applications for each product type, enabling you to make appropriate recommendations.',
      duration: '45 minutes',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWA9m6kwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      section: 'Service and Sales',
      objectives: [
        'Understand all life insurance types',
        'Learn product features and benefits',
        'Master product applications',
        'Make appropriate recommendations'
      ],
      topics: [
        'Term Life Insurance',
        'Whole Life Insurance',
        'Universal Life Insurance',
        'Product Comparisons'
      ]
    },
    {
      id: 15,
      title: 'Final Expense',
      description: 'Learn about final expense insurance and how to serve this important market.',
      fullDescription: 'Final expense insurance serves a critical need in the marketplace, providing affordable coverage for burial and final expenses. This training teaches you how to identify prospects, present final expense solutions, and serve this important market segment with dignity and professionalism.',
      duration: '30 minutes',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWyr2rmwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      section: 'Service and Sales',
      objectives: [
        'Understand final expense market',
        'Learn product features',
        'Master presentation techniques',
        'Serve clients with dignity'
      ],
      topics: [
        'Final Expense Basics',
        'Market Identification',
        'Product Presentation',
        'Client Service'
      ]
    },
    {
      id: 16,
      title: 'LIVING BENEFITS',
      description: 'Understand living benefits and how they add value to life insurance policies.',
      fullDescription: 'Living benefits are a powerful feature that allows policyholders to access their death benefit while still alive under certain circumstances. This training covers terminal illness, chronic illness, and critical illness benefits, teaching you how to present these valuable features and help clients understand their importance.',
      duration: '25 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnd7spMIl7cmdASPKDVwuU18xgjXi5O4RQaH2I',
      section: 'Service and Sales',
      objectives: [
        'Understand living benefits',
        'Learn benefit types',
        'Master presentation techniques',
        'Add value to policies'
      ],
      topics: [
        'Terminal Illness Benefits',
        'Chronic Illness Benefits',
        'Critical Illness Benefits',
        'Value Presentation'
      ]
    },
    {
      id: 17,
      title: 'ANNUITIES',
      description: 'Master annuity products and retirement planning strategies.',
      fullDescription: 'Annuities are complex but powerful retirement planning tools. This comprehensive training covers fixed annuities, indexed annuities, and variable annuities. You\'ll learn how to identify annuity prospects, present the benefits effectively, and help clients create guaranteed retirement income streams.',
      duration: '50 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      section: 'Service and Sales',
      objectives: [
        'Master annuity products',
        'Learn retirement planning',
        'Identify prospects',
        'Present benefits effectively'
      ],
      topics: [
        'Fixed Annuities',
        'Indexed Annuities',
        'Retirement Planning',
        'Income Strategies'
      ]
    },
    {
      id: 18,
      title: 'TAX Circles',
      description: 'Learn about tax implications and strategies for insurance and financial products.',
      fullDescription: 'Understanding tax implications is crucial for providing comprehensive financial advice. This training covers the tax treatment of life insurance, annuities, and other financial products. You\'ll learn how to present tax advantages to clients and help them make informed decisions about tax-efficient strategies.',
      duration: '40 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      section: 'Service and Sales',
      objectives: [
        'Understand tax implications',
        'Learn tax strategies',
        'Present tax advantages',
        'Make informed recommendations'
      ],
      topics: [
        'Tax Treatment of Insurance',
        'Tax-Deferred Growth',
        'Tax-Free Benefits',
        'Tax Strategies'
      ]
    },
    {
      id: 19,
      title: 'Tax Free Access',
      description: 'Understand tax-free access strategies for life insurance and retirement planning.',
      fullDescription: 'One of the most powerful features of permanent life insurance is the ability to access cash value on a tax-free basis. This training teaches you how to structure policies for maximum tax efficiency and help clients access their money without triggering taxable events.',
      duration: '35 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlmOrmln8EfQTV7ApbyFLmjY5GCZhaPcN4nzo',
      section: 'Service and Sales',
      objectives: [
        'Understand tax-free access',
        'Learn policy structuring',
        'Master access strategies',
        'Avoid taxable events'
      ],
      topics: [
        'Tax-Free Loans',
        'Withdrawal Strategies',
        'Policy Structure',
        'Tax Efficiency'
      ]
    },
    {
      id: 20,
      title: '7 SMART STATEMENTS',
      description: 'Master the 7 smart statements for effective client communication.',
      fullDescription: 'The 7 Smart Statements are proven conversation starters and objection handlers that help you communicate more effectively with prospects and clients. This training teaches you when and how to use each statement to build rapport, overcome objections, and move conversations forward productively.',
      duration: '30 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWA9m6kwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      section: 'Service and Sales',
      objectives: [
        'Master the 7 statements',
        'Learn effective communication',
        'Handle objections',
        'Build client rapport'
      ],
      topics: [
        'Smart Statements',
        'Communication Techniques',
        'Objection Handling',
        'Rapport Building'
      ]
    },
    {
      id: 21,
      title: 'CLIENT QUESTIONS',
      description: 'Learn how to handle common client questions and objections effectively.',
      fullDescription: 'Clients will always have questions and concerns about insurance products. This training prepares you to handle the most common questions and objections with confidence and professionalism. You\'ll learn how to turn questions into opportunities and address concerns in a way that builds trust and moves the sale forward.',
      duration: '40 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWyr2rmwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      section: 'Service and Sales',
      objectives: [
        'Handle common questions',
        'Address client concerns',
        'Build trust and confidence',
        'Turn objections into opportunities'
      ],
      topics: [
        'Common Questions',
        'Objection Handling',
        'Trust Building',
        'Sales Techniques'
      ]
    },
    {
      id: 22,
      title: 'X-CURVE',
      description: 'Understand the X-Curve methodology for client presentations and sales.',
      fullDescription: 'The X-Curve is our proprietary methodology for structuring client presentations and sales conversations. This training teaches you how to use this powerful framework to guide prospects through the decision-making process, address their concerns systematically, and close more sales effectively.',
      duration: '45 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnd7spMIl7cmdASPKDVwuU18xgjXi5O4RQaH2I',
      section: 'Service and Sales',
      objectives: [
        'Master X-Curve methodology',
        'Structure presentations',
        'Guide decision-making',
        'Improve closing rates'
      ],
      topics: [
        'X-Curve Framework',
        'Presentation Structure',
        'Decision Process',
        'Closing Techniques'
      ]
    },
    {
      id: 23,
      title: 'OFFENSE/ DEFENSE',
      description: 'Learn offensive and defensive strategies for sales and client retention.',
      fullDescription: 'Success in sales requires both offensive strategies for acquiring new clients and defensive strategies for retaining existing ones. This training teaches you how to balance both approaches, when to be aggressive in pursuing opportunities, and how to protect your client base from competition.',
      duration: '35 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      section: 'Service and Sales',
      objectives: [
        'Learn offensive strategies',
        'Master defensive techniques',
        'Balance acquisition and retention',
        'Protect client relationships'
      ],
      topics: [
        'Offensive Strategies',
        'Defensive Techniques',
        'Client Acquisition',
        'Client Retention'
      ]
    },
    {
      id: 24,
      title: 'Financial GOAL Setting',
      description: 'Help clients set and achieve their financial goals through proper planning.',
      fullDescription: 'Helping clients set and achieve financial goals is at the heart of what we do. This training teaches you how to conduct effective financial goal-setting sessions, help clients prioritize their objectives, and create actionable plans to achieve their dreams. You\'ll learn questioning techniques and planning strategies.',
      duration: '40 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      section: 'Service and Sales',
      objectives: [
        'Conduct goal-setting sessions',
        'Help clients prioritize',
        'Create actionable plans',
        'Master questioning techniques'
      ],
      topics: [
        'Goal Setting Process',
        'Client Questioning',
        'Financial Planning',
        'Action Planning'
      ]
    },
    {
      id: 25,
      title: 'How TO EARN $100k',
      description: 'Strategies and techniques to reach the $100,000 annual income milestone.',
      fullDescription: 'Earning $100,000 annually is a significant milestone that requires specific strategies and consistent execution. This training breaks down exactly what it takes to reach this income level, including activity requirements, skill development, and mindset shifts. You\'ll learn the proven path to six-figure success.',
      duration: '50 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlmOrmln8EfQTV7ApbyFLmjY5GCZhaPcN4nzo',
      section: 'Service and Sales',
      objectives: [
        'Learn $100k strategies',
        'Understand activity requirements',
        'Develop necessary skills',
        'Adopt success mindset'
      ],
      topics: [
        'Income Strategies',
        'Activity Management',
        'Skill Development',
        'Success Mindset'
      ]
    },
    {
      id: 26,
      title: 'How TO BE A strong, CFT',
      description: 'Learn how to become a strong and effective CFT (Certified Financial Trainer).',
      fullDescription: 'Becoming a Certified Financial Trainer (CFT) is an advanced designation that demonstrates your expertise and commitment to professional development. This training covers the requirements, skills, and mindset needed to achieve and maintain CFT status, including training others and leading by example.',
      duration: '45 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWA9m6kwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      section: 'Service and Sales',
      objectives: [
        'Understand CFT requirements',
        'Develop training skills',
        'Learn leadership techniques',
        'Maintain professional standards'
      ],
      topics: [
        'CFT Certification',
        'Training Skills',
        'Leadership Development',
        'Professional Standards'
      ]
    },
    {
      id: 27,
      title: 'BEST ANSWERS For Closers',
      description: 'Master the best responses and closing techniques for successful sales.',
      fullDescription: 'Closing is where sales are won or lost. This advanced training provides you with the best answers and responses for common closing situations. You\'ll learn how to handle final objections, create urgency, and guide prospects to make positive buying decisions with confidence and professionalism.',
      duration: '40 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWyr2rmwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      section: 'Service and Sales',
      objectives: [
        'Master closing techniques',
        'Handle final objections',
        'Create appropriate urgency',
        'Guide buying decisions'
      ],
      topics: [
        'Closing Techniques',
        'Objection Handling',
        'Urgency Creation',
        'Decision Making'
      ]
    },

    // Coming Soon Section
    {
      id: 101,
      title: 'RI (Coming Soon)',
      description: 'Learn the referral interview process to expand your client base through warm referrals.',
      fullDescription: 'The Referral Interview (RI) is a systematic approach to generating warm referrals from your existing clients. This upcoming training will teach you how to conduct professional referral interviews, ask for referrals effectively, and build a sustainable referral-based business model.',
      duration: '50 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ',
      section: 'Coming Soon',
      comingSoon: true,
      objectives: [
        'Master referral interview process',
        'Learn to ask for referrals',
        'Build referral-based business',
        'Expand client network'
      ],
      topics: [
        'Referral Interview Process',
        'Asking Techniques',
        'Referral Systems',
        'Network Building'
      ]
    },
    {
      id: 102,
      title: 'KTP 1 (Coming Soon)',
      description: 'Know The Person - Part 1: Understanding your clients deeply to provide personalized solutions.',
      fullDescription: 'Know The Person (KTP) Part 1 focuses on truly understanding your clients beyond just their financial needs. This training will teach you how to build deep relationships, understand client motivations, and gather the information needed to provide truly personalized financial solutions.',
      duration: '45 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ',
      section: 'Coming Soon',
      comingSoon: true,
      objectives: [
        'Build deep client relationships',
        'Understand client motivations',
        'Gather comprehensive information',
        'Provide personalized solutions'
      ],
      topics: [
        'Relationship Building',
        'Client Psychology',
        'Information Gathering',
        'Personalization'
      ]
    },
    {
      id: 103,
      title: 'KTP 2 (Coming Soon)',
      description: 'Know The Person - Part 2: Advanced client relationship building and needs analysis.',
      fullDescription: 'KTP Part 2 builds on the foundation from Part 1, diving deeper into advanced relationship building and comprehensive needs analysis. You\'ll learn sophisticated questioning techniques, how to uncover hidden needs, and strategies for becoming a trusted advisor to your clients.',
      duration: '45 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ',
      section: 'Coming Soon',
      comingSoon: true,
      objectives: [
        'Advanced relationship building',
        'Comprehensive needs analysis',
        'Uncover hidden needs',
        'Become trusted advisor'
      ],
      topics: [
        'Advanced Questioning',
        'Needs Analysis',
        'Trust Building',
        'Advisory Relationship'
      ]
    },
    {
      id: 104,
      title: 'FS (Coming Soon)',
      description: 'Conduct comprehensive financial surveys to identify client needs and opportunities.',
      fullDescription: 'The Financial Survey (FS) is a systematic approach to understanding a client\'s complete financial picture. This training will teach you how to conduct thorough financial surveys, identify opportunities, and position appropriate solutions based on comprehensive client analysis.',
      duration: '1 hour',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ',
      section: 'Coming Soon',
      comingSoon: true,
      objectives: [
        'Conduct financial surveys',
        'Identify opportunities',
        'Analyze client situations',
        'Position appropriate solutions'
      ],
      topics: [
        'Financial Survey Process',
        'Opportunity Identification',
        'Client Analysis',
        'Solution Positioning'
      ]
    },
    {
      id: 105,
      title: 'What We Do (Coming Soon)',
      description: 'Understand our products, services, and how to communicate our value proposition.',
      fullDescription: 'Understanding exactly what we do and how to communicate our value proposition is fundamental to success. This training will provide a comprehensive overview of all our products and services, and teach you how to present our value proposition clearly and compellingly to prospects.',
      duration: '1 hour',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ',
      section: 'Coming Soon',
      comingSoon: true,
      objectives: [
        'Understand all products/services',
        'Learn value proposition',
        'Master communication techniques',
        'Present compelling offers'
      ],
      topics: [
        'Product Overview',
        'Service Portfolio',
        'Value Proposition',
        'Communication Skills'
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

              {/* Section Badge */}
              <div className="mb-4">
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  training.section === 'Recruiting and Building' ? 'bg-blue-100 text-blue-800' :
                  training.section === 'Service and Sales' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {training.section}
                </span>
              </div>

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
                        className={`w-full h-64 object-cover ${training.comingSoon ? 'grayscale' : ''}`}
                      />
                      <div className={`absolute inset-0 ${training.comingSoon ? 'bg-black bg-opacity-60' : 'bg-black bg-opacity-40'} flex items-center justify-center`}>
                        {training.comingSoon ? (
                          <div className="text-center">
                            <Clock className="h-8 w-8 text-white mx-auto mb-2" />
                            <span className="text-white font-medium">Coming Soon</span>
                          </div>
                        ) : (
                          <button className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all">
                            <Play className="h-8 w-8 text-gray-900 ml-1" />
                          </button>
                        )}
                      </div>
                    </>
                  )}
                  {isCompleted && !training.comingSoon && (
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
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{training.instructor}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{training.duration}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          training.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          training.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {training.difficulty}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{training.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Completion Toggle - Only show for available trainings */}
                  {!training.comingSoon && (
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
                  )}

                  {/* Coming Soon Message */}
                  {training.comingSoon && (
                    <div className="pt-6 border-t border-gray-200">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <Clock className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 font-medium">This training is coming soon!</p>
                        <p className="text-gray-500 text-sm">We're working hard to bring you this content. Check back soon for updates.</p>
                      </div>
                    </div>
                  )}
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
                        <span className="text-gray-600">Section:</span>
                        <span className="font-medium text-gray-900">{training.section}</span>
                      </div>
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
                        <span className="text-gray-600">Instructor:</span>
                        <span className="font-medium text-gray-900">{training.instructor}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-900">{training.rating}</span>
                        </div>
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
                  <div className={`rounded-xl p-6 text-center ${
                    training.comingSoon 
                      ? 'bg-gray-100' 
                      : 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                  }`}>
                    {training.comingSoon ? (
                      <>
                        <h3 className="text-lg font-bold text-gray-600 mb-2">Coming Soon</h3>
                        <p className="text-gray-500 mb-4 text-sm">This training will be available soon.</p>
                        <button 
                          disabled
                          className="bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-medium cursor-not-allowed w-full"
                        >
                          Not Available Yet
                        </button>
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-bold text-black mb-2">Ready to Start?</h3>
                        <p className="text-black mb-4 text-sm">Begin this training and advance your career with EIB Agency.</p>
                        <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors w-full">
                          {training.video ? 'Watch Training' : 'Start Training'}
                        </button>
                      </>
                    )}
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