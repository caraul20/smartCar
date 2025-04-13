'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { signOut, User as FirebaseUser } from "firebase/auth";
import { auth } from '@/lib/firebase/config';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Icons (Placeholder - replace with actual icons later)
function ProfileIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function BookingsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

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

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

interface UserNavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function UserNavItem({ href, icon, label, isActive }: UserNavItemProps) {
  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200",
          isActive 
            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" 
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
        )}
      >
        {icon}
        <span className="font-medium text-sm">{label}</span>
        {isActive && (
          <motion.div 
            layoutId="activeUserNavIndicator"
            className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </div>
    </Link>
  );
}

export default function AccountLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const navItems = [
    { href: '/account', icon: <ProfileIcon />, label: 'Profilul Meu' },
    { href: '/account/bookings', icon: <BookingsIcon />, label: 'Rezervările Mele' },
    { href: '/account/settings', icon: <SettingsIcon />, label: 'Setări Cont' },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Verificare autentificare...</p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden" 
            onClick={toggleSidebar}
          />
        )}

        <aside 
          className={cn(
            "fixed inset-y-0 left-0 z-40 flex w-64 flex-col justify-between border-r border-gray-200 bg-white p-4 shadow-lg transition-transform dark:border-gray-700/50 dark:bg-gray-800 lg:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div>
            <div className="mb-6 flex items-center justify-between border-b pb-4 dark:border-gray-700/50">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="flex items-center justify-center h-8 w-8 bg-blue-600 rounded-md group-hover:scale-105 transition-transform">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-lg font-bold text-gray-800 dark:text-white">SmartCar</span>
              </Link>
              <button 
                className="rounded-md p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 lg:hidden"
                onClick={toggleSidebar}
              >
                <CloseIcon />
              </button>
            </div>
            
            <div className="mb-6 flex items-center px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                <span className="text-lg font-medium">
                  {currentUser?.email?.charAt(0).toUpperCase() ?? 'U'}
                </span>
              </div>
              <div className="ml-3 overflow-hidden">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Utilizator'}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {currentUser?.email ?? '-'}
                </p>
              </div>
            </div>
            
            <nav className="space-y-1 px-2">
              {navItems.map((item) => (
                <UserNavItem 
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  isActive={pathname === item.href || (item.href !== '/account' && pathname.startsWith(item.href))}
                />
              ))}
            </nav>
          </div>
          
          <div className="px-2">
            <Link href="/" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50 mb-1">
              <HomeIcon />
              <span className="font-medium text-sm">Mergi la Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
            >
              <LogoutIcon />
              <span className="font-medium text-sm">Deconectare</span>
            </button>
          </div>
        </aside>
        
        <div className="flex flex-1 flex-col transition-all duration-300 lg:ml-64">
          <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white/95 px-4 shadow-sm backdrop-blur-md dark:border-gray-700/50 dark:bg-gray-800/95 lg:hidden">
            <button 
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Contul Meu</h1>
            <div className="w-8"></div>
          </div>
          
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
} 