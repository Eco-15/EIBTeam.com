import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, Target, Award, Users, MapPin, Phone, Mail, HelpCircle, Heart, Handshake, UserCheck, Crown } from 'lucide-react';
import { Timeline } from '../components/ui/timeline';

const AboutPage = () => {
  const features = [
    {
      icon: Heart,
      title: 'Love',
      description: 'We genuinely care about our clients and agents, treating everyone with compassion and putting their needs first.',
    },
    {
      icon: Handshake,
      title: 'Respect',
      description: 'We honor the dignity of every person we serve, valuing diverse perspectives and treating everyone with courtesy.',
    },
    {
      icon: UserCheck,
      title: 'Trust',
      description: 'We build lasting relationships through transparency, reliability, and consistently delivering on our promises.',
    },
    {
      icon: Crown,
      title: 'Loyalty',
      description: 'We stand by our clients and team members through all seasons, committed to their long-term success and well-being.',
    },
  ];

  const timeline = [
    {
      year: '2007',
      title: 'EIB Founded',
      description: 'Jason and Nataly Graziani founded Excellence in Building with a mission to serve people and treat them right.'
    },
    {
      year: '2010',
      title: 'PHP Partnership',
      description: 'Established partnerships with leading insurance carriers, gaining access to proven systems and training methodologies.'
    },
    {
      year: '2015',
      title: 'Texas Expansion',
      description: 'Expanded operations throughout Texas, establishing a strong presence in the Dallas-Fort Worth market.'
    },
    {
      year: '2020',
      title: 'Digital Innovation',
      description: 'Implemented cutting-edge technology and remote capabilities to better serve clients and agents.'
    },
    {
      year: '2024',
      title: 'Industry Leader',
      description: 'Recognized as one of the top insurance brokerages with over 15,000 families protected nationwide.'
    }
  ];

  const timelineData = [
    {
      title: '2007 - EIB Founded',
      content: (
        <div>
          <h4 className="text-xl font-bold text-black mb-4">EIB is Founded</h4>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Jason and Nataly Graziani founded Excellence in Building with a mission to serve people and treat them right. 
            Starting with a vision to provide families with financial solutions and to develop leaders in the financial services industry.
          </p>
          <div className="w-full">
            <img
              src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnFBOboBgdhktn0l9Vv7ZApYCzG1iNX84RuD3H"
              alt="EIB founding in 2007"
             className="rounded-lg object-cover w-full aspect-video shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
             style={{ width: '1280px', height: '720px', maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      ),
    },
    {
      title: '2010 - First HQ',
      content: (
        <div>
          <h4 className="text-xl font-bold text-black mb-4">EIB Opens 1st HQ in Oxnard, CA</h4>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            EIB establishes its first headquarters in Oxnard, California, marking the beginning of our expansion 
            and commitment to serving families across the nation.
          </p>
          <div className="w-full">
            <img
              src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnBlbmYuNs1dDP4Ioh850ny67VtNg3mlwEuFpx"
              alt="EIB first headquarters in Oxnard, CA"
             className="rounded-lg object-cover w-full aspect-video shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
             style={{ width: '1280px', height: '720px', maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      ),
    },
    {
      title: '2011 - PHP Partnership',
      content: (
        <div>
          <h4 className="text-xl font-bold text-black mb-4">EIB Team Joins PHP Agency</h4>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            A pivotal moment in EIB's history as we partner with PHP Agency, gaining access to proven systems, 
            training methodologies, and a network of successful agents nationwide.
          </p>
          <div className="w-full">
            <img
              src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnngnqsvftEwlRJSPX6gNfrmvuq2WM4xeFGATH"
              alt="EIB Team joins PHP Agency"
             className="rounded-lg object-cover w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
             style={{ width: '768px', height: '1024px', maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      ),
    },
    {
      title: '2013 - SVP Achievement',
      content: (
        <div>
          <h4 className="text-xl font-bold text-black mb-4">EIB Becomes 1st SVP Team in PHP</h4>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            A historic achievement as EIB becomes the first Senior Vice President team in PHP Agency, 
            setting the standard for excellence and leadership in the organization.
          </p>
          <div className="w-full">
            <img
              src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOna5IOLfzQeWgc0JhO76uDGTAUEqB4jd8SVPZf"
              alt="EIB becomes first SVP team in PHP"
             className="rounded-lg object-cover w-full aspect-video shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
             style={{ width: '1280px', height: '720px', maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      ),
    },
    {
      title: '2014 - Dallas Office',
      content: (
        <div>
          <h4 className="text-xl font-bold text-black mb-4">EIB Opens Office in Dallas, TX</h4>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Expanding into the Texas market, EIB opens its first office in Dallas, beginning our strong 
            presence in the Dallas-Fort Worth metroplex.
          </p>
          <div className="w-full">
            <img
              src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnIbHZdMJEA2Fdv5GxZ0wWRTnU1CQbfzgryeKP"
              alt="EIB opens Dallas office"
             className="rounded-lg object-cover w-full aspect-video shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
             style={{ width: '1280px', height: '720px', maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      ),
    },
    {
      title: '2015 - Key Team Member',
      content: (
        <div>
          <h4 className="text-xl font-bold text-black mb-4">EIB's Backbone - Liz Arredondo</h4>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Liz Arredondo joins the EIB team, becoming an integral part of our operations and contributing 
            significantly to our continued growth and success.
          </p>
          <div className="w-full">
            <img
              src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnf05rrVWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ"
              alt="Liz Arredondo joins EIB team"
             className="rounded-lg object-cover w-full aspect-video shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
             style={{ width: '1280px', height: '720px', maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      ),
    },
    {
      title: '2015 - Plano HQ',
      content: (
        <div>
          <h4 className="text-xl font-bold text-black mb-4">EIB Opens HQ in Plano, TX</h4>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Establishing our headquarters in Plano, Texas, solidifying our commitment to the Dallas-Fort Worth 
            market and creating a central hub for our growing operations.
          </p>
          <div className="w-full">
            <img
              src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOn3dcBm4pHEmVwYtLheWFjdDMo68CiN0Bqyp7b"
              alt="EIB headquarters in Plano, TX"
             className="rounded-lg object-cover w-full aspect-video shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
             style={{ width: '1280px', height: '720px', maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      ),
    },
    {
      title: '2016 - RV Tour',
      content: (
        <div>
          <h4 className="text-xl font-bold text-black mb-4">RV Tour</h4>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            EIB embarks on an innovative RV tour, bringing our message and opportunities directly to communities 
            across the country, demonstrating our commitment to reaching people where they are.
          </p>
          <div className="w-full">
            <img
              src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnU6WHBiEtjKqYRZg1aCTbApezkOJIGxs48of6"
              alt="EIB RV Tour 2016"
             className="rounded-lg object-cover w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
             style={{ width: '2448px', height: '3264px', maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      ),
    },
    {
      title: '2017 - Magic Johnson',
      content: (
        <div>
          <h4 className="text-xl font-bold text-black mb-4">Magic Johnson in Fort Worth</h4>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            A memorable event featuring NBA legend Magic Johnson in Fort Worth, showcasing EIB's ability to 
            bring world-class speakers and inspiration to our team and community.
          </p>
          <div className="w-full">
            <img
              src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOn4AtVmxsTL4f0up9I5jZJSEbw2R1dz7OsVtma"
              alt="Magic Johnson event in Fort Worth"
             className="rounded-lg object-cover w-full aspect-video shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
             style={{ width: '1280px', height: '720px', maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      ),
    },
    {
      title: '2018 - Wedding',
      content: (
        <div>
          <h4 className="text-xl font-bold text-black mb-4">Jason & Nataly Get Married</h4>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            A personal milestone as EIB founders Jason and Nataly Graziani celebrate their wedding, 
            strengthening the partnership that drives EIB's continued success.
          </p>
          <div className="w-full">
            <img
              src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnndi90eftEwlRJSPX6gNfrmvuq2WM4xeFGATH"
              alt="Jason and Nataly wedding"
             className="rounded-lg object-cover w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
             style={{ width: '1284px', height: '1784px', maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      ),
    },
    {
      title: '2018 - Kevin Hart',
      content: (
        <div>
          <h4 className="text-xl font-bold text-black mb-4">Kevin Hart in Vegas</h4>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Another star-studded event featuring comedian Kevin Hart in Las Vegas, demonstrating EIB's 
            commitment to providing exceptional experiences and motivation for our team.
          </p>
          <div className="w-full">
            <img
              src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnNzwqCnT0huLKCxeR79b6tVql3jXPfoFcZDUd"
              alt="Kevin Hart event in Vegas"
             className="rounded-lg object-cover w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
             style={{ width: '1284px', height: '1467px', maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      ),
    },
    {
      title: '2019 - Builders Bowl',
      content: (
        <div>
          <h4 className="text-xl font-bold text-black mb-4">EIB's First Builders Bowl Event</h4>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Launching our signature Builders Bowl event, creating an annual tradition of recognition, 
            celebration, and team building that continues to inspire our organization.
          </p>
          <div className="w-full">
            <img
              src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOncG6JNkXABiZ5cudwgVeLkIK6oqazNlQhtEn2"
              alt="First Builders Bowl event 2019"
             className="rounded-lg object-cover w-full aspect-video shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
             style={{ width: '1280px', height: '720px', maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      ),
    },
    {
      title: '2019 - Kobe Bryant',
      content: (
        <div>
          <h4 className="text-xl font-bold text-black mb-4">Kobe Bryant Event</h4>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            An unforgettable experience with NBA legend Kobe Bryant, bringing his "Mamba Mentality" 
            and championship mindset to inspire our team to achieve greatness.
          </p>
          <div className="w-full">
            <img
              src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOn6VSygNIBMaOvXJICw4x96QTRt3gVWPrHlEsU"
              alt="Kobe Bryant event 2019"
             className="rounded-lg object-cover w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
             style={{ width: '570px', height: '567px', maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      ),
    },
    {
      title: '2019 - George Bush',
      content: (
        <div>
          <h4 className="text-xl font-bold text-black mb-4">George Bush Event</h4>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Hosting former President George Bush, demonstrating EIB's ability to bring distinguished 
            leaders and their wisdom to our organization and community.
          </p>
          <div className="w-full">
            <img
              src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnq9RCcI0f0rumkpwBXbZgQ169Mj5tITK2SiFY"
              alt="George Bush event 2019"
             className="rounded-lg object-cover w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
             style={{ width: '704px', height: '558px', maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      ),
    },
    {
      title: '2019 - Dallas Stadium',
      content: (
        <div>
          <h4 className="text-xl font-bold text-black mb-4">Dallas Stadium Event</h4>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            A spectacular event at Dallas Stadium, showcasing EIB's growth and ability to host 
            large-scale events that inspire and motivate our expanding team.
          </p>
          <div className="w-full">
            <img
              src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjwZQT6kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4"
              alt="Dallas Stadium event 2019"
             className="rounded-lg object-cover w-full aspect-video shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
             style={{ width: '1280px', height: '720px', maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      ),
    },
    {
      title: '2024 - Industry Leader',
      content: (
        <div>
          <h4 className="text-xl font-bold text-black mb-4">Industry Leader</h4>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Recognized as one of the top insurance brokerages with over 15,000 families protected nationwide. 
            Our commitment to excellence and innovation continues to drive our success and growth.
          </p>
          <div className="w-full">
            <img
              src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4"
              alt="EIB as industry leader in 2024"
             className="rounded-lg object-cover w-full aspect-video shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
             style={{ width: '1280px', height: '720px', maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
              To Serve <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">People & Treat </span><span className="text-5xl md:text-6xl font-bold text-black mb-6"> Them Right</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're more than just an insurance brokerage—we're a family dedicated to protecting what matters most.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Excellence in Building (EIB) started in 2007 with a simple mission: To Serve People & Treat Them Right. Founded by Jason and Nataly Graziani, EIB was created to provide families with financial solutions and to develop the next wave of leaders.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Over the years, EIB has proudly helped protect thousands of families across the U.S. while also mentoring the next wave of leaders in our industry. For us, success isn't just about policies—it's about people, purpose, and impact.
              </p>
              
              
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnrZnFpW9IxL6na5HN8Cmj2VAkDRBdih9JyY4u"
                  alt="EIB Team Office"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl shadow-xl">
                <div className="text-black font-bold text-lg">Insurance</div>
                <div className="text-black font-bold text-lg">Leaders</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Commitment to Excellence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              EIB's "4 Pillars" is the foundation ingrained in our culture that make us uniquely positioned to help both our clients and agents succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-3xl font-bold text-black mb-4">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From our founding in 2007 to becoming a leading insurance brokerage
            </p>
          </div>

          {/* Timeline Tree */}
          <div className="relative max-w-5xl mx-auto">
            {/* Central trunk line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 rounded-full" 
                 style={{ height: 'calc(100% - 100px)', top: '50px' }}></div>
            
            {/* Timeline items */}
            <div className="space-y-16">
              {/* 2007 - Left branch */}
              <div className="relative flex items-center">
                {/* Branch line */}
                <div className="absolute right-1/2 top-1/2 transform -translate-y-1/2 w-32 h-0.5 bg-gradient-to-l from-yellow-500 to-yellow-400"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-md"></div>
                
                <div className="w-1/2 pr-8 flex justify-end">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-xs hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative rounded-lg overflow-hidden mb-3">
                      <img
                        src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnFBOboBgdhktn0l9Vv7ZApYCzG1iNX84RuD3H"
                        alt="EIB Founded 2007"
                        className="w-full h-20 md:h-80 object-cover"
                      />
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-black text-center">2007 - EIB Founded</h3>
                  </div>
                </div>
              </div>

              {/* 2010 - Right branch */}
              <div className="relative flex items-center">
                {/* Branch line */}
                <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 w-32 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-400"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-md"></div>
                
                <div className="w-1/2"></div>
                <div className="w-1/2 pl-8 flex justify-start">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-xs hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative rounded-lg overflow-hidden mb-3">
                      <img
                        src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnBlbmYuNs1dDP4Ioh850ny67VtNg3mlwEuFpx"
                        alt="First HQ 2010"
                        className="w-full h-20 md:h-80 object-cover"
                      />
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-black text-center">2010 - First HQ</h3>
                  </div>
                </div>
              </div>

              {/* 2011 - Left branch */}
              <div className="relative flex items-center">
                {/* Branch line */}
                <div className="absolute right-1/2 top-1/2 transform -translate-y-1/2 w-32 h-0.5 bg-gradient-to-l from-yellow-500 to-yellow-400"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-md"></div>
                
                <div className="w-1/2 pr-8 flex justify-end">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-xs hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative rounded-lg overflow-hidden mb-3">
                      <img
                        src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnngnqsvftEwlRJSPX6gNfrmvuq2WM4xeFGATH"
                        alt="PHP Partnership 2011"
                        className="w-full h-20 md:h-32 object-cover"
                      />
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-black text-center">2011 - PHP Partnership</h3>
                  </div>
                </div>
              </div>

              {/* 2013 - Right branch */}
              <div className="relative flex items-center">
                {/* Branch line */}
                <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 w-32 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-400"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-md"></div>
                
                <div className="w-1/2"></div>
                <div className="w-1/2 pl-8 flex justify-start">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-xs hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative rounded-lg overflow-hidden mb-3">
                      <img
                        src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOna5IOLfzQeWgc0JhO76uDGTAUEqB4jd8SVPZf"
                        alt="SVP Achievement 2013"
                        className="w-full h-20 md:h-32 object-cover"
                      />
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-black text-center">2013 - SVP Achievement</h3>
                  </div>
                </div>
              </div>

              {/* 2014 - Left branch */}
              <div className="relative flex items-center">
                {/* Branch line */}
                <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 w-32 h-0.5 bg-gradient-to-l from-yellow-500 to-yellow-400"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-md"></div>
                
                <div className="w-1/2 pr-8 flex justify-end">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-xs hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative rounded-lg overflow-hidden mb-3">
                      <img
                        src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnIbHZdMJEA2Fdv5GxZ0wWRTnU1CQbfzgryeKP"
                        alt="Dallas Office 2014"
                        className="w-full h-20 md:h-32 object-cover"
                      />
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-black text-center">2014 - Dallas Office</h3>
                  </div>
                </div>
              </div>

              {/* 2015 - Right branch */}
              <div className="relative flex items-center">
                {/* Branch line */}
                <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 w-32 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-400"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-md"></div>
                
                <div className="w-1/2"></div>
                <div className="w-1/2 pl-8 flex justify-start">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-xs hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative rounded-lg overflow-hidden mb-3">
                      <img
                        src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOn3dcBm4pHEmVwYtLheWFjdDMo68CiN0Bqyp7b"
                        alt="Plano HQ 2015"
                        className="w-full h-20 md:h-32 object-cover"
                      />
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-black text-center">2015 - Plano HQ</h3>
                  </div>
                </div>
              </div>

              {/* 2016 - Left branch */}
              <div className="relative flex items-center">
                {/* Branch line */}
                <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 w-32 h-0.5 bg-gradient-to-l from-yellow-500 to-yellow-400"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-md"></div>
                
                <div className="w-1/2 pr-8 flex justify-end">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-xs hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative rounded-lg overflow-hidden mb-3">
                      <img
                        src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnU6WHBiEtjKqYRZg1aCTbApezkOJIGxs48of6"
                        alt="RV Tour 2016"
                        className="w-full h-20 md:h-32 object-cover"
                      />
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-black text-center">2016 - RV Tour</h3>
                  </div>
                </div>
              </div>

              {/* 2017 - Right branch */}
              <div className="relative flex items-center">
                {/* Branch line */}
                <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 w-32 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-400"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-md"></div>
                
                <div className="w-1/2"></div>
                <div className="w-1/2 pl-8 flex justify-start">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-xs hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative rounded-lg overflow-hidden mb-3">
                      <img
                        src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOn4AtVmxsTL4f0up9I5jZJSEbw2R1dz7OsVtma"
                        alt="Magic Johnson 2017"
                        className="w-full h-20 md:h-32 object-cover"
                      />
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-black text-center">2017 - Magic Johnson</h3>
                  </div>
                </div>
              </div>

              {/* 2018 - Left branch */}
              <div className="relative flex items-center">
                {/* Branch line */}
                <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 w-32 h-0.5 bg-gradient-to-l from-yellow-500 to-yellow-400"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-md"></div>
                
                <div className="w-1/2 pr-8 flex justify-end">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-xs hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative rounded-lg overflow-hidden mb-3">
                      <img
                        src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnndi90eftEwlRJSPX6gNfrmvuq2WM4xeFGATH"
                        alt="Wedding 2018"
                        className="w-full h-20 md:h-32 object-cover"
                      />
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-black text-center">2018 - Wedding</h3>
                  </div>
                </div>
              </div>

              {/* 2019 - Right branch (Builders Bowl) */}
              <div className="relative flex items-center">
                {/* Branch line */}
                <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 w-32 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-400"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-md"></div>
                
                <div className="w-1/2"></div>
                <div className="w-1/2 pl-8 flex justify-start">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-xs hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative rounded-lg overflow-hidden mb-3">
                      <img
                        src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOncG6JNkXABiZ5cudwgVeLkIK6oqazNlQhtEn2"
                        alt="Builders Bowl 2019"
                        className="w-full h-20 md:h-32 object-cover"
                      />
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-black text-center">2019 - Builders Bowl</h3>
                  </div>
                </div>
              </div>

              {/* 2019 - Left branch (Kobe) */}
              <div className="relative flex items-center">
                {/* Branch line */}
                <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 w-32 h-0.5 bg-gradient-to-l from-yellow-500 to-yellow-400"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-md"></div>
                
                <div className="w-1/2 pr-8 flex justify-end">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-xs hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative rounded-lg overflow-hidden mb-3">
                      <img
                        src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOn6VSygNIBMaOvXJICw4x96QTRt3gVWPrHlEsU"
                        alt="Kobe Bryant 2019"
                        className="w-full h-20 md:h-32 object-cover"
                      />
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-black text-center">2019 - Kobe Bryant</h3>
                  </div>
                </div>
              </div>

              {/* 2024 - Center (Crown/Final) */}
              <div className="relative flex items-center justify-center">
                {/* Special crown connection */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full border-4 border-white shadow-lg"></div>
                
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl shadow-xl p-6 max-w-sm hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="relative rounded-lg overflow-hidden mb-4">
                    <img
                      src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4"
                      alt="Industry Leader 2024"
                      className="w-full h-24 md:h-40 object-cover"
                    />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-black text-center">2024 - Industry Leader</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Founders Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Founders</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Jason and Nataly Graziani founded EIB with a vision to create lasting impact 
              in the lives of families and financial professionals alike.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Jason Graziani */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="relative rounded-2xl overflow-hidden shadow-lg mb-6">
                  <img
                    src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnjCbRX4kELmIuFY2xWfjP3dbMtw8TZ1SDK7p4"
                    alt="Jason Graziani"
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <p className="text-white font-medium text-lg">Bio Video Coming Soon</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Jason Graziani</h3>
                <p className="text-yellow-600 font-semibold mb-4">Co-Founder & CEO</p>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Jason co-founded Excellence in Building (EIB) in 2007 with a vision to serve people and treat them right. 
                  With over 15 years of experience in the financial services industry, Jason has built EIB into one of the 
                  most successful PHP Agency partners in Texas.
                </p>
                <p>
                  His leadership philosophy centers on developing people and creating opportunities for growth. 
                  Jason currently resides in Prosper, Texas, with his wife Nataly and their four children, 
                  and serves as a trustee at Revolution Church in McKinney.
                </p>
              </div>
            </div>

            {/* Nataly Graziani */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="relative rounded-2xl overflow-hidden shadow-lg mb-6">
                  <img
                    src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlWKBy9zn8EfQTV7ApbyFLmjY5GCZhaPcN4nz"
                    alt="Nataly Graziani"
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <p className="text-white font-medium text-lg">Bio Video Coming Soon</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Nataly Graziani</h3>
                <p className="text-yellow-600 font-semibold mb-4">Co-Founder & COO</p>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Nataly works daily alongside Jason running operations for EIB. She brings her passion for people development and cultural excellence to the organization. Her background in business development and team leadership has been instrumental in scaling EIB's success across multiple markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-black to-gray-900 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Join Our Team?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover how EIB Agency can help you build a successful career in the insurance industry. 
              We're here to support your journey every step of the way.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="h-6 w-6 text-yellow-400" />
                <span>(972) 805-1002</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-6 w-6 text-yellow-400" />
                <span>admin@eibagency.com</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="h-6 w-6 text-yellow-400" />
                <span>6200 Tennyson Parkway Plano Tx 75024</span>
              </div>
            </div>
            
            <a
              href="/contact"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-colors duration-300 inline-block"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;