import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageSquare, Calendar, Users, UserPlus, FileText } from 'lucide-react';

const ContactPage = () => {
  const [consultationForm, setConsultationForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    productInterest: '',
    hearAbout: '',
    comments: ''
  });

  const [teamForm, setTeamForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    experience: '',
    hearAbout: '',
    description: ''
  });

  const [activeForm, setActiveForm] = useState('consultation');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleConsultationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setConsultationForm({
      ...consultationForm,
      [e.target.name]: e.target.value
    });
  };

  const handleTeamChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTeamForm({
      ...teamForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent, formType: string) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    if (formType === 'consultation') {
      setConsultationForm({
        name: '', email: '', phone: '', city: '', state: '',
        productInterest: '', hearAbout: '', comments: ''
      });
    } else {
      setTeamForm({
        name: '', email: '', phone: '', city: '', state: '',
        experience: '', hearAbout: '', description: ''
      });
    }
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      primary: '(972) 805-1002',
      secondary: 'Mon-Fri 8:00 AM - 6:00 PM',
      action: 'Call Now',
      href: 'tel:(972)805-1002'
    },
    {
      icon: Mail,
      title: 'Email',
      primary: 'EIB.PHP@Gmail.com',
      secondary: 'We\'ll respond within 24 hours',
      action: 'Send Email',
      href: 'mailto:EIB.PHP@Gmail.com'
    },
    {
      icon: MapPin,
      title: 'Office',
      primary: '6200 Tennyson Parkway',
      secondary: 'Plano Tx 75024',
      action: 'Get Directions',
      href: 'https://share.google/fJd4R3i6QGS450T7g'
    },
  ];

  const officeHours = [
    { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  const quickFacts = [
    { label: 'Training Program', value: 'Comprehensive' },
    { label: 'Training Length', value: '2-4 Weeks' },
    { label: 'License Required', value: 'We Help!' },
    { label: 'Remote Work', value: 'Available' }
  ];

  const faqs = [
    {
      question: 'Do I need insurance experience to join?',
      answer: 'No! We welcome people from all backgrounds. Our comprehensive training program will teach you everything you need to know.'
    },
    {
      question: 'How long does the training take?',
      answer: 'Our initial training program is 2-4 weeks, followed by ongoing mentorship and support as you build your business.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We provide leads, marketing materials, CRM system, ongoing training, and dedicated mentorship to help you succeed.'
    },
    {
      question: 'Can I work from home?',
      answer: 'Yes! We offer flexible work arrangements including remote work options for qualified agents.'
    }
  ];

  const productOptions = [
    'Term Insurance',
    'Whole Life Insurance',
    'Indexed Universal Life Insurance',
    'Annuity',
    'Debt Solutions',
    'Medicare'
  ];

  const hearAboutOptions = [
    'Agent',
    'Friend or Family',
    'Website',
    'Social Media',
    'Search Engine',
    'Referral',
    'Other'
  ];

  const experienceOptions = [
    'No Experience',
    '0-1 Years',
    '1-3 Years',
    '3-5 Years',
    '5+ Years'
  ];

  const teamHearAboutOptions = [
    'EIB Agent',
    'Website',
    'Event',
    'Referral',
    'Social Media',
    'Search Engine',
    'Other'
  ];

  const descriptionOptions = [
    'I am interested in becoming an agent',
    'I am interested in becoming a client',
    'I have a general question'
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Let's Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Your Journey</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to take the next step in your insurance career or get the protection you need? 
              We'd love to hear from you. Our team is standing by to answer your questions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <a
                href="mailto:EIB.PHP@Gmail.com"
                href={method.href}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <method.icon className="h-6 w-6 text-black" />
                </div>
                <h3 className="font-bold text-black mb-2">{method.title}</h3>
                <p className="text-gray-700 font-medium mb-1">{method.primary}</p>
                <p className="text-gray-500 text-sm mb-3">{method.secondary}</p>
                <span className="text-yellow-600 font-semibold text-sm">{method.action} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Forms */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                {/* Form Toggle */}
                <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setActiveForm('consultation')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                      activeForm === 'consultation'
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-md'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <FileText className="h-5 w-5" />
                    <span>Get Free Consultation</span>
                  </button>
                  <button
                    onClick={() => setActiveForm('team')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                      activeForm === 'team'
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-md'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <UserPlus className="h-5 w-5" />
                    <span>Join Our Team</span>
                  </button>
                </div>

                {isSubmitted && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <p className="text-green-700 font-medium">
                        Thank you for your interest! We'll be in touch within 24 hours.
                      </p>
                    </div>
                  </div>
                )}

                {/* Consultation Form */}
                {activeForm === 'consultation' && (
                  <form onSubmit={(e) => handleSubmit(e, 'consultation')} className="space-y-6">
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-black mb-2">Get a Free Consultation</h2>
                      <p className="text-gray-600">Let us help you find the right insurance solution for your needs.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="cons-name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="cons-name"
                          name="name"
                          required
                          value={consultationForm.name}
                          onChange={handleConsultationChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cons-email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="cons-email"
                          name="email"
                          required
                          value={consultationForm.email}
                          onChange={handleConsultationChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="cons-phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="cons-phone"
                          name="phone"
                          required
                          value={consultationForm.phone}
                          onChange={handleConsultationChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                          placeholder="(972) 805-1002"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cons-city" className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          id="cons-city"
                          name="city"
                          required
                          value={consultationForm.city}
                          onChange={handleConsultationChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                          placeholder="Your city"
                        />
                      </div>

                      <div>
                        <label htmlFor="cons-state" className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          id="cons-state"
                          name="state"
                          required
                          value={consultationForm.state}
                          onChange={handleConsultationChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                          placeholder="TX"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="cons-product" className="block text-sm font-medium text-gray-700 mb-2">
                          Product of Interest
                        </label>
                        <select
                          id="cons-product"
                          name="productInterest"
                          value={consultationForm.productInterest}
                          onChange={handleConsultationChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select a product</option>
                          {productOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="cons-hear" className="block text-sm font-medium text-gray-700 mb-2">
                          How did you hear about us?
                        </label>
                        <select
                          id="cons-hear"
                          name="hearAbout"
                          value={consultationForm.hearAbout}
                          onChange={handleConsultationChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select an option</option>
                          {hearAboutOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="cons-comments" className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Comments
                      </label>
                      <textarea
                        id="cons-comments"
                        name="comments"
                        rows={4}
                        value={consultationForm.comments}
                        onChange={handleConsultationChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors resize-none"
                        placeholder="Tell us more about your insurance needs..."
                      ></textarea>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Disclosure:</strong> You must be 18+ years old to fill out this questionnaire.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-lg font-bold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Request Consultation</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Team Form */}
                {activeForm === 'team' && (
                  <form onSubmit={(e) => handleSubmit(e, 'team')} className="space-y-6">
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-black mb-2">Join Our Team</h2>
                      <p className="text-gray-600">Start your career with EIB Agency and become part of our success story.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="team-name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="team-name"
                          name="name"
                          required
                          value={teamForm.name}
                          onChange={handleTeamChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="team-email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="team-email"
                          name="email"
                          required
                          value={teamForm.email}
                          onChange={handleTeamChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="team-phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="team-phone"
                          name="phone"
                          required
                          value={teamForm.phone}
                          onChange={handleTeamChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                          placeholder="(972) 805-1002"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="team-city" className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          id="team-city"
                          name="city"
                          required
                          value={teamForm.city}
                          onChange={handleTeamChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                          placeholder="Your city"
                        />
                      </div>

                      <div>
                        <label htmlFor="team-state" className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          id="team-state"
                          name="state"
                          required
                          value={teamForm.state}
                          onChange={handleTeamChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                          placeholder="TX"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="team-experience" className="block text-sm font-medium text-gray-700 mb-2">
                          Insurance Experience
                        </label>
                        <select
                          id="team-experience"
                          name="experience"
                          value={teamForm.experience}
                          onChange={handleTeamChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select experience level</option>
                          {experienceOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="team-hear" className="block text-sm font-medium text-gray-700 mb-2">
                          How did you hear about us?
                        </label>
                        <select
                          id="team-hear"
                          name="hearAbout"
                          value={teamForm.hearAbout}
                          onChange={handleTeamChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select an option</option>
                          {teamHearAboutOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="team-description" className="block text-sm font-medium text-gray-700 mb-2">
                        Choose an option that best describes you?
                      </label>
                      <select
                        id="team-description"
                        name="description"
                        value={teamForm.description}
                        onChange={handleTeamChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select an option</option>
                        {descriptionOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Disclosure:</strong> You must be 18+ years old to fill out this questionnaire.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-lg font-bold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Submit Application</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 text-center">
                    By submitting this form, you agree to be contacted by EIB Agency regarding your inquiry. 
                    We respect your privacy and will never share your information with third parties.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Office Hours */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-black mb-6 flex items-center">
                  <Clock className="h-6 w-6 mr-3 text-yellow-600" />
                  Office Hours
                </h3>
                
                <div className="space-y-4">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Facts */}
              <div className="bg-gradient-to-r from-black to-gray-900 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Quick Facts</h3>
                <div className="space-y-4">
                  {quickFacts.map((fact, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-300">{fact.label}:</span>
                      <span className="font-bold text-yellow-400">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-black mb-4">Need Immediate Help?</h3>
                <p className="text-gray-600 mb-4">
                  For urgent matters or immediate assistance, call our direct line.
                </p>
                <a
                  href="tel:(972)805-1002"
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg font-bold hover:from-yellow-600 hover:to-yellow-700 transition-colors duration-300 inline-flex items-center space-x-2"
                >
                  <Phone className="h-5 w-5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about joining EIB Team and our insurance services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-bold text-black mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <a
              href="mailto:careers@eibteam.com"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg font-bold hover:from-yellow-600 hover:to-yellow-700 transition-colors duration-300 inline-flex items-center space-x-2"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Ask a Question</span>
            </a>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-6">Visit Our Office</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Located in the heart of Plano, Texas, our office is easily accessible 
              from anywhere in the Dallas-Fort Worth metroplex.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center text-gray-500 h-96">
                <div className="text-center">
                  <MapPin className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
                  <p className="text-lg font-medium text-gray-700">Interactive Map Coming Soon</p>
                  <p className="text-gray-600">6200 Tennyson Parkway Plano Tx 75024</p>
                  <a
                    href="https://maps.google.com"
                    className="mt-4 inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-colors duration-300"
                  >
                    <span>Get Directions</span>
                    <MapPin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;