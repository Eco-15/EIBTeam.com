import React from 'react';
import { Heart, Shield, TrendingUp, Clock, DollarSign, Users, CreditCard, Umbrella } from 'lucide-react';

const Services = () => {
  const serviceOptions = [
    {
      icon: Clock,
      title: 'Term Life Insurance',
      features: ['Affordable', 'Flexible Terms (10-30 years)', 'Convertible Options', 'Living Benefits'],
      idealFor: 'Young families, mortgage protection, income replacement'
    },
    {
      icon: Shield,
      title: 'Whole Life Insurance',
      features: ['Lifetime Coverage', 'Fixed Premiums', 'Cash Value Accumulation', 'Living Benefits'],
      idealFor: 'Estate planning, long-term savings, guaranteed protection'
    },
    {
      icon: TrendingUp,
      title: 'Indexed Universal Life (IUL)',
      features: ['Lifetime Coverage with Flexibility', 'Cash Value Growth linked to Market Index', 'Tax Advantages', 'Living Benefits'],
      idealFor: 'Investment-minded individuals, flexible financial planning, business owners'
    },
    {
      icon: DollarSign,
      title: 'Annuities',
      features: ['Avoids Probate (Death Benefit)', 'Principle Protection', 'Guaranteed Lifetime Income', 'Tax Deferred Growth'],
      idealFor: 'Retirement planning, guaranteed income, tax-deferred growth'
    },
    {
      icon: CreditCard,
      title: 'Debt Solutions',
      features: ['Debt Consolidation', 'Lower Interest Rates', 'Improves Cash Flow', 'Improves Credit Score'],
      idealFor: 'High-interest debt, multiple creditors, improving financial health'
    },
    {
      icon: Umbrella,
      title: 'Supplemental Coverage',
      features: ['No Network Constraints', 'Multiple Plan Options', 'Nationwide Access', '12-month rate guarantee'],
      idealFor: 'Gap coverage, additional protection, flexible healthcare options'
    }
  ];

  const whyOurServices = [
    {
      icon: Heart,
      title: 'Family Protection',
      description: 'Ensure your loved ones are financially secure even when you\'re not there to provide for them.'
    },
    {
      icon: DollarSign,
      title: 'Income Replacement',
      description: 'Replace lost income to maintain your family\'s standard of living and meet ongoing expenses.'
    },
    {
      icon: Users,
      title: 'Retirement Planning',
      description: 'Enjoy peace of mind in retirement while leaving a legacy to provide for future generations.'
    }
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive financial solutions to protect what matters most. 
            Our agents are experts in helping you choose the right coverage for your individual or business needs.
          </p>
        </div>
        {/* Why Our Services Section */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12 mb-16">
         
          <div className="grid md:grid-cols-3 gap-8">
            {whyOurServices.map((reason, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <reason.icon className="h-6 w-6 text-black" />
                </div>
                <h4 className="text-xl font-bold text-black mb-3">{reason.title}</h4>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;