// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//Aut kurulumu için importlar

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Kimlik Doğrulama hizmetinin referansını alı
export const auth = getAuth(app);

//Google sağlayıcısının kurulumu
export const provider = new GoogleAuthProvider();

// veritbanının referansını al
export const db = getFirestore(app);
