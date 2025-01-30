import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import SpotifyAuthScreen from "./screens/SpotifyAuthScreen";
import HomeScreen from "./screens/HomeScreen";
import PlaybackScreen from "./screens/PlaybackScreen";
import { FirebaseProvider } from "./services/firebase/FirebaseContext";
import AboutScreen from "./screens/AboutScreen";
const App: React.FC = () => {
  // might need to set an observer on this to listen for changes

  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
          <Route index element={<SignUpScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="spotifyAuth" element={<SpotifyAuthScreen />} />
          <Route path="home" element={<HomeScreen />} />
          <Route
            path="playback"
            element={
              <PlaybackScreen
              // token={
              //   getSpotifyAccessCode()
              // }
              />
            }
          />
          <Route path="about" element={<AboutScreen />} />
        </Routes>
      </BrowserRouter>
    </FirebaseProvider>
  );
};

export default App;
