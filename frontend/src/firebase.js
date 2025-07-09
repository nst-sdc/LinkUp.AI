import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";             
import { getFirestore } from "firebase/firestore";   

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA3mbOpgxHo9DT1zJwB_564KCZFnNxw5xk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "link-35d1c.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://link-35d1c-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "link-35d1c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "link-35d1c.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "816193418310",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:816193418310:web:6db95d372e66f017338647",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-CJ14EPR0PT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
