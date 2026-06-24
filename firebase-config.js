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
  apiKey: "AIzaSyDSRbIPafyR2NMidlr0-mUMRBcHgfIHgQM",
  authDomain: "skill-swap-a7b9d.firebaseapp.com",
  databaseURL: "https://skill-swap-a7b9d-default-rtdb.firebaseio.com",
  projectId: "skill-swap-a7b9d",
  storageBucket: "skill-swap-a7b9d.firebasestorage.app",
  messagingSenderId: "960784899572",
  appId: "1:960784899572:web:75449030822b13db6aada1",
  measurementId: "G-JEQTZZDBX8"
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