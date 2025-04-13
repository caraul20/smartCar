'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"; 
import { auth, firestore } from '@/lib/firebase/config'; // Import Firebase config

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    drivingLicense: '',
  });
  const [errors, setErrors] = useState<Partial<typeof formData> & { firebase?: string }>({}); // Add firebase error field
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for the field being edited
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
      firebase: undefined, // Clear general firebase error on change
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.firstName) newErrors.firstName = 'Prenumele este obligatoriu.';
    if (!formData.lastName) newErrors.lastName = 'Numele este obligatoriu.';
    if (!formData.email) {
      newErrors.email = 'Emailul este obligatoriu.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Formatul emailului este invalid.';
    }
    if (!formData.password) {
      newErrors.password = 'Parola este obligatorie.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Parola trebuie să aibă cel puțin 6 caractere.';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmarea parolei este obligatorie.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Parolele nu se potrivesc.';
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Numărul de telefon este obligatoriu.';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) { // Basic 10 digit check for RO numbers
      newErrors.phoneNumber = 'Numărul de telefon trebuie să aibă 10 cifre.';
    }
    if (!formData.drivingLicense) {
      newErrors.drivingLicense = 'Seria permisului de conducere este obligatorie.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // 2. Save additional user details to Firestore
      await setDoc(doc(firestore, "users", user.uid), { 
        uid: user.uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        drivingLicense: formData.drivingLicense,
        createdAt: new Date(), // Optional: track creation date
      });

      console.log('User registered and data saved!');
      setRegistrationSuccess(true);
      setFormData({ // Reset form on success
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        drivingLicense: '',
      });

    } catch (error) {
      console.error("Firebase Registration Error:", error);
      let firebaseErrorMessage = 'A apărut o eroare la înregistrare. Încercați din nou.';
      
      // Type guard to check if error is an object with a 'code' property
      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string }; // Assert type after check
        
        // Handle specific Firebase Auth errors
        if (firebaseError.code === 'auth/email-already-in-use') {
          firebaseErrorMessage = 'Această adresă de email este deja înregistrată.';
        } else if (firebaseError.code === 'auth/weak-password') {
          firebaseErrorMessage = 'Parola este prea slabă. Încercați una mai complexă.';
        } else if (firebaseError.code === 'auth/invalid-email') {
          firebaseErrorMessage = 'Formatul emailului este invalid.';
        } // Add more specific error handling if needed
      }
      
      setErrors({ firebase: firebaseErrorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-12 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-lg dark:bg-gray-800/80 md:p-12"
      >
        {registrationSuccess ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Cont Creat!</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">Vă mulțumim pentru înregistrare! Acum vă puteți autentifica.</p>
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Mergi la Autentificare
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Creează un cont</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Ai deja cont?{' '}
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                  Autentifică-te aici
                </Link>
              </p>
            </div>

            {/* Display general Firebase error */}
            {errors.firebase && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-md bg-red-50 p-3 dark:bg-red-900/30"
              >
                <p className="text-sm text-red-700 dark:text-red-300">{errors.firebase}</p>
              </motion.div>
            )}

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Prenume
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400'}`}
                  aria-invalid={!!errors.firstName}
                  aria-describedby="firstName-error"
                />
                {errors.firstName && <p id="firstName-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nume
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400'}`}
                  aria-invalid={!!errors.lastName}
                  aria-describedby="lastName-error"
                />
                {errors.lastName && <p id="lastName-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Adresă de email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400'}`}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
              />
              {errors.email && <p id="email-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Parolă
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400'}`}
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
              />
              {errors.password && <p id="password-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirmă Parola
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400'}`}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby="confirmPassword-error"
              />
              {errors.confirmPassword && <p id="confirmPassword-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.confirmPassword}</p>}
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Număr de telefon
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  autoComplete="tel"
                  className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.phoneNumber ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400'}`}
                  aria-invalid={!!errors.phoneNumber}
                  aria-describedby="phoneNumber-error"
                />
                {errors.phoneNumber && <p id="phoneNumber-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label htmlFor="drivingLicense" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Serie Permis Conducere
                </label>
                <input
                  type="text"
                  id="drivingLicense"
                  name="drivingLicense"
                  value={formData.drivingLicense}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.drivingLicense ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400'}`}
                  aria-invalid={!!errors.drivingLicense}
                  aria-describedby="drivingLicense-error"
                />
                {errors.drivingLicense && <p id="drivingLicense-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.drivingLicense}</p>}
              </div>
            </div>
            
            {/* Terms and conditions could be added here */}
            
            <div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98, y: 0 }}
                className="flex w-full justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-800"
              >
                {isSubmitting ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Creează Cont'
                )}
              </motion.button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
} 