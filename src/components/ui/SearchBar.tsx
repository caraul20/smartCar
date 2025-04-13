'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  placeholder?: string;
}

export default function SearchBar({ 
  onSearch, 
  initialQuery = '', 
  placeholder = 'Caută mașina perfectă...' 
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Exemplu de sugestii (în producție acestea ar putea veni din backend)
  const allSuggestions = [
    'Tesla Model 3',
    'BMW X5',
    'Audi A4',
    'Mercedes GLC',
    'Volkswagen Golf',
    'Renault Clio',
    'Toyota Corolla',
    'Hyundai Tucson',
    'Dacia Duster',
    'Ford Focus'
  ];

  useEffect(() => {
    if (query.length > 1) {
      const filteredSuggestions = allSuggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query, allSuggestions]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setIsExpanded(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setSuggestions([]);
    setIsExpanded(false);
  };

  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className={`flex items-center transition-all duration-300 bg-white dark:bg-gray-800 rounded-full shadow-md ${
          isExpanded ? 'ring-2 ring-primary-500 shadow-lg' : 'hover:shadow-lg'
        }`}>
          <div className="pl-5 pr-3">
            <svg
              className="w-5 h-5 text-gray-400 dark:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => setTimeout(() => setIsExpanded(false), 200)}
            placeholder={placeholder}
            className="flex-grow py-3 pl-2 pr-4 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
          />
          
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
          
          <button
            type="submit"
            className="flex-shrink-0 px-5 py-3 ml-1 text-white bg-primary-500 hover:bg-primary-600 rounded-r-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            Caută
          </button>
        </div>
      </form>
      
      {/* Sugestii de căutare */}
      <AnimatePresence>
        {isExpanded && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <ul>
              {suggestions.map((suggestion, index) => (
                <li 
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    {suggestion}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 