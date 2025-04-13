'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function RentPage() {
  // State for featured rental cars
  const featuredCars = [
    {
      id: 1,
      name: 'Audi Q7',
      image: '/images/cars/audi-q7.jpg',
      pricePerDay: 75,
      category: 'SUV',
      features: ['5 Locuri', 'Automat', 'Diesel', 'GPS', 'Wi-Fi'],
    },
    {
      id: 2,
      name: 'BMW Seria 5',
      image: '/images/cars/bmw-5.jpg',
      pricePerDay: 65,
      category: 'Sedan',
      features: ['5 Locuri', 'Automat', 'Benzină', 'Scaune încălzite', 'Bluetooth'],
    },
    {
      id: 3,
      name: 'Mercedes C-Class',
      image: '/images/cars/mercedes-c.jpg',
      pricePerDay: 60,
      category: 'Sedan',
      features: ['5 Locuri', 'Automat', 'Benzină', 'Camera parcare', 'Control climă'],
    },
    {
      id: 4,
      name: 'Volkswagen Passat',
      image: '/images/cars/vw-passat.jpg',
      pricePerDay: 45,
      category: 'Sedan',
      features: ['5 Locuri', 'Manual', 'Diesel', 'Cruise control', 'Bluetooth'],
    },
  ];

  // State for filter options
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 200],
    features: [],
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-gray-900/60 z-10" />
          <Image
            src="/images/hero-rental.jpg"
            alt="Închiriere mașini premium"
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
              Închiriază Mașina Perfectă pentru Călătoria Ta
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Flota noastră de mașini premium îți oferă confort, siguranță și libertate. 
              De la sedanuri elegante la SUV-uri spațioase, găsești vehiculul ideal pentru orice nevoie.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link 
                href="#rental-cars" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg inline-flex items-center transition-colors duration-300"
              >
                Vezi Disponibilitatea
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cum Funcționează</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Procesul de închiriere simplu și rapid, în doar 3 pași, pentru a te ajuta să obții mașina perfectă în cel mai scurt timp.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Alege Mașina</h3>
              <p className="text-gray-600">
                Navighează prin flota noastră diversă și alege vehiculul care se potrivește nevoilor tale.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Rezervă Online</h3>
              <p className="text-gray-600">
                Completează formularul de rezervare, selectează perioada și opțiunile dorite.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ridică Mașina</h3>
              <p className="text-gray-600">
                Prezintă-te la locația aleasă, semnează contractul și preia cheile mașinii tale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Available Cars Section */}
      <section id="rental-cars" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mașini Disponibile pentru Închiriere</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explorează flota noastră de vehicule premium, întreținute impecabil și echipate cu cele mai noi tehnologii.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categorie</label>
                <select 
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="">Toate categoriile</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Cabrio">Cabrio</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preț pe zi</label>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">{filters.priceRange[0]}€</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="200" 
                    step="5"
                    className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)]})}
                  />
                  <span className="text-gray-600">{filters.priceRange[1]}€</span>
                </div>
              </div>
              
              <div className="md:text-right">
                <button className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 mt-6">
                  Aplică filtre
                </button>
              </div>
            </div>
          </div>

          {/* Car Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredCars.map((car) => (
              <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] duration-300">
                <div className="relative h-48">
                  <Image 
                    src={car.image} 
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                    {car.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{car.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">{car.pricePerDay}€<span className="text-sm text-gray-600 font-normal">/zi</span></span>
                    <div className="flex items-center text-yellow-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm font-semibold">4.8/5</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {car.features.map((feature, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Link 
                    href={`/cars/${car.id}`}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    Verifică Disponibilitatea
                  </Link>
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

      {/* Rental Benefits */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">De Ce Să Închiriezi Cu Noi</h2>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              Noi oferim nu doar mașini, ci o experiență completă de mobilitate, adaptată nevoilor tale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="bg-blue-700/50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Proces Rapid</h3>
              <p className="text-blue-100">
                Rezervare online simplă și preluare rapidă a mașinii, fără birocrație excesivă.
              </p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-blue-700/50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Siguranță</h3>
              <p className="text-blue-100">
                Toate mașinile sunt verificate tehnic și igienizate înainte de fiecare închiriere.
              </p>
            </div>
            
            {/* Benefit 3 */}
            <div className="bg-blue-700/50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparent</h3>
              <p className="text-blue-100">
                Prețuri clare, fără taxe ascunse și politică de combustibil echitabilă.
              </p>
            </div>
            
            {/* Benefit 4 */}
            <div className="bg-blue-700/50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Asistență 24/7</h3>
              <p className="text-blue-100">
                Serviciu de asistență rutieră și suport pentru clienți disponibil non-stop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Întrebări Frecvente</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Găsește răspunsuri la cele mai comune întrebări despre serviciile noastre de închiriere auto.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ce documente sunt necesare pentru închiriere?</h3>
              <p className="text-gray-600">
                Pentru a închiria o mașină, aveți nevoie de: permis de conducere valid (minim 1 an vechime), 
                carte de identitate sau pașaport, și un card de credit pentru garanție. Pentru anumite categorii 
                de mașini, pot exista cerințe suplimentare de vârstă sau experiență.
              </p>
            </div>
            
            {/* FAQ Item 2 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Este inclusă asigurarea în prețul închirierii?</h3>
              <p className="text-gray-600">
                Da, toate mașinile noastre vin cu asigurare RCA și CASCO de bază inclusă în preț. Opțional, 
                puteți adăuga pachete de asigurare premium care reduc sau elimină complet franșiza în caz de daune.
              </p>
            </div>
            
            {/* FAQ Item 3 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pot călători în străinătate cu mașina închiriată?</h3>
              <p className="text-gray-600">
                Da, călătoria în străinătate este permisă în majoritatea țărilor UE, dar trebuie să ne informați 
                în prealabil. Se aplică o taxă suplimentară pentru asigurarea transfrontalieră și veți primi documentele 
                necesare pentru călătorie.
              </p>
            </div>
            
            {/* FAQ Item 4 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ce se întâmplă dacă returnez mașina mai devreme sau mai târziu?</h3>
              <p className="text-gray-600">
                Dacă returnați mașina mai devreme, tarifarea se face pentru perioada efectiv utilizată, dar poate exista o 
                taxă de modificare a contractului. Pentru returnarea cu întârziere, se aplică taxe suplimentare pentru fiecare 
                oră/zi de întârziere, conform contractului.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Gata să pornești în călătorie?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Rezervă acum și beneficiază de 10% reducere la prima ta închiriere!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="#rental-cars"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Vezi Mașinile Disponibile
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Contactează-ne
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 