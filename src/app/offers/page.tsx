'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function OffersPage() {
  // Sample offers data
  const offers = [
    {
      id: 1,
      title: 'Weekend Special',
      description: 'Închiriază pentru un weekend și primești 20% reducere la prețul standard.',
      image: '/images/offers/weekend-special.jpg',
      category: 'Închiriere',
      validUntil: '30 Iunie 2023',
      discount: '20%',
      code: 'WEEKEND20',
    },
    {
      id: 2,
      title: 'Ofertă de Primăvară',
      description: 'Reducere de 15% la toate mașinile disponibile pentru vânzare din stoc.',
      image: '/images/offers/spring-sale.jpg',
      category: 'Vânzare',
      validUntil: '15 Mai 2023',
      discount: '15%',
      code: 'SPRING15',
    },
    {
      id: 3,
      title: 'Loyalty Program',
      description: 'Clienții fideli primesc 10% discount pentru a doua închiriere și beneficii extra.',
      image: '/images/offers/loyalty.jpg',
      category: 'Închiriere',
      validUntil: 'Permanent',
      discount: '10%',
      code: 'LOYAL10',
    },
    {
      id: 4,
      title: 'First-Time Buyer',
      description: 'Primii cumpărători beneficiază de un pachet de service gratuit timp de 1 an.',
      image: '/images/offers/first-time.jpg',
      category: 'Vânzare',
      validUntil: '31 Decembrie 2023',
      discount: 'Service gratuit',
      code: 'FIRST2023',
    },
    {
      id: 5,
      title: 'Corporate Package',
      description: 'Flote de mașini pentru companii cu discount de până la 25% și administrare inclusă.',
      image: '/images/offers/corporate.jpg',
      category: 'Corporate',
      validUntil: 'Permanent',
      discount: 'Până la 25%',
      code: 'CORP25',
    },
    {
      id: 6,
      title: 'Long-Term Rental',
      description: 'Închirieri pe termen lung (3+ luni) cu reducere progresivă de până la 30%.',
      image: '/images/offers/long-term.jpg',
      category: 'Închiriere',
      validUntil: 'Permanent',
      discount: 'Până la 30%',
      code: 'LONG30',
    },
  ];

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState('');

  // Filtered offers
  const filteredOffers = selectedCategory 
    ? offers.filter(offer => offer.category === selectedCategory)
    : offers;

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/60 z-10" />
          <Image
            src="/images/offers-hero.jpg"
            alt="Oferte Speciale"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <motion.div 
            className="max-w-3xl text-center mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Oferte Speciale
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8">
              Descoperă cele mai recente reduceri și promoții pentru închirierea și achiziția de mașini.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setSelectedCategory('')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                selectedCategory === '' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Toate Ofertele
            </button>
            <button 
              onClick={() => setSelectedCategory('Închiriere')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                selectedCategory === 'Închiriere' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Închirieri
            </button>
            <button 
              onClick={() => setSelectedCategory('Vânzare')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                selectedCategory === 'Vânzare' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Vânzări
            </button>
            <button 
              onClick={() => setSelectedCategory('Corporate')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                selectedCategory === 'Corporate' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Corporate
            </button>
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredOffers.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-600">Nu există oferte în această categorie momentan.</h3>
              <p className="mt-4 text-gray-500">Te rugăm să revii mai târziu sau să selectezi altă categorie.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredOffers.map((offer) => (
                <div 
                  key={offer.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:scale-[1.02] duration-300"
                >
                  <div className="relative h-56">
                    <Image 
                      src={offer.image} 
                      alt={offer.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-0 left-0 p-4 w-full flex justify-between items-center">
                      <span className="bg-blue-600 text-white px-3 py-1 text-sm font-semibold rounded-full">
                        {offer.category}
                      </span>
                      <span className="bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded-full">
                        {offer.discount}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                    <p className="text-gray-600 mb-4">{offer.description}</p>
                    
                    <div className="flex justify-between items-center text-gray-500 text-sm mb-4">
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" />
                        </svg>
                        Cod: <span className="font-semibold text-blue-600 ml-1">{offer.code}</span>
                      </span>
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Valid până la: {offer.validUntil}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Link 
                        href={`/offers/${offer.id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Detalii
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300">
                        Aplică Acum
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Offer Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ofertă Specială de Sezon</h2>
              <p className="text-xl mb-6">
                Închiriază orice mașină premium pentru 7 zile și primești 3 zile în plus GRATUIT!
              </p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Validă pentru toate categoriile de mașini</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Asigurare completă inclusă</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Kilometraj nelimitat</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ofertă disponibilă până pe 31 August 2023</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link 
                  href="/rent"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-300 text-center"
                >
                  Vezi Mașinile Disponibile
                </Link>
                <div className="flex items-center bg-white/20 rounded-lg px-4 py-3">
                  <span className="mr-2 font-semibold">Cod promoțional:</span>
                  <span className="bg-white text-blue-600 px-3 py-1 rounded font-bold">SUMMER10</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/offers/featured-offer.jpg"
                alt="Summer Special Offer"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nu Rata Nicio Ofertă!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Abonează-te la newsletter-ul nostru pentru a primi notificări despre ofertele exclusive și promoțiile viitoare.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Adresa ta de email" 
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300">
                Abonează-te
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Ne pasă de datele tale și nu vom trimite spam. Dezabonarea este posibilă în orice moment.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Întrebări Frecvente despre Oferte</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Găsește răspunsuri la cele mai comune întrebări despre ofertele și promoțiile noastre.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cum pot aplica un cod promoțional?</h3>
              <p className="text-gray-600">
                Poți aplica un cod promoțional în timpul procesului de rezervare sau achiziție. 
                Există un câmp dedicat pentru introducerea codului înainte de finalizarea plății.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pot cumula mai multe oferte?</h3>
              <p className="text-gray-600">
                În general, ofertele nu pot fi cumulate sau combinate cu alte promoții în curs. 
                Fiecare ofertă are termeni și condiții specifice, care sunt detaliate în pagina ofertei.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Oferta este valabilă pentru toate modelele de mașini?</h3>
              <p className="text-gray-600">
                Fiecare ofertă specifică modelele de mașini eligibile sau restricțiile aplicabile. 
                Verifică întotdeauna detaliile ofertei pentru a te asigura că modelul dorit este inclus.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ce se întâmplă dacă oferta expiră în timpul rezervării mele?</h3>
              <p className="text-gray-600">
                Oferta se aplică conform datei la care s-a făcut rezervarea sau achiziția, nu în funcție de perioada de utilizare. 
                Dacă oferta este valabilă în momentul rezervării, beneficiile vor fi aplicate pentru întreaga perioadă rezervată.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 