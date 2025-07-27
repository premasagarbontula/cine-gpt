// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHb8edt800_gzYITbOAXHAgiH1GHwiLdA",
  authDomain: "netflixgpt-beb6d.firebaseapp.com",
  projectId: "netflixgpt-beb6d",
  storageBucket: "netflixgpt-beb6d.firebasestorage.app",
  messagingSenderId: "835639342878",
  appId: "1:835639342878:web:f631bc46b1b4980b407b0f",
  measurementId: "G-3FQY9GKYF3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
