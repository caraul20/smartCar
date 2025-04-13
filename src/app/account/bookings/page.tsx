'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { collection, query, where, getDocs, orderBy, Timestamp } from "firebase/firestore";
import { firestore } from '@/lib/firebase/config';
import { Booking } from '@/lib/types'; // Assuming Booking type includes carName and carImageUrl
import Image from 'next/image';
import Link from 'next/link';

// Extend Booking type for local use if needed
interface PopulatedBooking extends Booking {
  carName?: string; 
  carImageUrl?: string;
  numberOfDays?: number; // Add numberOfDays
  // Firestore timestamps might be objects, handle conversion
  createdAt?: Timestamp | Date; 
  startDate: string; // Keep as string for simplicity if fetched that way
  endDate: string;
}

// Helper function to format Firestore Timestamp or Date to readable string
const formatFirebaseDate = (date: Timestamp | Date | undefined): string => {
  if (!date) return 'N/A';
  const jsDate = date instanceof Timestamp ? date.toDate() : date;
  return new Intl.DateTimeFormat('ro-RO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(jsDate);
};

// Helper function to format price (copied from car detail page)
const formatPrice = (price: number | undefined | null) => {
  if (price === undefined || price === null) return 'N/A';
  return price.toString().replace(/\B(?=(\d{3})+(?!)d)/g, ".");
};

export default function AccountBookingsPage() {
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<PopulatedBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) {
        setIsLoading(false);
        return; // No user, no bookings to fetch
      }

      setIsLoading(true);
      setError(null);
      try {
        const bookingsRef = collection(firestore, "bookings");
        // Query bookings for the current user, order by creation date descending
        const q = query(bookingsRef, where("userId", "==", user.uid), orderBy("createdAt", "desc"));
        
        const querySnapshot = await getDocs(q);
        const userBookings: PopulatedBooking[] = [];
        querySnapshot.forEach((doc) => {
          // Ensure data matches the PopulatedBooking structure
          const data = doc.data() as PopulatedBooking;
          userBookings.push({ 
              ...data,
              id: doc.id, // Add the document ID
              // Ensure dates are strings if needed, though they are stored as strings
              startDate: data.startDate, 
              endDate: data.endDate
          });
        });
        setBookings(userBookings);
      } catch (err) {
        console.error("Error fetching bookings: ", err);
        // Display a more specific error message if possible
        const errorMessage = err instanceof Error ? err.message : "A apărut o eroare necunoscută.";
        setError(`A apărut o eroare la încărcarea rezervărilor: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) { // Only fetch bookings once auth state is resolved
      fetchBookings();
    }

  }, [user, authLoading]); // Re-run effect when user or authLoading changes

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  const getStatusText = (status: Booking['status']) => {
     switch (status) {
      case 'pending': return 'În așteptare';
      case 'confirmed': return 'Confirmată';
      case 'cancelled': return 'Anulată';
      case 'completed': return 'Finalizată';
      default: return 'Necunoscut';
    }
  };

  if (isLoading || authLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
        <p className="ml-2">Se încarcă rezervările...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-10 text-red-600">{error}</div>;
  }
  
  if (!user) {
      return <div className="text-center p-10">Trebuie să fii autentificat pentru a vedea rezervările.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Rezervările Mele</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Vezi istoricul și rezervările viitoare.</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
         <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
             <h2 className="text-lg font-medium text-gray-900 dark:text-white">Lista Rezervări</h2>
          </div>
          
         {bookings.length > 0 ? (
            <>
              {/* Desktop Table View (Hidden on small screens) */}
              <div className="hidden md:block overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-50 dark:bg-gray-800/60">
                     <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Mașină</th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Perioadă</th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Zile</th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Preț Total</th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Data Creării</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {bookings.map((booking) => (
                        <tr key={booking.id + '_desktop'} className="hover:bg-gray-50 dark:hover:bg-gray-700/40">
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center">
                              {booking.carImageUrl && (
                                <div className="relative h-10 w-16 flex-shrink-0 overflow-hidden rounded">
                                  <Image 
                                    src={booking.carImageUrl}
                                    alt={booking.carName || 'Mașină'}
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {booking.carName || 'N/A'}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">ID: {booking.id.substring(0,6)}...</div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                            {formatFirebaseDate(new Date(booking.startDate))} - {formatFirebaseDate(new Date(booking.endDate))}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                            {booking.numberOfDays}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                            {formatPrice(booking.totalPrice)} €
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(booking.status)}`}>
                              {getStatusText(booking.status)}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {formatFirebaseDate(booking.createdAt)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  </table>
              </div>

              {/* Mobile Card View (Visible only on small screens) */}
              <div className="block md:hidden divide-y divide-gray-200 dark:divide-gray-700">
                  {bookings.map((booking) => (
                     <div key={booking.id + '_mobile'} className="p-4">
                          <div className="flex items-center justify-between mb-3 gap-2">
                              <div className="flex items-center min-w-0">
                                  {booking.carImageUrl && (
                                     <div className="relative h-12 w-16 md:w-20 flex-shrink-0 overflow-hidden rounded mr-3">
                                         <Image 
                                             src={booking.carImageUrl}
                                             alt={booking.carName || 'Mașină'}
                                             fill
                                             sizes="80px"
                                             className="object-cover"
                                         />
                                     </div>
                                  )}
                                  <div className="min-w-0 flex-1">
                                     <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5 truncate">
                                       {booking.carName || 'N/A'}
                                     </h3>
                                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">ID: {booking.id.substring(0, 8)}...</p>
                                    </div>
                              </div>
                              <span className={`flex-shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(booking.status)}`}>
                                  {getStatusText(booking.status)}
                              </span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm pt-3 border-t border-gray-100 dark:border-gray-700/50 mt-3">
                             <div>
                                 <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Perioada:</p>
                                 <p className="text-gray-800 dark:text-gray-200">{formatFirebaseDate(new Date(booking.startDate))} - {formatFirebaseDate(new Date(booking.endDate))}</p>
                             </div>
                             <div>
                                 <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Zile:</p>
                                 <p className="text-gray-800 dark:text-gray-200">{booking.numberOfDays}</p>
                             </div>
                              <div>
                                 <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Preț Total:</p>
                                 <p className="font-semibold text-gray-800 dark:text-gray-200">{formatPrice(booking.totalPrice)} €</p>
                             </div>
                             <div>
                                 <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Data Creării:</p>
                                 <p className="text-gray-800 dark:text-gray-200">{formatFirebaseDate(booking.createdAt)}</p>
                             </div>
                          </div>
                     </div>
                  ))}
              </div>
            </>
            ) : (
            <div className="flex items-center justify-center p-12 text-center">
                <div>
                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Nu aveți rezervări</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Încă nu ați făcut nicio rezervare. Explorați flota noastră!
                </p>
                <Link href="/rent">
                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Vezi Mașini Disponibile
                    </button>
                </Link>
                </div>
            </div>
            )}
      </div>
    </div>
  );
}

function Spinner() {
    return (
      <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    );
  } 