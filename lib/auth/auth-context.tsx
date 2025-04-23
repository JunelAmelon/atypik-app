'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'parent' | 'driver';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Mock login function - would connect to a real backend
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Mock data - would come from backend in real app
      if (email === 'parent@example.com') {
        setUser({
          id: '1',
          email,
          name: 'Marie Dubois',
          role: 'parent',
          avatar: '/images/avatars/parent.jpg',
        });
        router.push('/parent/dashboard');
      } else if (email === 'driver@example.com') {
        setUser({
          id: '2',
          email,
          name: 'Thierry Bernard',
          role: 'driver',
          avatar: '/images/avatars/driver.jpg',
        });
        router.push('/driver/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock register function
  const register = async (userData: any, role: UserRole) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock successful registration
      setUser({
        id: '3',
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        role,
      });
      
      router.push(role === 'parent' ? '/parent/dashboard' : '/driver/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    router.push('/login');
  };

  // Check for stored authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would validate the token with your backend
        const storedUser = localStorage.getItem('atypik_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Store user data when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('atypik_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('atypik_user');
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};