'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User } from '@/lib/types';

// Mock users data
const mockUsers: User[] = [
  {
    id: 'user1',
    email: 'maria.popescu@example.com',
    firstName: 'Maria',
    lastName: 'Popescu',
    phoneNumber: '0721123456',
    drivingLicense: 'B123456',
    bookings: ['1']
  },
  {
    id: 'user2',
    email: 'ion.ionescu@example.com',
    firstName: 'Ion',
    lastName: 'Ionescu',
    phoneNumber: '0722987654',
    drivingLicense: 'B234567',
    bookings: ['2']
  },
  {
    id: 'user3',
    email: 'alex.popa@example.com',
    firstName: 'Alexandru',
    lastName: 'Popa',
    phoneNumber: '0723456789',
    drivingLicense: 'B345678',
    bookings: ['3']
  },
  {
    id: 'user4',
    email: 'elena.d@example.com',
    firstName: 'Elena',
    lastName: 'Dragomir',
    phoneNumber: '0724567890',
    drivingLicense: 'B456789',
    bookings: ['4']
  },
  {
    id: 'user5',
    email: 'andrei.m@example.com',
    firstName: 'Andrei',
    lastName: 'Mihai',
    phoneNumber: '0725678901',
    drivingLicense: 'B567890',
    bookings: ['5']
  }
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  // Load users on component mount
  useEffect(() => {
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  // Handle search
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = users.filter(user => 
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phoneNumber.includes(query)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchQuery, users]);

  // View user details
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  // Helper to get user initial for avatar
  const getUserInitial = (user: User) => {
    return user.firstName.charAt(0).toUpperCase();
  };

  // Generate random pastel color based on user id for avatar background
  const getAvatarColor = (userId: string) => {
    // Simple hash function to generate a number from a string
    const hash = userId.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    // Generate HSL color with high lightness for pastel
    const h = hash % 360;
    return `hsl(${h}, 70%, 85%)`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestionarea Utilizatorilor</h1>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Adaugă Utilizator
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Caută utilizatori după nume, email, telefon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-400 dark:focus:border-blue-500"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-800 min-w-[600px]">
              <thead className="bg-gray-50 dark:bg-gray-800/60">
                <tr>
                  <th className="px-3 py-3.5 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Utilizator</th>
                  <th className="px-3 py-3.5 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Email</th>
                  <th className="px-3 py-3.5 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Telefon</th>
                  <th className="px-3 py-3.5 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Permis Auto</th>
                  <th className="px-3 py-3.5 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Rezervări</th>
                  <th className="px-3 py-3.5 text-right text-sm font-medium text-gray-700 dark:text-gray-300">Acțiuni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredUsers.map((user, index) => (
                  <motion.tr 
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800/60"
                  >
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <div className="flex items-center">
                        <div 
                          className="flex h-10 w-10 items-center justify-center rounded-full text-white" 
                          style={{ backgroundColor: getAvatarColor(user.id) }}
                        >
                          {getUserInitial(user)}
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {user.phoneNumber}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {user.drivingLicense}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {user.bookings?.length || 0}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-right text-sm">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleViewUser(user)}
                          className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30"
                        >
                          Detalii
                        </button>
                        <button 
                          className="rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:bg-amber-900/30"
                        >
                          Editează
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
              <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Niciun utilizator găsit</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery
                  ? 'Niciun utilizator nu corespunde criteriilor de căutare. Încercați să ajustați filtrul.'
                  : 'Nu există utilizatori înregistrați în sistem.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {isUserModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden p-4 sm:p-6">
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsUserModalOpen(false)}
          ></div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800"
          >
            <button 
              onClick={() => setIsUserModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/>
                <path d="m6 6 12 12"/>
              </svg>
            </button>
            
            <div className="flex flex-col items-center justify-center">
              <div 
                className="flex h-20 w-20 items-center justify-center rounded-full text-2xl text-white"
                style={{ backgroundColor: getAvatarColor(selectedUser.id) }}
              >
                {getUserInitial(selectedUser)}
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                {selectedUser.firstName} {selectedUser.lastName}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">{selectedUser.email}</p>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/30">
                <h4 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Informații Personale</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Telefon</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedUser.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Permis Auto</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedUser.drivingLicense}</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/30">
                <h4 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Activitate</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Rezervări totale</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedUser.bookings?.length || 0}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Client din</p>
                    <p className="font-medium text-gray-900 dark:text-white">Iunie 2025</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/30">
                <h4 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Securitate & Acces</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-700 dark:text-gray-300">Email verificat</p>
                    <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      Da
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-700 dark:text-gray-300">Telefon verificat</p>
                    <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      Da
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-700 dark:text-gray-300">Autentificare în 2 pași</p>
                    <div className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">
                      Nu
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Editează utilizator
              </button>
              <button className="flex-1 rounded-lg border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                Vezi rezervările
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 