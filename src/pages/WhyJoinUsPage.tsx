import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Award, Users, TrendingUp, DollarSign, Clock, Shield, Target, Briefcase, Star, CheckCircle, ArrowRight } from 'lucide-react';

const WhyJoinUsPage = () => {
  const benefitCategories = [
    {
      icon: Award,
      title: 'Training & Certification',
      description: 'Comprehensive training program to set you up for success from day one.',
      items: ['State Licensing Support', 'Classroom Training', '1-on-1 Mentoring', 'Ongoing Education', 'PHP Agency Certification']
    },
    {
      icon: Users,
      title: 'Leadership Development',
      description: 'Develop your leadership skills and advance your career with our proven programs.',
      items: ['Mentorship Programs', 'Team Retreats', 'National Conference', 'Leadership Workshops', 'Career Advancement']
    },
    {
      icon: TrendingUp,
      title: 'Growth Opportunities',
      description: 'Multiple career paths and unlimited earning potential in a growing industry.',
      items: ['Flexible Schedule', 'Professional Agent Track', 'Agency Builder Path', 'Management Opportunities', 'Ownership Potential']
    }
  ];

  const compensationStructure = [
    {
      level: 'New Agent',
      commission: '50-60%',
      description: 'Starting commission rate with full training and support',
      features: ['Full training program', 'Dedicated mentor', 'Lead generation support', 'Marketing materials']
    },
    {
      level: 'Professional Agent',
      commission: '65-75%',
      description: 'Experienced agents with proven track record',
      features: ['Higher commission rates', 'Advanced training', 'Team building opportunities', 'Performance bonuses']
    },
    {
      level: 'Agency Builder',
      commission: '80%+',
      description: 'Top performers building their own teams',
      features: ['Maximum commission rates', 'Override income', 'Leadership training', 'Equity opportunities']
    }
  ];

  const supportServices = [
    {
      icon: Shield,
      title: 'Training System',
      description: 'Weekly live training at local offices.'
    },
    {
      icon: Target,
      title: 'Marketing System',
      description: 'Marketing support through our matchup system.'
    },
    {
      icon: Briefcase,
      title: 'Business Tools',
      description: 'Advanced technology to run your business efficiently.'
    },
    {
      icon: Star,
      title: 'Recognition Program',
      description: 'Awards, incentives, and recognition for top performers.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      position: 'Senior Agent',
      quote: '',
      image: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4'
    },
    {
      name: 'Michael Rodriguez',
      position: 'Agency Builder',
      quote: '',
      image: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz'
    },
    {
      name: 'Jennifer Chen',
      position: 'Professional Agent',
      quote: '',
      image: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4'
    }
  ];

  const careerPaths = [
    {
      title: 'Professional Agent',
      description: 'Focus on building your personal client base and maximizing your income',
      timeline: '6-12 months',
      income: '$75K - $150K+',
      requirements: ['Complete training program', 'Obtain state license', 'Build client base']
    },
    {
      title: 'Team Leader',
      description: 'Recruit and mentor new agents while growing your own business',
      timeline: '12-24 months',
      income: '$100K - $300K+',
      requirements: ['Proven sales track record', 'Leadership training', 'Team building skills']
    },
    {
      title: 'Agency Builder',
      description: 'Build and manage your own agency with equity opportunities',
      timeline: '24+ months',
      income: '$200K - $500K+',
      requirements: ['Management experience', 'Large team development', 'Business ownership mindset']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">EIB Agency?</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We provide the tools, training, and support you need
            </p>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
               to be successful in the insurance industry. 
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">2-4 Weeks</div>
              <div className="text-gray-700"> To Get Licensed</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">50+</div>
              <div className="text-gray-700">Expert Agents</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">24/7</div>
              <div className="text-gray-700">Support</div>
            </div>
          </div>
        </div>
      </section>

    
      {/* Support Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">Comprehensive Support System</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We provide everything you need to succeed, from initial training to ongoing business support from local mentorship.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
                  <div className="text-2xl font-bold text-black mb-1">24/7</div>
                  <div className="text-gray-600 text-sm">Support Available</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
                  <div className="text-2xl font-bold text-black mb-1">100%</div>
                  <div className="text-gray-600 text-sm">Success Focused</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnxTwVznj8nPdEtGfq7DY61RclV3ZMWb9pQgo2"
                  alt="Team collaboration and support"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl shadow-xl">
                <div className="text-black font-bold text-lg">Team</div>
                <div className="text-black font-bold text-lg">Support</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportServices.map((service, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <service.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-lg font-bold text-black mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

        
      
      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Why Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">EIB Agency?</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear directly from our founder Jason Graziani about what makes EIB Agency special and why you should join our team.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="relative">
                <video
                  controls
                  className="w-full aspect-video object-cover"
                  poster="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4"
                >
                  <source src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnryYBWL9IxL6na5HN8Cmj2VAkDRBdih9JyY4u" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <div className="p-8 text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="h-12 w-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-lg">JG</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-black">Jason Graziani</h3>
                    <p className="text-yellow-600 font-semibold">Founder & CEO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We provide the tools, training, and support you need to be successful in the insurance industry.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="/contact"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-colors duration-300 flex items-center space-x-2"
            >
              <span>Apply Today</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="tel:(972)805-1002"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-black transition-all duration-300"
            >
              Call (972) 805-1002
            </a>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-gray-300">Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">100%</div>
              <div className="text-gray-300">Success Focused</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">Unlimited</div>
              <div className="text-gray-300">Growth Opportunities</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhyJoinUsPage;