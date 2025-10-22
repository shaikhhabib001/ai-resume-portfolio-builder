import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCH7gH9znqP_9i82pLn6O-muETdtbhDpkM",
  authDomain: "ai-resume-builder-a4c59.firebaseapp.com",
  projectId: "ai-resume-builder-a4c59",
  storageBucket: "ai-resume-builder-a4c59.firebasestorage.app",
  messagingSenderId: "944073410179",
  appId: "1:944073410179:web:b31b836107c1595a4a7db6",
  measurementId: "G-41FVQSBTD6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);