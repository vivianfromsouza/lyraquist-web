import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ArrowBackOutline } from "react-ionicons";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import fullLogo from "../assets/Full_Logo.png";
import { ImageSourcePropType } from "react-native";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Pressable, TextInput, View, Image, Text } from "react-native";
import {
  getSpotifyAccessCode,
  getSpotifyAuthCode,
  redirectToSpotifyAuthorize,
} from "../services/spotifyAuth";
import loginStyles from "../styles/LoginStyles";
import ChangeNotification from "../components/ChangeNotification";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  function invalidSigninNotification() {
    return (
      <ChangeNotification
        text={
          "Could not sign-in. Incorrect credentials. Please re-check your email address and/or password and try again."
        }
      />
    );
  }

  const handleLyraquistLogIn = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();

    if (email && password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user.uid;
          localStorage.setItem("current_user", user);
          redirectToSpotifyAuthorize();
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          if (error.message.toString().includes("invalid")) {
            toast(invalidSigninNotification, {
              autoClose: 5000,
            });
          }
        });
    }
  };
  
  useEffect(() => {
    getSpotifyAuthCode();
    getSpotifyAccessCode();
  }, []);

  return (
    <>
      <View style={loginStyles.container}>
        <Pressable
          style={loginStyles.arrowLocation}
          onPress={() => navigate("/")}
        >
          <ArrowBackOutline color={"#00000"} height="25px" width="25px" />
        </Pressable>
        <View style={loginStyles.content}>
          <View style={loginStyles.info}>
            <Image
              style={loginStyles.circle}
              source={fullLogo as ImageSourcePropType}
            />
            <Text style={loginStyles.title}>LYRAQUIST</Text>
            <View style={loginStyles.inputOutline}>
              <View style={loginStyles.inputPadding}>
                <EmailOutlinedIcon style={loginStyles.icon} />
                <TextInput
                  accessibilityLabel="username"
                  placeholder="Email                                         "
                  placeholderTextColor="#e8e1db"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  inputMode="email"
                  style={loginStyles.inputTxt}
                />
              </View>
            </View>

            <View style={loginStyles.inputOutline}>
              <View style={loginStyles.inputPadding}>
                <LockOutlinedIcon style={loginStyles.icon} />
                <TextInput
                  accessibilityLabel="password"
                  placeholder="Password                                         "
                  placeholderTextColor="#e8e1db"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={loginStyles.inputTxt}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={loginStyles.loginLocation}>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleLyraquistLogIn}
            style={loginStyles.loginBtn}
          >
            <ToastContainer />
            Login
          </button>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;