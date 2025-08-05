import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Heart, Shield, TrendingUp, Clock, DollarSign, Users, CreditCard, Umbrella, CheckCircle, ArrowRight } from 'lucide-react';

const ServicesPage = () => {
  const serviceOptions = [
    {
      icon: Clock,
      title: 'Term Life Insurance',
      slug: 'term-life-insurance',
      description: 'Affordable protection for a specific period, perfect for young families and mortgage protection.',
      features: ['Affordable premiums', 'Flexible terms (10-30 years)', 'Convertible options', 'Living benefits available'],
      idealFor: 'Young families, mortgage protection, income replacement',
    },
    {
      icon: Shield,
      title: 'Whole Life Insurance',
      slug: 'whole-life-insurance',
      description: 'Permanent coverage with guaranteed cash value accumulation and fixed premiums.',
      features: ['Lifetime coverage', 'Fixed premiums', 'Cash value accumulation', 'Living benefits'],
      idealFor: 'Estate planning, long-term savings, guaranteed protection',
    },
    {
      icon: TrendingUp,
      title: 'Indexed Universal Life (IUL)',
      slug: 'indexed-universal-life',
      description: 'Flexible permanent life insurance with cash value growth linked to market performance.',
      features: ['Lifetime coverage with flexibility', 'Market-linked growth potential', 'Tax advantages', 'Living benefits'],
      idealFor: 'Investment-minded individuals, flexible financial planning, business owners',
    },
    {
      icon: DollarSign,
      title: 'Annuities',
      slug: 'annuities',
      description: 'Secure your retirement with guaranteed income and tax-deferred growth.',
      features: ['Avoids probate', 'Principal protection', 'Guaranteed lifetime income', 'Tax-deferred growth'],
      idealFor: 'Retirement planning, guaranteed income, tax-deferred growth',
    },
    {
      icon: CreditCard,
      title: 'Debt Solutions',
      slug: 'debt-solutions',
      description: 'Consolidate high-interest debt and improve your financial health.',
      features: ['Debt consolidation', 'Lower interest rates', 'Improves cash flow', 'Credit score improvement'],
      idealFor: 'High-interest debt, multiple creditors, improving financial health',
    },
    {
      icon: Umbrella,
      title: 'Supplemental Coverage',
      slug: 'supplemental-coverage',
      description: 'Additional health coverage to fill gaps in your primary insurance.',
      features: ['No network constraints', 'Multiple plan options', 'Nationwide access', '12-month rate guarantee'],
      idealFor: 'Gap coverage, additional protection, flexible healthcare options',
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Initial Consultation',
      description: 'We start with a comprehensive review of your current financial situation and insurance needs.'
    },
    {
      step: '02',
      title: 'Needs Analysis',
      description: 'Our experts analyze your specific requirements and recommend the best coverage options.'
    },
    {
      step: '03',
      title: 'Custom Proposal',
      description: 'We present tailored solutions with multiple carriers to find the best rates and coverage.'
    },
    {
      step: '04',
      title: 'Application Process',
      description: 'We guide you through the application process and handle all the paperwork.'
    },
    {
      step: '05',
      title: 'Ongoing Support',
      description: 'We provide continuous support and regular policy reviews to ensure your coverage stays current.'
    }
  ];

  const whyChooseUs = [
    {
      icon: Heart,
      title: 'Family Protection',
      description: 'Ensure your loved ones are financially secure even when you\'re not there to provide for them.',
      benefit: 'Peace of mind knowing your family is protected'
    },
    {
      icon: DollarSign,
      title: 'Income Replacement',
      description: 'Replace lost income to maintain your family\'s standard of living and meet ongoing expenses.',
      benefit: 'Maintain lifestyle and cover expenses'
    },
    {
      icon: Users,
      title: 'Estate Planning',
      description: 'Create a legacy and provide for future generations while minimizing tax implications.',
      benefit: 'Build wealth and leave a lasting legacy'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-1 gap-12 items-center mb-16">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Services</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                Comprehensive financial solutions designed to protect what matters most. 
                Our expert agents help you choose the right coverage for your individual or business needs.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">50+</div>
              <div className="text-gray-700">Insurance Products</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">A+</div>
              <div className="text-gray-700">Rated Carriers</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">24/7</div>
              <div className="text-gray-700">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Complete Financial Protection</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From life insurance to retirement planning, we offer comprehensive solutions 
              to secure your financial future and protect your loved ones.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceOptions.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
                <div className="p-8">
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-8 w-8 text-black" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-black mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-bold text-black mb-4">Key Features:</h4>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl mb-6">
                    <h5 className="font-semibold text-black mb-2">Ideal For:</h5>
                    <p className="text-gray-600 text-sm">{service.idealFor}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <a
                      href={`/services/${service.slug}`}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-colors duration-300 flex items-center space-x-2"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've streamlined our process to make getting the right coverage as simple and stress-free as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="text-lg font-bold text-black mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Protect Your Future?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Don't wait to secure your family's financial future. Our expert agents are ready to help you 
            find the perfect coverage for your needs and budget.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="/contact"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-colors duration-300 flex items-center space-x-2"
            >
              <span>Get Free Quote</span>
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
              <div className="text-3xl font-bold text-yellow-400 mb-2">Free</div>
              <div className="text-gray-300">Consultation</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">24hr</div>
              <div className="text-gray-300">Quote Turnaround</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">100%</div>
              <div className="text-gray-300">Satisfaction Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;