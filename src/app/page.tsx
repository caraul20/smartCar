'use client';

import { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { Car } from '@/lib/types';
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { firestore } from '@/lib/firebase/config';
import HeroSection from '@/components/ui/HeroSection';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';

const LazyCarCard = lazy(() => import('@/components/cars/CarCard'));
const LazyPremiumCarCard = lazy(() => import('@/components/cars/PremiumCarCard'));

const CardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 w-full"></div>
    <div className="space-y-3 mt-4">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  </div>
);

export default function Home() {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [isLoadingCars, setIsLoadingCars] = useState(true);
  const [errorLoadingCars, setErrorLoadingCars] = useState<string | null>(null);

  const fetchCarsFromDB = useCallback(async () => {
    setIsLoadingCars(true);
    setErrorLoadingCars(null);
    try {
      const carsRef = collection(firestore, "cars");
      const q = query(carsRef, orderBy("rating", "desc"), limit(12)); 
      const querySnapshot = await getDocs(q);
      const carsData: Car[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        carsData.push({ 
          id: doc.id, 
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
      });
      setAllCars(carsData);
    } catch (err) {
      console.error("Error fetching cars for homepage: ", err);
      if (err instanceof Error && (err.message.includes('permission-denied') || err.message.includes('insufficient permissions'))) {
        setErrorLoadingCars("Eroare de permisiuni la citirea mașinilor. Verificați regulile Firestore.");
      } else {
        setErrorLoadingCars("Nu s-au putut încărca mașinile. Încercați din nou.");
      }
    } finally {
      setIsLoadingCars(false);
    }
  }, []);

  useEffect(() => {
    fetchCarsFromDB();
  }, [fetchCarsFromDB]);

  const luxuryCars = !isLoadingCars ? allCars.filter(car => car.category === 'luxury').slice(0, 3) : [];
  const standardCars = !isLoadingCars ? allCars.filter(car => car.category !== 'luxury') : [];

  const hoverServiceItems = [
    {
      title: "Închiriere Auto",
      description: "Oferim o gamă variată de vehicule pentru închiriere pe termen scurt și lung, cu prețuri competitive și fără costuri ascunse.",
      link: "/rent"
    },
    {
      title: "Vânzare Auto",
      description: "Vinde-ți mașina rapid și la cel mai bun preț. Oferim evaluări gratuite și gestionăm toate aspectele legale ale tranzacției.",
      link: "/buy"
    },
    {
      title: "Service Auto",
      description: "Menține vehiculul în condiții optime cu serviciile noastre complete de mentenanță, realizate de tehnicieni certificați.",
      link: "#"
    },
    {
      title: "Asigurări Auto",
      description: "Obține cele mai avantajoase asigurări pentru vehiculul tău, adaptate nevoilor și bugetului tău.",
      link: "#"
    },
    {
      title: "Consultanță Auto",
      description: "Specialiștii noștri oferă consultanță pentru achiziționarea vehiculului perfect pentru tine.",
      link: "#"
    },
    {
      title: "Finanțare Auto",
      description: "Soluții de finanțare personalizate pentru achiziția noului tău vehicul, cu dobânzi avantajoase.",
      link: "#"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HeroSection />
      
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
              >
                Flota Noastră
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-gray-600 dark:text-gray-400"
              >
                Descoperă mașinile disponibile pentru închiriere
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="whitespace-nowrap"
            >
              <Link href="/rent" className="btn-primary">
                Vezi toate mașinile
              </Link>
            </motion.div>
          </div>

          {isLoadingCars ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : errorLoadingCars ? (
            <div className="text-center py-10 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <p className='font-medium'>Eroare la încărcare:</p>
              <p>{errorLoadingCars}</p>
            </div>
          ) : (
            <>
              {luxuryCars.length > 0 && (
                <div className="mb-12">
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-900/20 dark:to-blue-900/20 p-6 mb-6">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                    
                    <div className="relative">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                        <div className="flex items-center">
                          <svg className="w-6 h-6 text-purple-600 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15L8.5 9L5 15M12 15L15.5 9L19 15M12 15V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 18.5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 3V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Mașini Premium</h3>
                        </div>
                        <span className="mt-2 sm:mt-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
                          Confort & Lux
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                        Experimentează rafinamentul și performanța cu selecția noastră premium de mașini de lux, perfect pentru ocazii speciale.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Suspense fallback={<CardSkeleton />}>
                        {luxuryCars.map((car, index) => (
                          <motion.div
                            key={car.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <LazyPremiumCarCard car={car} index={index} />
                          </motion.div>
                        ))}
                      </Suspense>
                    </div>
                  </div>
                </div>
              )}
              
              {standardCars.length > 0 && (
                <div className="mt-12">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-blue-600 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 10L12 14L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Mașini Standard</h3>
                    </div>
                    <span className="mt-2 sm:mt-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                      Economice & Practice
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Soluții practice și economice pentru nevoile tale de transport de zi cu zi, cu costuri accesibile.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mb-12">
                    <Suspense fallback={<CardSkeleton />}>
                      {standardCars.map((car, index) => (
                        <motion.div
                          key={car.id}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { 
                              duration: 0.5, 
                              delay: index % 4 * 0.1, 
                              ease: [0.25, 0.1, 0.25, 1.0]
                            }
                          }}
                          viewport={{ once: true, margin: "-100px" }}
                        >
                          <LazyCarCard 
                            car={car}
                            index={index}
                          />
                        </motion.div>
                      ))}
                    </Suspense>
                  </div>
                </div>
              )}
              {!isLoadingCars && allCars.length === 0 && (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                  Momentan nu sunt mașini disponibile în baza de date.
                </div>
              )}
            </>
          )}
        </div>
      </section>
      
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Serviciile Noastre Premium
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Oferim o gamă completă de servicii pentru a satisface toate nevoile tale de transport și mobilitate
            </p>
          </motion.div>
          
          <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
          </div>}>
            <HoverEffect items={hoverServiceItems} />
          </Suspense>
        </div>
      </section>
      
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              De ce să alegi SmartCar?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Descoperă avantajele care ne diferențiază și ne recomandă ca partenerul tău de încredere
            </p>
          </motion.div>
          
          <BentoGrid className="mb-12">
            <BentoGridItem
              title="Calitate garantată"
              description="Toate vehiculele noastre sunt verificate riguros și întreținute la cele mai înalte standarde."
              icon={
                <div className="p-2 bg-green-100 rounded-full w-12 h-12 flex items-center justify-center dark:bg-green-900/20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              }
              className="md:col-span-1"
            />
            <BentoGridItem
              title="Prețuri competitive"
              description="Oferim cele mai bune prețuri de pe piață, fără costuri ascunse sau surprize neplăcute."
              icon={
                <div className="p-2 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center dark:bg-blue-900/20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                    <path d="M12 1V23M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              }
              className="md:col-span-2"
            />
            <BentoGridItem
              title="Servicii personalizate"
              description="Înțelegem că fiecare client are nevoi unice. Serviciile noastre sunt adaptate pentru a satisface aceste cerințe."
              icon={
                <div className="p-2 bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center dark:bg-purple-900/20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              }
              className="md:col-span-1 md:row-span-2"
            />
            <BentoGridItem
              title="Experiență vastă"
              description="Cu o experiență de peste 15 ani în domeniu, suntem încrezători că putem răspunde oricărei provocări."
              icon={
                <div className="p-2 bg-amber-100 rounded-full w-12 h-12 flex items-center justify-center dark:bg-amber-900/20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-600">
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              }
              className="md:col-span-2"
            />
            <BentoGridItem
              title="Suport 24/7"
              description="Echipa noastră este disponibilă oricând pentru a-ți răspunde întrebărilor și a-ți oferi asistență."
              icon={
                <div className="p-2 bg-red-100 rounded-full w-12 h-12 flex items-center justify-center dark:bg-red-900/20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-600">
                    <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              }
              className="md:col-span-1"
            />
          </BentoGrid>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Colecția noastră de Lux
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experimentează rafinamentul și performanța cu selecția noastră de mașini de lux
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {luxuryCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl shadow-lg"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <Image
                    src={car.imageUrl}
                    alt={`${car.brand} ${car.model}`}
                    width={600}
                    height={340}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{car.brand} {car.model}</h3>
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < car.rating ? 'text-yellow-400' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1 text-sm">({car.rating.toFixed(1)})</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">{car.description.substring(0, 80)}...</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-300">Preț de la</p>
                      <p className="text-xl font-bold">{car.pricePerDay} €<span className="text-sm font-normal">/zi</span></p>
                    </div>
                    <Link href={`/cars/${car.id}`} className="bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Vezi detalii
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/rent" className="btn-primary">
              Vezi toate mașinile de lux
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 dark:from-primary-900/30 dark:to-accent-900/30 rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Pregătit să pornești la drum?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                    Înregistrează-te astăzi și bucură-te de o experiență auto premium cu SmartCar. Beneficiază de oferte exclusive și reduceri pentru membrii.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link href="/register" className="btn-primary">
                      Creează un cont
                    </Link>
                    <Link href="/contact" className="btn-secondary">
                      Contactează-ne
                    </Link>
                  </div>
                </motion.div>
              </div>
              <div className="relative hidden lg:block">
                <Image
                  src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=2037&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Luxury Car Interior"
                  width={800}
                  height={500}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
