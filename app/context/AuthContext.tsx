'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ACCESS_TOKEN_KEY = 'shopify_customer_access_token';
const TOKEN_EXPIRY_KEY = 'shopify_customer_token_expiry';

export interface CustomerInfo {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  acceptsMarketing: boolean;
}

interface AuthContextType {
  customer: CustomerInfo | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    acceptsMarketing?: boolean
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  getAccessToken: () => string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<CustomerInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = customer !== null;

  // Clear error
  const clearError = useCallback(() => setError(null), []);

  // Get access token from localStorage
  const getAccessToken = useCallback((): string | null => {
    if (typeof window === 'undefined') return null;
    
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    
    if (!token || !expiry) return null;
    
    // Check if token is expired
    if (new Date(expiry) < new Date()) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXPIRY_KEY);
      return null;
    }
    
    return token;
  }, []);

  // Store access token in localStorage
  const setAccessToken = useCallback((token: string, expiresAt: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiresAt);
  }, []);

  // Clear access token from localStorage
  const clearAccessToken = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  }, []);

  // Fetch customer info from token
  const fetchCustomer = useCallback(async (token: string): Promise<CustomerInfo | null> => {
    try {
      const response = await fetch('/api/auth/customer', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.customer;
      } else {
        // Token is invalid or expired
        clearAccessToken();
        return null;
      }
    } catch (err) {
      console.error('Failed to fetch customer:', err);
      return null;
    }
  }, [clearAccessToken]);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const token = getAccessToken();
      
      if (token) {
        const customerInfo = await fetchCustomer(token);
        setCustomer(customerInfo);
      }
      
      setLoading(false);
    };

    checkSession();
  }, [getAccessToken, fetchCustomer]);

  // Login
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return false;
      }

      // Store token
      setAccessToken(data.accessToken, data.expiresAt);

      // Fetch customer info
      const customerInfo = await fetchCustomer(data.accessToken);
      setCustomer(customerInfo);
      setLoading(false);

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      setLoading(false);
      return false;
    }
  }, [setAccessToken, fetchCustomer]);

  // Register
  const register = useCallback(async (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    acceptsMarketing?: boolean
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          acceptsMarketing,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return false;
      }

      // Store token if auto-login succeeded
      if (data.accessToken) {
        setAccessToken(data.accessToken, data.expiresAt);
        
        // Set customer info from registration response
        setCustomer({
          id: data.customer.id,
          email: data.customer.email,
          firstName: data.customer.firstName,
          lastName: data.customer.lastName,
          acceptsMarketing: false,
        });
      }

      setLoading(false);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      setLoading(false);
      return false;
    }
  }, [setAccessToken]);

  // Logout
  const logout = useCallback(async (): Promise<void> => {
    const token = getAccessToken();
    
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken: token }),
        });
      } catch (err) {
        console.warn('Logout API error:', err);
      }
    }

    clearAccessToken();
    setCustomer(null);
    setError(null);
  }, [getAccessToken, clearAccessToken]);

  return (
    <AuthContext.Provider
      value={{
        customer,
        loading,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        getAccessToken,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
