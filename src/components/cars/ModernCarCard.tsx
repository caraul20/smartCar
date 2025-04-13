'use client';

import { Car } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ModernCarCardProps {
  car: Car;
  variant: 'default' | 'elegant' | 'minimal';
  index?: number;
}

export default function ModernCarCard({ car, variant = 'default', index = 0 }: ModernCarCardProps) {
  // Format price with thousands separator
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Function to translate fuel type to Romanian
  const translateFuelType = (fuelType: string) => {
    switch (fuelType) {
      case 'gasoline': return 'Benzină';
      case 'diesel': return 'Motorină';
      case 'electric': return 'Electric';
      case 'hybrid': return 'Hibrid';
      default: return fuelType;
    }
  };

  // Calculate availability
  const today = new Date();
  const availableFrom = new Date(car.availableFrom);
  const availableTo = new Date(car.availableTo);
  const isAvailableNow = today >= availableFrom && today <= availableTo;

  // Determine color scheme based on car category
  const getColorScheme = () => {
    switch (car.category) {
      case 'economy': return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/30',
        text: 'text-emerald-700 dark:text-emerald-300',
        accent: 'bg-emerald-600',
        border: 'border-emerald-200 dark:border-emerald-800',
        hover: 'group-hover:border-emerald-300 dark:group-hover:border-emerald-700'
      };
      case 'compact': return {
        bg: 'bg-blue-50 dark:bg-blue-950/30',
        text: 'text-blue-700 dark:text-blue-300',
        accent: 'bg-blue-600',
        border: 'border-blue-200 dark:border-blue-800',
        hover: 'group-hover:border-blue-300 dark:group-hover:border-blue-700'
      };
      case 'suv': return {
        bg: 'bg-amber-50 dark:bg-amber-950/30',
        text: 'text-amber-700 dark:text-amber-300',
        accent: 'bg-amber-600',
        border: 'border-amber-200 dark:border-amber-800',
        hover: 'group-hover:border-amber-300 dark:group-hover:border-amber-700'
      };
      case 'luxury': return {
        bg: 'bg-purple-50 dark:bg-purple-950/30',
        text: 'text-purple-700 dark:text-purple-300',
        accent: 'bg-purple-600',
        border: 'border-purple-200 dark:border-purple-800',
        hover: 'group-hover:border-purple-300 dark:group-hover:border-purple-700'
      };
      default: return {
        bg: 'bg-gray-50 dark:bg-gray-900/30',
        text: 'text-gray-700 dark:text-gray-300',
        accent: 'bg-gray-600',
        border: 'border-gray-200 dark:border-gray-800',
        hover: 'group-hover:border-gray-300 dark:group-hover:border-gray-700'
      };
    }
  };

  const colors = getColorScheme();

  // Default modern card design
  if (variant === 'default') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className={cn(
          "group relative h-full overflow-hidden rounded-2xl border shadow-sm transition-all duration-300",
          colors.border,
          colors.hover,
          "hover:shadow-lg"
        )}
      >
        {/* Image container */}
        <div className="relative h-48 w-full overflow-hidden">
          {car.imageUrl ? (
            <>
              <Image 
                src={car.imageUrl} 
                alt={car.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60" />
            </>
          ) : (
            <div 
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: car.color || '#3B82F6' }}
            >
              <span className="text-5xl">🚗</span>
            </div>
          )}
          
          {/* Car category badge */}
          <div className="absolute top-4 left-4">
            <span className={`text-xs font-medium text-white px-2.5 py-1 rounded-full ${colors.accent}`}>
              {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
            </span>
          </div>
          
          {/* Price badge */}
          <div className="absolute top-4 right-4">
            <motion.div 
              className="flex items-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-md px-3 py-1.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-bold">{formatPrice(car.pricePerDay)}</span>
              <span className="text-xs ml-1 text-gray-500 dark:text-gray-400">RON/zi</span>
            </motion.div>
          </div>
          
          {/* Car title and rating */}
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="font-bold text-lg">{car.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-yellow-400">★</span>
              <span className="text-sm font-medium">{car.rating}</span>
            </div>
          </div>
        </div>
        
        {/* Card content */}
        <div className="p-4 bg-white dark:bg-gray-800">
          {/* Location */}
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {car.location}
          </div>
          
          {/* Main specs */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className={cn("flex items-center text-sm p-2 rounded-lg", colors.bg)}>
              <span className={cn("mr-2", colors.text)}>⛽</span>
              <span>{translateFuelType(car.fuelType)}</span>
            </div>
            <div className={cn("flex items-center text-sm p-2 rounded-lg", colors.bg)}>
              <span className={cn("mr-2", colors.text)}>{car.transmission === 'automatic' ? 'A' : 'M'}</span>
              <span>{car.transmission === 'automatic' ? 'Automată' : 'Manuală'}</span>
            </div>
            <div className={cn("flex items-center text-sm p-2 rounded-lg", colors.bg)}>
              <span className={cn("mr-2", colors.text)}>👤</span>
              <span>{car.seats} locuri</span>
            </div>
            <div className={cn("flex items-center text-sm p-2 rounded-lg", colors.bg)}>
              <span className={cn("mr-2", colors.text)}>🚪</span>
              <span>{car.doors} uși</span>
            </div>
          </div>
          
          {/* Availability status */}
          <div className={cn(
            "text-sm py-1.5 px-3 rounded-lg mb-4 flex items-center",
            isAvailableNow 
              ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300" 
              : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
          )}>
            <span className={cn(
              "w-2 h-2 rounded-full mr-2",
              isAvailableNow ? "bg-green-500" : "bg-red-500"
            )}></span>
            {isAvailableNow ? 'Disponibilă acum' : 'Indisponibilă momentan'}
          </div>

          {/* CTA Button */}
          <Link href={`/cars/${car.id}`}>
            <motion.button
              className={cn(
                "w-full py-2.5 text-white rounded-lg font-medium flex items-center justify-center",
                colors.accent
              )}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 8px 20px -6px rgba(0, 0, 0, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Vezi detalii
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  }

  // Elegant design variant
  if (variant === 'elegant') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="group h-full bg-white dark:bg-gray-800 overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
      >
        {/* Top section with image and gradient overlay */}
        <div className="relative h-56 overflow-hidden">
          {car.imageUrl ? (
            <>
              <Image 
                src={car.imageUrl} 
                alt={car.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" />
            </>
          ) : (
            <div 
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: car.color || '#3B82F6' }}
            >
              <span className="text-5xl">🚗</span>
            </div>
          )}
          
          {/* Car name and category overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-xl font-bold tracking-tight">{car.name}</h3>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1.5">★</span>
                <span className="text-sm">{car.rating}</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm">
                {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
              </span>
            </div>
          </div>
          
          {/* Price tag */}
          <div className="absolute top-4 right-4">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white text-sm font-semibold py-1 px-2 rounded-md shadow-sm">
              <div className="flex items-baseline">
                <span className="text-lg font-bold">{formatPrice(car.pricePerDay)}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">RON/zi</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content section */}
        <div className="p-5">
          {/* Location with icon */}
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5">
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{car.location}</span>
          </div>
          
          {/* Divider */}
          <div className="w-full h-px bg-gray-200 dark:bg-gray-700 mb-4"></div>
          
          {/* Car specifications in a clean layout */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <div className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1">Combustibil</div>
              <div className="font-medium">{translateFuelType(car.fuelType)}</div>
            </div>
            <div>
              <div className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1">Transmisie</div>
              <div className="font-medium">{car.transmission === 'automatic' ? 'Automată' : 'Manuală'}</div>
            </div>
            <div>
              <div className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1">Locuri</div>
              <div className="font-medium">{car.seats}</div>
            </div>
            <div>
              <div className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1">Uși</div>
              <div className="font-medium">{car.doors}</div>
            </div>
          </div>
          
          {/* Availability badge */}
          <div className={cn(
            "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full mb-4",
            isAvailableNow 
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
          )}>
            <span className={cn(
              "w-1.5 h-1.5 rounded-full mr-1.5",
              isAvailableNow ? "bg-green-500" : "bg-red-500"
            )}></span>
            {isAvailableNow ? 'Disponibilă' : 'Indisponibilă'}
          </div>
          
          {/* CTA button with hover effect */}
          <Link href={`/cars/${car.id}`}>
            <motion.button
              className={cn(
                "w-full py-3 rounded-xl font-medium flex items-center justify-center mt-2",
                "text-white",
                colors.accent,
                "relative overflow-hidden"
              )}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Vezi detalii</span>
              <motion.div 
                className="absolute inset-0 bg-black/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  }

  // Minimal design variant
  if (variant === 'minimal') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="group h-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
      >
        {/* Image with subtle shadow */}
        <div className="relative aspect-[4/3] rounded-t-xl overflow-hidden">
          {car.imageUrl ? (
            <Image 
              src={car.imageUrl} 
              alt={car.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
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
          
          {/* Price badge */}
          <div className="absolute right-3 top-3">
            <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-semibold py-1 px-2 rounded-md shadow-sm">
              {formatPrice(car.pricePerDay)} RON/zi
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {/* Title and rating */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{car.name}</h3>
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded px-1.5 py-0.5">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-xs font-medium">{car.rating}</span>
            </div>
          </div>
          
          {/* Location */}
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {car.location}
          </div>
          
          {/* Simple specs list */}
          <ul className="mb-4 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-center mb-1">
              <span className="font-medium mr-2">Combustibil:</span>
              <span>{translateFuelType(car.fuelType)}</span>
            </li>
            <li className="flex items-center mb-1">
              <span className="font-medium mr-2">Transmisie:</span>
              <span>{car.transmission === 'automatic' ? 'Automată' : 'Manuală'}</span>
            </li>
            <li className="flex items-center">
              <span className="font-medium mr-2">Capacitate:</span>
              <span>{car.seats} persoane, {car.doors} uși</span>
            </li>
          </ul>
          
          {/* Category tag and availability */}
          <div className="flex items-center justify-between mb-4">
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full font-medium",
              colors.bg, colors.text
            )}>
              {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
            </span>
            
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full font-medium",
              isAvailableNow
                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
            )}>
              {isAvailableNow ? 'Disponibilă' : 'Indisponibilă'}
            </span>
          </div>
          
          {/* Clean, understated CTA button */}
          <Link href={`/cars/${car.id}`}>
            <motion.button
              className={cn(
                "w-full text-center py-2 border rounded-lg transition-all duration-200 text-sm font-medium",
                "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              )}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Vezi detalii
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  }

  // Default fallback if no variant matches
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800">
      <h3 className="font-bold">{car.name}</h3>
      <p>Preț: {formatPrice(car.pricePerDay)} RON/zi</p>
      <Link href={`/cars/${car.id}`}>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
          Vezi detalii
        </button>
      </Link>
    </div>
  );
}
