import React from 'react';
import { Shield, Target, Award, Users } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Shield,
      title: 'Industry Leadership',
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

  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">EIB Team</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h3 className="text-3xl font-bold text-black mb-6">Our Story</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Excellence in Building (EIB) started in 2007 with a simple mission: To Serve People & Treat Them Right. Founded by Jason and Nataly Graziani, EIB was created to provide families with financial solutions and to develop leaders in the financial services industry.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Over the years, EIB has proudly helped protect thousands of families across the U.S. while also mentoring the next generation of leaders in our industry. For us, success isn't just about policies—it's about people, purpose, and impact.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Jason and Nataly currently reside in Prosper, Texas, and raise their four children. They serve as trustees at Revolution Church in McKinney and continue to lead their organization.
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

          <div className="order-1 lg:order-2 relative">
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

        {/* Meet Our Founders Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Founders</span>
            </h3>
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
                <h4 className="text-2xl font-bold text-black mb-2">Jason Graziani</h4>
                <p className="text-yellow-600 font-semibold mb-4">Co-Founder & CEO</p>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Jason founded Excellence in Building (EIB) in 2007 with a vision to serve people and treat them right. 
                  With over 15 years of experience in the financial services industry, Jason has built EIB into one of the 
                  most successful PHP Agency partners in Texas.
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
                <h4 className="text-2xl font-bold text-black mb-2">Nataly Graziani</h4>
                <p className="text-yellow-600 font-semibold mb-4">Co-Founder & COO</p>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Nataly co-founded EIB alongside Jason, bringing her passion for people development and operational 
                  excellence to the organization. Her background in business operations and team leadership has been 
                  instrumental in scaling EIB's success across multiple markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;