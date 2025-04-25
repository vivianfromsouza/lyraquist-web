import React from "react";
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
import PlaybackScreen from "./screens/PlaybackScreen";
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
import PrivacyScreen from "./screens/PrivacySocials";
import AccountSettings from "./screens/AccountSettings";
import ProfileInfoScreen from "./screens/ProfileInfoScreen";
import SettingsScreen from "./screens/SettingsScreen";
import StartScreen from "./screens/StartScreen";
import FlashcardScreen from "./screens/FlashcardsScreen";
import Player from "./components/Player";

const PrivateRoutes = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn == "true" ? <Outlet /> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");

 
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            {/* Do I need home here as well? */}
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/play" element={<PlaybackScreen />} />
            <Route path="/privacy" element={<PrivacyScreen />} />
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
            <Route path="/account/" element={<AccountSettings />} />
            <Route path="/settings/" element={<SettingsScreen />} />
            <Route path="/settings/profile" element={<ProfileInfoScreen />} />
            <Route path="/language/french" element={<FrenchScreen />} />
            <Route path="/language/german" element={<GermanScreen />} />
            <Route path="/language/spanish" element={<SpanishScreen />} />
            <Route path="SearchLanguages" element={<SearchLanguageScreen />} />
            <Route path="Search" element={<SearchScreen />} />
            <Route path="/workbook/flashcards" element={<FlashcardScreen />} />
            <Route
              path="/workbook/newWorkbook"
              element={<NewWorkbookScreen />}
            />
            <Route path="/workbook/info" element={<WorkbookInfoScreen />} />
            <Route path="/workbook/newWord" element={<NewWordScreen />} />
            {/* <Route path="Flashcards" element={<FlashcardScreen />} /> */}
            <Route path="PlaylistInfo" element={<PlaylistInfoScreen />} />
          </Route>

          <Route
            index
            element={isLoggedIn == "false" ? <StartScreen /> : <HomeScreen />}
          />
          <Route path="/signUp" element={<SignUpScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/spotifyAuth" element={<SpotifyAuthScreen />} />
        </Routes>
      </BrowserRouter>

      {localStorage.getItem("isLoggedIn") == "true" ? <Player /> : <></>}
    </FirebaseProvider>
  );
};

export default App;