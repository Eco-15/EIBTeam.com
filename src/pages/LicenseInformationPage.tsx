import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Award, MapPin, FileText, CheckCircle } from 'lucide-react';

const LicenseInformationPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center">
                <Award className="h-8 w-8 text-black" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black">License Information</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              EIB Agency is a licensed insurance agency operating in the United States and Puerto Rico.
            </p>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
             United States and Puerto Rico.
            </p>
            <p className="text-sm text-gray-500 mt-4">Effective Date: 8-13-2025</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <div className="space-y-4 text-gray-600 mb-12">
              <p>
                EIB Agency is a licensed insurance agency operating in the United States and Puerto Rico. Our agents are individually licensed to sell insurance products, including life insurance, in the states and territories in which they conduct business. An agent or representative may only transact business in a state if first licensed appropriately. Follow-up or individualized responses to persons in a state by such a firm or individual that involve either effecting or attempting to effect transactions in insurance sales or the rendering of personalized financial advice for compensation, will not be made without first complying with appropriate FINRA requirements.
              </p>
            </div>

            {/* State Licensing */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <Award className="h-6 w-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-black">State Licensing</h2>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="space-y-4 text-gray-600">
                  <p>
                    Each agent representing EIB Agency is required to hold a valid insurance license in the respective state(s) where they offer services. Licensing details, including license numbers and authorized lines of authority, can be verified through the National Association of Insurance Commissioners (NAIC) or the relevant State Department of Insurance.
                  </p>
                  <p className="font-medium text-black">
                    We do not solicit or conduct business in states where we or our agents are not properly licensed.
                  </p>
                </div>
              </div>
            </div>

            {/* No Guarantee of Coverage */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-6 w-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-black">No Guarantee of Coverage</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  Submission of a contact form or inquiry does not guarantee eligibility, coverage, or acceptance for any insurance product. All applications are subject to underwriting and approval by licensed insurance carriers.
                </p>
              </div>
            </div>

            {/* Contact for Licensing Questions */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-black mb-4">Contact for Licensing Questions</h2>
              <p className="text-gray-600">
                If you have questions regarding licensing or would like to confirm the licensing status of a specific agent, please contact us at admin@eibagency.com.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LicenseInformationPage;