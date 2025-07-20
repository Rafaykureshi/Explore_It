// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS6-eaXegOWxWKgIh8gIvvMx_vMev3rqI",
  authDomain: "eventapp-c3419.firebaseapp.com",
  projectId: "eventapp-c3419",
  storageBucket: "eventapp-c3419.firebasestorage.app",
  messagingSenderId: "434503598756",
  appId: "1:434503598756:web:475d70351531f7743adc31"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  // If app already exists, get the existing app
  if (error.code === 'app/duplicate-app') {
    app = getApp(); // Get the default app
  } else {
    throw error;
  }
}

export { app };
export const db = getFirestore(app);
export const auth = getAuth(app);