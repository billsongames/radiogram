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
  apiKey: "AIzaSyAQec7LRES-jvYsmfVXcwuhl-3x5bNpXAc",
  authDomain: "radioplayer-e0392.firebaseapp.com",
  projectId: "radioplayer-e0392",
  storageBucket: "radioplayer-e0392.appspot.com",
  messagingSenderId: "351819330761",
  appId: "1:351819330761:web:1b09b24630b03252584918",
  measurementId: "G-BVGGR7V1L5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app)
export const db = getFirestore(app)
