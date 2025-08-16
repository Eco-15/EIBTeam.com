import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { FileText, ExternalLink, ArrowLeft, CheckCircle, Shield, Users, Clock, Building } from 'lucide-react';

const FieldUnderwritingPage = () => {
  const underwritingResources = [
    {
      id: 1,
      title: 'North America Underwriting',
      description: 'Comprehensive underwriting guidelines and requirements for North America Company policies.',
      type: 'Underwriting Guide',
      icon: Building,
      link: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnm7yJkzKBzouqJLWiGQnfpy1elkbVU4xY56S9',
      featured: true,
      carrier: 'North America Company'
    },
    {
      id: 2,
      title: 'National Life Group',
      description: 'Underwriting standards and field underwriting procedures for National Life Group products.',
      type: 'Underwriting Guide',
      icon: Building,
      link: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOn5gFx0o2VxIZ1vqVWtdanRUH890KbXG2ATNms',
      featured: true,
      carrier: 'National Life Group'
    },
    {
      id: 3,
      title: 'AIG Underwriting',
      description: 'AIG underwriting guidelines for life insurance applications and case preparation.',
      type: 'Underwriting Guide',
      icon: Building,
      link: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnAcDOXLBerOcK61jIM4ZmgSpzHL7Ci8FnD0Xt',
      featured: true,
      carrier: 'AIG'
    },
    {
      id: 4,
      title: 'F&G Underwriting',
      description: 'Fidelity & Guaranty underwriting requirements and submission guidelines.',
      type: 'Underwriting Guide',
      icon: Building,
      link: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnEIv4NCmqSPpoJ2e6DMAi7Z5HO8rdj3ItNTRV',
      featured: true,
      carrier: 'F&G'
    },
    {
      id: 5,
      title: 'F&G Auto Declines',
      description: 'Automatic decline conditions and scenarios for F&G life insurance applications.',
      type: 'Reference Guide',
      icon: FileText,
      link: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOn0dwK3L4r5gzZCeyA0VUlJbYmG8fF1jk7p9Or',
      featured: false,
      carrier: 'F&G'
    },
    {
      id: 6,
      title: 'Foresters Underwriting',
      description: 'Foresters Financial underwriting guidelines and application requirements.',
      type: 'Underwriting Guide',
      icon: Building,
      link: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOne4sG6XaMjrC9tcVpowfGgSDYX4HluzZIeOik',
      featured: true,
      carrier: 'Foresters'
    },
    {
      id: 7,
      title: 'ANICO Underwriting',
      description: 'American National Insurance Company underwriting standards and procedures.',
      type: 'Underwriting Guide',
      icon: Building,
      link: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOn4EiNxnsTL4f0up9I5jZJSEbw2R1dz7OsVtma',
      featured: true,
      carrier: 'ANICO'
    },
    {
      id: 8,
      title: 'Mutual of Omaha Underwriting',
      description: 'Mutual of Omaha underwriting guidelines and field underwriting best practices.',
      type: 'Underwriting Guide',
      icon: Building,
      link: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnICUxqoJEA2Fdv5GxZ0wWRTnU1CQbfzgryeKP',
      featured: true,
      carrier: 'Mutual of Omaha'
    }
  ];

  const underwritingSteps = [
    {
      step: '01',
      title: 'Review Client Information',
      description: 'Gather complete client health, financial, and lifestyle information.',
      timeframe: 'Before application'
    },
    {
      step: '02',
      title: 'Check Carrier Guidelines',
      description: 'Review specific carrier underwriting requirements and limitations.',
      timeframe: 'During preparation'
    },
    {
      step: '03',
      title: 'Prepare Application',
      description: 'Complete application accurately with all required information and disclosures.',
      timeframe: '30-60 minutes'
    },
    {
      step: '04',
      title: 'Submit for Review',
      description: 'Submit application with supporting documents to carrier underwriting.',
      timeframe: 'Same day'
    },
    {
      step: '05',
      title: 'Follow Up',
      description: 'Monitor application status and respond to underwriter requests promptly.',
      timeframe: 'Ongoing'
    }
  ];

  const quickFacts = [
    { label: 'Carrier Partners', value: '8+' },
    { label: 'Underwriting Guides', value: '8' },
    { label: 'Average Processing', value: '2-6 Weeks' },
    { label: 'Support Available', value: '24/7' }
  ];

  const bestPractices = [
    'Always review carrier-specific guidelines before submitting applications',
    'Ensure all health and financial information is complete and accurate',
    'Disclose all relevant medical history and lifestyle factors',
    'Prepare clients for potential medical exams and requirements',
    'Follow up promptly on underwriter requests for additional information',
    'Keep detailed notes on all client interactions and submissions'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <DashboardSidebar />
      
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Back Button */}
              <div className="mb-6">
                <a
                  href="/resources"
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to Resources</span>
                </a>
              </div>

              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-12 h-12 rounded-xl flex items-center justify-center">
                    <FileText className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Field Underwriting</h1>
                    <p className="text-gray-600">Carrier-specific underwriting guidelines and best practices for successful case submission</p>
                  </div>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {quickFacts.map((fact, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                    <div className="text-2xl font-bold text-yellow-600 mb-1">{fact.value}</div>
                    <div className="text-gray-600 text-sm">{fact.label}</div>
                  </div>
                ))}
              </div>

              {/* Process Overview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Underwriting Process</h2>
                  <p className="text-gray-600 mt-2">Follow these steps for successful case submission and approval</p>
                </div>
                
                <div className="p-6">
                  <div className="grid md:grid-cols-5 gap-6">
                    {underwritingSteps.map((step, index) => (
                      <div key={index} className="text-center">
                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-black font-bold text-sm">{step.step}</span>
                        </div>
                        <h3 className="text-sm font-bold text-black mb-2">{step.title}</h3>
                        <p className="text-gray-600 text-xs leading-relaxed mb-2">{step.description}</p>
                        <span className="text-xs text-yellow-600 font-medium">{step.timeframe}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Carrier Underwriting Guides */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Carrier Underwriting Guides</h2>
                  <p className="text-gray-600 mt-2">Access underwriting guidelines for each of our carrier partners</p>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {underwritingResources.map((resource) => (
                    <div key={resource.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <resource.icon className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {resource.title}
                                {resource.featured && (
                                  <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                    Essential
                                  </span>
                                )}
                              </h3>
                              <p className="text-gray-600 mb-3">{resource.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center space-x-1">
                                  <FileText className="h-4 w-4" />
                                  <span>{resource.type}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Building className="h-4 w-4" />
                                  <span>{resource.carrier}</span>
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <a
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors flex items-center space-x-2"
                              >
                                <span>Access Guide</span>
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Practices */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Field Underwriting Best Practices</h2>
                  <p className="text-gray-600 mt-2">Follow these guidelines to improve approval rates and reduce processing time</p>
                </div>
                
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {bestPractices.map((practice, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{practice}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Underwriting Notes</h3>
                    <ul className="space-y-2 text-blue-700 text-sm">
                      <li>• Each carrier has unique underwriting standards and requirements</li>
                      <li>• Always review the most current guidelines before submitting applications</li>
                      <li>• Accurate and complete information is critical for successful underwriting</li>
                      <li>• Contact your mentor or underwriting support for complex cases</li>
                      <li>• Keep detailed records of all client interactions and medical history</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Support Section */}
              <div className="bg-gradient-to-r from-black to-gray-900 rounded-xl p-8 text-center text-white">
                <h2 className="text-2xl font-bold mb-4">Need Underwriting Support?</h2>
                <p className="text-gray-300 mb-6">
                  Our underwriting team is here to help you navigate complex cases and improve your approval rates. 
                  Don't hesitate to reach out for guidance on challenging applications.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6">
                  <div className="flex items-center space-x-2">
                    <span>(972) 805-1002</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>admin@eibagency.com</span>
                  </div>
                </div>

                <a
                  href="mailto:admin@eibagency.com"
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg font-bold hover:from-yellow-600 hover:to-yellow-700 transition-colors duration-300 inline-block"
                >
                  Contact Underwriting Support
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FieldUnderwritingPage;