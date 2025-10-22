import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import SpotifyAuthScreen from "./screens/SpotifyAuthScreen";
import HomeScreen from "./screens/HomeScreen";
// import PlaybackScreen from "./screens/PlaybackScreen";
import { FirebaseProvider } from "./services/firebase/FirebaseContext";
import AboutScreen from "./screens/AboutScreen";
import FrenchScreen from "./screens/FrenchScreen";
import GermanScreen from "./screens/GermanScreen";
import SpanishScreen from "./screens/SpanishScreen";
import SearchLanguageScreen from "./screens/SearchLanguageScreen";
import SearchScreen from "./screens/SearchScreen";
import NewWorkbookScreen from "./screens/NewWorkbookScreen";
import WorkbookInfoScreen from "./screens/WorkbookInfoScreen";
import NewWordScreen from "./screens/NewWordScreen";
import PlaylistInfoScreen from "./screens/PlaylistInfoScreen";
import AboutUsScreen from "./screens/AboutUsScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import AboutPrivacy from "./screens/AboutPrivacyScreen";
import AboutThirdPartyScreen from "./screens/AboutThirdPartyScreen";
import AboutTermsConditionsScreen from "./screens/AboutTermsConditionsScreen";
import AccountSettings from "./screens/AccountSettings";
import ProfileInfoScreen from "./screens/ProfileInfoScreen";
import SettingsScreen from "./screens/SettingsScreen";
import StartScreen from "./screens/StartScreen";
import FlashcardScreen from "./screens/FlashcardsScreen";
import AddSongToPlaylistScreen from "./screens/AddSongToPlaylistScreen";
import { PlayerProvider } from "./context/PlayerContext";
import { useLocalStorage } from "usehooks-ts";
import LyricsToScreen from "./screens/LyricsToScreen";
import CreateNewPlaylistForm from "./components/CreateNewPlaylistForm";
import LocalFirebaseClient from "./services/firebase/LocalFirebaseClient";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const auth = getAuth(LocalFirebaseClient);

const PrivateRoutes = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  const [value] = useLocalStorage("isLoggedIn", isLoggedIn || "false");
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, [value]);

  return (
    <FirebaseProvider>
      <PlayerProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<HomeScreen />} />
              {/* <Route path="/play" element={<PlaybackScreen />} /> */}
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/about/welcome" element={<AboutUsScreen />} />
              <Route path="/about/privacy" element={<AboutPrivacy />} />
              <Route
                path="/about/terms"
                element={<AboutTermsConditionsScreen />}
              />
              <Route
                path="/about/third-party"
                element={<AboutThirdPartyScreen />}
              />
              <Route path="/about/feedback" element={<FeedbackScreen />} />
              <Route path="/account" element={<AccountSettings />} />
              <Route path="/settings" element={<SettingsScreen />} />
              <Route path="/settings/profile" element={<ProfileInfoScreen />} />
              <Route path="/language/french" element={<FrenchScreen />} />
              <Route path="/language/german" element={<GermanScreen />} />
              <Route path="/language/spanish" element={<SpanishScreen />} />
              <Route
                path="SearchLanguages"
                element={<SearchLanguageScreen />}
              />
              <Route path="Search" element={<SearchScreen />} />
              <Route
                path="/workbook/flashcards"
                element={<FlashcardScreen />}
              />
              <Route
                path="/workbook/newWorkbook"
                element={<NewWorkbookScreen />}
              />
              <Route path="/workbook/info" element={<WorkbookInfoScreen />} />
              <Route path="/workbook/newWord" element={<NewWordScreen />} />
              {/* <Route path="Flashcards" element={<FlashcardScreen />} /> */}
              <Route path="/playlist" element={<PlaylistInfoScreen />} />
              <Route
                path="/playlist/addSong"
                element={<AddSongToPlaylistScreen />}
              />
              <Route
                path="/playlist/create"
                element={<CreateNewPlaylistForm songItem={""} />}
              />

              <Route
                path="/play/lyrics"
                element={<LyricsToScreen currentTrack={""} />}
              />
            </Route>

            <Route
              index
              element={
                user !== null ? (
                  <HomeScreen />
                ) : (
                  <StartScreen />
                )
              }
            />
            <Route path="/signUp" element={<SignUpScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/spotifyAuth" element={<SpotifyAuthScreen />} />
          </Routes>
        </BrowserRouter>

      </PlayerProvider>
    </FirebaseProvider>
  );
};

export default App;
