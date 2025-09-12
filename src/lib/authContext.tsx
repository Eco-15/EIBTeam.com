import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService, User } from './auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  signOut: () => void;
  updatePassword: (newPassword: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      AuthService.getUserFromToken(storedToken)
        .then((userData) => {
          if (userData) {
            setUser(userData);
            setToken(storedToken);
          } else {
            localStorage.removeItem('auth_token');
          }
        })
        .catch(() => {
          localStorage.removeItem('auth_token');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await AuthService.signIn(email, password);
      setUser(result.user);
      setToken(result.token);
      localStorage.setItem('auth_token', result.token);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      const result = await AuthService.signUp(email, password, firstName, lastName);
      setUser(result.user);
      setToken(result.token);
      localStorage.setItem('auth_token', result.token);
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
  };

  const updatePassword = async (newPassword: string) => {
    if (!user) throw new Error('No user logged in');
    await AuthService.updatePassword(user.id, newPassword);
  };

  const value = {
    user,
    token,
    signIn,
    signUp,
    signOut,
    updatePassword,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};