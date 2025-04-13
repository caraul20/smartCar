'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth function
import { auth } from '@/lib/firebase/config'; // Import Firebase auth instance

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (error) {
      setError(null);
    }
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Te rog introdu emailul și parola.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Formatul emailului este invalid.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Sign in user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user; // Get the user object
      
      console.log('Login successful!');

      // Role-based redirection
      if (user.email === 'istrate1997@mail.ru') {
        console.log('Admin user detected. Redirecting to /admin');
        router.push('/admin'); // Redirect admin to admin dashboard
      } else {
        console.log('Regular user detected. Redirecting to /account');
        router.push('/account'); // Redirect regular user to account page
      }

    } catch (error) {
      console.error("Firebase Login Error:", error);
      let firebaseErrorMessage = 'Email sau parolă incorectă. Vă rugăm să verificați datele.';
      
      // Handle specific Firebase Auth errors
      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string };
        if (
          firebaseError.code === 'auth/user-not-found' || 
          firebaseError.code === 'auth/wrong-password' ||
          firebaseError.code === 'auth/invalid-credential' // More generic error for newer SDKs
        ) {
          firebaseErrorMessage = 'Email sau parolă incorectă.';
        } else if (firebaseError.code === 'auth/invalid-email') {
          firebaseErrorMessage = 'Formatul emailului este invalid.';
        }
      }
      setError(firebaseErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4 py-12 dark:from-gray-900 dark:to-indigo-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-lg dark:bg-gray-800/80 md:p-10"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <Link href="/" className="inline-block mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white mx-auto">
                <span className="text-2xl font-bold">S</span>
              </div>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Autentificare</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Nu ai cont?{' '}
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                Creează unul acum
              </Link>
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-md bg-red-50 p-3 dark:bg-red-900/30"
            >
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </motion.div>
          )}

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
              required
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400'}`}
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Parolă
              </label>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                  Ai uitat parola?
                </a>
              </div>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400'}`}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                Ține-mă minte
              </label>
            </div>
          </div>

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
                'Autentificare'
              )}
            </motion.button>
          </div>
        </form>

        {/* Add social login options here if needed */}
        
      </motion.div>
    </div>
  );
} 