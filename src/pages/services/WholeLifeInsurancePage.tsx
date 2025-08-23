import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Shield, CheckCircle, ArrowRight, DollarSign, TrendingUp, Users, Briefcase, Phone, Mail } from 'lucide-react';

const WholeLifeInsurancePage = () => {
  const benefits = [
    {
      icon: Shield,
      title: 'Lifetime Coverage',
      description: 'Coverage that lasts your entire life, as long as premiums are paid, providing permanent protection for your beneficiaries.'
    },
    {
      icon: DollarSign,
      title: 'Fixed Premiums',
      description: 'Premiums remain level throughout the life of the policy, providing predictable costs and budgeting certainty.'
    },
    {
      icon: TrendingUp,
      title: 'Cash Value Growth',
      description: 'Build cash value that grows tax-deferred and can be accessed through loans or withdrawals during your lifetime.'
    },
    {
      icon: Users,
      title: 'Living Benefits',
      description: 'Access to death benefits while living in cases of terminal, chronic, or critical illness diagnosis.'
    }
  ];

  const features = [
    {
      title: 'Guaranteed Death Benefit',
      description: 'Your beneficiaries receive a guaranteed payout regardless of when you pass away.'
    },
    {
      title: 'Tax-Deferred Growth',
      description: 'Cash value grows without current income tax, maximizing your accumulation potential.'
    },
    {
      title: 'Policy Loans',
      description: 'Borrow against your cash value for any purpose without credit checks or income verification.'
    },
    {
      title: 'Dividend Potential',
      description: 'Participating policies may receive dividends that can increase your coverage or cash value.'
    },
    {
      title: 'Estate Planning Tool',
      description: 'Provides liquidity for estate taxes and ensures wealth transfer to your heirs.'
    },
    {
      title: 'Retirement Supplement',
      description: 'Access cash value in retirement to supplement other income sources tax-efficiently.'
    }
  ];

  const whoNeedsIt = [
    'High-income earners seeking tax advantages',
    'Business owners needing key person coverage',
    'Parents wanting to leave a legacy',
    'Individuals with permanent financial obligations',
    'Those seeking forced savings with life insurance protection',
    'Estate planning and wealth transfer needs'
  ];

  const useCases = [
    {
      icon: Briefcase,
      title: 'Business Protection',
      description: 'Key person insurance, buy-sell agreements, and executive benefits.'
    },
    {
      icon: Users,
      title: 'Family Legacy',
      description: 'Ensure your family\'s financial security and leave a lasting inheritance.'
    },
    {
      icon: TrendingUp,
      title: 'Wealth Building',
      description: 'Tax-advantaged savings vehicle that combines protection with accumulation.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center">
                  <Shield className="h-8 w-8 text-black" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-black">Whole Life Insurance</h1>
                  <p className="text-lg text-gray-600">Permanent Protection with Cash Value Growth</p>
                </div>
              </div>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Whole life insurance provides lifelong protection with guaranteed cash value accumulation. 
                It's the perfect solution for those seeking permanent coverage, tax advantages, and a 
                reliable savings component all in one policy.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-md text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">Lifetime</div>
                  <div className="text-gray-600 text-sm">Coverage Guarantee</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">Tax-Free</div>
                  <div className="text-gray-600 text-sm">Death Benefit</div>
                </div>
              </div>

              <a
                href="/contact"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-colors duration-300 inline-flex items-center space-x-2"
              >
                <span>Get Free Quote</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Successful family with whole life insurance protection"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl shadow-xl">
                <div className="text-black font-bold text-lg">Permanent</div>
                <div className="text-black font-bold text-lg">Protection</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Key Benefits of Whole Life Insurance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whole life insurance offers unique advantages that make it an excellent choice for 
              long-term financial planning and wealth building.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-lg font-bold text-black mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Use Cases */}
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <useCase.icon className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Comprehensive Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whole life insurance comes packed with features that provide flexibility and value 
              throughout your lifetime.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-black mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Needs It Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">Who Benefits from Whole Life Insurance?</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Whole life insurance is ideal for individuals seeking permanent protection combined 
                with tax-advantaged savings and wealth-building opportunities.
              </p>

              <div className="space-y-4">
                {whoNeedsIt.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-black to-gray-900 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Ready to Build Your Legacy?</h3>
              <p className="text-gray-300 mb-6">
                Our experienced agents will help you design a whole life insurance policy that 
                meets your protection needs while building long-term wealth.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-yellow-400" />
                  <span>(972) 805-1002</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-yellow-400" />
                  <span>admin@eibagency.com</span>
                </div>
              </div>

              <a
                href="/contact"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg font-bold hover:from-yellow-600 hover:to-yellow-700 transition-colors duration-300 inline-block w-full text-center"
              >
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WholeLifeInsurancePage;