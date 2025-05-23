// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCmOMqSUySzik5VLiLs31tayWGx5mpROFY",
  authDomain: "kanban-802d8.firebaseapp.com",
  projectId: "kanban-802d8",
  storageBucket: "kanban-802d8.appspot.com",
  messagingSenderId: "501626751868",
  appId: "1:501626751868:web:8bd1e8147378c1399eb2f9",
  measurementId: "G-ZRPZVQFPWQ"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ✅ Google Auth provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" }); // Optional: always ask account

// ✅ Auth functions
export const registerWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = () =>
  signInWithPopup(auth, googleProvider);

export const logout = () => signOut(auth);

