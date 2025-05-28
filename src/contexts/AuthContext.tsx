'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// API URL from environment or default - use relative URLs for same-origin requests
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Define context state
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  loginWithGoogle: () => void;
  loginWithFacebook: () => void;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

// Create context with default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  loginWithGoogle: () => {},
  loginWithFacebook: () => {},
  logout: async () => {},
  checkAuthStatus: async () => {}
});

// Hook for using the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Check auth status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);
  
  // Function to check if user is authenticated
  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/auth/me`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
      
      setError(null);
    } catch (err) {
      console.error('Auth check error:', err);
      setUser(null);
      setError('Failed to check authentication status');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to login with Google
  const loginWithGoogle = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';
    window.location.href = `${API_URL}/api/auth/google?redirect=${currentUrl}`;
  };
  
  // Function to login with Facebook
  const loginWithFacebook = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';
    window.location.href = `${API_URL}/api/auth/facebook?redirect=${currentUrl}`;
  };
  
  // Function to logout
  const logout = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        setUser(null);
      } else {
        throw new Error('Logout failed');
      }
    } catch (err) {
      console.error('Logout error:', err);
      setError('Logout failed');
    }
  };
  
  const value = {
    user,
    isLoading,
    error,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    checkAuthStatus
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 