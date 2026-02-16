import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPAsR16IHK_V1tfEdWZPbSzBafgEQ4EJY",
  authDomain: "portfolio-b1f6d.firebaseapp.com",
  projectId: "portfolio-b1f6d",
  storageBucket: "portfolio-b1f6d.firebasestorage.app",
  messagingSenderId: "839429638414",
  appId: "1:839429638414:web:75dd9750792ef1acc5af5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth (for future admin authentication)
export const auth = getAuth(app);

export default app;
