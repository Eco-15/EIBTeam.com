import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import WhyJoinUsPage from './pages/WhyJoinUsPage';
import ContactPage from './pages/ContactPage';
import AgentLogin from './components/AgentLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/why-join-us" element={<WhyJoinUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/agent-login" element={<AgentLogin />} />
      </Routes>
    </Router>
  );
}

export default App;