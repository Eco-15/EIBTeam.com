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
              Welcome to EIB Agency. By accessing or using our website, you agree to comply with and be bound by these Terms of Service.
            </p>
            <p className="text-sm text-gray-500 mt-4">Effective Date: [Insert Date]</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <div className="space-y-4 text-gray-600 mb-12">
              <p>
                Welcome to EIB Agency ("we," "our," or "us"). By accessing or using our website, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>
            </div>

            {/* Use of the Website */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <Scale className="h-6 w-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-black">1. Use of the Website</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>You agree to use this website for lawful purposes only. You may not use our site to:</p>
                <ul className="space-y-2 ml-6">
                  <li>• Submit false or misleading information</li>
                  <li>• Attempt to gain unauthorized access to secure areas</li>
                  <li>• Interfere with the website's operation or security</li>
                  <li>• Violate any applicable laws or regulations</li>
                </ul>
              </div>
            </div>

            {/* Eligibility */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">2. Eligibility</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Our services are intended for individuals located in the United States and Puerto Rico who are at least 18 years old or the age of majority in their jurisdiction. By using the site, you confirm that you meet these requirements.
                </p>
              </div>
            </div>

            {/* No Guarantee of Services */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">3. No Guarantee of Services</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Submitting a contact form does not guarantee services, offers, or employment. All inquiries are subject to review and eligibility.
                </p>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">4. Intellectual Property</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  All content on this website, including text, graphics, logos, images, and layout, is the property of EIB Agency and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or modify any content without our prior written permission.
                </p>
              </div>
            </div>

            {/* User Submissions */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">5. User Submissions</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Any information you submit through the website (e.g., via contact forms) must be accurate and truthful. We reserve the right to reject or remove any submissions that violate these Terms or that we deem inappropriate.
                </p>
              </div>
            </div>

            {/* Third-Party Links */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">6. Third-Party Links</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Our website may contain links to third-party websites. We are not responsible for the content, policies, or practices of any linked third-party sites. Visiting those sites is at your own risk. Links are provided for informational purposes only and should not be viewed as an endorsement, sponsorship, solicitation, or other affiliation with respect to any third parties or their content. When you link to any of the web sites provided here, you are leaving this website. We make no representation as to the completeness or accuracy of information provided at these web sites. Nor is the company liable for any direct or indirect technical or system issues or any consequences arising out of your access to, or your use of third-party technologies, websites, information, and programs made available through this web site. When you access one of these websites, you are leaving our web site and assume total responsibility and risk for your use of the web sites you are linking to.
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-black">7. Disclaimer</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  The content on our website is provided for general informational purposes only. Nothing on this site constitutes legal, financial, or insurance advice. You should consult with a licensed professional for any such services. EIB Agency and their representatives do not offer tax or legal advice. For advice concerning your own situation, please consult with your appropriate professional advisor.
                </p>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">8. Limitation of Liability</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  To the fullest extent permitted by law, EIB Agency will not be liable for any indirect, incidental, or consequential damages arising out of your use of the website.
                </p>
              </div>
            </div>

            {/* Changes to These Terms */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">9. Changes to These Terms</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  We reserve the right to update or modify these Terms at any time. Changes will be effective upon posting on this page. Your continued use of the site after changes are made constitutes your acceptance of the revised Terms.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-black mb-4">10. Contact Information</h2>
              <p className="text-gray-600">
                If you have any questions about these Terms, please contact us at admin@eibagency.com.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfServicePage;