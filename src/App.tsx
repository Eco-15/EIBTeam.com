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
import TrainingDetailPage from './pages/TrainingDetailPage';
import ResourcesPage from './pages/ResourcesPage';
import BooksPage from './pages/BooksPage';
import BookDetailPage from './pages/BookDetailPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminDashboard from './pages/AdminDashboard';
import OfficeLocatorPage from './pages/OfficeLocatorPage';
import TermLifeInsurancePage from './pages/services/TermLifeInsurancePage';
import WholeLifeInsurancePage from './pages/services/WholeLifeInsurancePage';
import IndexedUniversalLifePage from './pages/services/IndexedUniversalLifePage';
import AnnuitiesPage from './pages/services/AnnuitiesPage';
import DebtSolutionsPage from './pages/services/DebtSolutionsPage';
import SupplementalCoveragePage from './pages/services/SupplementalCoveragePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import LicenseInformationPage from './pages/LicenseInformationPage';
import CompliancePage from './pages/CompliancePage';

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
        <Route path="/training/:id" element={<TrainingDetailPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/office-locations" element={<OfficeLocatorPage />} />
        <Route path="/services/term-life-insurance" element={<TermLifeInsurancePage />} />
        <Route path="/services/whole-life-insurance" element={<WholeLifeInsurancePage />} />
        <Route path="/services/indexed-universal-life" element={<IndexedUniversalLifePage />} />
        <Route path="/services/annuities" element={<AnnuitiesPage />} />
        <Route path="/services/debt-solutions" element={<DebtSolutionsPage />} />
        <Route path="/services/supplemental-coverage" element={<SupplementalCoveragePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/license-information" element={<LicenseInformationPage />} />
        <Route path="/compliance" element={<CompliancePage />} />
      </Routes>
    </Router>
  );
}

export default App;