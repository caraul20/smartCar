'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Car } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { firestore } from '@/lib/firebase/config';
import { CheckCircle2, Fuel, Gauge, Users, Cog } from 'lucide-react';

// Helper function to format price
const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!)d)/g, ".");
};

// Helper function to render rating stars
const renderRatingStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`w-5 h-5 ${i <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    );
  }
  return stars;
};

// Simple Spinner component (optional, can reuse from elsewhere)
function Spinner() {
    return (
      <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    );
  }

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const carId = params.id as string;

  // Fetch car data from Firestore based on ID from URL
  useEffect(() => {
    const fetchCarData = async () => {
        if (!carId) {
            setError("ID mașină invalid.");
            setIsLoading(false);
            return;
        }
        
        setIsLoading(true);
        setError(null);
        try {
            const carRef = doc(firestore, "cars", carId);
            const docSnap = await getDoc(carRef);

            if (docSnap.exists()) {
                // Ensure data matches the Car type
                 const data = docSnap.data();
                 setCar({ 
                    id: docSnap.id,
                    name: data.name ?? 'N/A',
                    brand: data.brand ?? 'N/A',
                    model: data.model ?? 'N/A',
                    year: data.year ?? 0,
                    color: data.color ?? '#000000',
                    pricePerDay: data.pricePerDay ?? 0,
                    pricePerWeek: data.pricePerWeek ?? 0, 
                    pricePerMonth: data.pricePerMonth ?? 0, 
                    fuelType: data.fuelType ?? 'gasoline',
                    transmission: data.transmission ?? 'manual',
                    seats: data.seats ?? 0,
                    doors: data.doors ?? 0,
                    availableFrom: data.availableFrom ?? '',
                    availableTo: data.availableTo ?? '',
                    features: data.features ?? [],
                    imageUrl: data.imageUrl ?? '',
                    rating: data.rating ?? 0,
                    location: data.location ?? 'N/A',
                    description: data.description ?? '',
                    category: data.category ?? 'economy',
                    originalPricePerDay: data.originalPricePerDay
                });
            } else {
                console.log("No such car document!");
                setError("Mașina nu a fost găsită.");
                // Consider calling notFound() here as well if preferred
                // notFound(); 
            }
        } catch (err) {
            console.error("Error fetching car data:", err);
            setError("A apărut o eroare la încărcarea detaliilor mașinii.");
        } finally {
            setIsLoading(false);
        }
    };

    fetchCarData();
  }, [carId]); // Re-fetch if carId changes

  // Calculate duration and price only when dates or car change
  useEffect(() => {
    if (startDate && endDate && car) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      // Ensure dates are valid before calculating
      if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && start < end) {
        const timeDiff = end.getTime() - start.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (days > 0) {
          setNumberOfDays(days);
          setTotalPrice(days * car.pricePerDay);
          setBookingError(null);
        } else {
          setNumberOfDays(0);
          setTotalPrice(0);
          setBookingError('Perioada selectată este invalidă.');
        }
      } else if (start >= end) {
        setNumberOfDays(0);
        setTotalPrice(0);
        setBookingError('Data de sfârșit trebuie să fie după data de început.');
      } else {
        // Handle invalid date format if necessary, though type="date" helps
        setNumberOfDays(0);
        setTotalPrice(0);
        setBookingError('Date invalide.');
      }
    } else {
      // Reset if dates are incomplete or car is not loaded
      setNumberOfDays(0);
      setTotalPrice(0);
      setBookingError(null);
    }
  }, [startDate, endDate, car]);

  const handleBooking = async () => {
    if (authLoading) return;
    if (!user) {
      router.push('/login?redirect=/cars/' + carId);
      return;
    }
    if (!startDate || !endDate || !car || numberOfDays <= 0) {
      setBookingError('Te rog selectează o perioadă de închiriere validă.');
      return;
    }
    setBookingError(null);
    setBookingSuccess(false);
    setIsBooking(true);
    
    try {
      const bookingData = {
        userId: user.uid,
        carId: car.id,
        carName: car.name,
        carImageUrl: car.imageUrl,
        startDate: startDate,
        endDate: endDate,
        numberOfDays: numberOfDays,
        totalPrice: totalPrice,
        status: 'pending',
        createdAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(firestore, "bookings"), bookingData);
      console.log("Booking document written with ID: ", docRef.id);
      setBookingSuccess(true);

    } catch (error) {
      console.error("Error adding booking document: ", error);
      setBookingError('A apărut o eroare la crearea rezervării. Te rog încearcă din nou.');
    } finally {
      setIsBooking(false);
    }
  };

  // Updated Loading/Error/Not Found states
  if (isLoading) { 
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner />
            <span className="ml-2">Se încarcă detaliile mașinii...</span>
        </div>
    );
  }
  
  if (error) {
       return (
        <div className="flex flex-col justify-center items-center min-h-screen text-center px-4">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <Link href="/rent" className="text-blue-600 hover:underline">
                Înapoi la lista de mașini
            </Link>
        </div>
    ); 
  }

  // If no error and not loading, but car is still null (shouldn't happen if logic is correct, but good fallback)
  if (!car) {
     notFound(); 
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 sm:py-16">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-blue-600">Acasă</Link>
          <span className="mx-2">/</span>
          <Link href="/rent" className="hover:text-blue-600">Închirieri</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 dark:text-gray-300">{car.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Car Image and Gallery (Left/Top Column) */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-xl mb-6"
            >
              <Image
                src={car.imageUrl}
                alt={car.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </motion.div>
            
            {/* Car Description & Features */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-6"
            >
                <div>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Descriere</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {car.description}
                    </p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-4">Dotări Incluse</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {car.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
          </div>

          {/* Booking and Details (Right/Bottom Column) */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-28" 
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{car.name}</h1>
              <p className="text-gray-500 dark:text-gray-400 mb-4">{car.brand} {car.model} - {car.year}</p>
              
              {/* Rating */}
              <div className="flex items-center mb-5">
                <div className="flex mr-2">{renderRatingStars(car.rating)}</div>
                <span className="text-sm text-gray-600 dark:text-gray-400">({car.rating.toFixed(1)}/5)</span>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                 <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Fuel size={20} className="mr-2 text-gray-400" />
                    {car.fuelType === 'gasoline' ? 'Benzină' : car.fuelType === 'diesel' ? 'Motorină' : car.fuelType === 'electric' ? 'Electric' : 'Hibrid'}
                 </div>
                 <div className="flex items-center text-gray-700 dark:text-gray-300">
                     <Cog size={20} className="mr-2 text-gray-400" />
                    {car.transmission === 'automatic' ? 'Automată' : 'Manuală'}
                 </div>
                 <div className="flex items-center text-gray-700 dark:text-gray-300">
                     <Users size={20} className="mr-2 text-gray-400" />
                     {car.seats} Locuri
                 </div>
                 <div className="flex items-center text-gray-700 dark:text-gray-300">
                     <Gauge size={20} className="mr-2 text-gray-400" /> { /* Replaced Door icon with Gauge */}
                    {car.doors} Uși
                 </div>
              </div>

              {/* Booking Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Rezervă această mașină</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                     <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data început</label>
                     <input 
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                      />
                  </div>
                   <div>
                     <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data sfârșit</label>
                     <input 
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate || new Date().toISOString().split('T')[0]}
                        className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                        disabled={!startDate}
                      />
                  </div>
                </div>
                
                {numberOfDays > 0 && (
                    <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-300">Durată: <span className="font-semibold">{numberOfDays} {numberOfDays === 1 ? 'zi' : 'zile'}</span></p>
                        <p className="text-lg font-bold text-blue-700 dark:text-blue-400">Preț Total: {formatPrice(totalPrice)} €</p>
                    </div>
                )}

                {/* Display current price per day with potential discount */}
                <div className="text-center mb-4">
                    {car.originalPricePerDay && car.originalPricePerDay > car.pricePerDay ? (
                       <div className="flex items-baseline justify-center gap-2">
                           <span className="text-lg text-gray-500 dark:text-gray-400 line-through">{formatPrice(car.originalPricePerDay)} €/zi</span>
                           <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatPrice(car.pricePerDay)} €/zi</span>
                            <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-semibold">
                               -{Math.round(((car.originalPricePerDay - car.pricePerDay) / car.originalPricePerDay) * 100)}%
                            </span>
                       </div>
                    ) : (
                       <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(car.pricePerDay)} €/zi</span>
                    )}
                </div>

                {/* Booking Error Message */}
                {bookingError && (
                     <p className="text-sm text-red-600 dark:text-red-400 mb-4 text-center">{bookingError}</p>
                )}
                 {/* Booking Success Message */}
                {bookingSuccess && (
                     <motion.p 
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1 }}
                        className="text-sm text-green-600 dark:text-green-400 mb-4 text-center font-medium"
                     >
                        Rezervare creată cu succes! Poți verifica în secțiunea &apos;Rezervările Mele&apos;.
                     </motion.p>
                )}

                <button 
                  onClick={handleBooking}
                  disabled={isBooking || !startDate || !endDate || numberOfDays <= 0 || !!bookingError || authLoading}
                  className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isBooking ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : user ? (
                     'Rezervă Acum'
                  ) : (
                     'Autentifică-te pentru a rezerva'
                  )}
                </button>
                {!user && !authLoading && (
                     <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">Trebuie să fii autentificat pentru a putea rezerva.</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
