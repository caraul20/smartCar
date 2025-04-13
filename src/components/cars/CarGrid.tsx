'use client';

import { Car } from '@/lib/types';
import CarCard from './CarCard';
import { useState } from 'react';

interface CarGridProps {
  cars: Car[];
}

export default function CarGrid({ cars }: CarGridProps) {
  const [sortBy, setSortBy] = useState<string>('priceAsc');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Filtrăm mașinile după categorie
  const filteredCars = filterCategory === 'all' 
    ? cars 
    : cars.filter(car => car.category === filterCategory);

  // Sortăm mașinile
  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case 'priceAsc':
        return a.pricePerDay - b.pricePerDay;
      case 'priceDesc':
        return b.pricePerDay - a.pricePerDay;
      case 'nameAsc':
        return a.name.localeCompare(b.name);
      case 'nameDesc':
        return b.name.localeCompare(a.name);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Categorii unice pentru filtrare
  const categories = ['all', ...new Set(cars.map(car => car.category))];

  return (
    <div className="space-y-6">
      {/* Filtre și sortare */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div>
          <h2 className="text-lg font-semibold">
            {filteredCars.length} mașini disponibile
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Găsește mașina perfectă pentru nevoile tale
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Filtrare după categorie */}
          <select 
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">Toate categoriile</option>
            {categories
              .filter(category => category !== 'all')
              .map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))
            }
          </select>
          
          {/* Sortare */}
          <select 
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="priceAsc">Preț: Crescător</option>
            <option value="priceDesc">Preț: Descrescător</option>
            <option value="nameAsc">Nume: A-Z</option>
            <option value="nameDesc">Nume: Z-A</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
      
      {/* Grila de mașini */}
      {sortedCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Nu am găsit mașini care să corespundă criteriilor tale.
          </p>
        </div>
      )}
    </div>
  );
}
