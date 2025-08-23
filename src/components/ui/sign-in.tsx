import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, LogIn, ArrowLeft, Shield, UserPlus, X, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const AnimatedSignIn: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Animation states
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setFormVisible(true), 300);
    
    // Check if this is a password reset flow
    // Supabase sends tokens in URL hash, not query string
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    
    // Also check query string as fallback
    const urlParams = new URLSearchParams(window.location.search);
    
    // Use hash params if available, otherwise fall back to query params
    const finalAccessToken = hashParams.get('access_token') || urlParams.get('access_token');
    const finalRefreshToken = hashParams.get('refresh_token') || urlParams.get('refresh_token');
    const finalType = hashParams.get('type') || urlParams.get('type');
    
    if (finalType === 'recovery' && finalAccessToken && finalRefreshToken) {
      // Set the session with the tokens from the URL
      supabase.auth.setSession({
        access_token: finalAccessToken,
        refresh_token: finalRefreshToken
      }).then(() => {
        setShowPasswordReset(true);
        // Clean up the URL hash and query params
        window.history.replaceState({}, document.title, window.location.pathname);
      }).catch((error) => {
        console.error('Error setting session for password reset:', error);
        alert('Invalid or expired reset link. Please request a new password reset.');
      });
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error('Login error:', error);
        if (error.message.includes('invalid_credentials') || error.message.includes('Invalid login credentials')) {
          alert('Invalid email or password. Please check your credentials and try again.');
        } else {
          alert(`Login failed: ${error.message}`);
        }
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // Successful login - redirect to dashboard
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResettingPassword(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotPasswordEmail, {
        redirectTo: `https://eibagency.com/agent-login`,
      });

      if (error) {
        console.error('Password reset error:', error);
        alert(`Password reset failed: ${error.message}`);
        setIsResettingPassword(false);
        return;
      }

      setResetEmailSent(true);
      setIsResettingPassword(false);
    } catch (error) {
      console.error('Password reset error:', error);
      alert('An error occurred during password reset. Please try again.');
      setIsResettingPassword(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }
    
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    
    setIsUpdatingPassword(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        console.error('Password update error:', error);
        alert(`Password update failed: ${error.message}`);
        setIsUpdatingPassword(false);
        return;
      }

      setPasswordResetSuccess(true);
      setIsUpdatingPassword(false);
      
      // Redirect to dashboard after successful password reset
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    } catch (error) {
      console.error('Password update error:', error);
      alert('An error occurred during password update. Please try again.');
      setIsUpdatingPassword(false);
    }
  };

  // Only show the component once mounted to avoid hydration issues
  if (!mounted) return null;

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900' : 'bg-[#e8f4ef]'}`}>
      <div className="flex min-h-screen items-center justify-center p-4 md:p-0">
        <div className={`w-full max-w-6xl overflow-hidden rounded-2xl transition-all duration-500 ${
          theme === 'dark' ? 'bg-slate-800 shadow-xl shadow-slate-700/20' : 'bg-white shadow-xl shadow-gray-200'
        } ${formVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>

          <div className="flex flex-col md:flex-row">
            {/* Left side - Statistics and Images Collage */}
            <div className="hidden md:block w-full md:w-3/5 bg-gray-100 p-6 animate-fade-in">
              <div className="grid grid-cols-2 grid-rows-3 gap-4 h-full overflow-hidden">

                 
                {/* Top left - Person working */}
                {/*
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnxTwVznj8nPdEtGfq7DY61RclV3ZMWb9pQgo2" 
                    alt="Handshake" 
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                  />
                </div>

                */}

                
                {/* Top right - Orange stat */}

                {/*
                <div 
                  className={`rounded-xl flex flex-col justify-center items-center p-6 text-white ${
                    theme === 'dark' ? 'bg-white-600' : 'bg-white-500'
                  }`}
                  style={{
                    transform: formVisible ? 'translateY(0)' : 'translateY(20px)',
                    opacity: formVisible ? 1 : 0,
                    transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
                    transitionDelay: '0.2s',
                  }}
                >
                  <h2 className="text-5xl font-bold mb-2 text-black">24/7</h2>
                  <p className="text-center text-sm text-black">Support available for all EIB Agency members.</p>
                </div>

                */}
                
                {/* Middle left - Person at computer */}

                {/*
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnd7spMIl7cmdASPKDVwuU18xgjXi5O4RQaH2I" 
                    alt="Jason Answering Question" 
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                  />
                </div>

                */}
                
                {/* Middle right - Office space */}
             
                { /*
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnCiRNubykjw7PSNi0m8alYrGqn6LoI9hUxsv4" 
                    alt="Jason Talking" 
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                  />
                </div>
                */}
                
                {/* Bottom left - Green stat */}

                {/*
                <div 
                  className={`rounded-xl flex flex-col justify-center items-center p-6 text-black ${
                    theme === 'dark' ? 'bg-black-600' : 'bg-white-500'
                  }`}
                  style={{
                    transform: formVisible ? 'translateY(0)' : 'translateY(20px)',
                    opacity: formVisible ? 1 : 0,
                    transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
                    transitionDelay: '0.4s',
                  }}
                >
                  <h2 className="text-5xl font-bold mb-2">15K+</h2>
                  <p className="text-center text-sm">Families protected by EIB Team agents nationwide.</p>
                </div>

                */}
                
                {/* Bottom right - Library */}

                {/*
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlmOrmln8EfQTV7ApbyFLmjY5GCZhaPcN4nzo" 
                    alt="Gala Group Photo" 
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                  />
                </div>
                */}

                
              </div>
            </div>
            
            {/* Right side - Sign in form */}
            <div 
              className={`w-full md:w-2/5 p-8 md:p-12 ${
                theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'
              }`}
              style={{
                transform: formVisible ? 'translateX(0)' : 'translateX(20px)',
                opacity: formVisible ? 1 : 0,
                transition: 'transform 0.6s ease-out, opacity 0.6s ease-out'
              }}
            >
              {/* Back to Home Link */}
              <div className="flex justify-start mb-6">
                <a
                  href="/"
                  className={`inline-flex items-center space-x-2 text-sm ${
                    theme === 'dark' ? 'text-gray-300 hover:text-yellow-400' : 'text-gray-600 hover:text-yellow-600'
                  } transition-colors duration-300`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Home</span>
                </a>
              </div>

              <div className="flex justify-end mb-6">
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Need help? 
                  <a 
                    href="#support" 
                    className={`ml-1 font-medium ${
                      theme === 'dark' ? 'text-yellow-400 hover:text-yellow-300' : 'text-yellow-600 hover:text-yellow-500'
                    }`}
                  >
                    Contact Support
                  </a>
                </p>
              </div>

              {/* Password Reset Success */}
              {passwordResetSuccess && (
                <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <p className="text-green-700 font-medium">Password updated successfully!</p>
                      <p className="text-green-600 text-sm">Redirecting to dashboard...</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ" 
                    alt="EIB Team Logo" 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div>
                    <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {showPasswordReset ? 'Reset Password' : 'Agent Login'}
                    </h1>
                  </div>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {showPasswordReset 
                    ? 'Please enter your new password to complete the reset process.'
                    : 'Welcome to EIB Agency agent portal. Please enter your credentials to access your dashboard.'
                  }
                </p>
              </div>
              
              {/* Password Reset Form */}
              {showPasswordReset ? (
                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                  <div className="space-y-1">
                    <label 
                      htmlFor="new-password" 
                      className={`block text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      New Password *
                    </label>
                    <div className={`relative rounded-md shadow-sm transition-all duration-300`}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="new-password"
                        id="new-password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={`block w-full rounded-md border py-3 px-4 pr-10 focus:outline-none focus:ring-2 sm:text-sm ${
                          theme === 'dark' 
                            ? 'bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:ring-yellow-500' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-yellow-500'
                        }`}
                        placeholder="Enter new password"
                        minLength={6}
                      />
                      <button
                        type="button"
                        className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                        }`}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} className="hover:text-gray-700 transition-colors" />
                        ) : (
                          <Eye size={18} className="hover:text-gray-700 transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label 
                      htmlFor="confirm-password" 
                      className={`block text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      Confirm New Password *
                    </label>
                    <div className={`relative rounded-md shadow-sm transition-all duration-300`}>
                      <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`block w-full rounded-md border py-3 px-4 focus:outline-none focus:ring-2 sm:text-sm ${
                          theme === 'dark' 
                            ? 'bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:ring-yellow-500' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-yellow-500'
                        }`}
                        placeholder="Confirm new password"
                        minLength={6}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdatingPassword || passwordResetSuccess}
                    className={`flex w-full justify-center rounded-md py-3 px-4 text-sm font-semibold text-black shadow-sm transition-all duration-300 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 ${isUpdatingPassword || passwordResetSuccess ? 'cursor-not-allowed opacity-70' : ''}`}
                  >
                    {isUpdatingPassword ? (
                      <span className="flex items-center">
                        <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Updating Password...
                      </span>
                    ) : passwordResetSuccess ? (
                      <span className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Password Updated!
                      </span>
                    ) : (
                      <span>Update Password</span>
                    )}
                  </button>
                </form>
              ) : (
                /* Regular Sign In Form */
                <form onSubmit={handleSignIn} className="space-y-6">
                  <div className="space-y-1">
                    <label 
                      htmlFor="email" 
                      className={`block text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      Agent ID or Email
                    </label>
                    <div className={`relative rounded-md shadow-sm transition-all duration-300`}>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`block w-full rounded-md border py-3 px-4 focus:outline-none focus:ring-2 sm:text-sm ${
                          theme === 'dark' 
                            ? 'bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:ring-yellow-500' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-yellow-500'
                        }`}
                        placeholder="agent.id@eibteam.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label 
                      htmlFor="password" 
                      className={`block text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      Password *
                    </label>
                    <div className={`relative rounded-md shadow-sm transition-all duration-300`}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`block w-full rounded-md border py-3 px-4 pr-10 focus:outline-none focus:ring-2 sm:text-sm ${
                          theme === 'dark' 
                            ? 'bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:ring-yellow-500' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-yellow-500'
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                        }`}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} className="hover:text-gray-700 transition-colors" />
                        ) : (
                          <Eye size={18} className="hover:text-gray-700 transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className={`ml-2 block text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Remember me
                      </label>
                    </div>
                    <a 
                      href="#forgot-password"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowForgotPassword(true);
                        setForgotPasswordEmail(email);
                      }}
                      className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-yellow-400 hover:text-yellow-300' : 'text-yellow-500 hover:text-yellow-600'
                      }`}
                    >
                      Forgot password?
                    </a>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex w-full justify-center rounded-md py-3 px-4 text-sm font-semibold text-black shadow-sm transition-all duration-300 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In to Portal
                      </span>
                    )}
                  </button>
                </form>
              )}
              
              {/* Security Notice */}
              <div className={`mt-8 p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700' : 'bg-yellow-50'} border ${theme === 'dark' ? 'border-slate-600' : 'border-yellow-200'}`}>
                <div className="flex items-start space-x-3">
                  <Shield className={`h-5 w-5 mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  <div>
                    <h4 className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-800'}`}>
                      Secure Login
                    </h4>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-yellow-700'}`}>
                      Your login credentials are encrypted and secure. Contact your administrator if you need account access.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Forgot Password Modal */}
              {showForgotPassword && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className={`rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto ${
                    theme === 'dark' ? 'bg-slate-800' : 'bg-white'
                  }`}>
                    <div className={`p-6 border-b ${theme === 'dark' ? 'border-slate-600' : 'border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Reset Password
                        </h3>
                        <button
                          onClick={() => {
                            setShowForgotPassword(false);
                            setResetEmailSent(false);
                            setForgotPasswordEmail('');
                          }}
                          className={`${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      {!resetEmailSent ? (
                        <form onSubmit={handleForgotPassword} className="space-y-4">
                          <div>
                            <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              Enter your email address and we'll send you a link to reset your password.
                            </p>
                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                              Email Address
                            </label>
                            <input
                              type="email"
                              required
                              value={forgotPasswordEmail}
                              onChange={(e) => setForgotPasswordEmail(e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                                theme === 'dark' 
                                  ? 'bg-slate-700 border-slate-600 text-white placeholder:text-gray-400' 
                                  : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                              }`}
                              placeholder="your.email@example.com"
                            />
                          </div>
                          
                          <div className="flex space-x-3 pt-4">
                            <button
                              type="button"
                              onClick={() => {
                                setShowForgotPassword(false);
                                setResetEmailSent(false);
                                setForgotPasswordEmail('');
                              }}
                              className={`flex-1 px-4 py-2 border rounded-lg transition-colors ${
                                theme === 'dark' 
                                  ? 'border-slate-600 text-gray-300 hover:bg-slate-700' 
                                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={isResettingPassword}
                              className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isResettingPassword ? 'Sending...' : 'Send Reset Link'}
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="text-center">
                          <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                          </div>
                          <h4 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Reset Link Sent!
                          </h4>
                          <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            We've sent a password reset link to <strong>{forgotPasswordEmail}</strong>. 
                            Check your email and follow the instructions to reset your password.
                          </p>
                          <button
                            onClick={() => {
                              setShowForgotPassword(false);
                              setResetEmailSent(false);
                              setForgotPasswordEmail('');
                            }}
                            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors"
                          >
                            Close
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AnimatedSignIn };