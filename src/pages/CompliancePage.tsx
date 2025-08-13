import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, CheckCircle, FileText, AlertTriangle, Scale, Users } from 'lucide-react';

const CompliancePage = () => {
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
              Legal Disclosure/Compliance Statement
            </p>
            <p className="text-sm text-gray-500 mt-4">Effective Date: 8-13-2025</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <div className="space-y-6 text-gray-600 mb-12">
              <p>
                EIB Agency is an independent team of licensed life insurance agents. Agents operate as independent 1099 contractors. EIB Agency does not directly underwrite or issue insurance policies; all policies are underwritten and issued by third-party insurance carriers.
              </p>
              
              <p>
                This website is intended for informational purposes only and does not constitute a solicitation to sell insurance products in any jurisdiction where our agents are not licensed. Products and services referenced herein are available only in the United States and Puerto Rico.
              </p>
              
              <p>
                By submitting your information through our contact form, you consent to being contacted by a licensed representative of EIB Agency. Your information will be handled in accordance with our <a href="/privacy-policy" className="text-yellow-600 hover:text-yellow-700">Privacy Policy</a> and applicable data protection laws. We do not sell or share your information with third parties.
              </p>
            </div>

            {/* Insurance Sales */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-6 w-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-black">Insurance Sales</h2>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-xl">
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>Insurance sales:</strong> Insurance-related services may not be provided to individuals residing in any states other than those in which an agent is licensed. All communication is strictly intended for individuals residing in the states in which our agents are registered to offer insurance recommendations or solutions. No offers may be made or accepted from outside the specific states our agents are registered and licensed to conduct business.
                  </p>
                </div>
              </div>
            </div>

            {/* Regulatory Compliance */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-6 w-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-black">Regulatory Compliance</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  EIB Agency and its affiliated agents comply with all applicable regulations, including those enforced by the Federal Trade Commission (FTC), Financial Industry Regulatory Authority (FINRA), and our appointed insurance carriers. We also adhere to all Anti-Money Laundering (AML) standards and best practices.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-black mb-4">Questions About Compliance?</h2>
              <p className="text-gray-600 mb-4">
                For questions about our compliance policies or licensing, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>EIB Agency</strong></p>
                <p>6200 Tennyson Parkway Suite 175</p>
                <p>Plano, TX 75024</p>
                <p>Phone: (972) 805-1002</p>
                <p>Email: admin@eibagency.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CompliancePage;