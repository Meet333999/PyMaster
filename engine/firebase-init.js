/* ==========================================================================
   PyMaster — Firebase Initialization
   Sets up Authentication, Firestore, and Google Sign-In Provider.
   ========================================================================== */

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBv-6W-WlXn9gSE2yVNW9nSngLnMngK86Q",
  authDomain: "pymaster-38945.firebaseapp.com",
  projectId: "pymaster-38945",
  storageBucket: "pymaster-38945.firebasestorage.app",
  messagingSenderId: "534620353066",
  appId: "1:534620353066:web:3e55fba80edc6602130953",
  measurementId: "G-J74GMKSL48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export Google Sign-in Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
