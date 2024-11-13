import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import { useEffect, useState } from "react";

// Your web app's Firebase configuration
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

// Set persistence to local and monitor auth state
const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Set the auth persistence to local
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Monitor the authentication state
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setCurrentUser(user);  // User is signed in
          } else {
            setCurrentUser(null);  // User is signed out
          }
        });
        return () => unsubscribe();
      })
      .catch((error) => {
        console.error("Error setting persistence: ", error);
      });
  }, []);

  return currentUser;
};

export { auth, useAuth };
