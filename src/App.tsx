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
import SearchScreen from "./screens/SearchScreen";
import NewWorkbookScreen from "./screens/NewWorkbookScreen";
import WorkbookInfoScreen from "./screens/WorkbookInfoScreen";
import NewWordScreen from "./screens/NewWordScreen";

const App: React.FC = () => {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignUpScreen />} />
          <Route path="Login" element={<LoginScreen />} />
          <Route path="SpotifyAuth" element={<SpotifyAuthScreen />} />
          <Route path="Home" element={<HomeScreen />} />
          <Route path="Play" element={<PlaybackScreen />} />
          <Route path="About" element={<AboutScreen />} />
          <Route path="French" element={<FrenchScreen />} />
          <Route path="German" element={<GermanScreen />} />
          <Route path="Spanish" element={<SpanishScreen />} />
          <Route path="SearchLanguages" element={<SearchLanguageScreen />} />
          <Route path="Search" element={<SearchScreen />} />
          <Route path="NewWorkbook" element={<NewWorkbookScreen />} />
          <Route path="WorkbookInfo" element={<WorkbookInfoScreen />} />
          <Route path="NewWord" element={<NewWordScreen />} />

        </Routes>
      </BrowserRouter>
    </FirebaseProvider>
  );
};

export default App;
