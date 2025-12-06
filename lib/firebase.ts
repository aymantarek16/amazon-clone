import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApq0B3GLa0LCNzIwanqiBzl4Kqd9nbB2g",
  authDomain: "clone-3c0a1.firebaseapp.com",
  projectId: "clone-3c0a1",
  storageBucket: "clone-3c0a1.firebasestorage.app",
  messagingSenderId: "31518364995",
  appId: "1:31518364995:web:076700fe5881c70f644bf6",
  measurementId: "G-S4YPZH09HY",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
