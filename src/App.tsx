import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
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
import StartContractingPage from './pages/StartContractingPage';
import FieldUnderwritingPage from './pages/FieldUnderwritingPage';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Handle initial session check and cleanup invalid tokens
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.warn('Session error detected, clearing auth state:', error.message);
          await supabase.auth.signOut();
        }
      } catch (error) {
        console.warn('Auth initialization error, clearing auth state:', error);
        await supabase.auth.signOut();
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        
        // Handle email confirmation
        if (event === 'SIGNED_IN' && session?.user && !session.user.email_confirmed_at) {
          console.log('User signed in but email not confirmed yet');
          return;
        }
        
        // Handle successful email confirmation
        if (event === 'SIGNED_IN' && session?.user?.email_confirmed_at) {
          // If the user is on the agent login page after confirming email, redirect to dashboard
          if (window.location.pathname === '/agent-login') {
            console.log('User email confirmed and signed in on agent-login, redirecting to dashboard');
            window.location.href = '/dashboard';
          }
          // If they are already on dashboard or another authenticated page, do nothing
          return;
        }
        
        if (event === 'SIGNED_OUT' || 
            (event === 'TOKEN_REFRESHED' && !session) ||
            event === 'SIGNED_IN_WITH_PASSWORD') {
          // Clear any stored session data and redirect to login
          if (event === 'SIGNED_OUT') {
            // Only redirect to home page on explicit sign out
            if (window.location.pathname.startsWith('/dashboard') || 
                window.location.pathname.startsWith('/admin') ||
                window.location.pathname.startsWith('/calendar') ||
                window.location.pathname.startsWith('/trainings') ||
                window.location.pathname.startsWith('/resources') ||
                window.location.pathname.startsWith('/books')) {
              window.location.href = '/';
            }
          } else if ((event === 'TOKEN_REFRESHED' && !session)) {
            // Redirect to login for token refresh failures
            if (window.location.pathname.startsWith('/dashboard') || 
                window.location.pathname.startsWith('/admin') ||
                window.location.pathname.startsWith('/calendar') ||
                window.location.pathname.startsWith('/trainings') ||
                window.location.pathname.startsWith('/resources') ||
                window.location.pathname.startsWith('/books')) {
              await supabase.auth.signOut();
              window.location.href = '/agent-login';
            }
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Show loading state while initializing auth
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
        <Route path="/start-contracting" element={<StartContractingPage />} />
        <Route path="/field-underwriting" element={<FieldUnderwritingPage />} />
      </Routes>
    </Router>
  );
}

export default App;