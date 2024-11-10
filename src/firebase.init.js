// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

//Do not share config in public
const firebaseConfig = {
  apiKey: "AIzaSyAf9up7ebRAFk4bJFp021DPXIfM3W8iffc",
  authDomain: "email-password-auth-e82b1.firebaseapp.com",
  projectId: "email-password-auth-e82b1",
  storageBucket: "email-password-auth-e82b1.firebasestorage.app",
  messagingSenderId: "977815370035",
  appId: "1:977815370035:web:7094bbca8c93ccdb266646"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);