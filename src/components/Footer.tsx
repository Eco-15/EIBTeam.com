import React from 'react';
import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Services', href: '/services' },
    { name: 'Why Join Us', href: '/why-join-us' },
    { name: 'Contact', href: '/contact' }
  ];

  const services = [
    { name: 'Term Life Insurance', href: '/services' },
    { name: 'Whole Life Insurance', href: '/services' },
    { name: 'Universal Life Insurance', href: '/services' },
    { name: 'Business Insurance', href: '/services' },
    { name: 'Health Insurance', href: '/services' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' }
  ];

  return (
    <footer className="bg-gradient-to-r from-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ" 
                alt="EIB Team Logo" 
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-2xl font-bold text-white">EIB Team</h3>
                <p className="text-sm text-gray-300">PHP Agency Partner</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Building successful insurance careers in the Dallas-Fort Worth area as a proud PHP Agency partner. 
              Join our team of professionals and exceed your potential.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-300">(214) 263-7979</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-300">EIB.PHP@Gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-300">6200 Tennyson Parkway Plano Tx 75024</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Connect With Us</h4>
            
            <div className="bg-white/10 rounded-xl p-6 mb-6">
              <h5 className="font-bold text-yellow-400 mb-2">Ready to Join?</h5>
              <p className="text-gray-300 text-sm mb-4">
                Start your insurance career today with a leading PHP Agency partner in DFW.
              </p>
              <a
                href="#contact"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-bold text-sm hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 inline-block"
              >
                Apply Now
              </a>
            </div>

            <div>
              <h5 className="text-white font-medium mb-4">Follow Us</h5>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="bg-white/10 p-3 rounded-lg hover:bg-yellow-500 hover:text-black transition-all duration-300 group"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              © {currentYear} EIB Team Insurance Brokerage • PHP Agency Partner. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                License Information
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Compliance
              </a>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-xs">
              EIB Team is a PHP Agency partner licensed in Texas. Insurance products are offered through licensed agents. 
              Not all products available in all states.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;