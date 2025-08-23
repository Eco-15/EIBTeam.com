import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, LogIn, ArrowLeft, Shield, CheckCircle, X, Mail, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const AnimatedSignIn: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Password reset states
  const [resetStep, setResetStep] = useState<'login' | 'request' | 'verify'>('login');
  const [resetEmail, setResetEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0);
  
  const [mounted, setMounted] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setFormVisible(true), 100);
    
    // Clean up any URL hash parameters
    if (window.location.hash) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Rate limit countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (rateLimitSeconds > 0) {
      interval = setInterval(() => {
        setRateLimitSeconds(prev => {
          if (prev <= 1) {
            setResetError('');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [rateLimitSeconds]);

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
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
      setIsLoading(false);
    }
  };

  const handleRequestPasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setResetError('');
    
    try {
      console.log('Requesting password reset for:', resetEmail);
      
      // Use signInWithOtp for password reset to ensure OTP delivery
      const { error } = await supabase.auth.signInWithOtp({
        email: resetEmail,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: undefined
        }
      });

      if (error) {
        console.error('Password reset request error:', error);
        
        // Handle rate limit specifically
        if (error.message.includes('rate_limit') || error.message.includes('40 seconds')) {
          setRateLimitSeconds(40);
          setResetError('Please wait 40 seconds before requesting another reset code.');
        } else {
          setResetError(`Failed to send reset code: ${error.message}`);
        }
        setIsProcessing(false);
        return;
      }

      console.log('OTP sent successfully');
      setResetStep('verify');
      setIsProcessing(false);
    } catch (error) {
      console.error('Password reset request error:', error);
      setResetError('An error occurred while sending the reset code. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleVerifyOtpAndResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!otp || otp.length !== 6) {
      setResetError('Please enter the 6-digit code from your email.');
      return;
    }
    
    if (newPassword.length < 6) {
      setResetError('Password must be at least 6 characters long.');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match. Please try again.');
      return;
    }
    
    setIsProcessing(true);
    setResetError('');
    
    try {
      console.log('Verifying OTP and updating password...');
      
      // Verify OTP and sign in
      const { data: { user, session }, error: otpError } = await supabase.auth.verifyOtp({
        email: resetEmail,
        token: otp,
        type: 'email',
        options: {
          redirectTo: undefined
        }
      });

      if (otpError) {
        console.error('OTP verification error:', otpError);
        setResetError(`Invalid or expired code: ${otpError.message}`);
        setIsProcessing(false);
        return;
      }

      if (!user || !session) {
        setResetError('Failed to verify code. Please try again.');
        setIsProcessing(false);
        return;
      }

      console.log('OTP verified, updating password...');
      
      // Update password
      const { error: passwordError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (passwordError) {
        console.error('Password update error:', passwordError);
        setResetError(`Password update failed: ${passwordError.message}`);
        setIsProcessing(false);
        return;
      }

      console.log('Password updated successfully');
      setResetSuccess(true);
      setIsProcessing(false);
      
      // Redirect to dashboard after successful reset
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    } catch (error) {
      console.error('Password reset error:', error);
      setResetError('An error occurred during password reset. Please try again.');
      setIsProcessing(false);
    }
  };

  const resetPasswordFlow = () => {
    setResetStep('login');
    setResetEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setResetError('');
    setResetSuccess(false);
    setIsProcessing(false);
  };

  // Only show the component once mounted
  if (!mounted) return null;

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900' : 'bg-[#e8f4ef]'}`}>
      <div className="flex min-h-screen items-center justify-center p-4 md:p-0">
        <div className={`w-full max-w-6xl overflow-hidden rounded-2xl transition-all duration-500 ${
          theme === 'dark' ? 'bg-slate-800 shadow-xl shadow-slate-700/20' : 'bg-white shadow-xl shadow-gray-200'
        } ${formVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>

          <div className="flex flex-col md:flex-row">
            {/* Left side - Visual content */}
            <div className="hidden md:block w-full md:w-3/5 bg-gradient-to-br from-yellow-50 to-yellow-100 p-8">
              <div className="h-full flex flex-col justify-center items-center text-center">
                <img 
                  src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ" 
                  alt="EIB Team Logo" 
                  className="h-24 w-24 rounded-full object-cover mb-8"
                />
                <h2 className="text-4xl font-bold text-black mb-4">Welcome to EIB Agency</h2>
                <p className="text-xl text-gray-700 mb-8 max-w-md">
                  Access your agent portal to continue your journey with Excellence in Building.
                </p>
                
                <div className="grid grid-cols-2 gap-6 max-w-sm">
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <div className="text-2xl font-bold text-yellow-600 mb-1">15K+</div>
                    <div className="text-gray-600 text-sm">Families Protected</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <div className="text-2xl font-bold text-yellow-600 mb-1">24/7</div>
                    <div className="text-gray-600 text-sm">Support</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Forms */}
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

              {/* Success Message */}
              {resetSuccess && (
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

              {/* Error Message */}
              {resetError && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex items-start">
                    <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-red-700 font-medium">Error</p>
                      <p className="text-red-600 text-sm mt-1">{resetError}</p>
                      {resetStep === 'verify' && (
                        <button
                          onClick={() => {
                            setResetError('');
                            setResetStep('request');
                          }}
                          className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium underline"
                        >
                          Try again with different email
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ" 
                    alt="EIB Team Logo" 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div>
                    <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {resetStep === 'login' ? 'Agent Login' : 
                       resetStep === 'request' ? 'Reset Password' : 
                       'Enter New Password'}
                    </h1>
                  </div>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {resetStep === 'login' ? 'Welcome to EIB Agency agent portal. Please enter your credentials to access your dashboard.' :
                   resetStep === 'request' ? 'Enter your email address and we\'ll send you a 6-digit code to reset your password.' :
                   'Enter the 6-digit code from your email and create a new password.'}
                </p>
              </div>

              {/* Login Form */}
              {resetStep === 'login' && (
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
                    <div className="relative">
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
                    <div className="relative">
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
                    <button 
                      type="button"
                      onClick={() => {
                        setResetStep('request');
                        setResetEmail(email);
                      }}
                      className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-yellow-400 hover:text-yellow-300' : 'text-yellow-500 hover:text-yellow-600'
                      } transition-colors`}
                    >
                      Forgot password?
                    </button>
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

              {/* Password Reset Request Form */}
              {resetStep === 'request' && (
                <form onSubmit={handleRequestPasswordReset} className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="bg-yellow-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Mail className="h-8 w-8 text-yellow-600" />
                    </div>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Reset Your Password
                    </h3>
                  </div>

                  <div className="space-y-1">
                    <label 
                      htmlFor="reset-email" 
                      className={`block text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="reset-email"
                      id="reset-email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className={`block w-full rounded-md border py-3 px-4 focus:outline-none focus:ring-2 sm:text-sm ${
                        theme === 'dark' 
                          ? 'bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:ring-yellow-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-yellow-500'
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700' : 'bg-blue-50'} border ${theme === 'dark' ? 'border-slate-600' : 'border-blue-200'}`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                      {rateLimitSeconds > 0 ? (
                        <>Please wait {rateLimitSeconds} seconds before requesting another code for security purposes.</>
                      ) : (
                        <>We'll send a 6-digit verification code to your email address. This code will be valid for 1 hour.</>
                      )}
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={resetPasswordFlow}
                      className={`flex-1 px-4 py-2 border rounded-lg transition-colors ${
                        theme === 'dark' 
                          ? 'border-slate-600 text-gray-300 hover:bg-slate-700' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Back to Login
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing || rateLimitSeconds > 0}
                      className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Sending...' : 
                       rateLimitSeconds > 0 ? `Wait ${rateLimitSeconds}s` : 
                       'Send Reset Code'}
                    </button>
                  </div>
                </form>
              )}

              {/* OTP Verification and New Password Form */}
              {resetStep === 'verify' && (
                <form onSubmit={handleVerifyOtpAndResetPassword} className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Lock className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Enter Verification Code
                    </h3>
                    <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      We sent a 6-digit code to <strong>{resetEmail}</strong>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label 
                      htmlFor="verification-code" 
                      className={`block text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      Verification Code *
                    </label>
                    <input
                      type="text"
                      name="verification-code"
                      id="verification-code"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className={`block w-full rounded-md border py-3 px-4 text-center text-lg font-mono tracking-widest focus:outline-none focus:ring-2 sm:text-sm ${
                        theme === 'dark' 
                          ? 'bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:ring-yellow-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-yellow-500'
                      }`}
                      placeholder="000000"
                      maxLength={6}
                    />
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
                    <div className="relative">
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

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setResetStep('request');
                        setOtp('');
                        setNewPassword('');
                        setConfirmPassword('');
                        setResetError('');
                      }}
                      className={`flex-1 px-4 py-2 border rounded-lg transition-colors ${
                        theme === 'dark' 
                          ? 'border-slate-600 text-gray-300 hover:bg-slate-700' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing || resetSuccess}
                      className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <span className="flex items-center justify-center">
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
                          Updating...
                        </span>
                      ) : resetSuccess ? (
                        <span className="flex items-center justify-center">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Success!
                        </span>
                      ) : (
                        'Update Password'
                      )}
                    </button>
                  </div>

                  <div className={`text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <p>Didn't receive the code? Check your spam folder or</p>
                    <button
                      type="button"
                      onClick={() => {
                        setResetStep('request');
                        setOtp('');
                        setResetError('');
                        setNewPassword('');
                        setConfirmPassword('');
                      }}
                      className={`font-medium ${
                        theme === 'dark' ? 'text-yellow-400 hover:text-yellow-300' : 'text-yellow-600 hover:text-yellow-700'
                      } transition-colors`}
                    >
                      try a different email
                    </button>
                  </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AnimatedSignIn };