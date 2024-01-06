// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore, collection} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxHUloWjHGCR2Vh58QHtPmioOSzchVU9Y",
  authDomain: "react-note-3ebe3.firebaseapp.com",
  projectId: "react-note-3ebe3",
  storageBucket: "react-note-3ebe3.appspot.com",
  messagingSenderId: "480806406115",
  appId: "1:480806406115:web:a159ccfdb90b5bbed3c2d6",
  measurementId: "G-H1BSGQ13GE"
}; 

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const notesCollection = collection(db, "notes");