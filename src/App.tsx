import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import WhyJoinUsPage from './pages/WhyJoinUsPage';
import ContactPage from './pages/ContactPage';
import AgentLogin from './components/AgentLogin';
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/CalendarPage';
import TrainingsPage from './pages/TrainingsPage';
import ResourcesPage from './pages/ResourcesPage';
import BooksPage from './pages/BooksPage';

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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/trainings" element={<TrainingsPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/books" element={<BooksPage />} />
      </Routes>
    </Router>
  );
}

export default App;