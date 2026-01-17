import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjP_fgUXZfxQcK8mrtcioq2dGTYfc51pQ",
  authDomain: "shadiwala-website.firebaseapp.com",
  projectId: "shadiwala-website",
  storageBucket: "shadiwala-website.firebasestorage.app",
  messagingSenderId: "405166393523",
  appId: "1:405166393523:web:925cd3eb7b9ba0ce3688c6",
  measurementId: "G-P506GRX6BJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
