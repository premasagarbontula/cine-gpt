// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhG646hCEG0_vSmZXkvoIBETphZmBrl28",
  authDomain: "cine-gpt-c4bc8.firebaseapp.com",
  projectId: "cine-gpt-c4bc8",
  storageBucket: "cine-gpt-c4bc8.firebasestorage.app",
  messagingSenderId: "629338405410",
  appId: "1:629338405410:web:b60b47b2c74fd5d150e87b",
  measurementId: "G-L3D0G3MQHR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
