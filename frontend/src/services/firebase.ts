import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAWR27zhR5_1ePtppvwtlSqG918EgL2uHk",
  authDomain: "anypost-92ed4.firebaseapp.com",
  projectId: "anypost-92ed4",
  storageBucket: "anypost-92ed4.firebasestorage.app",
  messagingSenderId: "623163174547",
  appId: "1:623163174547:web:dcd042be507213bbede766",
  measurementId: "G-0ZLLM7BF18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;