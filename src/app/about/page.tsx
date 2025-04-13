'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  // Team members data
  const teamMembers = [
    {
      name: 'Alexandru Popescu',
      role: 'CEO & Fondator',
      image: '/images/team/alex-popescu.jpg',
      bio: 'Cu peste 15 ani de experiență în industria auto, Alexandru a fondat SmartCar cu viziunea de a transforma modul în care oamenii închiriază și cumpără mașini în România.',
    },
    {
      name: 'Maria Ionescu',
      role: 'Director Operațiuni',
      image: '/images/team/maria-ionescu.jpg',
      bio: 'Maria coordonează toate operațiunile companiei, asigurându-se că fiecare client primește servicii de cea mai înaltă calitate și o experiență impecabilă.',
    },
    {
      name: 'Andrei Dumitrescu',
      role: 'Director Tehnic',
      image: '/images/team/andrei-dumitrescu.jpg',
      bio: 'Cu experiență vastă în inginerie auto, Andrei supraveghează toate aspectele tehnice, de la inspecția vehiculelor până la implementarea noilor tehnologii.',
    },
    {
      name: 'Elena Stanciu',
      role: 'Manager Marketing',
      image: '/images/team/elena-stanciu.jpg',
      bio: 'Elena dezvoltă strategiile de marketing și comunicare, ajutând SmartCar să devină un nume de referință în industria auto din România.',
    },
  ];

  // Company statistics
  const stats = [
    { value: '10+', label: 'Ani de Experiență' },
    { value: '5000+', label: 'Clienți Mulțumiți' },
    { value: '350+', label: 'Vehicule în Flotă' },
    { value: '12', label: 'Locații în România' },
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "SmartCar mi-a oferit cea mai bună experiență de închiriere auto. Mașina era impecabilă, iar procesul a fost rapid și fără complicații.",
      author: "Mihai Radu",
      company: "Director Executiv, TechSolutions",
    },
    {
      quote: "Am cumpărat o mașină second-hand de la SmartCar și am fost impresionată de transparența și profesionalismul echipei. Recomand cu încredere!",
      author: "Ana Marin",
      company: "Antreprenor",
    },
    {
      quote: "Serviciul de asistență 24/7 a fost un salvator când am avut nevoie de ajutor în timpul unei călătorii. Echipa a răspuns prompt și eficient.",
      author: "George Popa",
      company: "Manager Regional, GlobalRetail",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-blue-900/70 z-10" />
          <Image
            src="/images/about-hero.jpg"
            alt="Despre SmartCar"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Despre Noi
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8">
              SmartCar este liderul pieței de închirieri și vânzări auto din România, 
              oferind servicii de calitate premium de peste 10 ani.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Povestea Noastră</h2>
              <p className="text-lg text-gray-600 mb-6">
                SmartCar a fost fondată în 2012 cu o flotă inițială de doar 10 mașini și o viziune ambițioasă: 
                să revoluționăm industria de închirieri și vânzări auto din România. Am început ca o mică afacere 
                locală în București, dedicată oferirii unei experiențe premium clienților noștri.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                În decursul a 10 ani, ne-am extins în 12 orașe din România, am dezvoltat o flotă de peste 350 de 
                vehicule și am servit peste 5000 de clienți mulțumiți. Succesul nostru se bazează pe principii simple: 
                calitate fără compromis, transparență în toate interacțiunile și un angajament neclintit față de satisfacția clientului.
              </p>
              <p className="text-lg text-gray-600">
                Astăzi, SmartCar nu este doar o companie de închirieri și vânzări auto, ci un partener de încredere 
                pentru mobilitate în România. Suntem mândri să oferim servicii care depășesc constant așteptările clienților noștri, 
                făcând fiecare călătorie și achiziție o experiență memorabilă.
              </p>
            </div>
            <div className="md:w-1/2 relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/our-story.jpg"
                alt="SmartCar Story"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Valorile Noastre</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              La SmartCar, suntem ghidați de un set clar de valori care definesc toate interacțiunile și serviciile noastre.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Integritate</h3>
              <p className="text-gray-600">
                Ne conducem afacerea cu onestitate și transparență. Nu există costuri ascunse sau surprize neplăcute - 
                ceea ce vezi este ceea ce primești, întotdeauna.
              </p>
            </div>
            
            {/* Value 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Inovație</h3>
              <p className="text-gray-600">
                Căutăm constant modalități de a îmbunătăți serviciile noastre, integrând tehnologii moderne 
                pentru a oferi o experiență fără cusur clienților noștri.
              </p>
            </div>
            
            {/* Value 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Excelență</h3>
              <p className="text-gray-600">
                Nu ne mulțumim niciodată cu mediocru. De la starea impecabilă a mașinilor până la serviciul clienți, 
                ne străduim să atingem excelența în tot ceea ce facem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Echipa Noastră</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Cunoaște profesioniștii dedicați care fac din SmartCar o companie de succes și un partener de încredere.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-64">
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ce Spun Clienții Noștri</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Opiniile clienților noștri sunt cea mai bună dovadă a calității serviciilor oferite.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm relative">
                <svg className="h-12 w-12 text-blue-100 absolute top-6 left-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8v12H0V8h10zm12 0v12H12V8h10z" />
                </svg>
                <div className="relative">
                  <p className="text-gray-600 mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center">
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-gray-500 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Locations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Locațiile Noastre</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Suntem prezenți în principalele orașe din România, oferind servicii de închiriere și vânzare auto de calitate.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto relative">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/romania-map.jpg"
                alt="SmartCar Locations Map"
                fill
                className="object-contain"
              />
            </div>
            
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-gray-900">București</h3>
                <p className="text-gray-600">Str. Victoriei 128</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-gray-900">Cluj-Napoca</h3>
                <p className="text-gray-600">Bld. Eroilor 42</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-gray-900">Timișoara</h3>
                <p className="text-gray-600">Str. Alba Iulia 15</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-gray-900">Iași</h3>
                <p className="text-gray-600">Calea Unirii 29</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-gray-900">Brașov</h3>
                <p className="text-gray-600">Str. Mureșenilor 9</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-gray-900">Constanța</h3>
                <p className="text-gray-600">Bld. Tomis 107</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-gray-900">Sibiu</h3>
                <p className="text-gray-600">Piața Mare 12</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-gray-900">Craiova</h3>
                <p className="text-gray-600">Str. Unirii 31</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Vino Alături de Noi!</h2>
            <p className="text-xl text-blue-100 mb-8">
              Fie că dorești să închiriezi, să cumperi sau să afli mai multe despre serviciile noastre, 
              echipa SmartCar este aici să te ajute. Contactează-ne astăzi!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Contactează-ne
              </Link>
              <Link
                href="/careers"
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Cariere
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 