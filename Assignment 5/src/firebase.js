import { initializeApp } from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKvjrTOZLs8uGhzMPfSPo4cfE9QMlpBcw",
  authDomain: "democpp-8becc.firebaseapp.com",
  projectId: "democpp-8becc",
  storageBucket: "democpp-8becc.appspot.com",
  messagingSenderId: "963991744184",
  appId: "1:963991744184:web:5c460d1aebf678f025ce4d",
  measurementId: "G-4YRNWXJEMD"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
