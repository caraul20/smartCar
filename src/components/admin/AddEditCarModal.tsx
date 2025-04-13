'use client';

import React, { useState, useEffect } from 'react';
import { Car } from '@/lib/types';
import { motion } from 'framer-motion';

// Define Spinner component locally or import if it exists elsewhere
function Spinner() {
    return (
      <svg className="animate-spin -ml-1 mr-1.5 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    );
  }

interface AddEditCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Simplified onSave type - the parent component will handle the logic
  onSave: (data: Omit<Car, 'id'> | Partial<Omit<Car, 'id'>>, carId?: string) => Promise<void>; 
  carData?: Car | null; 
  isEditing: boolean;
}

// Add CSS class for modal inputs for easier styling
const modalInputClass = "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm";

export default function AddEditCarModal({
  isOpen,
  onClose,
  onSave,
  carData,
  isEditing,
}: AddEditCarModalProps) {
  
  // Initialize form state based on editing mode
  const initialFormData = {
    name: carData?.name || '',
    brand: carData?.brand || '',
    model: carData?.model || '',
    year: carData?.year || new Date().getFullYear(),
    color: carData?.color || '#000000',
    pricePerDay: carData?.pricePerDay || 0,
    originalPricePerDay: carData?.originalPricePerDay || '',
    pricePerWeek: carData?.pricePerWeek || 0,
    pricePerMonth: carData?.pricePerMonth || 0,
    fuelType: carData?.fuelType || 'gasoline',
    transmission: carData?.transmission || 'manual',
    seats: carData?.seats || 5,
    doors: carData?.doors || 4,
    availableFrom: carData?.availableFrom ? carData.availableFrom.split('T')[0] : '',
    availableTo: carData?.availableTo ? carData.availableTo.split('T')[0] : '',
    features: carData?.features || [],
    imageUrl: carData?.imageUrl || '',
    rating: carData?.rating || 0,
    location: carData?.location || '',
    description: carData?.description || '',
    category: carData?.category || 'economy',
  };
  
  const [formData, setFormData] = useState(initialFormData);
  const [featureInput, setFeatureInput] = useState(''); // For adding features
  const [isSaving, setIsSaving] = useState(false);
  
  // Reset form when modal opens or carData changes
  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormData);
      setFeatureInput('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, carData]); // Rerun when isOpen or carData changes
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    let processedValue: string | number | string[] = value;
    
    // Handle number inputs
    if (type === 'number') {
      processedValue = value === '' ? '' : parseFloat(value); // Keep empty string or parse as number
      // Handle potential NaN issues if parsing fails or input is partial
      if (isNaN(processedValue as number)) {
           processedValue = ''; // or keep the partial string? Decide based on UX needed.
       }
    } 
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleFeatureAdd = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput(''); // Clear input after adding
    }
  };

  const handleFeatureRemove = (featureToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== featureToRemove)
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Prepare data for Firestore
    const dataToSave: Partial<Omit<Car, 'id'>> = {
        ...formData,
        imageUrl: formData.imageUrl, 
        year: Number(formData.year) || 0,
        pricePerDay: Number(formData.pricePerDay) || 0,
        originalPricePerDay: formData.originalPricePerDay && Number(formData.originalPricePerDay) > 0 && Number(formData.originalPricePerDay) !== (Number(formData.pricePerDay) || 0) 
                            ? Number(formData.originalPricePerDay) 
                            : undefined,
        pricePerWeek: Number(formData.pricePerWeek) || 0,
        pricePerMonth: Number(formData.pricePerMonth) || 0,
        seats: Number(formData.seats) || 0,
        doors: Number(formData.doors) || 0,
        rating: Number(formData.rating) || 0,
        availableFrom: formData.availableFrom ? new Date(formData.availableFrom).toISOString() : '',
        availableTo: formData.availableTo ? new Date(formData.availableTo).toISOString() : '',
    };

    // Call the parent onSave function
    try {
        await onSave(dataToSave, isEditing ? carData?.id : undefined);
    } catch (error) {
        console.error("Error saving car from modal:", error);
    } finally {
        setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative w-full max-w-3xl rounded-lg bg-white dark:bg-gray-800 shadow-xl max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {isEditing ? 'Editează Mașina' : 'Adaugă Mașină Nouă'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <form id="addEditCarForm" onSubmit={handleSave} className="p-6 space-y-6 overflow-y-auto flex-grow">
          {/* Grid for layout */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Basic Info */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nume Afișat</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={modalInputClass} />
            </div>
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marcă</label>
              <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} required className={modalInputClass} />
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Model</label>
              <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} required className={modalInputClass} />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">An</label>
              <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} required min="1900" max={new Date().getFullYear() + 1} className={modalInputClass} />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categorie</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} required className={modalInputClass}>
                  <option value="economy">Economy</option>
                  <option value="compact">Compact</option>
                  <option value="midsize">Midsize</option>
                  <option value="suv">SUV</option>
                  <option value="luxury">Luxury</option>
                  <option value="van">Van</option>
              </select>
            </div>
             <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Locație</label>
              <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required className={modalInputClass} />
            </div>
          </div>
          
           {/* Pricing - Add Original Price */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label htmlFor="originalPricePerDay" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preț Original/Zi (€) <span className='text-xs text-gray-400'>(Opțional)</span></label>
              <input type="number" id="originalPricePerDay" name="originalPricePerDay" value={formData.originalPricePerDay} onChange={handleChange} min="0" step="0.01" placeholder="Ex: 50" className={modalInputClass} />
            </div>
            <div>
              <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preț Actual/Zi (€)</label>
              <input type="number" id="pricePerDay" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} required min="0" step="0.01" className={modalInputClass} />
            </div>
            <div>
              <label htmlFor="pricePerWeek" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preț/Săptămână (€)</label>
              <input type="number" id="pricePerWeek" name="pricePerWeek" value={formData.pricePerWeek} onChange={handleChange} required min="0" step="0.01" className={modalInputClass} />
            </div>
          </div>
          
          {/* Specs */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div>
              <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Combustibil</label>
              <select id="fuelType" name="fuelType" value={formData.fuelType} onChange={handleChange} required className={modalInputClass}>
                <option value="gasoline">Benzină</option>
                <option value="diesel">Motorină</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hibrid</option>
              </select>
            </div>
            <div>
              <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Transmisie</label>
               <select id="transmission" name="transmission" value={formData.transmission} onChange={handleChange} required className={modalInputClass}>
                <option value="manual">Manuală</option>
                <option value="automatic">Automată</option>
              </select>
            </div>
            <div>
              <label htmlFor="seats" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Locuri</label>
              <input type="number" id="seats" name="seats" value={formData.seats} onChange={handleChange} required min="1" max="15" className={modalInputClass} />
            </div>
            <div>
              <label htmlFor="doors" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Uși</label>
              <input type="number" id="doors" name="doors" value={formData.doors} onChange={handleChange} required min="2" max="7" className={modalInputClass} />
            </div>
          </div>

          {/* Availability & Details */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
             <div>
              <label htmlFor="availableFrom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Disponibil De La</label>
              <input type="date" id="availableFrom" name="availableFrom" value={formData.availableFrom} onChange={handleChange} className={modalInputClass} />
            </div>
             <div>
              <label htmlFor="availableTo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Disponibil Până La</label>
              <input type="date" id="availableTo" name="availableTo" value={formData.availableTo} onChange={handleChange} min={formData.availableFrom} className={modalInputClass} />
            </div>
            <div>
               <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating (0-5)</label>
              <input type="number" id="rating" name="rating" value={formData.rating} onChange={handleChange} required min="0" max="5" step="0.1" className={modalInputClass} />
            </div>
             <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Culoare</label>
                <input type="color" id="color" name="color" value={formData.color} onChange={handleChange} className={`${modalInputClass} p-1 h-10`} />
            </div>
            <div className="md:col-span-2">
                 <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL Imagine Principală</label>
                 <input 
                    type="url" 
                    id="imageUrl" 
                    name="imageUrl" 
                    value={formData.imageUrl} 
                    onChange={handleChange} 
                    required 
                    placeholder="https://domeniu.com/cale/imagine.jpg"
                    className={modalInputClass} 
                  />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descriere</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} className={modalInputClass}></textarea>
            </div>
          </div>

          {/* Features */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dotări</label>
                <div className="flex items-center gap-2 mb-2">
                    <input 
                        type="text" 
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        placeholder="Adaugă dotare (ex: Aer condiționat)"
                        className={`${modalInputClass} flex-grow`}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleFeatureAdd(); } }}
                    />
                    <button 
                        type="button"
                        onClick={handleFeatureAdd}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-md text-sm font-medium hover:bg-indigo-600"
                    >
                        Adaugă
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature) => (
                        <span key={feature} className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                           {feature}
                           <button type="button" onClick={() => handleFeatureRemove(feature)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                           </button>
                        </span>
                    ))}
                </div>
            </div>

        </form>

         {/* Modal Footer */}
        <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-700 sticky bottom-0 bg-gray-50 dark:bg-gray-800/50 z-10">
          <button 
             type="button" // Important: type="button" to prevent form submission
             onClick={onClose}
             className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
           >
               Anulează
           </button>
           <button 
                type="submit" 
                form="addEditCarForm" // Associate button with the form via ID
                disabled={isSaving}
                className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
                {isSaving ? (
                    <Spinner />
                ) : ( isEditing ? 'Salvează Modificările' : 'Adaugă Mașina')}
            </button>
        </div>

      </motion.div>
    </div>
  );
} 