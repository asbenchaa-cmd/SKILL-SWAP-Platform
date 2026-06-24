import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXd2_4054rPqdepz09ReTM07br0n11xws",
  authDomain: "skill-swap-mvp-9a260.firebaseapp.com",
  projectId: "skill-swap-mvp-9a260",
  storageBucket: "skill-swap-mvp-9a260.firebasestorage.app",
  messagingSenderId: "556789622949",
  appId: "1:556789622949:web:fd7570705aef3319e3054c",
  measurementId: "G-ZG9S39XKJC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.FB = {
  app,
  auth,
  db,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  serverTimestamp
};

console.warn("Firebase connected successfully");