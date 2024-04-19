import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebase";

initializeApp(firebaseConfig)
export const auth = getAuth()