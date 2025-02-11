// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Modular approach for auth
import { getFirestore } from "firebase/firestore"; // If you're using Firestore
import { getAnalytics } from "firebase/analytics"; // If you're using Analytics

const firebaseConfig = {
  apiKey: "AIzaSyCEtlMO3sy0JyUCkuU6E3GsF2V6x2qFWcM",
  authDomain: "project001-11dc8.firebaseapp.com",
  projectId: "project001-11dc8",
  storageBucket: "project001-11dc8.firebasestorage.app",
  messagingSenderId: "647555047784",
  appId: "1:647555047784:web:8f60077bc688034cd8f6dd",
  measurementId: "G-3D37EXN75W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Modular auth initialization
const firestore = getFirestore(app); // Optional: Firestore initialization
const analytics = getAnalytics(app); // Optional: Analytics initialization

export { auth, firestore, analytics };
