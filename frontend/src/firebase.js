
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";             
import { getFirestore } from "firebase/firestore";   


const firebaseConfig = {
    apiKey: "AIzaSyA3mbOpgxHo9DT1zJwB_564KCZFnNxw5xk",
    authDomain: "link-35d1c.firebaseapp.com",
    databaseURL: "https://link-35d1c-default-rtdb.firebaseio.com",
    projectId: "link-35d1c",
    storageBucket: "link-35d1c.firebasestorage.app",
    messagingSenderId: "816193418310",
    appId: "1:816193418310:web:6db95d372e66f017338647",
    measurementId: "G-CJ14EPR0PT"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
