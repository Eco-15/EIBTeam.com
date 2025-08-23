import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, LogIn, ArrowLeft, Shield, UserPlus, X, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const AnimatedSignIn: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  
  // OTP-based password reset states
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  
  const [mounted, setMounted] = useState(false);
  
  // Animation states
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setFormVisible(true), 100);
    
    // Clean up any URL hash parameters from previous attempts
    if (window.location.hash) {
      window.history.replaceState({}, document.title, window.location.pathname);
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
    setIsSendingOtp(true);
    setOtpError('');
    
    try {
      console.log('Sending OTP to email:', forgotPasswordEmail);
      
      // Use resetPasswordForEmail to send OTP for password reset
      const { error } = await supabase.auth.resetPasswordForEmail(forgotPasswordEmail, {
        redirectTo: undefined // This prevents magic link and forces OTP
      });

      if (error) {
        console.error('OTP send error:', error);
        setOtpError(`Failed to send OTP: ${error.message}`);
        setIsSendingOtp(false);
        return;
      }

      console.log('OTP sent successfully to:', forgotPasswordEmail);
      setOtpSent(true);
      setIsSendingOtp(false);
    } catch (error) {
      console.error('OTP send error:', error);
      setOtpError('An error occurred while sending the OTP. Please try again.');
      setIsSendingOtp(false);
    }
  };

  const handleOtpVerificationAndPasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }
    
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    
    if (!otp || otp.length !== 6) {
      setOtpError('Please enter the 6-digit code from your email.');
      return;
    }
    
    setIsVerifyingOtp(true);
    setOtpError('');
    
    try {
      console.log('Verifying OTP:', otp.substring(0, 2) + '****');
      
      // First verify the OTP
      const { data, error: otpError } = await supabase.auth.verifyOtp({
        email: forgotPasswordEmail,
        token: otp,
        type: 'email'
      });

      if (otpError) {
        console.error('OTP verification error:', otpError);
        setOtpError(`Invalid or expired code: ${otpError.message}`);
        setIsVerifyingOtp(false);
        return;
      }

      console.log('OTP verified successfully, updating password...');
      
      // Now update the password
      const { error: passwordError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (passwordError) {
        console.error('Password update error:', passwordError);
        setOtpError(`Password update failed: ${passwordError.message}`);
        setIsVerifyingOtp(false);
        return;
      }

      console.log('Password updated successfully');
      setPasswordResetSuccess(true);
      setIsVerifyingOtp(false);
      
      // Redirect to dashboard after successful password reset
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    } catch (error) {
      console.error('OTP verification and password update error:', error);
      setOtpError('An error occurred during the process. Please try again.');
      setIsVerifyingOtp(false);
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

              {/* Reset Error */}
              {otpError && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex items-start">
                    <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-red-700 font-medium">Password Reset Error</p>
                      <p className="text-red-600 text-sm mt-1">{otpError}</p>
                     <div className="mt-3 space-y-2">
                       <button
                         onClick={() => {
                           setOtpError('');
                           setShowForgotPassword(true);
                           setForgotPasswordEmail(email);
                         }}
                         className="block text-sm text-red-600 hover:text-red-800 font-medium underline"
                       >
                         Request new password reset
                       </button>
                       <div className="text-xs text-red-500 mt-2">
                         <p><strong>Troubleshooting tips:</strong></p>
                         <ul className="list-disc list-inside mt-1 space-y-1">
                           <li>Try using a different email provider (Gmail, Outlook)</li>
                           <li>Check if your email provider has security scanning enabled</li>
                           <li>Contact support if the issue persists</li>
                         </ul>
                       </div>
                     </div>
                      <button
                        onClick={() => {
                          setOtpError('');
                          setShowForgotPassword(true);
                          setForgotPasswordEmail(email);
                        }}
                        className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium underline"
                      >
                        Request new password reset
                      </button>
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
                      {otpSent ? 'Reset Password' : 'Agent Login'}
                    </h1>
                  </div>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {otpSent 
                    ? 'Please enter your new password to complete the reset process.'
                    : 'Welcome to EIB Agency agent portal. Please enter your credentials to access your dashboard.'
                  }
                </p>
              </div>
              
              {/* Password Reset Form */}
              {otpSent ? (
                <form onSubmit={handleOtpVerificationAndPasswordUpdate} className="space-y-6">
                  <div className="space-y-1">
                    <label 
                      htmlFor="otp" 
                      className={`block text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      Verification Code *
                    </label>
                    <div className={`relative rounded-md shadow-sm transition-all duration-300`}>
                      <input
                        type="text"
                        name="otp"
                        id="otp"
                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className={`block w-full rounded-md border py-3 px-4 focus:outline-none focus:ring-2 sm:text-sm ${
                          theme === 'dark' 
                            ? 'bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:ring-yellow-500' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-yellow-500'
                        }`}
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                      />
                    </div>
                  </div>

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
                    disabled={isVerifyingOtp || passwordResetSuccess}
                    className={`flex w-full justify-center rounded-md py-3 px-4 text-sm font-semibold text-black shadow-sm transition-all duration-300 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 ${isVerifyingOtp || passwordResetSuccess ? 'cursor-not-allowed opacity-70' : ''}`}
                  >
                    {isVerifyingOtp ? (
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
                            setOtpSent(false);
                            setForgotPasswordEmail('');
                          }}
                          className={`${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      {!otpSent ? (
                        <form onSubmit={handleForgotPassword} className="space-y-4">
                          {otpError && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                              <p className="text-red-700 text-sm">{otpError}</p>
                            </div>
                          )}
                          
                          <div>
                            <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                             Enter your email address and we'll send you a link to reset your password. The link will be valid for 1 hour.
                            </p>
                           
                           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                             <p className="text-yellow-800 text-xs">
                               <strong>Important:</strong> Some email providers scan links for security, which can invalidate the reset token. 
                               If you get an "expired" error immediately, try using a different email address or contact support.
                             </p>
                           </div>
                           
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
                                setOtpSent(false);
                                setForgotPasswordEmail('');
                                setOtpError('');
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
                              disabled={isSendingOtp}
                              className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSendingOtp ? 'Sending...' : 'Send Reset Link'}
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
                              setOtpSent(false);
                              setForgotPasswordEmail('');
                              setOtpError('');
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