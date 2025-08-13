import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FileText, AlertTriangle, Scale, Users } from 'lucide-react';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center">
                <FileText className="h-8 w-8 text-black" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black">Terms of Service</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These terms govern your use of our website and services. Please read them carefully.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: January 1, 2025</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Acceptance of Terms */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <Scale className="h-6 w-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-black">Acceptance of Terms</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  By accessing and using the EIB Agency website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
                <p>
                  These Terms of Service may be updated from time to time. We will notify you of any material changes by posting the new Terms of Service on this page.
                </p>
              </div>
            </div>

            {/* Use of Services */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">Use of Services</h2>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-black mb-4">Permitted Uses</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Requesting insurance quotes and information</li>
                  <li>• Submitting applications for insurance products</li>
                  <li>• Accessing educational resources and materials</li>
                  <li>• Communicating with our agents and staff</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-6 rounded-xl mt-6">
                <h3 className="text-lg font-semibold text-red-800 mb-4">Prohibited Uses</h3>
                <ul className="space-y-2 text-red-700">
                  <li>• Providing false or misleading information</li>
                  <li>• Attempting to access unauthorized areas</li>
                  <li>• Using the service for illegal activities</li>
                  <li>• Interfering with the operation of our systems</li>
                  <li>• Violating any applicable laws or regulations</li>
                </ul>
              </div>
            </div>

            {/* Insurance Services */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="h-6 w-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-black">Insurance Services</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  EIB Agency acts as an insurance brokerage, representing multiple insurance carriers. We are licensed to sell insurance products in the state of Texas and other jurisdictions where properly licensed.
                </p>
                <p>
                  All insurance applications are subject to underwriting approval by the respective insurance carriers. Coverage is not guaranteed and may be declined based on underwriting guidelines.
                </p>
                <p>
                  Premium rates and policy terms are determined by the insurance carriers and may change based on various factors including age, health, and market conditions.
                </p>
              </div>
            </div>

            {/* Disclaimers */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-black">Disclaimers</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>No Warranty:</strong> Our website and services are provided "as is" without any warranties, express or implied. We do not guarantee the accuracy, completeness, or timeliness of information provided.
                </p>
                <p>
                  <strong>Investment Advice:</strong> Information provided on our website is for educational purposes only and should not be considered as investment advice. Please consult with qualified financial professionals for personalized advice.
                </p>
                <p>
                  <strong>Insurance Coverage:</strong> Insurance products have limitations and exclusions. Please review policy documents carefully before making decisions.
                </p>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">Limitation of Liability</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  EIB Agency shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, even if we have been advised of the possibility of such damages.
                </p>
                <p>
                  Our total liability to you for any claims arising from your use of our services shall not exceed the amount you paid for such services.
                </p>
              </div>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">Governing Law</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  These Terms of Service shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions.
                </p>
                <p>
                  Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Collin County, Texas.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-black mb-4">Questions About These Terms?</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us:
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

export default TermsOfServicePage;