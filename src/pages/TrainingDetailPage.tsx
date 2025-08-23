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

  // Recruiting and Building Section
  const recruitingAndBuildingTrainings = [
    {
      id: 1,
      title: 'Welcome',
      description: 'Introduction to EIB Team, our mission, values, and what to expect in your journey with us.',
      fullDescription: 'Welcome to EIB Agency! This comprehensive introduction training will walk you through our company mission, core values, and what you can expect as you begin your journey with us. You\'ll learn about our history, our commitment to excellence, and how we support our agents in achieving their goals.',
      duration: '30 minutes',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOncjwWJYXABiZ5cudwgVeLkIK6oqazNlQhtEn2', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlmOrmln8EfQTV7ApbyFLmjY5GCZhaPcN4nzo',
      objectives: [
        'Understand EIB Team\'s mission and values',
        'Learn about company history and culture',
        'Discover available support systems',
        'Set expectations for your journey'
      ],
      topics: [
        'Company Overview',
        'Mission & Values',
        'Support Systems',
        'Getting Started'
      ],
      section: 'Recruiting and Building'
    },
    {
      id: 2,
      title: 'Builders Mindset',
      description: 'Develop the entrepreneurial mindset needed to build a successful insurance business.',
      fullDescription: 'Building a successful insurance business requires more than just product knowledge - it requires an entrepreneurial mindset. This training will help you develop the mental framework needed to think like a business owner, take calculated risks, and build long-term success.',
      duration: '20 minutes',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnwlRDPoMy1pgcSeV6YWjXk7P5qlCr3doJtfQF', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWA9m6kwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
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
      ],
      section: 'Recruiting and Building'
    },
    {
      id: 3,
      title: '8 Expectations',
      description: 'Learn the 8 key expectations for success in the insurance industry.',
      fullDescription: 'Success in the insurance industry requires understanding and meeting specific expectations. This training outlines the 8 fundamental expectations that every successful agent must embrace to build a thriving business and serve clients effectively.',
      duration: '25 minutes',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWLzdc3n8EfQTV7ApbyFLmjY5GCZhaPcN4nz', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWyr2rmwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      objectives: [
        'Understand the 8 key expectations',
        'Learn professional standards',
        'Develop accountability mindset',
        'Build success habits'
      ],
      topics: [
        'Professional Standards',
        'Accountability',
        'Success Habits',
        'Performance Expectations'
      ],
      section: 'Recruiting and Building'
    },
    {
      id: 4,
      title: 'Goal Settings',
      description: 'Create actionable goals and develop a comprehensive business plan for success.',
      fullDescription: 'Goal setting is the foundation of success in any business. This comprehensive training will guide you through creating SMART goals, developing action plans, and building a business plan that will drive your success in the insurance industry.',
      duration: '1.5 hours',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnPNglm3EAdscr0bGLESYikhm9wWV6MUX84gjF', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnd7spMIl7cmdASPKDVwuU18xgjXi5O4RQaH2I',
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
      ],
      section: 'Recruiting and Building'
    },
    {
      id: 5,
      title: '6 Steps of our Business',
      description: 'Master the 6-step process for client acquisition and appointment scheduling.',
      fullDescription: 'Client acquisition is the lifeblood of any successful insurance business. This training breaks down our proven 6-step process for finding, qualifying, and scheduling appointments with potential clients.',
      duration: '30 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnKzAH3dacAFKG9eElgqCBYdjR8u1wULtHy6cQ', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
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
      ],
      section: 'Recruiting and Building'
    },
    {
      id: 6,
      title: 'How a Part Timer',
      description: 'Learn how to succeed as a part-time agent and maximize your earning potential.',
      fullDescription: 'Not everyone can start full-time in the insurance business. This training shows you how to build a successful part-time insurance business while maintaining other commitments, and how to transition to full-time when ready.',
      duration: '35 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnpJhWUMF6DARSxfOkQHXiIBqK1FClcrjMG02u', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      objectives: [
        'Learn part-time success strategies',
        'Maximize limited time efficiency',
        'Balance multiple commitments',
        'Plan transition to full-time'
      ],
      topics: [
        'Time Management',
        'Part-time Strategies',
        'Efficiency Techniques',
        'Transition Planning'
      ],
      section: 'Recruiting and Building'
    },
    {
      id: 7,
      title: 'Captain System',
      description: 'Understand the captain system and how to lead and manage your team effectively.',
      fullDescription: 'The captain system is a unique leadership structure that helps agents develop leadership skills while building their teams. Learn how to become an effective captain and lead your team to success.',
      duration: '40 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOndfzndSLl7cmdASPKDVwuU18xgjXi5O4RQaH2', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlmOrmln8EfQTV7ApbyFLmjY5GCZhaPcN4nzo',
      objectives: [
        'Understand the captain system',
        'Develop leadership skills',
        'Learn team management',
        'Build effective teams'
      ],
      topics: [
        'Leadership Structure',
        'Team Management',
        'Captain Responsibilities',
        'Team Building'
      ],
      section: 'Recruiting and Building'
    },
    {
      id: 8,
      title: 'EXCHANGE Prince',
      description: 'Master the exchange process and become a prince of exchanges.',
      fullDescription: 'The exchange process is a critical skill for advanced agents. Learn how to identify exchange opportunities, navigate the process, and become a master of insurance exchanges to better serve your clients.',
      duration: '30 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWA9m6kwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      objectives: [
        'Master exchange processes',
        'Identify exchange opportunities',
        'Navigate complex transactions',
        'Serve clients effectively'
      ],
      topics: [
        'Exchange Fundamentals',
        'Process Navigation',
        'Client Service',
        'Advanced Techniques'
      ],
      section: 'Recruiting and Building'
    },
    {
      id: 9,
      title: 'Being A LEADER',
      description: 'Develop leadership skills and learn how to inspire and motivate your team.',
      fullDescription: 'Leadership is essential for long-term success in the insurance industry. This training focuses on developing the leadership skills needed to inspire, motivate, and guide your team to achieve extraordinary results.',
      duration: '45 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWyr2rmwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      objectives: [
        'Develop leadership skills',
        'Learn to inspire others',
        'Master team motivation',
        'Build leadership presence'
      ],
      topics: [
        'Leadership Principles',
        'Team Inspiration',
        'Motivation Techniques',
        'Leadership Presence'
      ],
      section: 'Recruiting and Building'
    },
    {
      id: 10,
      title: 'HOW TO HIT MD',
      description: 'Learn the strategies and techniques to achieve Managing Director status.',
      fullDescription: 'Managing Director is the pinnacle of achievement in our organization. This training reveals the strategies, mindset, and techniques required to reach MD status and lead at the highest level.',
      duration: '50 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnd7spMIl7cmdASPKDVwuU18xgjXi5O4RQaH2I',
      objectives: [
        'Understand MD requirements',
        'Learn advanced strategies',
        'Develop leadership mindset',
        'Master high-level skills'
      ],
      topics: [
        'MD Requirements',
        'Advanced Strategies',
        'Leadership Development',
        'High-Level Skills'
      ],
      section: 'Recruiting and Building'
    },
    {
      id: 11,
      title: 'HOW TO SPEAK FROM STAGE',
      description: 'Master public speaking and presentation skills for leadership and training.',
      fullDescription: 'Public speaking is a crucial skill for leaders in our industry. This training teaches you how to speak confidently from stage, deliver compelling presentations, and inspire audiences through effective communication.',
      duration: '40 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      objectives: [
        'Master public speaking',
        'Develop presentation skills',
        'Build stage confidence',
        'Inspire audiences'
      ],
      topics: [
        'Public Speaking',
        'Presentation Skills',
        'Stage Presence',
        'Audience Engagement'
      ],
      section: 'Recruiting and Building'
    },
    {
      id: 12,
      title: 'HANDLING OFFICE DRAMA',
      description: 'Learn how to handle office politics and maintain a positive work environment.',
      fullDescription: 'Office dynamics can impact productivity and team morale. This training teaches you how to navigate office politics, resolve conflicts, and maintain a positive, productive work environment for everyone.',
      duration: '30 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      objectives: [
        'Navigate office politics',
        'Resolve conflicts effectively',
        'Maintain positive environment',
        'Build team harmony'
      ],
      topics: [
        'Conflict Resolution',
        'Office Politics',
        'Team Dynamics',
        'Positive Environment'
      ],
      section: 'Recruiting and Building'
    },
    {
      id: 13,
      title: 'MONEY',
      description: 'Understand money management, compensation structures, and financial planning.',
      fullDescription: 'Understanding money and compensation is crucial for your success. This training covers compensation structures, money management principles, and financial planning strategies to help you maximize your earnings and build wealth.',
      duration: '35 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlmOrmln8EfQTV7ApbyFLmjY5GCZhaPcN4nzo',
      objectives: [
        'Understand compensation structures',
        'Learn money management',
        'Develop financial planning skills',
        'Maximize earning potential'
      ],
      topics: [
        'Compensation Structure',
        'Money Management',
        'Financial Planning',
        'Wealth Building'
      ],
      section: 'Recruiting and Building'
    }
  ];

  // Service and Sales Section
  const serviceAndSalesTrainings = [
    {
      id: 14,
      title: 'TYPES OF LIFE INSURANCE',
      description: 'Comprehensive overview of all life insurance products and their applications.',
      fullDescription: 'Understanding the different types of life insurance is fundamental to serving your clients effectively. This comprehensive training covers term, whole life, universal life, and indexed universal life insurance, helping you match the right product to each client\'s needs.',
      duration: '45 minutes',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWA9m6kwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      objectives: [
        'Understand all life insurance types',
        'Learn product applications',
        'Match products to client needs',
        'Master product positioning'
      ],
      topics: [
        'Term Life Insurance',
        'Whole Life Insurance',
        'Universal Life Insurance',
        'Product Comparison'
      ],
      section: 'Service and Sales'
    },
    {
      id: 15,
      title: 'Final Expense',
      description: 'Learn about final expense insurance and how to serve this important market.',
      fullDescription: 'Final expense insurance serves a crucial market need, helping families cover burial and final expenses. Learn how to identify prospects, present solutions, and serve this important market segment with compassion and professionalism.',
      duration: '30 minutes',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWyr2rmwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      objectives: [
        'Understand final expense market',
        'Learn compassionate selling',
        'Master product positioning',
        'Serve families effectively'
      ],
      topics: [
        'Final Expense Market',
        'Product Features',
        'Compassionate Selling',
        'Family Service'
      ],
      section: 'Service and Sales'
    },
    {
      id: 16,
      title: 'LIVING BENEFITS',
      description: 'Understand living benefits and how they add value to life insurance policies.',
      fullDescription: 'Living benefits are a powerful feature that allows policyholders to access their death benefit while living in cases of terminal, chronic, or critical illness. Learn how to present and position these valuable benefits.',
      duration: '25 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnd7spMIl7cmdASPKDVwuU18xgjXi5O4RQaH2I',
      objectives: [
        'Understand living benefits',
        'Learn benefit triggers',
        'Master value presentation',
        'Position benefits effectively'
      ],
      topics: [
        'Living Benefits Overview',
        'Benefit Triggers',
        'Value Proposition',
        'Client Presentation'
      ],
      section: 'Service and Sales'
    },
    {
      id: 17,
      title: 'ANNUITIES',
      description: 'Master annuity products and retirement planning strategies.',
      fullDescription: 'Annuities are essential retirement planning tools that provide guaranteed income and principal protection. This comprehensive training covers fixed and indexed annuities, helping you serve clients\' retirement needs effectively.',
      duration: '50 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      objectives: [
        'Master annuity products',
        'Understand retirement planning',
        'Learn income strategies',
        'Serve retirement needs'
      ],
      topics: [
        'Fixed Annuities',
        'Indexed Annuities',
        'Retirement Planning',
        'Income Strategies'
      ],
      section: 'Service and Sales'
    },
    {
      id: 18,
      title: 'TAX Circles',
      description: 'Learn about tax implications and strategies for insurance and financial products.',
      fullDescription: 'Understanding tax implications is crucial for effective financial planning. This training covers tax strategies, implications of different insurance products, and how to help clients minimize their tax burden while maximizing benefits.',
      duration: '40 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      objectives: [
        'Understand tax implications',
        'Learn tax strategies',
        'Master tax-efficient planning',
        'Help clients minimize taxes'
      ],
      topics: [
        'Tax Implications',
        'Tax Strategies',
        'Tax-Efficient Planning',
        'Tax Minimization'
      ],
      section: 'Service and Sales'
    },
    {
      id: 19,
      title: 'Tax Free Access',
      description: 'Understand tax-free access strategies for life insurance and retirement planning.',
      fullDescription: 'Life insurance offers unique tax-free access opportunities that can enhance retirement planning. Learn how to structure policies for tax-free access and help clients maximize their tax advantages.',
      duration: '35 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlmOrmln8EfQTV7ApbyFLmjY5GCZhaPcN4nzo',
      objectives: [
        'Understand tax-free access',
        'Learn policy structuring',
        'Master tax advantages',
        'Enhance retirement planning'
      ],
      topics: [
        'Tax-Free Access',
        'Policy Structure',
        'Tax Advantages',
        'Retirement Enhancement'
      ],
      section: 'Service and Sales'
    },
    {
      id: 20,
      title: '7 SMART STATEMENTS',
      description: 'Master the 7 smart statements for effective client communication.',
      fullDescription: 'Effective communication is key to successful sales. Learn the 7 smart statements that help you connect with clients, build trust, and guide them toward making informed decisions about their insurance needs.',
      duration: '30 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWA9m6kwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      objectives: [
        'Master the 7 smart statements',
        'Improve client communication',
        'Build trust effectively',
        'Guide client decisions'
      ],
      topics: [
        'Smart Statements',
        'Client Communication',
        'Trust Building',
        'Decision Guidance'
      ],
      section: 'Service and Sales'
    },
    {
      id: 21,
      title: 'CLIENT QUESTIONS',
      description: 'Learn how to handle common client questions and objections effectively.',
      fullDescription: 'Clients will have questions and objections throughout the sales process. This training prepares you to handle the most common questions with confidence, providing clear, helpful answers that move the conversation forward.',
      duration: '40 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWyr2rmwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      objectives: [
        'Handle client questions',
        'Overcome objections',
        'Build confidence',
        'Move conversations forward'
      ],
      topics: [
        'Common Questions',
        'Objection Handling',
        'Confidence Building',
        'Conversation Management'
      ],
      section: 'Service and Sales'
    },
    {
      id: 22,
      title: 'X-CURVE',
      description: 'Understand the X-Curve methodology for client presentations and sales.',
      fullDescription: 'The X-Curve is a powerful presentation methodology that helps you structure client meetings for maximum impact. Learn how to use this proven system to improve your closing rates and client satisfaction.',
      duration: '45 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnd7spMIl7cmdASPKDVwuU18xgjXi5O4RQaH2I',
      objectives: [
        'Master X-Curve methodology',
        'Structure effective presentations',
        'Improve closing rates',
        'Enhance client satisfaction'
      ],
      topics: [
        'X-Curve System',
        'Presentation Structure',
        'Closing Techniques',
        'Client Satisfaction'
      ],
      section: 'Service and Sales'
    },
    {
      id: 23,
      title: 'OFFENSE/ DEFENSE',
      description: 'Learn offensive and defensive strategies for sales and client retention.',
      fullDescription: 'Success in sales requires both offensive strategies for acquiring new clients and defensive strategies for retaining existing ones. Learn how to balance both approaches for sustainable business growth.',
      duration: '35 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz',
      objectives: [
        'Learn offensive strategies',
        'Master defensive techniques',
        'Balance acquisition and retention',
        'Build sustainable growth'
      ],
      topics: [
        'Offensive Strategies',
        'Defensive Techniques',
        'Client Acquisition',
        'Client Retention'
      ],
      section: 'Service and Sales'
    },
    {
      id: 24,
      title: 'Financial GOAL Setting',
      description: 'Help clients set and achieve their financial goals through proper planning.',
      fullDescription: 'Helping clients set and achieve financial goals is at the heart of what we do. Learn how to conduct effective financial goal-setting sessions and create actionable plans that lead to client success.',
      duration: '40 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4',
      objectives: [
        'Help clients set financial goals',
        'Create actionable plans',
        'Track progress effectively',
        'Ensure client success'
      ],
      topics: [
        'Financial Goal Setting',
        'Action Planning',
        'Progress Tracking',
        'Client Success'
      ],
      section: 'Service and Sales'
    },
    {
      id: 25,
      title: 'How TO EARN $100k',
      description: 'Strategies and techniques to reach the $100,000 annual income milestone.',
      fullDescription: 'Earning $100,000 annually is a significant milestone that requires specific strategies and consistent execution. This training reveals the exact steps and mindset needed to reach and exceed this income level.',
      duration: '50 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlmOrmln8EfQTV7ApbyFLmjY5GCZhaPcN4nzo',
      objectives: [
        'Learn $100k strategies',
        'Develop success mindset',
        'Master execution techniques',
        'Exceed income goals'
      ],
      topics: [
        'Income Strategies',
        'Success Mindset',
        'Execution Techniques',
        'Goal Achievement'
      ],
      section: 'Service and Sales'
    },
    {
      id: 26,
      title: 'How TO BE A strong, CFT',
      description: 'Learn how to become a strong and effective CFT (Certified Financial Trainer).',
      fullDescription: 'Becoming a Certified Financial Trainer (CFT) is a significant achievement that opens new opportunities. Learn the skills, knowledge, and mindset required to become a strong CFT and train others effectively.',
      duration: '45 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWA9m6kwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      objectives: [
        'Understand CFT requirements',
        'Develop training skills',
        'Master financial concepts',
        'Train others effectively'
      ],
      topics: [
        'CFT Requirements',
        'Training Skills',
        'Financial Concepts',
        'Effective Training'
      ],
      section: 'Service and Sales'
    },
    {
      id: 27,
      title: 'BEST ANSWERS For Closers',
      description: 'Master the best responses and closing techniques for successful sales.',
      fullDescription: 'Closing is where sales are won or lost. This advanced training provides you with the best answers and closing techniques used by top performers, helping you convert more prospects into clients.',
      duration: '40 minutes',
      difficulty: 'Advanced',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWyr2rmwDoEgx6u7dLy8etIN1pvK3aPWcf5AR',
      objectives: [
        'Master closing techniques',
        'Learn best responses',
        'Improve conversion rates',
        'Handle final objections'
      ],
      topics: [
        'Closing Techniques',
        'Best Responses',
        'Conversion Strategies',
        'Objection Handling'
      ],
      section: 'Service and Sales'
    }
  ];

  // Coming Soon Section
  const comingSoonTrainings = [
    {
      id: 101,
      title: 'RI (Coming Soon)',
      description: 'Learn the referral interview process to expand your client base through warm referrals.',
      fullDescription: 'The Referral Interview (RI) is a powerful technique for generating warm leads from existing clients. This training will teach you how to conduct effective referral interviews and build a sustainable referral-based business.',
      duration: '50 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ',
      objectives: [
        'Master referral interview process',
        'Generate warm leads',
        'Build referral-based business',
        'Expand client base effectively'
      ],
      topics: [
        'Referral Interview Process',
        'Warm Lead Generation',
        'Referral Systems',
        'Client Base Expansion'
      ],
      section: 'Coming Soon',
      comingSoon: true
    },
    {
      id: 102,
      title: 'KTP 1 (Coming Soon)',
      description: 'Know The Person - Part 1: Understanding your clients deeply to provide personalized solutions.',
      fullDescription: 'Know The Person (KTP) Part 1 focuses on understanding your clients at a deeper level. Learn how to uncover their true needs, motivations, and concerns to provide truly personalized insurance solutions.',
      duration: '45 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ',
      objectives: [
        'Understand clients deeply',
        'Uncover true needs',
        'Identify motivations',
        'Provide personalized solutions'
      ],
      topics: [
        'Client Understanding',
        'Needs Analysis',
        'Motivation Discovery',
        'Personalization'
      ],
      section: 'Coming Soon',
      comingSoon: true
    },
    {
      id: 103,
      title: 'KTP 2 (Coming Soon)',
      description: 'Know The Person - Part 2: Advanced client relationship building and needs analysis.',
      fullDescription: 'KTP Part 2 builds on the foundation from Part 1, diving deeper into advanced relationship building techniques and sophisticated needs analysis methods for complex client situations.',
      duration: '45 minutes',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ',
      objectives: [
        'Master advanced relationship building',
        'Conduct sophisticated needs analysis',
        'Handle complex situations',
        'Deepen client connections'
      ],
      topics: [
        'Advanced Relationship Building',
        'Sophisticated Needs Analysis',
        'Complex Situations',
        'Deep Client Connections'
      ],
      section: 'Coming Soon',
      comingSoon: true
    },
    {
      id: 104,
      title: 'FS (Coming Soon)',
      description: 'Conduct comprehensive financial surveys to identify client needs and opportunities.',
      fullDescription: 'The Financial Survey (FS) is a comprehensive tool for understanding your clients\' complete financial picture. Learn how to conduct thorough financial surveys that uncover opportunities and build stronger client relationships.',
      duration: '1 hour',
      difficulty: 'Intermediate',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ',
      objectives: [
        'Conduct comprehensive financial surveys',
        'Understand complete financial picture',
        'Identify opportunities',
        'Build stronger relationships'
      ],
      topics: [
        'Financial Survey Process',
        'Comprehensive Analysis',
        'Opportunity Identification',
        'Relationship Building'
      ],
      section: 'Coming Soon',
      comingSoon: true
    },
    {
      id: 105,
      title: 'What We Do (Coming Soon)',
      description: 'Understand our products, services, and how to communicate our value proposition.',
      fullDescription: 'Understanding what we do and how to communicate our value proposition is fundamental to success. This training covers our complete product portfolio and teaches you how to articulate our value to prospects and clients.',
      duration: '1 hour',
      difficulty: 'Beginner',
      rating: 5.0,
      instructor: 'Jason Graziani',
      video: '', // To be integrated
      thumbnail: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ',
      objectives: [
        'Understand our complete offering',
        'Master value proposition',
        'Communicate effectively',
        'Articulate benefits clearly'
      ],
      topics: [
        'Product Portfolio',
        'Value Proposition',
        'Effective Communication',
        'Benefit Articulation'
      ],
      section: 'Coming Soon',
      comingSoon: true
    }
  ];

  // Combine all trainings
  const allTrainings = [
    ...recruitingAndBuildingTrainings,
    ...serviceAndSalesTrainings,
    ...comingSoonTrainings
  ];

  const training = allTrainings.find(t => t.id === parseInt(id || '0'));

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
    if (!currentUser || !training || training.comingSoon) return;

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

  const getSectionColor = (section: string) => {
    switch (section) {
      case 'Recruiting and Building': return 'bg-blue-100 text-blue-800';
      case 'Service and Sales': return 'bg-green-100 text-green-800';
      case 'Coming Soon': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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
              <button
                onClick={() => navigate('/trainings')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Trainings</span>
              </button>

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
                      <div className="flex items-center space-x-3 mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">{training.title}</h1>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSectionColor(training.section)}`}>
                          {training.section}
                        </span>
                      </div>
                      
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

                  {/* Completion Toggle */}
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

                  {training.comingSoon && (
                    <div className="pt-6 border-t border-gray-200">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium text-gray-700">This training is coming soon</p>
                            <p className="text-sm text-gray-600">We're working on bringing you this content. Check back soon!</p>
                          </div>
                        </div>
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
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSectionColor(training.section)}`}>
                          {training.section}
                        </span>
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
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-900">{training.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Instructor:</span>
                        <span className="font-medium text-gray-900">{training.instructor}</span>
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
                      ? 'bg-gray-100 border border-gray-200' 
                      : 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                  }`}>
                    {training.comingSoon ? (
                      <>
                        <h3 className="text-lg font-bold text-gray-700 mb-2">Coming Soon</h3>
                        <p className="text-gray-600 mb-4 text-sm">This training will be available soon.</p>
                        <button 
                          disabled
                          className="bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-medium w-full cursor-not-allowed"
                        >
                          Not Available Yet
                        </button>
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-bold text-black mb-2">Ready to Start?</h3>
                        <p className="text-black mb-4 text-sm">Begin this training and advance your career with EIB Agency.</p>
                        <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors w-full">
                          Start Training
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