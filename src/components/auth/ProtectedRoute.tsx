'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Așteaptă până se termină încărcarea stării de autentificare
    if (loading) return;

    // Dacă încărcarea s-a terminat și nu există utilizator, redirecționează la login
    if (!user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Afișează un mesaj/spinner în timpul încărcării
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p>Verificare autentificare...</p>
        {/* TODO: Add a proper loading spinner component */}
      </div>
    );
  }

  // Dacă utilizatorul este autentificat, afișează conținutul protejat
  if (user) {
    return <>{children}</>;
  }

  // Teoretic, nu ar trebui să ajungă aici din cauza redirectării,
  // dar returnăm null ca fallback.
  return null; 
} 