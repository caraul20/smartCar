'use client';

import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy, Timestamp, doc, updateDoc } from "firebase/firestore";
import { firestore } from '@/lib/firebase/config';
import { Booking } from '@/lib/types';
import Image from 'next/image';

// Extend Booking type for local use if needed
interface PopulatedBooking extends Booking {
  carName?: string; 
  carImageUrl?: string;
  numberOfDays?: number;
  // Firestore timestamps might be objects, handle conversion
  createdAt?: Timestamp | Date; 
  startDate: string; // Keep as string for simplicity if fetched that way
  endDate: string;
  // We might fetch user email later, for now keep it optional
  userEmail?: string; 
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

// Helper function to format price
const formatPrice = (price: number | undefined | null) => {
  if (price === undefined || price === null) return 'N/A';
  return price.toString().replace(/\B(?=(\d{3})+(?!d))/g, ".");
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<PopulatedBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingBookingId, setUpdatingBookingId] = useState<string | null>(null); // Track which booking is being updated

  const fetchBookings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const bookingsRef = collection(firestore, "bookings");
      // Query all bookings, order by creation date descending
      const q = query(bookingsRef, orderBy("createdAt", "desc"));
      
      const querySnapshot = await getDocs(q);
      const allBookings: PopulatedBooking[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as PopulatedBooking;
        // TODO: Fetch user email based on data.userId from 'users' collection
        // For now, we'll skip userEmail population
        allBookings.push({ 
            ...data,
            id: doc.id,
            startDate: data.startDate, 
            endDate: data.endDate
        });
      });
      setBookings(allBookings);
    } catch (err) {
      console.error("Error fetching bookings: ", err);
      setError("A apărut o eroare la încărcarea rezervărilor.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []); // Fetch on initial mount

  // Function to update booking status
  const handleUpdateStatus = async (bookingId: string, newStatus: Booking['status']) => {
    setUpdatingBookingId(bookingId); // Set loading state for this specific booking
    try {
      const bookingRef = doc(firestore, "bookings", bookingId);
      await updateDoc(bookingRef, {
        status: newStatus
      });
      console.log(`Booking ${bookingId} status updated to ${newStatus}`);
      // Refresh bookings list after update
      fetchBookings(); 
      // Alternative: Update local state directly for faster UI feedback
      // setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    } catch (err) {
      console.error(`Error updating booking ${bookingId}: `, err);
      // Optionally show an error toast/message to the admin
    } finally {
      setUpdatingBookingId(null); // Clear loading state
    }
  };

  // --- Status Badge and Text functions (same as user page) ---
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
  // --- End Status functions ---

  if (isLoading) {
    return <div className="text-center p-10">Se încarcă rezervările...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Management Rezervări</h1>
        {/* Add filtering/search controls if needed */}
      </div>
      
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-800 min-w-[800px]"> {/* Added min-width */}
              <thead className="bg-gray-50 dark:bg-gray-800/60">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Rezervare ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Client (ID)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Mașină</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Perioadă</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Preț</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Acțiuni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800/60">
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-400">#{booking.id.substring(0, 6)}...</td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 dark:text-gray-300">{booking.userId}</td> {/* TODO: Replace with user name/email */}
                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex items-center">
                         {booking.carImageUrl && (
                            <div className="relative h-8 w-12 flex-shrink-0 overflow-hidden rounded">
                                <Image 
                                    src={booking.carImageUrl}
                                    alt={booking.carName || 'Mașină'}
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                />
                            </div>
                         )}
                         <div className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                           {booking.carName || 'N/A'}
                         </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {formatFirebaseDate(new Date(booking.startDate))} - {formatFirebaseDate(new Date(booking.endDate))}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                       {formatPrice(booking.totalPrice)} €
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                    </td>
                     <td className="whitespace-nowrap px-4 py-4 text-center text-sm">
                        {booking.status === 'pending' ? (
                            <div className="flex justify-center space-x-2">
                                <button 
                                    onClick={() => handleUpdateStatus(booking.id, 'confirmed')}
                                    disabled={updatingBookingId === booking.id} // Disable button while updating this specific booking
                                    className="rounded-md bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800 hover:bg-green-200 disabled:opacity-50 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40 disabled:dark:opacity-40"
                                >
                                    {updatingBookingId === booking.id ? '...' : 'Confirmă'}
                                </button>
                                <button 
                                    onClick={() => handleUpdateStatus(booking.id, 'cancelled')}
                                    disabled={updatingBookingId === booking.id}
                                    className="rounded-md bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800 hover:bg-red-200 disabled:opacity-50 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/40 disabled:dark:opacity-40"
                                >
                                     {updatingBookingId === booking.id ? '...' : 'Anulează'}
                                </button>
                            </div>
                        ) : (
                           <span className="text-gray-400">-</span> // No actions for non-pending bookings
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center p-12 text-center">
            <div>
              <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Nu există rezervări</h3>
              <p className="text-gray-500 dark:text-gray-400">
                 Momentan nu sunt rezervări în sistem.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 