// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (get this from Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyCoU0rvnxxWaU-4HoJraX3YJFfop6FGwQk",
  authDomain: "mountdive-3e602.firebaseapp.com",
  projectId: "mountdive-3e602",
  storageBucket: "mountdive-3e602.firebasestorage.app",
  messagingSenderId: "612291912749",
  appId: "1:612291912749:web:82a587b8d9e198235784a4",
  measurementId: "G-568QFMM1C3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ Firestore instance

export default app;
