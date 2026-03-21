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
import HomeScreen from "./screens/HomeScreen";
import { FirebaseProvider } from "./services/firebase/FirebaseContext";
import AboutScreen from "./screens/AboutScreen";
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
import ReauthCredentialsScreen from "./screens/ReauthCredentialsScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import AddSongToPlaylistScreen from "./screens/AddSongToPlaylistScreen";
import { PlayerProvider } from "./context/PlayerContext";
import LyricsPanel from "./components/LyricsPanel";
import CreateNewPlaylistForm from "./components/CreateNewPlaylistForm";
import LanguageScreen from "./screens/LanguageScreen";
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
    // const { isAuthenticated, loading } = useFirebaseAuth();

  // const [value] = useLocalStorage("isLoggedIn", isLoggedIn || "false");
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  return (
    <FirebaseProvider>
      <PlayerProvider isAuthenticated={user !== null}>
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
              <Route
                path="/language/german"
                element={
                  <LanguageScreen
                    albumId={"6zLZxgKlwFf3C755i2Phmx"}
                    language={"German"}
                  />
                }
              />

              <Route
                path="/language/french"
                element={
                  <LanguageScreen
                    albumId={"66JJFBtXNd77jLE7Cm6rGo"}
                    language={"French"}
                  />
                }
              />

              <Route
                path="/language/spanish"
                element={
                  <LanguageScreen
                    albumId={"1aUgRQqdbCliLVgktVY1yG"}
                    language={"Spanish"}
                  />
                }
              />
              <Route
                path="/settings/reauth"
                element={<ReauthCredentialsScreen />}
              />
              <Route
                path="/settings/change-password"
                element={<ChangePasswordScreen />}
              />

              <Route path="/language/french" element={<LanguageScreen albumId={"3eZtF5y5PJX4YpexhHC8dG"} language={"french"}/>} />
              <Route path="/language/german" element={<LanguageScreen albumId={"6zLZxgKlwFf3C755i2Phmx"} language={"german"}/>} />
              <Route path="/language/spanish" element={<LanguageScreen albumId={"1aUgRQqdbCliLVgktVY1yG"} language={"spanish"}/>} />
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
                element={<LyricsPanel currentTrack={""} />}
              />
            </Route>

            <Route
              index
              element={user !== null ? <HomeScreen /> : <StartScreen />}
            />
            <Route path="/signUp" element={<SignUpScreen />} />
            <Route path="/login" element={<LoginScreen />} />
          </Routes>
        </BrowserRouter>
      </PlayerProvider>
    </FirebaseProvider>
  );
};

export default App;
