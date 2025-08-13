import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, Eye, Lock, FileText } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black">Privacy Policy</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              EIB Agency is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you interact with our website.
            </p>
            <p className="text-sm text-gray-500 mt-4">Effective Date: [Insert Date]</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Information We Collect */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <Eye className="h-6 w-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-black">1. Information We Collect</h2>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-600 mb-4">
                  When you submit a contact form on our website, we may collect the following personal information:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Full name</li>
                  <li>• Phone number</li>
                  <li>• Email address</li>
                  <li>• City and state</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  We do not collect sensitive data such as Social Security Numbers, financial information, or health records through this website.
                </p>
              </div>
            </div>

            {/* How We Collect Information */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-6 w-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-black">2. How We Collect Information</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>We collect personal information directly from you when you fill out our contact form to:</p>
                <ul className="space-y-2 ml-6">
                  <li>• Request a free consultation for a life insurance policy</li>
                  <li>• Express interest in joining our team</li>
                </ul>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">3. How We Use Your Information</h2>
              <div className="space-y-4 text-gray-600">
                <p>We use the information you provide to:</p>
                <ul className="space-y-2 ml-6">
                  <li>• Contact you regarding your inquiry about our life insurance services or team opportunities</li>
                  <li>• Provide you with relevant information and follow-up communications</li>
                </ul>
                <p className="font-medium text-black">
                  We do not use your information for unsolicited marketing or advertising.
                </p>
              </div>
            </div>

            {/* Sharing of Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">4. Sharing of Information</h2>
              <div className="space-y-4 text-gray-600">
                <p className="font-medium text-black">
                  We do not sell, rent, or share your personal information with third parties.
                </p>
              </div>
            </div>

            {/* Third-Party Services */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">5. Third-Party Services</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  We do not currently use third-party analytics tools, advertising networks, or email marketing platforms that collect user data via our website.
                </p>
              </div>
            </div>

            {/* Data Access and User Accounts */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">6. Data Access and User Accounts</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  You are not required to create an account to submit a contact form. If you become a team member with EIB Agency, you may be provided with login credentials to access internal tools or resources. These accounts are managed separately and are subject to additional privacy and security measures.
                </p>
              </div>
            </div>

            {/* Geographic Scope */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">7. Geographic Scope</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Our website is intended for users in the United States and Puerto Rico. By using our site, you consent to the collection and use of your information in accordance with this policy and applicable U.S. laws.
                </p>
              </div>
            </div>

            {/* Security */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <Lock className="h-6 w-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-black">8. Security</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  We take reasonable measures to protect the information you provide through our website. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>
            </div>

            {/* Your Rights and Contact Information */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-black mb-4">9. Your Rights and Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or wish to request access, correction, or deletion of your personal data, please contact us at admin@eibagency.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;