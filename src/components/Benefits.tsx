import React from 'react';
import { DollarSign, TrendingUp, Users, Clock, Award, Briefcase } from 'lucide-react';

const Benefits = () => {
  const benefitCategories = [
    {
      icon: Award,
      title: 'Training & Certification',
      items: ['State Licensing', 'Classroom Training', '1-on-1 Training']
    },
    {
      icon: Users,
      title: 'Leadership Development',
      items: ['Mentorship', 'Team Retreats', 'National Conference']
    },
    {
      icon: TrendingUp,
      title: 'Growth Opportunities',
      items: ['Flexible Schedule', 'Professional Agent', 'Agency Builder']
    }
  ];

  return (
    <section id="benefits" className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">EIB Agency?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe that when our agents succeed, everyone wins. That's why we've built 
            a comprehensive support system designed to help you thrive in the insurance industry.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefitCategories.map((category, index) => (
            <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <category.icon className="h-8 w-8 text-black" />
              </div>
              
              <h4 className="text-xl font-bold text-black mb-6">{category.title}</h4>
              
              <div className="space-y-3">
                {category.items.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-600 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-black to-gray-900 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make a Change?
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join a team that's committed to your success. We provide the tools, training, and support you need to be successful in the insurance industry.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="/contact"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-colors duration-300 shadow-xl"
            >
              Apply Today
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-black transition-all duration-300"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;