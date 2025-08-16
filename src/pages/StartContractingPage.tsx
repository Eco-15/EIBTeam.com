import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { FileText, ExternalLink, ArrowLeft, CheckCircle, Shield, Users, Clock } from 'lucide-react';

const StartContractingPage = () => {
  const contractingResources = [
    {
      id: 1,
      title: 'Licensing & Contracting',
      description: 'Comprehensive guide to licensing requirements and contracting procedures for new agents.',
      type: 'PDF Guide',
      icon: Shield,
      link: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnitIweQ8hoXrM9uw83NK7abLqpjmcBkZtgnyx',
      featured: true
    },
    {
      id: 2,
      title: 'Contracting Step-by-Step',
      description: 'Detailed step-by-step process for completing your contracting paperwork with insurance carriers.',
      type: 'Process Guide',
      icon: FileText,
      link: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOndfCKhHRl7cmdASPKDVwuU18xgjXi5O4RQaH2',
      featured: true
    },
    {
      id: 3,
      title: 'SuranceBay Appointment Process',
      description: 'Learn how to use SuranceBay for appointment scheduling and client management.',
      type: 'System Guide',
      icon: Users,
      link: 'https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnf0XYHQWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ',
      featured: true
    }
  ];

  const contractingSteps = [
    {
      step: '01',
      title: 'Complete Licensing',
      description: 'Obtain your state insurance license through our supported training programs.',
      timeframe: '2-4 weeks'
    },
    {
      step: '02',
      title: 'Review Documentation',
      description: 'Study the licensing and contracting guide to understand requirements.',
      timeframe: '1-2 days'
    },
    {
      step: '03',
      title: 'Submit Applications',
      description: 'Complete contracting applications with insurance carriers following our step-by-step guide.',
      timeframe: '1-2 weeks'
    },
    {
      step: '04',
      title: 'System Setup',
      description: 'Learn SuranceBay and other systems for appointment scheduling and client management.',
      timeframe: '2-3 days'
    },
    {
      step: '05',
      title: 'Start Selling',
      description: 'Begin writing business with your contracted carriers and full system access.',
      timeframe: 'Ongoing'
    }
  ];

  const quickFacts = [
    { label: 'Total Process Time', value: '4-6 Weeks' },
    { label: 'Required Documents', value: '3-5 per Carrier' },
    { label: 'Carrier Partners', value: '10+ Available' },
    { label: 'Support Available', value: '24/7' }
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
                    <h1 className="text-3xl font-bold text-gray-900">Start Contracting</h1>
                    <p className="text-gray-600">Complete your licensing and contracting process to begin writing business</p>
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
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contracting Process Overview</h2>
                <div className="grid md:grid-cols-5 gap-6">
                  {contractingSteps.map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-black font-bold text-sm">{step.step}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                      <div className="bg-gray-100 px-2 py-1 rounded-full">
                        <span className="text-xs text-gray-600">{step.timeframe}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Contracting Resources</h2>
                  <p className="text-gray-600 mt-2">Essential documents and guides to complete your contracting process</p>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {contractingResources.map((resource) => (
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
                                  <span className="ml-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
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
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <a
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors flex items-center space-x-2"
                              >
                                <span>Access</span>
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

              {/* Important Notes */}
              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notes</h3>
                    <ul className="space-y-2 text-yellow-700 text-sm">
                      <li>• You must have your state insurance license before beginning the contracting process</li>
                      <li>• Each insurance carrier has different requirements and processing times</li>
                      <li>• Keep copies of all submitted documents for your records</li>
                      <li>• Contact your mentor or admin if you need assistance with any step</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Support Section */}
              <div className="mt-8 bg-gradient-to-r from-black to-gray-900 rounded-xl p-8 text-center text-white">
                <h2 className="text-2xl font-bold mb-4">Need Help with Contracting?</h2>
                <p className="text-gray-300 mb-6">
                  Our team is here to support you through every step of the contracting process. 
                  Don't hesitate to reach out if you have questions or need assistance.
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
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StartContractingPage;