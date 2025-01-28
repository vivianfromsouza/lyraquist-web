import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpScreen from "./components/SignUpScreen";
import LoginScreen from "./components/LoginScreen";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import SpotifyAuthScreen from "./components/SpotifyAuthScreen";


const App: React.FC = () => {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);

  return (
    <React.StrictMode>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<Layout />}> */}
            <Route index element={<SignUpScreen />} />
            <Route path="login" element={<LoginScreen />} />
            <Route path="spotifyAuth" element={<SpotifyAuthScreen />} />
            {/* <Route path="contact" element={<Contact />} />*/}
          </Routes>
        </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
