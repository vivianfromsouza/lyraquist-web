import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpScreen from "./components/SignUpScreen";
import LoginScreen from "./components/LoginScreen";

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
          <Route index element={<SignUpScreen />} />
          <Route path="login" element={<LoginScreen />} />
          {/* <Route path="contact" element={<Contact />} />*/}
        </Routes>
      </BrowserRouter>

      {/* <HeroSection></HeroSection> */}
    </React.StrictMode>
  );
};

export default App;
