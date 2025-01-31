import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import SpotifyAuthScreen from "./screens/SpotifyAuthScreen";
import HomeScreen from "./screens/HomeScreen";
import PlaybackScreen from "./screens/PlaybackScreen";
import { FirebaseProvider } from "./services/firebase/FirebaseContext";
import AboutScreen from "./screens/AboutScreen";
import FrenchScreen from "./screens/FrenchScreen";
import GermanScreen from "./screens/GermanScreen";
import SpanishScreen from "./screens/SpanishScreen";
import SearchLanguageScreen from "./screens/SearchLanguageScreen";

const App: React.FC = () => {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignUpScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="spotifyAuth" element={<SpotifyAuthScreen />} />
          <Route path="home" element={<HomeScreen />} />
          <Route path="playback" element={<PlaybackScreen />} />
          <Route path="about" element={<AboutScreen />} />
          <Route path="French" element={<FrenchScreen />} />
          <Route path="German" element={<GermanScreen />} />
          <Route path="Spanish" element={<SpanishScreen />} />
          <Route path="searchLanguages" element={<SearchLanguageScreen />} />
        </Routes>
      </BrowserRouter>
    </FirebaseProvider>
  );
};

export default App;
