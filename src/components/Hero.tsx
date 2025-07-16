import React from 'react';
import { ArrowRight, MapPin, Users, TrendingUp, Star, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-0">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `https://images.fineartamerica.com/images/artworkimages/medium/2/dallas-skyline-at-sunset-texas-panorama-gregory-ballos.jpg`
          }}
        ></div>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-full blur-xl z-10"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-black/5 to-gray-800/5 rounded-full blur-2xl z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Build Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700"> Dream Career</span>
            <br />
          </h1>

          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
            Join EIB Team, a <span className="font-semibold text-white">PHP Agency</span> partner and the <span className="font-semibold text-white">fastest-growing insurance brokerage</span> in Texas. 
            We're building a world-class team of professionals who want to 
            <span className="text-yellow-600 font-semibold"> exceed their potential</span>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-center mb-3">
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-black mb-1">50+</div>
              <div className="text-gray-700 font-medium">Expert Agents</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-black mb-1">$10M+</div>
              <div className="text-gray-700 font-medium">Annual Revenue</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-center mb-3">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-black mb-1">#1</div>
              <div className="text-gray-700 font-medium">PHP Partner</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <a
              href="/contact"
              className="group bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-10 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 flex items-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <span>Start Your Journey Today</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/about"
              className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-black hover:text-white transition-all duration-300"
            >
              Learn About Us
            </a>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>PHP Agency Partner</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>A+ Rated Carriers</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Licensed in Texas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
