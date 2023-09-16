// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { toHaveFormValues } from "@testing-library/jest-dom/dist/matchers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC010QMqnulHQ5d3ePHd5hBCyEthTuFhho",
  authDomain: "radioplayer-c372d.firebaseapp.com",
  projectId: "radioplayer-c372d",
  storageBucket: "radioplayer-c372d.appspot.com",
  messagingSenderId: "843119282243",
  appId: "1:843119282243:web:903025b93a9ccc1ba3acf6",
  measurementId: "G-L1PH8JSSEY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const analytics = getAnalytics(app);

export const db = getFirestore(app)
