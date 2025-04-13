'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from '@/lib/firebase/config';
import { User } from '@/lib/types'; // Use your existing User type

// Simple Spinner component
function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
}

export default function AccountProfilePage() {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, fetch their data from Firestore
        const userDocRef = doc(firestore, "users", user.uid);
        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data() as User);
          } else {
            console.log("No user data found in Firestore!");
            // Optionally create a Firestore entry if missing but auth exists?
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // User is signed out
        setUserData(null);
        // Optionally redirect to login page
        // router.push('/login');
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
        <p className="ml-2">Se încarcă datele profilului...</p>
      </div>
    );
  }

  if (!userData) {
    // This case should ideally not be reached due to ProtectedRoute, 
    // but it's good practice to handle it.
    return (
      <div className="text-center py-20">
        <p>Utilizatorul nu a fost găsit sau nu sunteți autentificat.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Profilul Meu</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Vezi și actualizează informațiile contului tău.</p>
      </div>

      {/* Profile Information Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
           <h2 className="text-lg font-medium text-gray-900 dark:text-white">Informații Personale</h2>
        </div>
        <div className="p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Nume complet</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{userData.firstName} {userData.lastName}</dd>
                </div>
                <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Adresă Email</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{userData.email}</dd>
                </div>
                <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Număr de Telefon</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{userData.phoneNumber || '-'}</dd>
                </div>
                <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Serie Permis</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{userData.drivingLicense || '-'}</dd>
                </div>
                 {/* Add other fields if needed, e.g., createdAt */}
                {/* 
                <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Membru din</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formatFirebaseDate(userData.createdAt)}</dd>
                </div> 
                */}
            </dl>
        </div>
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 text-right">
             <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50" disabled> 
              Editează Profilul (în curând)
            </button>
        </div>
      </div>

       {/* Placeholder for other sections like linked accounts, activity, etc. */}
    </div>
  );
} 