import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, LogIn, ArrowLeft, Shield, UserPlus } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const AnimatedSignIn: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Animation states
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setFormVisible(true), 300);
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`.trim()
          }
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        if (error.message.includes('already_registered')) {
          alert('An account with this email already exists. Please try logging in instead.');
        } else if (error.message.includes('over_email_send_rate_limit')) {
          alert('Please wait a few seconds before trying to sign up again. This is a temporary security measure.');
        } else {
          alert(`Sign up failed: ${error.message}`);
        }
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // Create agent profile after successful signup
        try {
          const { error: profileError } = await supabase
            .from('agent_profiles')
            .insert([{
              user_id: data.user.id,
              first_name: firstName,
              last_name: lastName,
              status: 'active'
            }]);

          if (profileError) {
            console.error('Error creating agent profile:', profileError);
          }

        } catch (error) {
          console.error('Error setting up user profile:', error);
        }

        alert('Account created successfully! You can now log in with your credentials.');
        
        // Switch back to sign in mode
        setIsSignUp(false);
        setFirstName('');
        setLastName('');
        setConfirmPassword('');
        setPassword('');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      alert('An error occurred during sign up. Please try again.');
    }

    setIsLoading(false);
  };
  // Only show the component once mounted to avoid hydration issues
  if (!mounted) return null;

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900' : 'bg-[#e8f4ef]'}`}>
      <div className="flex min-h-screen items-center justify-center p-4 md:p-0">
        <div className={`w-full max-w-6xl overflow-hidden rounded-2xl transition-all duration-500 ${
          theme === 'dark' ? 'bg-slate-800 shadow-xl shadow-slate-700/20' : 'bg-white shadow-xl shadow-gray-200'
        } ${formVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          
          {/* Theme toggle */}
          <button 
            onClick={toggleTheme}
            className={`absolute right-4 top-4 rounded-full p-2 transition-colors z-10 ${
              theme === 'dark' 
                ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
            )}
          </button>

          <div className="flex flex-col md:flex-row">
            {/* Left side - Statistics and Images Collage */}
            <div className="hidden md:block w-full md:w-3/5 bg-gray-100 p-6 animate-fade-in">
              <div className="grid grid-cols-2 grid-rows-3 gap-4 h-full overflow-hidden">
                {/* Top left - Person working */}
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnxTwVznj8nPdEtGfq7DY61RclV3ZMWb9pQgo2" 
                    alt="Handshake" 
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                  />
                </div>
                
                {/* Top right - Orange stat */}
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
                
                {/* Middle left - Person at computer */}
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnd7spMIl7cmdASPKDVwuU18xgjXi5O4RQaH2I" 
                    alt="Jason Answering Question" 
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                  />
                </div>
                
                {/* Middle right - Office space */}
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnCiRNubykjw7PSNi0m8alYrGqn6LoI9hUxsv4" 
                    alt="Jason Talking" 
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                  />
                </div>
                
                {/* Bottom left - Green stat */}
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
                
                {/* Bottom right - Library */}
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnlmOrmln8EfQTV7ApbyFLmjY5GCZhaPcN4nzo" 
                    alt="Gala Group Photo" 
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                  />
                </div>
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

              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src="https://lyz5cvfr0h.ufs.sh/f/tLx4hl5ikmOnfYSbXDWwS0j4D1ydoNBhk8RHX5asGlYQ39iZ" 
                    alt="EIB Team Logo" 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div>
                    <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {isSignUp ? 'Create Account' : 'Agent Login'}
                    </h1>
                  </div>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {isSignUp 
                    ? 'Create your EIB Agency agent account to get started with your insurance career.'
                    : 'Welcome to EIB Agency agent portal. Please enter your credentials to access your dashboard.'
                  }
                </p>
              </div>
              
              <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-6">
                {isSignUp && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label 
                        htmlFor="firstName" 
                        className={`block text-sm font-medium ${
                          theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                        }`}
                      >
                        First Name *
                      </label>
                      <div className={`relative rounded-md shadow-sm transition-all duration-300`}>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className={`block w-full rounded-md border py-3 px-4 focus:outline-none focus:ring-2 sm:text-sm ${
                            theme === 'dark' 
                              ? 'bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:ring-yellow-500' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-yellow-500'
                          }`}
                          placeholder="John"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="lastName" 
                        className={`block text-sm font-medium ${
                          theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                        }`}
                      >
                        Last Name *
                      </label>
                      <div className={`relative rounded-md shadow-sm transition-all duration-300`}>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className={`block w-full rounded-md border py-3 px-4 focus:outline-none focus:ring-2 sm:text-sm ${
                            theme === 'dark' 
                              ? 'bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:ring-yellow-500' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-yellow-500'
                          }`}
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-1">
                  <label 
                    htmlFor="email" 
                    className={`block text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    {isSignUp ? 'Email Address *' : 'Agent ID or Email'}
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
                      placeholder={isSignUp ? "your.email@example.com" : "agent.id@eibteam.com"}
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
                      placeholder={isSignUp ? "Minimum 6 characters" : "••••••••"}
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
                
                {isSignUp && (
                  <div className="space-y-1">
                    <label 
                      htmlFor="confirmPassword" 
                      className={`block text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      Confirm Password *
                    </label>
                    <div className={`relative rounded-md shadow-sm transition-all duration-300`}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        id="confirmPassword"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`block w-full rounded-md border py-3 px-4 focus:outline-none focus:ring-2 sm:text-sm ${
                          theme === 'dark' 
                            ? 'bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:ring-yellow-500' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-yellow-500'
                        }`}
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>
                )}
                
                {!isSignUp && (
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
                      className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-yellow-400 hover:text-yellow-300' : 'text-yellow-500 hover:text-yellow-600'
                      }`}
                    >
                      Forgot password?
                    </a>
                  </div>
                )}
                
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
                      {isSignUp ? 'Creating Account...' : 'Signing in...'}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      {isSignUp ? (
                        <>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Create Account
                        </>
                      ) : (
                        <>
                          <LogIn className="mr-2 h-4 w-4" />
                          Sign In to Portal
                        </>
                      )}
                    </span>
                  )}
                </button>
                
                {/* Toggle between Sign In and Sign Up */}
              {/* Security Notice */}
              <div className={`mt-8 p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700' : 'bg-yellow-50'} border ${theme === 'dark' ? 'border-slate-600' : 'border-yellow-200'}`}>
                <div className="flex items-start space-x-3">
                  <Shield className={`h-5 w-5 mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  <div>
                    <h4 className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-800'}`}>
                      Secure Login
                    </h4>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-yellow-700'}`}>
                      Your credentials are encrypted and secure. Never share your login information with anyone.
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