// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD492XfyX0m9nF5390-saWBOK8eeAyxTSM",
  authDomain: "goverify-cbe0f.firebaseapp.com",
  projectId: "goverify-cbe0f",
  storageBucket: "goverify-cbe0f.appspot.com",
  messagingSenderId: "65385628933",
  appId: "1:65385628933:web:f6eb08ae436bf4aef6a36c",
  measurementId: "G-4NYV2DY5EF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};