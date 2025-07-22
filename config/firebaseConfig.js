// Import the functions you need from the SDKs you nee
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDHqZFdkVJ7FbIBkEPLthha-qguwI6fYc",
  authDomain: "dine-time-c35e4.firebaseapp.com",
  projectId: "dine-time-c35e4",
  storageBucket: "dine-time-c35e4.firebasestorage.app",
  messagingSenderId: "703790892091",
  appId: "1:703790892091:web:67d82ade6b9c01326a881e",
  measurementId: "G-SX102Y7TEM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);