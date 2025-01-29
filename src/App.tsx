import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpScreen from "./components/SignUpScreen";
import LoginScreen from "./components/LoginScreen";
import SpotifyAuthScreen from "./components/SpotifyAuthScreen";
import HomeScreen from "./components/HomeScreen";
import PlaybackScreen from "./components/PlaybackScreen";
import { FirebaseProvider } from "./services/firebase/FirebaseContext";
const App: React.FC = () => {
  return (
    <React.StrictMode>
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
                  token={
                    "BQCB_YTOhfG7kW1KYqLXmZP4JR1r7piFDjOGmoi2ugILbZMoP-0mGJL2P1JcahTX6F0BllUkUeoZZK52oGMYT5T2iH8AutqE-jkfpLZa6av8mjb79qlKlNBjOwyucxpFfGwfPEXRQ2i0SdXfbUx1PllcvjI9CpoS_fmaBnboRgPWiPx5y3mgSfjVEHXQe6GqG87hHpm5GJfRgXJ99cbVLw-fk71SJSnLr6ED9Z7zqiUVr8YncOzqEHBqtPeh3FSuhuupMrn-xFzzsdFSUlxfFXCHUqDFUUziflRiNakWdT1e4G2y-5PfXdmR1lyW8sDymRvN_dwx7lTZ"
                  }
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </FirebaseProvider>
    </React.StrictMode>
  );
};

export default App;
