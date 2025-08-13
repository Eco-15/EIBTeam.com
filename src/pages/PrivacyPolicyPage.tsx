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
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: January 1, 2025</p>
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
                <h2 className="text-2xl font-bold text-black">Information We Collect</h2>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-black mb-4">Personal Information</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Name, address, phone number, and email address</li>
                  <li>• Date of birth and Social Security number</li>
                  <li>• Financial information for insurance applications</li>
                  <li>• Health information as required for underwriting</li>
                  <li>• Employment and income information</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl mt-6">
                <h3 className="text-lg font-semibold text-black mb-4">Automatically Collected Information</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Website usage data and analytics</li>
                  <li>• IP address and browser information</li>
                  <li>• Cookies and similar tracking technologies</li>
                  <li>• Device information and preferences</li>
                </ul>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-6 w-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-black">How We Use Your Information</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>We use your personal information to:</p>
                <ul className="space-y-2 ml-6">
                  <li>• Process insurance applications and provide quotes</li>
                  <li>• Communicate with you about our services and your policies</li>
                  <li>• Comply with legal and regulatory requirements</li>
                  <li>• Improve our services and website functionality</li>
                  <li>• Prevent fraud and ensure security</li>
                  <li>• Provide customer support and assistance</li>
                </ul>
              </div>
            </div>

            {/* Information Sharing */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">Information Sharing</h2>
              <div className="space-y-4 text-gray-600">
                <p>We may share your information with:</p>
                <ul className="space-y-2 ml-6">
                  <li>• Insurance carriers for underwriting and policy issuance</li>
                  <li>• Service providers who assist with our operations</li>
                  <li>• Regulatory authorities as required by law</li>
                  <li>• Legal authorities when required by court order or subpoena</li>
                </ul>
                <p className="font-medium text-black">
                  We do not sell your personal information to third parties for marketing purposes.
                </p>
              </div>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <Lock className="h-6 w-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-black">Data Security</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>We implement appropriate security measures to protect your personal information:</p>
                <ul className="space-y-2 ml-6">
                  <li>• Encryption of sensitive data in transit and at rest</li>
                  <li>• Secure servers and network infrastructure</li>
                  <li>• Regular security audits and updates</li>
                  <li>• Employee training on data protection</li>
                  <li>• Access controls and authentication measures</li>
                </ul>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">Your Rights</h2>
              <div className="space-y-4 text-gray-600">
                <p>You have the right to:</p>
                <ul className="space-y-2 ml-6">
                  <li>• Access your personal information we maintain</li>
                  <li>• Request corrections to inaccurate information</li>
                  <li>• Request deletion of your information (subject to legal requirements)</li>
                  <li>• Opt out of marketing communications</li>
                  <li>• File a complaint with regulatory authorities</li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-black mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
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

export default PrivacyPolicyPage;