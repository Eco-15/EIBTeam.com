import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Clock, CheckCircle, ArrowRight, Shield, DollarSign, Users, Calendar, Phone, Mail } from 'lucide-react';

const TermLifeInsurancePage = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Affordable Premiums',
      description: 'Term life insurance offers the most coverage for the lowest cost, making it ideal for young families and those on a budget.'
    },
    {
      icon: Calendar,
      title: 'Flexible Terms',
      description: 'Choose from 10, 15, 20, or 30-year terms to match your specific needs and financial obligations.'
    },
    {
      icon: Shield,
      title: 'Convertible Options',
      description: 'Many term policies can be converted to permanent life insurance without a medical exam, providing future flexibility.'
    },
    {
      icon: Users,
      title: 'Living Benefits',
      description: 'Access to your death benefit while living in case of terminal, chronic, or critical illness diagnosis.'
    }
  ];

  const termOptions = [
    {
      term: '10-Year Term',
      description: 'Short-term coverage',
      idealFor: 'Covering short-term debts, young children'
    },
    {
      term: '15-Year Term',
      description: 'Medium-term coverage',
      idealFor: 'Mortgage protection, education funding'
    },
    {
      term: '20-Year Term',
      description: 'Average-term coverage',
      idealFor: 'Income replacement, family protection'
    },
    {
      term: '30-Year Term',
      description: 'Long-term coverage',
      idealFor: 'Young families, long-term financial planning'
    }
  ];

  const whoNeedsIt = [
    'Young families with children',
    'Homeowners with mortgages',
    'Business owners with key person needs',
    'Anyone with dependents who rely on their income',
    'People looking for maximum coverage at minimum cost'
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
                  <Clock className="h-8 w-8 text-black" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-black">Term Life Insurance</h1>
                  <p className="text-lg text-gray-600">Affordable Protection When You Need It Most</p>
                </div>
              </div>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Term life insurance provides maximum coverage at the lowest cost, making it the perfect choice 
                for young families, homeowners, and anyone looking to protect their loved ones during their 
                most financially vulnerable years.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-md text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">$500K+</div>
                  <div className="text-gray-600 text-sm">Coverage Available</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">30 Years</div>
                  <div className="text-gray-600 text-sm">Maximum Term</div>
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
                  src="https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Happy family protected by term life insurance"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl shadow-xl">
                <div className="text-black font-bold text-lg">Family</div>
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
            <h2 className="text-4xl font-bold text-black mb-6">Why Choose Term Life Insurance?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Term life insurance offers unmatched value and flexibility, providing substantial coverage 
              when your family needs it most.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        </div>
      </section>

      {/* Term Options Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Choose Your Term Length</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Select the term length that best matches your financial obligations and protection needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {termOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-black mb-3">{option.term}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Ideal For:</p>
                  <p className="text-sm text-gray-600">{option.idealFor}</p>
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
              <h2 className="text-4xl font-bold text-black mb-6">Who Needs Term Life Insurance?</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Term life insurance is perfect for anyone with financial responsibilities and people 
                who depend on their income. It provides peace of mind at an affordable cost.
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
              <h3 className="text-2xl font-bold mb-6">Get Your Free Quote Today</h3>
              <p className="text-gray-300 mb-6">
                Our expert agents will help you determine the right coverage amount and term length 
                for your specific needs and budget.
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
                Request Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermLifeInsurancePage;