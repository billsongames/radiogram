// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore  } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcP4vj6j-uzkISsg7NI2--utm-hk487YY",
  authDomain: "radiogram-150620.firebaseapp.com",
  projectId: "radiogram-150620",
  storageBucket: "radiogram-150620.appspot.com",
  messagingSenderId: "1049131305203",
  appId: "1:1049131305203:web:e6afbf16273f5c86388f86",
  measurementId: "G-D1HE2K6LT4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app)
export const db = getFirestore(app)
