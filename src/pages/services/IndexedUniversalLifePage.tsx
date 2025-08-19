import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { TrendingUp, CheckCircle, ArrowRight, DollarSign, Shield, Users, BarChart3, Phone, Mail } from 'lucide-react';

const IndexedUniversalLifePage = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Market-Linked Growth',
      description: 'Cash value growth potential linked to market index performance with downside protection.'
    },
    {
      icon: Shield,
      title: 'Flexible Premiums',
      description: 'Adjust premium payments based on your financial situation and cash value accumulation.'
    },
    {
      icon: DollarSign,
      title: 'Tax Advantages',
      description: 'Tax-deferred growth and tax-free access to cash value through loans and withdrawals.'
    },
    {
      icon: Users,
      title: 'Living Benefits',
      description: 'Access death benefits while living for terminal, chronic, or critical illness.'
    }
  ];

  const features = [
    {
      title: 'Index Crediting Methods',
      description: 'Multiple crediting strategies including annual point-to-point, monthly averaging, and performance triggers.'
    },
    {
      title: 'Floor Protection',
      description: 'Guaranteed minimum interest rate (typically 0-2%) protects against market downturns.'
    },
    {
      title: 'Cap Rates',
      description: 'Maximum interest crediting rates that vary by carrier and index, typically 8-12% annually.'
    },
    {
      title: 'Flexible Death Benefits',
      description: 'Choose between level or increasing death benefit options to match your needs.'
    },
    {
      title: 'Policy Loans',
      description: 'Access cash value through loans without credit checks or income verification.'
    },
    {
      title: 'Retirement Income',
      description: 'Create tax-efficient retirement income through strategic withdrawals and loans.'
    }
  ];

  const indexOptions = [
    {
      name: 'S&P 500',
      description: 'Most popular index tracking 500 large-cap U.S. stocks'
    },
    {
      name: 'NASDAQ-100',
      description: 'Technology-focused index of 100 largest non-financial companies'
    },
    {
      name: 'Euro Stoxx 50',
      description: 'European stock index for international diversification'
    },
    {
      name: 'Fixed Account',
      description: 'Guaranteed interest option for conservative growth'
    }
  ];

  const whoNeedsIt = [
    'High-income earners seeking tax-advantaged growth',
    'Business owners wanting flexible premium payments',
    'Investors seeking market upside with downside protection',
    'Individuals planning for tax-efficient retirement income',
    'Those wanting permanent life insurance with growth potential',
    'Estate planning for wealth transfer optimization'
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
                  <TrendingUp className="h-8 w-8 text-black" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-black">Indexed Universal Life</h1>
                  <p className="text-lg text-gray-600">Market Growth with Downside Protection</p>
                </div>
              </div>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Indexed Universal Life (IUL) insurance combines permanent life insurance protection 
                with cash value growth potential linked to market index performance, while protecting 
                against market losses with guaranteed minimum returns.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-md text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">0% Floor</div>
                  <div className="text-gray-600 text-sm">Downside Protection</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">Market Cap</div>
                  <div className="text-gray-600 text-sm">Growth Potential</div>
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
                <video
                  controls
                  className="w-full h-96 object-cover"
                  poster="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800"
                >
                  <source src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnWymtGawDoEgx6u7dLy8etIN1pvK3aPWcf5AR" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Key Benefits of IUL Insurance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Indexed Universal Life insurance offers the perfect balance of protection, growth potential, 
              and flexibility for sophisticated financial planning.
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

      {/* Index Options Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Common Index Options</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from multiple market indices to align your cash value growth with your investment preferences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {indexOptions.map((index, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{index.name}</h3>
                <p className="text-gray-600">{index.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Advanced Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              IUL policies come with sophisticated features designed to maximize growth potential 
              while providing flexibility and protection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">Who Should Consider IUL Insurance?</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Indexed Universal Life insurance is perfect for individuals seeking permanent life 
                insurance with growth potential and tax advantages for wealth building and retirement planning.
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
              <h3 className="text-2xl font-bold mb-6">Maximize Your Growth Potential</h3>
              <p className="text-gray-300 mb-6">
                Our IUL specialists will help you design a policy that balances growth potential 
                with protection, tailored to your financial goals and risk tolerance.
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
                Schedule Strategy Session
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndexedUniversalLifePage;