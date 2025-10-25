import React, { useEffect } from "react";
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
// import PlaybackScreen from "./screens/PlaybackScreen";
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
import AddSongToPlaylistScreen from "./screens/AddSongToPlaylistScreen";
import { PlayerProvider } from "./context/PlayerContext";
import { useLocalStorage } from "usehooks-ts";
import LyricsToScreen from "./screens/LyricsToScreen";
import CreateNewPlaylistForm from "./components/CreateNewPlaylistForm";
import LanguageScreen from "./screens/LanguageScreen";

const PrivateRoutes = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn == "true" ? <Outlet /> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  const [value] = useLocalStorage("isLoggedIn", isLoggedIn || "false");

  useEffect(() => {
    console.log("useLocalStorage value:", value);
    // This effect will run after the component mounts and after every update.
    // Simulate an async operation
  }, [value]);

  return (
    <PlayerProvider>
      <FirebaseProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              {/* Do I need home here as well? */}
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
              element={value === "false" ? <StartScreen /> : <HomeScreen />}
            />
            <Route path="/signUp" element={<SignUpScreen />} />
            <Route path="/login" element={<LoginScreen />} />
          </Routes>
        </BrowserRouter>

        {/* {localStorage.getItem("isLoggedIn") == "true" ? <Player /> : <></>} */}
      </FirebaseProvider>
    </PlayerProvider>
  );
};

export default App;
