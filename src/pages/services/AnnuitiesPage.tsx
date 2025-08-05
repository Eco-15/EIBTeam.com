import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { DollarSign, CheckCircle, ArrowRight, Shield, TrendingUp, Users, Calendar, Phone, Mail } from 'lucide-react';

const AnnuitiesPage = () => {
  const benefits = [
    {
      icon: Users,
      title: 'Avoids Probate',
      description: 'Death benefits pass directly to beneficiaries, avoiding the costly and time-consuming probate process.'
    },
    {
      icon: Shield,
      title: 'Principle Protection',
      description: 'Your initial investment is protected from market losses, ensuring you never lose your principle.'
    },
    {
      icon: DollarSign,
      title: 'Guaranteed Income',
      description: 'Receive guaranteed lifetime income payments that you cannot outlive, providing retirement security.'
    },
    {
      icon: TrendingUp,
      title: 'Tax-Deferred Growth',
      description: 'Your money grows tax-deferred until withdrawal, maximizing your accumulation potential.'
    }
  ];

  const annuityTypes = [
    {
      type: 'Fixed Annuities',
      description: 'Guaranteed interest rates and predictable growth',
      features: ['Guaranteed minimum interest rate', 'Predictable returns', 'Principal protection', 'Simple and straightforward'],
      features: ['Guaranteed minimum interest rate', 'Predictable returns', 'Principle protection', 'Simple and straightforward'],
      idealFor: 'Conservative investors seeking guaranteed growth'
    },
    {
      type: 'Fixed Index Annuities',
      description: 'Growth potential linked to market indices with downside protection',
      features: ['Market-linked growth potential', 'Downside protection', 'Multiple index options', 'Bonus features available'],
      idealFor: 'Moderate investors wanting growth with protection'
    }
  ];

  const features = [
    {
      title: 'Lifetime Income Options',
      description: 'Choose from various payout options including lifetime income, joint life, and period certain.'
    },
    {
      title: 'Death Benefit Protection',
      description: 'Beneficiaries receive remaining account value or guaranteed minimum, whichever is greater.'
    },
    {
      title: 'Flexible Contributions',
      description: 'Make single premium or flexible premium contributions based on your financial situation.'
    },
    {
      title: 'Surrender Charges',
      description: 'Structured surrender charge schedules that decrease over time, typically 5-10 years.'
    },
    {
      title: 'Free Withdrawal Provisions',
      description: 'Access a portion of your account value annually without surrender charges, typically 10%.'
    },
    {
      title: 'Bonus Features',
      description: 'Many annuities offer premium bonuses, enhanced death benefits, and income riders.'
    }
  ];

  const whoNeedsIt = [
    'Individuals approaching or in retirement',
    'Those seeking guaranteed lifetime income',
    'Conservative investors wanting principal protection',
    'People with maxed-out 401(k) and IRA contributions',
    'Individuals concerned about outliving their money',
    'Those wanting to leave a legacy to beneficiaries'
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
                  <DollarSign className="h-8 w-8 text-black" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-black">Annuities</h1>
                  <p className="text-lg text-gray-600">Guaranteed Retirement Income for Life</p>
                </div>
              </div>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Annuities provide guaranteed lifetime income and principal protection, making them 
                an essential component of retirement planning. Secure your financial future with 
                tax-deferred growth and income you cannot outlive.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-md text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">Lifetime</div>
                  <div className="text-gray-600 text-sm">Income Guarantee</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">100%</div>
                  <div className="text-gray-600 text-sm">Principal Protection</div>
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
                  src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Happy retired couple enjoying financial security"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl shadow-xl">
                <div className="text-black font-bold text-lg">Retirement</div>
                <div className="text-black font-bold text-lg">Security</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Why Choose Annuities?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Annuities offer unique benefits that make them an essential part of a comprehensive 
              retirement strategy, providing security and peace of mind.
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

      {/* Annuity Types Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Types of Annuities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from various annuity types designed to meet different risk tolerances and retirement goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {annuityTypes.map((annuity, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-black mb-4">{annuity.type}</h3>
                <p className="text-gray-600 mb-6">{annuity.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-bold text-black mb-3">Key Features:</h4>
                  <div className="space-y-2">
                    {annuity.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Ideal For:</p>
                  <p className="text-sm text-gray-600">{annuity.idealFor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Annuity Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern annuities come with comprehensive features designed to provide flexibility 
              and maximize your retirement income potential.
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
              <h2 className="text-4xl font-bold text-black mb-6">Who Should Consider Annuities?</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Annuities are ideal for individuals seeking guaranteed retirement income, principal 
                protection, and tax-deferred growth as part of their comprehensive retirement strategy.
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
              <h3 className="text-2xl font-bold mb-6">Secure Your Retirement Today</h3>
              <p className="text-gray-300 mb-6">
                Our annuity specialists will help you choose the right annuity type and features 
                to create guaranteed lifetime income tailored to your retirement goals.
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
                Plan Your Retirement
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AnnuitiesPage;