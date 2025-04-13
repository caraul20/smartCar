'use client';

import Image from 'next/image';
import { Car } from '@/lib/types';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CarCardProps {
  car: Car;
  index?: number;
}

export default function CarCard({ car, index = 0 }: CarCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Calculăm disponibilitatea mașinii
  const today = new Date();
  const availableFrom = new Date(car.availableFrom);
  const availableTo = new Date(car.availableTo);
  
  const isAvailableNow = today >= availableFrom && today <= availableTo;
  
  // Funcție pentru a formata prețul cu separatori de mii
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Calculează rating-ul sub formă de stele
  const renderRatingStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 mr-0.5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      ));
  };

  // Obține textul român pentru tipul de combustibil
  const getFuelTypeText = (fuelType: string) => {
    switch (fuelType) {
      case 'electric':
        return 'Electric';
      case 'hybrid':
        return 'Hibrid';
      case 'gasoline':
        return 'Benzină';
      case 'diesel':
        return 'Diesel';
      default:
        return fuelType;
    }
  };

  // Obține textul română pentru tipul de transmisie
  const getTransmissionText = (transmission: string) => {
    return transmission === 'automatic' ? 'Automată' : 'Manuală';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <>
      <div className="h-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: [0.25, 0.1, 0.25, 1.0] 
          }}
          className="h-full"
        >
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative bg-white dark:bg-gray-800 h-full rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
          >
            {/* Spotlight effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 rounded-2xl transition duration-300"
              style={{
                opacity,
                background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
              }}
            />
            
            {/* Imagine mașină cu efect la hover */}
            <div className="relative aspect-[16/10] overflow-hidden">
              {car.imageUrl && !imageError ? (
                <Image 
                  src={car.imageUrl} 
                  alt={car.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  onError={() => setImageError(true)}
                  priority
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: car.color || '#3B82F6' }}
                >
                  <span className="text-5xl">🚗</span>
                </div>
              )}
              
              {/* Gradient overlay pentru textul de pe imagine */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
              
              {/* Badge disponibilitate */}
              {isAvailableNow && (
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                  <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-green-500 text-white shadow-lg">
                    <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 mr-1 sm:mr-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white"></span>
                    </span>
                    Disponibil
                  </span>
                </div>
              )}
              
              {/* Badge categorie */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                <span className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-medium shadow-lg
                  ${car.category === 'luxury' ? 'bg-purple-500 text-white' : 
                    car.category === 'suv' ? 'bg-orange-500 text-white' : 
                    car.category === 'compact' ? 'bg-blue-500 text-white' : 
                    'bg-green-500 text-white'}`
                }>
                  {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
                </span>
              </div>
            </div>

            {/* Card content */}
            <div className="p-2 sm:p-5">
              <div className="flex justify-between items-start mb-2 sm:mb-3">
                <h3 className="text-sm sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-1">{car.name}</h3>
                <div className="flex items-center">
                  <div className="hidden sm:flex space-x-0.5">
                    {renderRatingStars(car.rating)}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 ml-1.5">
                    {car.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              
              {/* Specificații principale */}
              <div className="grid grid-cols-2 gap-1 sm:gap-4 mb-2 sm:mb-4">
                <div className="flex items-center">
                  <div className="w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 mr-1 sm:mr-3">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600 dark:text-blue-400 w-3 h-3 sm:w-4 sm:h-4">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Combustibil</p>
                    <p className="text-[11px] sm:text-sm font-medium text-gray-900 dark:text-white">{getFuelTypeText(car.fuelType)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 mr-1 sm:mr-3">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600 dark:text-purple-400 w-3 h-3 sm:w-4 sm:h-4">
                      <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="2.5" />
                      <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="2.5" />
                      <path d="M8 12H16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Transmisie</p>
                    <p className="text-[11px] sm:text-sm font-medium text-gray-900 dark:text-white">{getTransmissionText(car.transmission)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 mr-1 sm:mr-3">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-600 dark:text-amber-400 w-3 h-3 sm:w-4 sm:h-4">
                      <path d="M19 19H5V5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M19 5L5 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">An</p>
                    <p className="text-[11px] sm:text-sm font-medium text-gray-900 dark:text-white">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mr-1 sm:mr-3">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600 dark:text-green-400 w-3 h-3 sm:w-4 sm:h-4">
                      <path d="M12 2L6.5 12.5H17.5L12 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Locație</p>
                    <p className="text-[11px] sm:text-sm font-medium text-gray-900 dark:text-white">{car.location}</p>
                  </div>
                </div>
              </div>
              
              {/* Preț și CTA */}
              <div className="flex justify-between items-center mt-2 sm:mt-6">
                <div>
                  {/* Conditional Price Display */}
                  {car.originalPricePerDay && car.originalPricePerDay > car.pricePerDay ? (
                    <>
                       <span className="text-[10px] sm:text-xs text-red-500 line-through block">
                         {formatPrice(car.originalPricePerDay)} €
                       </span>
                       <div className="flex items-baseline">
                         <span className="text-base sm:text-2xl font-bold text-gray-900 dark:text-white">
                           {formatPrice(car.pricePerDay)} €
                         </span>
                         <span className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 ml-1">/zi</span>
                         {/* Calculate and display discount percentage */}
                         <span className="ml-2 px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-[9px] sm:text-xs font-semibold">
                             -{Math.round(((car.originalPricePerDay - car.pricePerDay) / car.originalPricePerDay) * 100)}%
                         </span>
                       </div>
                    </>
                  ) : (
                    <>
                       <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Preț de la</span>
                       <div className="flex items-baseline">
                        <span className="text-base sm:text-2xl font-bold text-gray-900 dark:text-white">
                          {formatPrice(car.pricePerDay)} €
                        </span>
                        <span className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 ml-1">/zi</span>
                       </div>
                    </>
                  )}
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsModalOpen(true);
                  }}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <span className="inline-flex items-center text-blue-600 dark:text-blue-400 text-[11px] sm:text-sm font-medium">
                    Vezi detalii
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            
            {/* Modal Content */}
            <div className="fixed inset-0 flex items-center justify-center z-[110] pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-y-auto pointer-events-auto w-[95%] sm:w-[85%] md:w-[90%] max-w-[600px] md:max-w-[1200px] max-h-[90vh] sm:max-h-[85vh] mx-auto my-auto border border-white/30 dark:border-gray-700/30"
                style={{
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)"
                }}
              >
                {/* Modal Header */}
                <div className="relative p-4 sm:p-6 border-b border-white/20 dark:border-gray-700/30 bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-700/50 dark:to-gray-800/30">
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white pr-8">{car.name}</h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 hover:bg-white/30 dark:hover:bg-gray-700/30 rounded-full transition-colors backdrop-blur-sm"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-4 sm:p-6 bg-gradient-to-b from-white/5 to-white/20 dark:from-gray-800/5 dark:to-gray-800/20">
                  {/* Car Image */}
                  <div className="relative aspect-video sm:aspect-[21/9] rounded-lg sm:rounded-xl overflow-hidden mb-4 sm:mb-6">
                    <Image
                      src={car.imageUrl}
                      alt={car.name}
                      fill
                      className="object-cover"
                      priority
                    />
                    
                    {/* Badge categorie on image */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shadow-lg
                        ${car.category === 'luxury' ? 'bg-purple-500 text-white' : 
                          car.category === 'suv' ? 'bg-orange-500 text-white' : 
                          car.category === 'compact' ? 'bg-blue-500 text-white' : 
                          'bg-green-500 text-white'}`
                      }>
                        {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
                      </span>
                    </div>
                    
                    {/* Availability badge on image */}
                    {isAvailableNow && (
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500 text-white shadow-lg">
                          <span className="relative flex h-2 w-2 mr-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                          </span>
                          Disponibil
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Car Details with improved layout and icons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    {/* Left column */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Specificații Tehnice
                      </h4>
                      
                      <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
                        <ul className="divide-y divide-gray-200/30 dark:divide-gray-700/30">
                          <li className="flex items-center p-3 hover:bg-white/10 dark:hover:bg-gray-800/10 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                              <line x1="16" y1="2" x2="16" y2="6"></line>
                              <line x1="8" y1="2" x2="8" y2="6"></line>
                              <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            <span className="text-gray-600 dark:text-gray-400 w-24">An fabricație:</span>
                            <span className="text-gray-900 dark:text-white font-medium ml-auto">{car.year}</span>
                          </li>
                          <li className="flex items-center p-3 hover:bg-white/10 dark:hover:bg-gray-800/10 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M19 17H5a3 3 0 0 1-3-3V8h20v6a3 3 0 0 1-3 3Z"></path>
                              <path d="M6 17v3h4v-3"></path>
                              <path d="M14 17v3h4v-3"></path>
                              <path d="M5 8V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"></path>
                              <path d="M8 14v-3"></path>
                              <path d="M16 14v-3"></path>
                            </svg>
                            <span className="text-gray-600 dark:text-gray-400 w-24">Transmisie:</span>
                            <span className="text-gray-900 dark:text-white font-medium ml-auto">{getTransmissionText(car.transmission)}</span>
                          </li>
                          <li className="flex items-center p-3 hover:bg-white/10 dark:hover:bg-gray-800/10 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
                            </svg>
                            <span className="text-gray-600 dark:text-gray-400 w-24">Combustibil:</span>
                            <span className="text-gray-900 dark:text-white font-medium ml-auto">{getFuelTypeText(car.fuelType)}</span>
                          </li>
                          <li className="flex items-center p-3 hover:bg-white/10 dark:hover:bg-gray-800/10 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span className="text-gray-600 dark:text-gray-400 w-24">Locație:</span>
                            <span className="text-gray-900 dark:text-white font-medium ml-auto">{car.location}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* Right column */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Prețuri și Disponibilitate
                      </h4>
                      
                      <div className="grid grid-cols-1 gap-4">
                        {/* Pricing Card */}
                        <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
                          <ul className="divide-y divide-gray-200/30 dark:divide-gray-700/30">
                            <li className="flex items-center p-3 hover:bg-white/10 dark:hover:bg-gray-800/10 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                              <span className="text-gray-600 dark:text-gray-400 w-24">Pe zi:</span>
                              <span className="text-gray-900 dark:text-white font-medium ml-auto">{formatPrice(car.pricePerDay)} €</span>
                            </li>
                            <li className="flex items-center p-3 hover:bg-white/10 dark:hover:bg-gray-800/10 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                              </svg>
                              <span className="text-gray-600 dark:text-gray-400 w-24">Pe săptămână:</span>
                              <span className="text-gray-900 dark:text-white font-medium ml-auto">{formatPrice(car.pricePerWeek)} €</span>
                            </li>
                            <li className="flex items-center p-3 hover:bg-white/10 dark:hover:bg-gray-800/10 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 16V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12"></path>
                                <path d="M6 12v8"></path>
                                <path d="M18 12v8"></path>
                                <path d="M2 12h20"></path>
                                <path d="M2 20h20"></path>
                              </svg>
                              <span className="text-gray-600 dark:text-gray-400 w-24">Pe lună:</span>
                              <span className="text-gray-900 dark:text-white font-medium ml-auto">{formatPrice(car.pricePerMonth)} €</span>
                            </li>
                          </ul>
                        </div>
                        
                        {/* Rating & Availability Card */}
                        <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 p-4">
                          <div className="flex items-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <span className="font-medium text-gray-800 dark:text-gray-200">Rating:</span>
                            <div className="flex items-center ml-auto">
                              <div className="flex space-x-1">
                                {renderRatingStars(car.rating)}
                              </div>
                              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                {car.rating.toFixed(1)} / 5
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            {isAvailableNow ? (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                                <span className="text-green-600 dark:text-green-400 font-medium">Disponibil acum pentru închiriere</span>
                              </>
                            ) : (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <line x1="12" y1="8" x2="12" y2="12"></line>
                                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                                <span className="text-amber-600 dark:text-amber-400 font-medium">Indisponibil momentan</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features section */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Caracteristici Principale
                    </h4>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm rounded-lg p-3 flex items-center border border-white/10 dark:border-gray-700/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-sm text-gray-800 dark:text-gray-200">Aer condiționat</span>
                      </div>
                      <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm rounded-lg p-3 flex items-center border border-white/10 dark:border-gray-700/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="text-sm text-gray-800 dark:text-gray-200">GPS</span>
                      </div>
                      <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm rounded-lg p-3 flex items-center border border-white/10 dark:border-gray-700/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <span className="text-sm text-gray-800 dark:text-gray-200">Bluetooth</span>
                      </div>
                      <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm rounded-lg p-3 flex items-center border border-white/10 dark:border-gray-700/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        <span className="text-sm text-gray-800 dark:text-gray-200">Audio Premium</span>
                      </div>
                      <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm rounded-lg p-3 flex items-center border border-white/10 dark:border-gray-700/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-sm text-gray-800 dark:text-gray-200">5 Locuri</span>
                      </div>
                      <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm rounded-lg p-3 flex items-center border border-white/10 dark:border-gray-700/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <span className="text-sm text-gray-800 dark:text-gray-200">Carburant inclus</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Link
                      // Corrected href to use dynamic car ID
                      href={`/cars/${car.id}`}
                      className="flex-1 block bg-blue-600/90 hover:bg-blue-700/90 backdrop-blur-sm text-white font-medium py-3 px-4 rounded-lg text-center transition-all shadow-lg hover:shadow-xl border border-blue-500/30 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                      Vezi pagina completă
                    </Link>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 block bg-white/20 hover:bg-white/30 dark:bg-gray-700/20 dark:hover:bg-gray-700/30 backdrop-blur-sm text-gray-800 dark:text-white font-medium py-3 px-4 rounded-lg text-center transition-all shadow-md hover:shadow-lg border border-gray-200/30 dark:border-gray-600/30 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                      Închide fereastra
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
