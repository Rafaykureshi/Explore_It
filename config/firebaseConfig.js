// Import the functions you need from the SDKs you nee
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBksMsVwnw-rBOCMJuCps1vSUeAnhcwc58",
  authDomain: "explore-it-856d6.firebaseapp.com",
  projectId: "explore-it-856d6",
  storageBucket: "explore-it-856d6.firebasestorage.app",
  messagingSenderId: "680814599046",
  appId: "1:680814599046:web:1be45a58fbef20d33b6a07",
  measurementId: "G-DP1F11KXL5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);