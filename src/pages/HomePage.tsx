import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import PartnersSlider from '../components/PartnersSlider';
import Services from '../components/Services';
import Benefits from '../components/Benefits';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Services />
      <PartnersSlider />
      <Benefits />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;