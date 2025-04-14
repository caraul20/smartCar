'use client';

import { useState, useEffect } from 'react';
import { firestore } from '@/lib/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export default function TestPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testFirebase() {
      try {
        // Încearcă să se conecteze la Firestore și să obțină câteva date
        console.log('Încercăm să ne conectăm la Firestore...');
        const carsRef = collection(firestore, 'cars');
        const snapshot = await getDocs(carsRef);
        
        const results: any[] = [];
        snapshot.forEach(doc => {
          results.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        console.log('Date obținute din Firestore:', results);
        setData(results);
        setIsLoading(false);
      } catch (err) {
        console.error('Eroare la conectarea cu Firestore:', err);
        setError(`Eroare: ${err instanceof Error ? err.message : String(err)}`);
        setIsLoading(false);
      }
    }

    testFirebase();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pagină de test Firebase</h1>
      
      {isLoading && <p>Se încarcă datele...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Eroare la conectarea cu Firebase:</p>
          <p>{error}</p>
        </div>
      )}
      
      {data.length > 0 && (
        <div>
          <p className="text-green-600 font-semibold mb-2">Conexiune Firebase reușită! Date obținute:</p>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
      
      {!isLoading && data.length === 0 && !error && (
        <p>Nu s-au găsit date în colecția 'cars'. Verifică dacă această colecție există în Firestore.</p>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Detalii configurație Firebase:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'smartcar-a31ce',
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'smartcar-a31ce.firebaseapp.com'
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
} 