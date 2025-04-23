'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth, UserRole } from './auth-context';
import { Loader } from '@/components/ui/loader';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      // If not authenticated and not on auth pages, redirect to login
      if (!isAuthenticated && !pathname.includes('/login') && !pathname.includes('/register')) {
        router.push('/login');
      }
      // If authenticated but on an auth page, redirect to appropriate dashboard
      else if (isAuthenticated && (pathname.includes('/login') || pathname.includes('/register') || pathname === '/')) {
        router.push(user?.role === 'parent' ? '/parent/dashboard' : '/driver/dashboard');
      }
      // If authenticated but not authorized for this role-specific page
      else if (
        isAuthenticated &&
        allowedRoles &&
        user?.role &&
        !allowedRoles.includes(user.role)
      ) {
        router.push(user.role === 'parent' ? '/parent/dashboard' : '/driver/dashboard');
      }
    }
  }, [loading, isAuthenticated, pathname, user, router, allowedRoles]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  // Auth pages should be accessible when not authenticated
  if (!isAuthenticated && (pathname.includes('/login') || pathname.includes('/register'))) {
    return <>{children}</>;
  }

  // Protected pages should check for authentication and authorization
  if (isAuthenticated) {
    if (!allowedRoles || (user?.role && allowedRoles.includes(user.role))) {
      return <>{children}</>;
    }
    return null; // Don't render anything while redirecting
  }

  return null; // Don't render anything while redirecting
}