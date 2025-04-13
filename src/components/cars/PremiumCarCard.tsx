'use client';

import { Car } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Definiția pentru o stea
interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
}

// Generează stele aleatorii
const generateStars = (count: number): Star[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.7 + 0.3,
    delay: Math.random() * 2,
  }));
};

interface PremiumCarCardProps {
  car: Car;
  index?: number;
}

export default function PremiumCarCard({ car, index = 0 }: PremiumCarCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Generăm 20 de stele pentru efectul de fundal
  const stars = generateStars(20);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  // Funcție pentru formatarea prețurilor
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ro-RO').format(price);
  };

  return (
    <Link href={`/cars/${car.id}`}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative group overflow-hidden rounded-3xl h-full"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-90"></div>
        
        {/* Stars background */}
        <div className="absolute inset-0 overflow-hidden">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
              }}
              animate={{
                opacity: [star.opacity, star.opacity * 1.5, star.opacity],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + star.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        {/* Moving light effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            background: isHovering ? 
              `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 50%)` : 
              "none"
          }}
        />

        {/* Content */}
        <div className="relative p-6 md:p-8 flex flex-col h-full z-10">
          {/* Badge */}
          <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white border border-white/20">
            Premium
          </div>
          
          {/* Car Name */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{car.name}</h3>
          
          {/* Car Details */}
          <div className="grid grid-cols-2 gap-4 mb-6 mt-4">
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs text-gray-300">An</p>
                <p className="text-sm font-medium text-white">{car.year}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 11L12 4M19 11L12 4M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs text-gray-300">Transmisie</p>
                <p className="text-sm font-medium text-white">
                  {car.transmission === 'automatic' ? 'Automată' : 'Manuală'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Car Image */}
          <div className="relative rounded-xl overflow-hidden aspect-[16/9] mt-auto mb-6">
            {car.imageUrl && !imageError ? (
              <Image 
                src={car.imageUrl}
                alt={car.name}
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                onError={() => setImageError(true)}
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
          
          {/* Price and CTA */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Preț de la</p>
              <p className="text-2xl font-bold text-white">{formatPrice(car.pricePerDay)} <span className="text-sm font-normal">€/zi</span></p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white font-medium"
            >
              Vezi detalii
            </motion.div>
          </div>
        </div>
        
        {/* Glass reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </motion.div>
    </Link>
  );
} 