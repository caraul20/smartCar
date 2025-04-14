// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Folosim variabilele de mediu sau valorile hardcodate ca fallback
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyB_jHySRNH741ehgZVbC3c9qfpFQosN20k",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "smartcar-a31ce.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "smartcar-a31ce",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "smartcar-a31ce.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "92880765226",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:92880765226:web:78be11e7bc0bfbb1ddde53",
    measurementId: "G-H4ZFN91FTZ"
  };

// Initialize Firebase for SSR + SSG
// Check if Firebase has already been initialized to prevent errors
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage }; 