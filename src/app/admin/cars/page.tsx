'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car } from '@/lib/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { firestore } from '@/lib/firebase/config';
import AddEditCarModal from '@/components/admin/AddEditCarModal';

// Define a more specific type for sortable fields
type SortableCarField = Exclude<keyof Car, 'features' | 'description' | 'color' | 'imageUrl'>; // Exclude non-sortable fields

// Simple Spinner component
function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
}

export default function AdminCarsPage() {
  // Car management state
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  // Use the specific sortable type for the field
  const [sortBy, setSortBy] = useState<{field: SortableCarField | null; direction: 'asc' | 'desc'}>({field: null, direction: 'asc'});
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  
  // Pagination settings
  const itemsPerPage = 5;
  
  // Fetch cars from Firestore
  const fetchCars = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const carsRef = collection(firestore, "cars");
      // Optional: Add sorting if needed, e.g., orderBy("name", "asc")
      const q = query(carsRef, orderBy("name", "asc")); 
      const querySnapshot = await getDocs(q);
      const carsData: Car[] = [];
      querySnapshot.forEach((doc) => {
        // Ensure data matches the Car type, handle potential missing fields
        const data = doc.data();
        carsData.push({ 
            id: doc.id, 
             // Provide default values for potentially missing fields if necessary
            name: data.name ?? 'N/A',
            brand: data.brand ?? 'N/A',
            model: data.model ?? 'N/A',
            year: data.year ?? 0,
            color: data.color ?? '#000000',
            pricePerDay: data.pricePerDay ?? 0,
            pricePerWeek: data.pricePerWeek ?? 0, // Add default
            pricePerMonth: data.pricePerMonth ?? 0, // Add default
            fuelType: data.fuelType ?? 'gasoline',
            transmission: data.transmission ?? 'manual',
            seats: data.seats ?? 0,
            doors: data.doors ?? 0,
            availableFrom: data.availableFrom ?? '',
            availableTo: data.availableTo ?? '',
            features: data.features ?? [],
            imageUrl: data.imageUrl ?? '',
            rating: data.rating ?? 0,
            location: data.location ?? 'N/A',
            description: data.description ?? '',
            category: data.category ?? 'economy'
        });
      });
      setCars(carsData);
      setFilteredCars(carsData); // Initialize filtered list
    } catch (err) {
      console.error("Error fetching cars: ", err);
      setError("A apărut o eroare la încărcarea mașinilor.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(); // Fetch cars on initial mount
  }, []);
  
  // Handle sorting with the specific type
  const handleSort = (field: SortableCarField) => {
    const newDirection = sortBy.field === field && sortBy.direction === 'asc' ? 'desc' : 'asc';
    setSortBy({ field, direction: newDirection });
    
    // Sorting logic remains largely the same, but field type is now guaranteed
    const sorted = [...filteredCars].sort((a, b) => {
      if (field === 'pricePerDay' || field === 'year' || field === 'rating' || field === 'pricePerMonth' || field === 'pricePerWeek' || field === 'seats' || field === 'doors') {
        // Ensure numeric comparison
        return newDirection === 'asc' 
          ? (a[field] as number) - (b[field] as number) 
          : (b[field] as number) - (a[field] as number);
      }
      
      // Handle string fields (name, brand, model, fuelType, transmission, location, category)
      if (typeof a[field] === 'string' && typeof b[field] === 'string') {
        return newDirection === 'asc'
          ? (a[field] as string).localeCompare(b[field] as string)
          : (b[field] as string).localeCompare(a[field] as string);
      }
      
      return 0;
    });
    
    setFilteredCars(sorted);
  };
  
  // Apply filters and search
  useEffect(() => {
    let result = [...cars];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(car => car.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(car => 
        car.name.toLowerCase().includes(query) ||
        car.brand.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        car.location.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting only if a field is selected
    if (sortBy.field) { // Check if sortBy.field is not null
        const field = sortBy.field; // Assign to a const for type narrowing inside the sort function
        result = [...result].sort((a, b) => {
            if (field === 'pricePerDay' || field === 'year' || field === 'rating' || field === 'pricePerMonth' || field === 'pricePerWeek' || field === 'seats' || field === 'doors') {
                return sortBy.direction === 'asc' 
                ? (a[field] as number) - (b[field] as number) 
                : (b[field] as number) - (a[field] as number);
            }
            
            if (typeof a[field] === 'string' && typeof b[field] === 'string') {
                 return sortBy.direction === 'asc'
                ? (a[field] as string).localeCompare(b[field] as string)
                : (b[field] as string).localeCompare(a[field] as string);
            }
            return 0;
        });
    }
    
    setFilteredCars(result);
    setCurrentPage(1); 
  }, [cars, searchQuery, selectedCategory, sortBy]); // Add sortBy to dependency array
  
  // Pagination calculation
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Handle car operations
  const openAddModal = () => {
    setSelectedCar(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };
  
  const openEditModal = (car: Car) => {
    setSelectedCar(car);
    setIsEditing(true);
    setIsModalOpen(true);
  };
  
  const openDeleteModal = (car: Car) => {
    setSelectedCar(car);
    setIsDeleteModalOpen(true);
  };
  
  const closeModal = () => {
      setIsModalOpen(false);
      setSelectedCar(null);
  };

  const closeDeleteModal = () => {
      setIsDeleteModalOpen(false);
      setSelectedCar(null);
  };
  
  // Combined Save Handler passed to Modal
  const handleSaveCar = async (data: Omit<Car, 'id'> | Partial<Omit<Car, 'id'>>, carId?: string) => {
    if (carId) {
        // Editing existing car
        console.log("Updating car:", carId, data);
        try {
            const carRef = doc(firestore, "cars", carId);
            await updateDoc(carRef, data); // Pass partial data directly
            // TODO: Show success toast
        } catch (error) {
            console.error("Error updating car: ", error);
            // TODO: Show error toast
            throw error; // Re-throw error so modal knows save failed
        }
    } else {
        // Adding new car
        console.log("Adding car:", data);
        try {
            // Ensure all required fields are present for adding
            // const dataToSave = { ...data, createdAt: serverTimestamp() }; // Add timestamp if needed
             await addDoc(collection(firestore, "cars"), data as Omit<Car, 'id'>); // Assert type for addDoc
             // TODO: Show success toast
        } catch (error) {
             console.error("Error adding car: ", error);
             // TODO: Show error toast
             throw error; // Re-throw error so modal knows save failed
        }
    }
     closeModal();
     await fetchCars(); // Refresh the list after successful save
  };
  
  // DELETE CAR
  const handleDeleteCar = async () => {
    if (!selectedCar || !selectedCar.id) return;
    console.log("Deleting car:", selectedCar.id);
    try {
        await deleteDoc(doc(firestore, "cars", selectedCar.id));
        closeDeleteModal();
        await fetchCars(); // Refresh list
         // TODO: Show success toast
    } catch (error) {
        console.error("Error deleting car: ", error);
        // TODO: Show error toast
    }
  };
  
  // Icons for UI
  const SortIcon = ({ direction }: { direction?: 'asc' | 'desc' }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={cn(
        "inline-block ml-1 transition-transform",
        direction === 'asc' ? 'rotate-0' : direction === 'desc' ? 'rotate-180' : 'opacity-30'
      )}
    >
      <path d="m18 15-6-6-6 6"/>
    </svg>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Administrare Mașini</h1>
        <button 
          onClick={openAddModal}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Adaugă Mașină
        </button>
      </div>
      
      {/* Filters and search */}
      <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:space-x-4">
        <div className="relative flex-1 max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Caută mașini după nume, model, etc..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-400 dark:focus:border-blue-500"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500"
          >
            <option value="all">Toate categoriile</option>
            <option value="economy">Economy</option>
            <option value="compact">Compact</option>
            <option value="suv">SUV</option>
            <option value="luxury">Luxury</option>
            <option value="midsize">Midsize</option>
            <option value="van">Van</option>
          </select>
        </div>
      </div>
      
      {/* Cars Table - Wrapped for horizontal scroll */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {isLoading ? (
            <div className="flex justify-center items-center p-10">
                <Spinner />
                <span className="ml-2">Se încarcă mașinile...</span>
            </div>
        ) : error ? (
            <div className="p-10 text-center text-red-600">
                {error}
            </div>
        ) : filteredCars.length > 0 ? (
          <div className="overflow-x-auto"> 
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-800 min-w-[900px]"><thead>
                <tr><th className="px-3 py-3.5 text-left text-sm font-medium text-gray-700 dark:text-gray-300"><div className="flex cursor-pointer items-center" onClick={() => handleSort('name')}>Nume<SortIcon direction={sortBy.field === 'name' ? sortBy.direction : undefined} /></div></th><th className="px-3 py-3.5 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Imagine</th><th className="px-3 py-3.5 text-left text-sm font-medium text-gray-700 dark:text-gray-300"><div className="flex cursor-pointer items-center" onClick={() => handleSort('category')}>Categorie<SortIcon direction={sortBy.field === 'category' ? sortBy.direction : undefined} /></div></th><th className="px-3 py-3.5 text-left text-sm font-medium text-gray-700 dark:text-gray-300"><div className="flex cursor-pointer items-center" onClick={() => handleSort('pricePerDay')}>Preț/zi<SortIcon direction={sortBy.field === 'pricePerDay' ? sortBy.direction : undefined} /></div></th><th className="px-3 py-3.5 text-left text-sm font-medium text-gray-700 dark:text-gray-300"><div className="flex cursor-pointer items-center" onClick={() => handleSort('location')}>Locație<SortIcon direction={sortBy.field === 'location' ? sortBy.direction : undefined} /></div></th><th className="px-3 py-3.5 text-left text-sm font-medium text-gray-700 dark:text-gray-300"><div className="flex cursor-pointer items-center" onClick={() => handleSort('rating')}>Rating<SortIcon direction={sortBy.field === 'rating' ? sortBy.direction : undefined} /></div></th><th className="px-3 py-3.5 text-left text-sm font-medium text-gray-700 dark:text-gray-300"><div className="flex cursor-pointer items-center" onClick={() => handleSort('year')}>An<SortIcon direction={sortBy.field === 'year' ? sortBy.direction : undefined} /></div></th><th className="px-3 py-3.5 text-right text-sm font-medium text-gray-700 dark:text-gray-300">Acțiuni</th></tr>
             </thead><tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {paginatedCars.map((car, index) => (
                  <motion.tr 
                    key={car.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800/60"
                  >
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <div className="font-medium text-gray-900 dark:text-white">{car.name}</div>
                      <div className="text-gray-500 dark:text-gray-400">{car.brand} {car.model}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <div className="relative h-12 w-20 overflow-hidden rounded-md">
                        <Image 
                          src={car.imageUrl}
                          alt={car.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        car.category === 'luxury' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                        car.category === 'suv' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                        car.category === 'compact' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        car.category === 'economy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        car.category === 'midsize' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                      }`}>
                        {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {car.pricePerDay} €
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {car.location}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-gray-300">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span>{car.rating}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {car.year}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-right text-sm">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => openEditModal(car)}
                          className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => openDeleteModal(car)}
                          className="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30"
                        >
                          Șterge
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center p-8 text-center">
            <div className="max-w-md">
              <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Nicio mașină găsită</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery || selectedCategory !== 'all'
                  ? 'Nicio mașină nu corespunde criteriilor de căutare. Încercați să ajustați filtrele.'
                  : 'Nu există mașini în baza de date. Adăugați prima mașină!'}
              </p>
            </div>
          </div>
        )}
        
        {/* Pagination */}
        {filteredCars.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-800/60 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                  currentPage === 1
                    ? 'cursor-not-allowed text-gray-400 dark:text-gray-500'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                } dark:border-gray-600 dark:bg-gray-900`}
              >
                Anterior
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                  currentPage === totalPages
                    ? 'cursor-not-allowed text-gray-400 dark:text-gray-500'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                } dark:border-gray-600 dark:bg-gray-900`}
              >
                Următor
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Afișez <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredCars.length)}</span> din <span className="font-medium">{filteredCars.length}</span> rezultate
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm ${
                      currentPage === 1
                        ? 'cursor-not-allowed text-gray-400 dark:text-gray-500'
                        : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                    } dark:border-gray-600 dark:bg-gray-900 focus:z-20`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                    <span className="sr-only">Anterior</span>
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`relative inline-flex items-center border px-4 py-2 text-sm ${
                        currentPage === index + 1
                          ? 'z-10 border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm ${
                      currentPage === totalPages
                        ? 'cursor-not-allowed text-gray-400 dark:text-gray-500'
                        : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                    } dark:border-gray-600 dark:bg-gray-900 focus:z-20`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                    <span className="sr-only">Următor</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Add/Edit Modal */}
      {isModalOpen && (
        <AddEditCarModal 
            isOpen={isModalOpen}
            onClose={closeModal}
            onSave={handleSaveCar}
            carData={selectedCar}
            isEditing={isEditing}
        />
      )}

       {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && selectedCar && (
             <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden p-4 bg-black/40 backdrop-blur-sm">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
                >
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Confirmare Ștergere</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                        Ești sigur că vrei să ștergi mașina &quot;{selectedCar.name}&quot;? Această acțiune nu poate fi anulată.
                    </p>
                    <div className="flex justify-end space-x-3">
                        <button 
                            onClick={closeDeleteModal}
                            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            Anulează
                        </button>
                         <button 
                            onClick={handleDeleteCar}
                            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                        >
                            Șterge Mașina
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
    </div>
  );
} 