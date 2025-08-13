import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Award, MapPin, FileText, CheckCircle } from 'lucide-react';

const LicenseInformationPage = () => {
  const licenses = [
    {
      state: 'Texas',
      licenseNumber: 'TDI License #123456',
      status: 'Active',
      expirationDate: 'December 31, 2025',
      products: ['Life Insurance', 'Annuities', 'Health Insurance', 'Accident Insurance']
    }
  ];

  const carriers = [
    'National Life Group',
    'American National Insurance Company',
    'Foresters Financial',
    'North American Company',
    'SILAC Insurance Company',
    'National Western Life',
    'AIG',
    'F&G Annuities & Life',
    'Mutual of Omaha'
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
                <Award className="h-8 w-8 text-black" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black">License Information</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              EIB Agency is properly licensed and regulated to provide insurance services in accordance with state requirements.
            </p>
          </div>
        </div>
      </section>

      {/* License Details Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Our Licenses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We maintain all required licenses and certifications to provide insurance services in our operating jurisdictions.
            </p>
          </div>

          <div className="grid gap-8">
            {licenses.map((license, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center space-x-3 mb-6">
                      <MapPin className="h-6 w-6 text-yellow-600" />
                      <h3 className="text-2xl font-bold text-black">{license.state}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">License Number</p>
                        <p className="text-lg font-semibold text-black">{license.licenseNumber}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700">Status</p>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-lg font-semibold text-green-600">{license.status}</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700">Expiration Date</p>
                        <p className="text-lg font-semibold text-black">{license.expirationDate}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-black mb-4">Authorized Products</h4>
                    <div className="space-y-2">
                      {license.products.map((product, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600">{product}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authorized Carriers */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Authorized Insurance Carriers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are authorized to represent the following A-rated insurance carriers, ensuring you have access to quality products and financial stability.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {carriers.map((carrier, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{carrier}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Regulatory Oversight</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-6 w-6 text-yellow-600" />
                <h3 className="text-xl font-bold text-black">Texas Department of Insurance</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  EIB Agency is regulated by the Texas Department of Insurance (TDI), which oversees insurance companies, agents, and brokers operating in Texas.
                </p>
                <p>
                  <strong>TDI Website:</strong> <a href="https://www.tdi.texas.gov" className="text-yellow-600 hover:text-yellow-700">www.tdi.texas.gov</a>
                </p>
                <p>
                  <strong>Consumer Helpline:</strong> 1-800-252-3439
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                <h3 className="text-xl font-bold text-black">Consumer Protection</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  As a licensed insurance brokerage, we are required to maintain errors and omissions insurance and follow strict regulatory guidelines.
                </p>
                <p>
                  If you have concerns about our services, you may file a complaint with the Texas Department of Insurance or contact us directly.
                </p>
                <p>
                  We are committed to ethical business practices and transparent communication with all clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notices */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-8 rounded-xl">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-yellow-800 mb-4">Important Notice</h3>
                <div className="space-y-3 text-yellow-700">
                  <p>
                    Insurance products are not deposits, are not FDIC insured, are not insured by any federal government agency, are not guaranteed by the bank or any affiliate, and may go down in value.
                  </p>
                  <p>
                    This website provides general information only. Specific policy terms, conditions, and exclusions apply to all insurance products. Please review policy documents carefully.
                  </p>
                  <p>
                    Licensing information is subject to change. Please verify current licensing status with the appropriate state regulatory authority.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-black mb-4">License Verification</h2>
            <p className="text-gray-600 mb-6">
              To verify our licensing status or for questions about our credentials, please contact:
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
      </section>

      <Footer />
    </div>
  );
};

export default LicenseInformationPage;