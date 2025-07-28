import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, Target, Award, Users, MapPin, Phone, Mail } from 'lucide-react';
import { Timeline } from '../components/ui/timeline';

const AboutPage = () => {
  const features = [
    {
      icon: Shield,
      title: 'PHP Agency Partner',
      description: 'As a leading insurance brokerage, we leverage proven systems, training, and support to help our agents achieve extraordinary success.',
    },
    {
      icon: Target,
      title: 'Market Focus',
      description: 'Deep understanding of the Texas insurance market, local regulations, and the unique needs of DFW businesses and families.',
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Consistently ranked among the top PHP Agency partners in the region with exceptional client satisfaction and retention rates.',
    },
    {
      icon: Users,
      title: 'Team Approach',
      description: 'Collaborative environment where experienced agents mentor newcomers using PHP Agency\'s time-tested methodologies.',
    },
  ];

  const timeline = [
    {
      year: '2007',
      title: 'EIB Founded',
      description: 'Jason and Nataly Graziani founded Excellence in Building with a mission to serve people and treat them right.'
    },
    {
      year: '2010',
      title: 'PHP Partnership',
      description: 'Established partnerships with leading insurance carriers, gaining access to proven systems and training methodologies.'
    },
    {
      year: '2015',
      title: 'Texas Expansion',
      description: 'Expanded operations throughout Texas, establishing a strong presence in the Dallas-Fort Worth market.'
    },
    {
      year: '2020',
      title: 'Digital Innovation',
      description: 'Implemented cutting-edge technology and remote capabilities to better serve clients and agents.'
    },
    {
      year: '2024',
      title: 'Industry Leader',
      description: 'Recognized as one of the top insurance brokerages with over 15,000 families protected nationwide.'
    }
  ];

  const timelineData = [
    {
      title: '2007',
      content: (
        <div>
          <h4 className="text-xl font-bold text-black mb-4">EIB Founded</h4>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Jason and Nataly Graziani founded Excellence in Building with a mission to serve people and treat them right. 
            Starting with a vision to provide families with financial solutions and develop the next wave of leaders.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnl9TWdtn8EfQTV7ApbyFLmjY5GCZhaPcN4nzo"
              alt="Business founding"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnrlzWuiu9IxL6na5HN8Cmj2VAkDRBdih9JyY4"
              alt="Team collaboration"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: '2015',
      content: (
        <div>
          <h4 className="text-xl font-bold text-black mb-4">Texas Expansion</h4>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Expanded operations throughout Texas, establishing a strong presence in the Dallas-Fort Worth market. 
            This growth phase allowed us to serve more families while maintaining our commitment to excellence.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Texas map"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Team meeting"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: '2024',
      content: (
        <div>
          <h4 className="text-xl font-bold text-black mb-4">Industry Leader</h4>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Recognized as one of the top insurance brokerages with over 15,000 families protected nationwide. 
            Our commitment to excellence and innovation continues to drive our success and growth.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Award ceremony"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Client satisfaction"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">EIB Team</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Excellence in Building was founded in 2007 with a simple yet powerful mission: 
              To Serve People & Treat Them Right. We're more than just an insurance brokerage—we're 
              a family dedicated to protecting what matters most.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Excellence in Building (EIB) started in 2007 with a simple mission: To Serve People & Treat Them Right. Founded by Jason and Nataly Graziani, EIB was created to provide families with financial solutions and to develop leaders in the financial services industry.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Over the years, EIB has proudly helped protect thousands of families across the U.S. while also mentoring the next generation of leaders in our industry. For us, success isn't just about policies—it's about people, purpose, and impact.
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
                  <div className="text-3xl font-bold text-black mb-1">20+</div>
                  <div className="text-gray-600 font-medium">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
                  <div className="text-3xl font-bold text-black mb-1">15K+</div>
                  <div className="text-gray-600 font-medium">Families Helped</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
                  <div className="text-3xl font-bold text-black mb-1">3K+</div>
                  <div className="text-gray-600 font-medium">Agents</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnrZnFpW9IxL6na5HN8Cmj2VAkDRBdih9JyY4u"
                  alt="EIB Team Office"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl shadow-xl">
                <div className="text-black font-bold text-lg">Insurance</div>
                <div className="text-black font-bold text-lg">Leaders</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">What Sets Us Apart</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence and partnership with PHP Agency makes us uniquely positioned 
              to help both our clients and agents succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <Timeline data={timelineData} />
      </section>

      {/* Meet Our Founders Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Founders</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Jason and Nataly Graziani founded EIB with a vision to create lasting impact 
              in the lives of families and financial professionals alike.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Jason Graziani */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="relative rounded-2xl overflow-hidden shadow-lg mb-6">
                  <img
                    src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4"
                    alt="Jason Graziani"
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <p className="text-white font-medium text-lg">Bio Video Coming Soon</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Jason Graziani</h3>
                <p className="text-yellow-600 font-semibold mb-4">Co-Founder & CEO</p>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Jason co-founded Excellence in Building (EIB) in 2007 with a vision to serve people and treat them right. 
                  With over 15 years of experience in the financial services industry, Jason has built EIB into one of the 
                  most successful PHP Agency partners in Texas.
                </p>
                <p>
                  His leadership philosophy centers on developing people and creating opportunities for growth. 
                  Jason currently resides in Prosper, Texas, with his wife Nataly and their four children, 
                  and serves as a trustee at Revolution Church in McKinney.
                </p>
              </div>
            </div>

            {/* Nataly Graziani */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="relative rounded-2xl overflow-hidden shadow-lg mb-6">
                  <img
                    src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz"
                    alt="Nataly Graziani"
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <p className="text-white font-medium text-lg">Bio Video Coming Soon</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Nataly Graziani</h3>
                <p className="text-yellow-600 font-semibold mb-4">Co-Founder & COO</p>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Nataly works daily alongside Jason running operations for EIB. She brings her passion for people development and cultural excellence to the organization. Her background in business development and team leadership has been instrumental in scaling EIB's success across multiple markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-black to-gray-900 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Join Our Team?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover how EIB Team can help you build a successful career in the insurance industry. 
              We're here to support your journey every step of the way.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="h-6 w-6 text-yellow-400" />
                <span>(972) 805-1002</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-6 w-6 text-yellow-400" />
                <span>EIB.PHP@Gmail.com</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="h-6 w-6 text-yellow-400" />
                <span>6200 Tennyson Parkway Plano Tx 75024</span>
              </div>
            </div>
            
            <a
              href="/contact"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-colors duration-300 inline-block"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;