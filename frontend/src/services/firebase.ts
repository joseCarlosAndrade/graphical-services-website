// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import dotenv from 'dotenv'
// dotenv.config();
// console.log("KEY:", process.env.API_KEY)

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA_CW8unJbJovox1QVIJGQRzne2nQcB82E",
    authDomain: "graphical-services-test.firebaseapp.com",
    projectId: "graphical-services-test",
    storageBucket: "graphical-services-test.appspot.com",
    messagingSenderId: "337564264216",
    appId: "1:337564264216:web:4b10f8bd406b1957c3606d",
    measurementId: "G-M1S6HCMG0P"
};

// Initialize Firebase
initializeApp(firebaseConfig)
export const auth = getAuth()