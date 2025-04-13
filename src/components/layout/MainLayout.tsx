'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Define paths where the main Navbar and Footer should NOT be shown
  const hideLayoutPaths = [
    '/login',
    '/register',
    '/admin',
    '/account'
  ];

  // Check if the current path starts with any of the paths to hide layout for
  const shouldHideLayout = hideLayoutPaths.some(path => pathname.startsWith(path));

  if (shouldHideLayout) {
    // For auth, admin, account pages, just render children directly
    return <>{children}</>;
  }

  // For public pages, render with Navbar and Footer
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow pt-20">{/* pt-20 assumes Navbar height */}
        {children}
      </main>
      <Footer />
    </div>
  );
} 