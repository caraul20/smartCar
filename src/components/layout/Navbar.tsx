'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { signOut } from "firebase/auth";
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';

// Icons
function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();

  const navLinks = [
    { href: '/rent', label: 'Închirieri' },
    { href: '/cars', label: 'Vânzări' },
    { href: '/offers', label: 'Oferte' },
    { href: '/about', label: 'Despre Noi' },
    { href: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(false);
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const renderAuthButtons = () => {
    if (loading) {
      return <div className="h-10 w-24 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>;
    }

    if (user) {
      return (
        <div className="flex items-center gap-2">
          <Link 
            href="/account"
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40"
            )}
          >
            <UserIcon />
            <span className="hidden sm:inline">Contul Meu</span>
          </Link>
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50"
            )}
          >
            <LogoutIcon />
            <span className="hidden sm:inline">Deconectare</span>
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2">
          <Link 
            href="/login"
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
            )}
          >
            Conectare
          </Link>
          <Link 
            href="/register"
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors",
              "bg-blue-600 hover:bg-blue-700 shadow-md"
            )}
          >
            Creează Cont
          </Link>
        </div>
      );
    }
  };
  
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 50, damping: 15 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || isOpen
          ? "bg-white/80 shadow-md backdrop-blur-lg dark:bg-gray-900/80"
          : "bg-transparent"
      )}
    >
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center flex-shrink-0">
            <div className="flex items-center justify-center h-10 w-10 bg-blue-600 rounded-md mr-2">
              <span className="text-white font-bold text-xl">S</span> 
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">SMARTCAR</span>
          </Link>

          <div className="hidden lg:flex lg:items-center lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="hidden lg:flex lg:items-center">
            {renderAuthButtons()}
          </div>

          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: "easeInOut" } },
          closed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } },
        }}
        className="lg:hidden overflow-hidden"
      >
        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3 bg-white dark:bg-gray-800">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block rounded-md px-3 py-2 text-base font-medium transition-colors",
                pathname === link.href
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 pb-2">
             <div className="flex items-center justify-center px-3">
              {renderAuthButtons()}
             </div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}