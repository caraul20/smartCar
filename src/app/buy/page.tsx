'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function BuyPage() {
  // Sample car data
  const cars = [
    {
      id: 1,
      name: 'Audi A4 2021',
      image: '/images/cars/audi-a4.jpg',
      price: 31500,
      mileage: 15000,
      year: 2021,
      fuelType: 'Diesel',
      transmission: 'Automată',
      features: ['Navigație', 'Cameră 360°', 'Scaune încălzite', 'Faruri LED'],
    },
    {
      id: 2,
      name: 'BMW X3 2020',
      image: '/images/cars/bmw-x3.jpg',
      price: 35800,
      mileage: 22000,
      year: 2020,
      fuelType: 'Benzină',
      transmission: 'Automată',
      features: ['Tracțiune integrală', 'Head-up display', 'Plafon panoramic', 'Asistent parcare'],
    },
    {
      id: 3,
      name: 'Mercedes GLC 2019',
      image: '/images/cars/mercedes-glc.jpg',
      price: 33200,
      mileage: 31000,
      year: 2019,
      fuelType: 'Diesel',
      transmission: 'Automată',
      features: ['Suspensie pneumatică', 'Ambient lighting', 'Volan încălzit', 'Pilot automat'],
    },
    {
      id: 4,
      name: 'Volkswagen Golf 8 2022',
      image: '/images/cars/vw-golf.jpg',
      price: 24500,
      mileage: 8000,
      year: 2022,
      fuelType: 'Benzină',
      transmission: 'Manuală',
      features: ['Apple CarPlay', 'Android Auto', 'LED Matrix', 'Lane Assist'],
    },
  ];

  // Filters state
  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    year: '',
    fuelType: '',
    transmission: '',
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-blue-900/60 z-10" />
          <Image
            src="/images/hero-buy.jpg"
            alt="Mașini de vânzare"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Mașini Verificate pentru Fiecare Buget
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Descoperă selecția noastră de mașini second-hand premium, verificate tehnic și cu istoric complet. 
              Garanție și finanțare disponibile pentru toate modelele.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link 
                href="#cars-for-sale" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg inline-flex items-center transition-colors duration-300"
              >
                Vezi Mașinile Disponibile
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Buy From Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">De Ce Să Cumperi de la Noi</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Când achiziționezi o mașină de la SmartCar, beneficiezi de transparență, calitate și servicii post-vânzare de excepție.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verificare Riguroasă</h3>
              <p className="text-gray-600">
                Fiecare mașină trece prin 100+ puncte de verificare tehnică înainte de a fi listată.
              </p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Garanție Extinsă</h3>
              <p className="text-gray-600">
                Oferim minim 12 luni garanție pentru motor, cutie de viteze și componente majore.
              </p>
            </div>
            
            {/* Benefit 3 */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Finanțare Facilă</h3>
              <p className="text-gray-600">
                Acces la soluții de finanțare personalizate, cu dobânzi avantajoase.
              </p>
            </div>
            
            {/* Benefit 4 */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Istoric Transparent</h3>
              <p className="text-gray-600">
                Istoric complet al mașinii, inclusiv service, accidente și kilometraj verificat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cars for Sale Section */}
      <section id="cars-for-sale" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mașini Disponibile pentru Vânzare</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explorează selecția noastră de mașini second-hand premium, toate verificate și pregătite pentru livrare imediată.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Buget (€)</label>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">{filters.priceRange[0].toLocaleString()}</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="50000" 
                    step="1000"
                    className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)]})}
                  />
                  <span className="text-gray-600">{filters.priceRange[1].toLocaleString()}</span>
                </div>
              </div>
              
              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">An fabricație</label>
                <select 
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.year}
                  onChange={(e) => setFilters({...filters, year: e.target.value})}
                >
                  <option value="">Toți anii</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                </select>
              </div>
              
              {/* Fuel Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Combustibil</label>
                <select 
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.fuelType}
                  onChange={(e) => setFilters({...filters, fuelType: e.target.value})}
                >
                  <option value="">Toate tipurile</option>
                  <option value="Benzină">Benzină</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              
              {/* Apply Filters Button */}
              <div className="flex items-end">
                <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300">
                  Aplică Filtrele
                </button>
              </div>
            </div>
          </div>

          {/* Car Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] duration-300">
                <div className="relative h-56">
                  <Image 
                    src={car.image} 
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 text-sm font-bold rounded-full">
                    {car.year}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{car.name}</h3>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-blue-600">{car.price.toLocaleString()} €</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {car.mileage.toLocaleString()} km
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      {car.fuelType}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" />
                      </svg>
                      {car.transmission}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {car.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {feature}
                      </span>
                    ))}
                    {car.features.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        +{car.features.length - 3} mai multe
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Link 
                      href={`/cars/${car.id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-2 px-4 rounded-md transition-colors duration-300"
                    >
                      Detalii
                    </Link>
                    <button 
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                      aria-label="Save to favorites"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* View More Button */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center justify-center py-3 px-6 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300">
              Încarcă mai multe
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v10.586l-3.293-3.293a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L11 14.586V4a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Opțiuni de Finanțare</h2>
              <p className="text-lg text-blue-100 max-w-3xl mx-auto">
                Colaborăm cu instituții financiare de top pentru a-ți oferi cele mai bune rate și condiții.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Option 1 */}
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">7.9%</div>
                  <h3 className="text-xl font-semibold mb-4">Dobândă Standard</h3>
                  <p className="text-blue-100">
                    Pentru creditele pe 5 ani, cu un avans minim de 15% din valoarea mașinii.
                  </p>
                </div>
                
                {/* Option 2 */}
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">0%</div>
                  <h3 className="text-xl font-semibold mb-4">Leasing Promoțional</h3>
                  <p className="text-blue-100">
                    Zero dobândă pentru primele 12 luni pe anumite modele selectate.
                  </p>
                </div>
                
                {/* Option 3 */}
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">3-7</div>
                  <h3 className="text-xl font-semibold mb-4">Ani Finanțare</h3>
                  <p className="text-blue-100">
                    Flexibilitate în alegerea perioadei de finanțare, pentru rate adaptate bugetului tău.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Link 
                  href="/financing" 
                  className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
                >
                  Calculator Finanțare
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-xl">
            <div className="md:flex">
              <div className="md:flex-1 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-white mb-4">Nu ai găsit ce cauți?</h2>
                <p className="text-gray-300 mb-6">
                  Spune-ne ce mașină dorești și noi o vom găsi pentru tine. 
                  Serviciul nostru de căutare personalizată este gratuit și fără obligații.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <Link 
                    href="/contact" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                  >
                    Contactează-ne
                  </Link>
                  <Link 
                    href="/car-finder" 
                    className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                  >
                    Car Finder
                  </Link>
                </div>
              </div>
              <div className="md:flex-1 relative min-h-[300px]">
                <Image 
                  src="/images/car-finder.jpg" 
                  alt="Car Finder Service" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 