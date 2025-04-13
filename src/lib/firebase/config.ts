// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_jHySRNH741ehgZVbC3c9qfpFQosN20k",
    authDomain: "smartcar-a31ce.firebaseapp.com",
    projectId: "smartcar-a31ce",
    storageBucket: "smartcar-a31ce.firebasestorage.app",
    messagingSenderId: "92880765226",
    appId: "1:92880765226:web:78be11e7bc0bfbb1ddde53",
    measurementId: "G-H4ZFN91FTZ"
  };

// Initialize Firebase for SSR + SSG
// Check if Firebase has already been initialized to prevent errors
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage }; 