import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Umbrella, CheckCircle, ArrowRight, Shield, Users, MapPin, Calendar, Phone, Mail } from 'lucide-react';

const SupplementalCoveragePage = () => {
  const benefits = [
    {
      icon: Shield,
      title: 'No Network Constraints',
      description: 'Use any doctor or hospital nationwide without network restrictions or referral requirements.'
    },
    {
      icon: Users,
      title: 'Multiple Plan Options',
      description: 'Choose from various coverage levels and benefit structures to match your specific needs.'
    },
    {
      icon: MapPin,
      title: 'Nationwide Access',
      description: 'Coverage follows you anywhere in the United States, perfect for travelers and relocators.'
    },
    {
      icon: Calendar,
      title: '12-Month Rate Guarantee',
      description: 'Locked-in rates for a full year provide predictable healthcare costs and budgeting.'
    }
  ];

  const coverageTypes = [
    {
      type: 'Hospital Indemnity',
      description: 'Cash benefits for hospital stays and procedures',
      benefits: ['Daily hospital benefits', 'Admission benefits', 'ICU coverage', 'Outpatient surgery'],
      payouts: '$100-$500 per day'
    },
    {
      type: 'Critical Illness',
      description: 'Lump sum benefits for major illness diagnosis',
      benefits: ['Cancer coverage', 'Heart attack benefits', 'Stroke coverage', 'Organ transplant'],
      payouts: '$10,000-$100,000 lump sum'
    },
    {
      type: 'Accident Insurance',
      description: 'Coverage for accidental injuries and treatments',
      benefits: ['Emergency room visits', 'Fracture benefits', 'Dislocation coverage', 'Physical therapy'],
      payouts: 'Varies by injury type'
    },
    {
      type: 'Short-Term Medical',
      description: 'Temporary health insurance for coverage gaps',
      benefits: ['Doctor visits', 'Prescription drugs', 'Emergency care', 'Preventive services'],
      payouts: 'Traditional medical coverage'
    }
  ];

  const features = [
    {
      title: 'Direct Cash Payments',
      description: 'Benefits are paid directly to you, not the healthcare provider, giving you control over how to use the money.'
    },
    {
      title: 'No Deductibles',
      description: 'Most supplemental plans have no deductibles, meaning benefits start immediately when you need care.'
    },
    {
      title: 'Guaranteed Renewable',
      description: 'Coverage cannot be cancelled as long as premiums are paid, providing long-term security.'
    },
    {
      title: 'Pre-Existing Conditions',
      description: 'Many plans offer coverage for pre-existing conditions after a waiting period.'
    },
    {
      title: 'Family Coverage',
      description: 'Protect your entire family with comprehensive coverage options for spouses and children.'
    },
    {
      title: 'Affordable Premiums',
      description: 'Supplemental coverage is typically much more affordable than traditional major medical insurance.'
    }
  ];

  const useCases = [
    {
      title: 'Bridge Coverage Gaps',
      description: 'Fill gaps in your primary health insurance coverage',
      scenarios: ['High deductible health plans', 'Limited network coverage', 'Waiting periods for new insurance']
    },
    {
      title: 'Self-Employed',
      description: 'Affordable healthcare options for business owners',
      scenarios: ['Between group plans', 'Startup businesses', 'Freelancers and contractors']
    },
    {
      title: 'Early Retirees',
      description: 'Coverage before Medicare eligibility',
      scenarios: ['COBRA alternatives', 'Pre-Medicare gap coverage', 'Retirement transition']
    },
    {
      title: 'Young Adults',
      description: 'Basic coverage for healthy individuals',
      scenarios: ['Aging off parent plans', 'Entry-level jobs', 'College graduates']
    }
  ];

  const whoNeedsIt = [
    'Individuals with high-deductible health plans',
    'Self-employed and small business owners',
    'People between jobs or insurance coverage',
    'Early retirees not yet eligible for Medicare',
    'Young adults seeking affordable basic coverage',
    'Anyone wanting additional financial protection'
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
                  <Umbrella className="h-8 w-8 text-black" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-black">Supplemental Coverage</h1>
                  <p className="text-lg text-gray-600">Fill the Gaps in Your Health Insurance</p>
                </div>
              </div>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Supplemental health coverage provides additional financial protection beyond your 
                primary health insurance. With no network restrictions and direct cash benefits, 
                you get the flexibility and security you need for unexpected medical expenses.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-md text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">No Network</div>
                  <div className="text-gray-600 text-sm">Restrictions</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">Direct Pay</div>
                  <div className="text-gray-600 text-sm">Cash Benefits</div>
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
                  poster="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800"
                >
                  <source src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOndH9yyal7cmdASPKDVwuU18xgjXi5O4RQaH2I" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl shadow-xl">
                <div className="text-black font-bold text-lg">Extra</div>
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
            <h2 className="text-4xl font-bold text-black mb-6">Key Benefits of Supplemental Coverage</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Supplemental health insurance provides unique advantages that complement your primary 
              health coverage and give you greater financial security.
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

      {/* Coverage Types Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Types of Supplemental Coverage</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from various supplemental insurance options designed to address specific 
              healthcare needs and financial concerns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {coverageTypes.map((coverage, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-black mb-4">{coverage.type}</h3>
                <p className="text-gray-600 mb-6">{coverage.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-bold text-black mb-3">Coverage Includes:</h4>
                  <div className="space-y-2">
                    {coverage.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Typical Payouts:</p>
                  <p className="text-lg font-bold text-yellow-600">{coverage.payouts}</p>
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
            <h2 className="text-4xl font-bold text-black mb-6">Coverage Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Supplemental insurance comes with features designed to provide maximum flexibility 
              and value for your healthcare needs.
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

      {/* Use Cases Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Common Use Cases</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Supplemental coverage is perfect for various life situations where additional 
              healthcare protection is needed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-black mb-4">{useCase.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{useCase.description}</p>
                <div className="space-y-2">
                  {useCase.scenarios.map((scenario, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 text-xs">{scenario}</span>
                    </div>
                  ))}
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
              <h2 className="text-4xl font-bold text-black mb-6">Who Benefits from Supplemental Coverage?</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Supplemental health insurance is ideal for anyone looking to enhance their existing 
                health coverage or bridge gaps in their current insurance protection.
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
              <h3 className="text-2xl font-bold mb-6">Protect Yourself Today</h3>
              <p className="text-gray-300 mb-6">
                Our supplemental insurance specialists will help you identify coverage gaps 
                and find the right supplemental plans to protect your financial health.
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
                Get Coverage Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SupplementalCoveragePage;