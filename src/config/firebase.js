// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyC4A2E-9X9g0Sr3E1nEnyZq45-JLoaGfpU",
    authDomain: "daglarapp.firebaseapp.com",
    databaseURL: "https://daglarapp-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "daglarapp",
    storageBucket: "daglarapp.appspot.com",
    messagingSenderId: "895279237815",
    appId: "1:895279237815:web:50e566d684435b5b84db32",
    measurementId: "G-D6Z6FX6FNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);