'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import Image from 'next/image';
import { ContainerTextFlip } from './container-text-flip';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Închiriere', 'Cumpărare', 'Vânzare'];
  const [particles, setParticles] = useState<Array<{left: string, top: string, animX: number[], animY: number[], duration: number}>>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Generăm pozițiile particulelor doar pe partea de client pentru a evita erorile de hidratare
    const particlesData = Array(20).fill(0).map(() => {
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      const animX = [Math.random() * 100, Math.random() * 100 + 50, Math.random() * 100];
      const animY = [Math.random() * 100, Math.random() * 100 + 50, Math.random() * 100];
      const duration = 10 + Math.random() * 20;
      
      return { left, top, animX, animY, duration };
    });
    
    setParticles(particlesData);
  }, []);

  // Transformăm handleSearch în useCallback pentru a evita recrearea funcției la fiecare render
  const handleSearch = useCallback((query: string) => {
    console.log('Searching for:', query);
    // Implementare logică de căutare
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden min-h-[90vh] flex items-center">
      {/* Overlay cu pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Particule animate pentru efect de mișcare */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 md:w-2 md:h-2 bg-primary-500 rounded-full opacity-60"
              animate={{
                x: particle.animX,
                y: particle.animY,
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                left: particle.left,
                top: particle.top,
              }}
            />
          ))}
        </div>
      )}

      <div className="container-custom relative z-10 py-16 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mobile image - only visible on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:hidden relative order-1 mx-auto w-full max-w-sm mb-6"
          >
            <div className="relative h-[240px] w-full rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-b from-transparent to-gray-900/70 z-10"></div>
              <Image
                src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=2037&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Luxury Car"
                className="object-cover"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority
              />
              
              {/* Mobile Badge - smaller and positioned at the bottom right */}
              <motion.div
                className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg p-2 flex items-center z-20 backdrop-blur-sm"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-900 dark:text-white">Verificat 100%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Calitate garantată</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text și search */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wide text-white bg-primary-500 rounded-full uppercase">
                SmartCar - Servicii Auto Premium
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Găsește vehiculul{' '}
                <ContainerTextFlip 
                  words={[
                    { text: "perfect", className: "text-primary-500" },
                    { text: "ideal", className: "text-primary-500" },
                    { text: "potrivit", className: "text-primary-500" },
                    { text: "dorit", className: "text-primary-500" }
                  ]}
                  className="!shadow-none !bg-transparent"
                  cursorClassName="bg-primary-500"
                />{' '}
                pentru tine
              </h1>
              <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-8 max-w-lg">
                Platformă modernă pentru închirierea, cumpărarea și vânzarea de automobile. Experiență simplificată și prețuri competitive.
              </p>
            </motion.div>

            {/* Tabs de navigare - scrollable on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 overflow-x-auto hide-scrollbar"
            >
              <div className="inline-flex p-1 bg-gray-800/50 backdrop-blur-sm rounded-full whitespace-nowrap">
                {tabs.map((tab, index) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(index)}
                    className={`relative px-4 sm:px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
                      activeTab === index
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {activeTab === index && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute inset-0 bg-primary-500 rounded-full"
                        transition={{ duration: 0.3 }}
                        style={{ zIndex: -1 }}
                      />
                    )}
                    {tab}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Bară de căutare - full width on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full"
            >
              <SearchBar onSearch={handleSearch} />
            </motion.div>

            {/* Statistici - smaller on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 sm:mt-12 grid grid-cols-3 gap-2 sm:gap-4"
            >
              {[
                { value: '500+', label: 'Mașini disponibile' },
                { value: '10K+', label: 'Clienți mulțumiți' },
                { value: '24/7', label: 'Suport clienți' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Imagine hero - desktop only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="hidden lg:block relative order-2"
          >
            <div className="relative h-[500px] w-full">
              <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-br from-primary-500/30 to-accent-500/30 rounded-2xl transform rotate-3 blur-xl"></div>
              <Image
                src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=2037&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Luxury Car"
                className="rounded-2xl object-cover shadow-2xl transform hover:scale-105 transition-transform duration-700"
                fill
                sizes="(max-width: 1536px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                priority
              />
              
              {/* Badge-uri flotante */}
              <motion.div
                className="absolute -left-8 top-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 flex items-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Verificat 100%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Calitate garantată</div>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -right-8 bottom-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 flex items-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1 }}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Prețuri avantajoase</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Fără costuri ascunse</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Formă decorativă de val la bază */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto fill-gray-50 dark:fill-gray-900">
          <path d="M0,64L80,74.7C160,85,320,107,480,112C640,117,800,107,960,90.7C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
}

