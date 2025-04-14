'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/lib/firebase/config';
import CarCard from '@/components/cars/CarCard';
import SearchBar from '@/components/ui/SearchBar';
import { cn } from '@/lib/utils';
import { Car } from '@/lib/types';

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsCollectionRef = collection(firestore, 'cars');
        const carsSnapshot = await getDocs(carsCollectionRef);
        const carsData = carsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Car[];
        setCars(carsData);
        setFilteredCars(carsData);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term) {
      setFilteredCars(cars);
      return;
    }

    const termLower = term.toLowerCase();
    const results = cars.filter(car => 
      car.brand?.toLowerCase().includes(termLower) || 
      car.model?.toLowerCase().includes(termLower) ||
      car.description?.toLowerCase().includes(termLower)
    );
    
    setFilteredCars(results);
  };

  return (
    <main className="container-custom mx-auto px-4 py-24 md:py-28">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
          Colecția noastră de mașini
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explorează gama noastră de mașini de vânzare
        </p>
      </div>
      
      <div className="mb-8 mt-8">
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Caută după marcă, model sau descriere..." 
        />
      </div>
      
      <div className="flex flex-col gap-8">
        <div className="w-full">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Nicio mașină găsită</h3>
              <p className="text-gray-500 mt-2">Încercați să modificați căutarea sau să încercați un alt termen.</p>
              <button 
                onClick={() => handleSearch('')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Arată toate mașinile
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 