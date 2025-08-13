import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, CheckCircle, FileText, AlertTriangle, Scale, Users } from 'lucide-react';

const CompliancePage = () => {
  const complianceAreas = [
    {
      icon: Shield,
      title: 'Regulatory Compliance',
      description: 'Full compliance with state insurance regulations and licensing requirements',
      items: [
        'Texas Department of Insurance oversight',
        'Regular license renewals and continuing education',
        'Adherence to state insurance codes',
        'Proper disclosure and documentation'
      ]
    },
    {
      icon: Users,
      title: 'Consumer Protection',
      description: 'Commitment to fair treatment and protection of consumer rights',
      items: [
        'Transparent pricing and fee disclosure',
        'Clear explanation of policy terms',
        'Proper suitability assessments',
        'Complaint resolution procedures'
      ]
    },
    {
      icon: FileText,
      title: 'Documentation Standards',
      description: 'Comprehensive record-keeping and documentation practices',
      items: [
        'Complete client files and records',
        'Proper application documentation',
        'Compliance with record retention requirements',
        'Secure storage of sensitive information'
      ]
    },
    {
      icon: Scale,
      title: 'Ethical Standards',
      description: 'Commitment to the highest ethical standards in all business practices',
      items: [
        'Fiduciary responsibility to clients',
        'Honest and transparent communication',
        'Conflict of interest management',
        'Professional conduct standards'
      ]
    }
  ];

  const policies = [
    {
      title: 'Anti-Money Laundering (AML)',
      description: 'We maintain comprehensive AML policies to prevent money laundering and terrorist financing.',
      requirements: [
        'Customer identification and verification',
        'Suspicious activity monitoring and reporting',
        'Regular employee training on AML procedures',
        'Compliance with Bank Secrecy Act requirements'
      ]
    },
    {
      title: 'Privacy and Data Protection',
      description: 'Strict policies govern the collection, use, and protection of personal information.',
      requirements: [
        'GLBA compliance for financial privacy',
        'Secure data storage and transmission',
        'Limited access to personal information',
        'Regular security assessments and updates'
      ]
    },
    {
      title: 'Fair Dealing',
      description: 'All clients are treated fairly and in accordance with applicable regulations.',
      requirements: [
        'Suitability assessments for all recommendations',
        'Clear disclosure of fees and commissions',
        'Proper documentation of client interactions',
        'Regular review of sales practices'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center">
                <Scale className="h-8 w-8 text-black" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black">Compliance</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              EIB Agency is committed to maintaining the highest standards of compliance with all applicable laws, regulations, and industry best practices.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Our Compliance Framework</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We maintain comprehensive compliance programs across all areas of our business operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {complianceAreas.map((area, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-12 h-12 rounded-lg flex items-center justify-center">
                    <area.icon className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-black">{area.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{area.description}</p>
                
                <div className="space-y-3">
                  {area.items.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Policies */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Key Compliance Policies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive policies ensure we meet all regulatory requirements and maintain the trust of our clients.
            </p>
          </div>

          <div className="space-y-8">
            {policies.map((policy, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-black mb-4">{policy.title}</h3>
                <p className="text-gray-600 mb-6 text-lg">{policy.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {policy.requirements.map((requirement, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Bodies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Regulatory Oversight</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We operate under the oversight of multiple regulatory bodies to ensure compliance and consumer protection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-black mb-4">Texas Department of Insurance</h3>
              <div className="space-y-3 text-gray-600">
                <p>Primary regulatory authority for insurance activities in Texas</p>
                <p><strong>Website:</strong> <a href="https://www.tdi.texas.gov" className="text-yellow-600 hover:text-yellow-700">www.tdi.texas.gov</a></p>
                <p><strong>Consumer Helpline:</strong> 1-800-252-3439</p>
                <p><strong>Address:</strong> 333 Guadalupe, Austin, TX 78701</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-black mb-4">National Association of Insurance Commissioners</h3>
              <div className="space-y-3 text-gray-600">
                <p>Industry standards and best practices coordination</p>
                <p><strong>Website:</strong> <a href="https://www.naic.org" className=\"text-yellow-600 hover:text-yellow-700">www.naic.org</a></p>
                <p><strong>Role:</strong> Regulatory support and consumer protection</p>
                <p><strong>Standards:</strong> Model laws and regulations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complaint Process */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">Complaint Resolution Process</h2>
              <p className="text-lg text-gray-600">
                We are committed to resolving any concerns promptly and fairly.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold">1</span>
                </div>
                <h3 className="text-lg font-bold text-black mb-3">Contact Us First</h3>
                <p className="text-gray-600 text-sm">
                  Reach out to us directly at (972) 805-1002 or admin@eibagency.com to discuss your concern.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold">2</span>
                </div>
                <h3 className="text-lg font-bold text-black mb-3">Internal Review</h3>
                <p className="text-gray-600 text-sm">
                  We will investigate your concern and work to resolve it within 30 business days.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold">3</span>
                </div>
                <h3 className="text-lg font-bold text-black mb-3">Regulatory Option</h3>
                <p className="text-gray-600 text-sm">
                  If unresolved, you may file a complaint with the Texas Department of Insurance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-black mb-4">Compliance Questions?</h2>
            <p className="text-gray-600 mb-6">
              For questions about our compliance policies or to report concerns, please contact:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>EIB Agency Compliance Department</strong></p>
              <p>6200 Tennyson Parkway Suite 175</p>
              <p>Plano, TX 75024</p>
              <p>Phone: (972) 805-1002</p>
              <p>Email: compliance@eibagency.com</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CompliancePage;