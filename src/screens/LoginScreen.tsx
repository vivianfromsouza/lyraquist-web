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

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

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
            toast(
              "Could not sign-in. Incorrect credentials. Please re-check your email address and/or password and try again."
            );
          }
        });
    }
  };

  // TODO: FIX THIS
  //   const logIn = () => {
  //       console.log("LOGGIN BUTTON");
  //       if (email && password) {
  //         try {
  //           // await response of firebase database
  //           await firebase
  //             .auth()
  //             .signInWithEmailAndPassword(email.trim(), password.trim())
  //             .then(function (firebaseUser) {
  //               // Success
  //               if (firebaseUser.user) {
  //                 console.log("TRUE");
  //                 isLogInSuccessful = true;
  //               }
  //             })
  //             .catch(function (e) {
  //               // Error Handling
  //               if (e.toString().includes("invalid-login")) {
  //                 Alert.alert(
  //                   "Could not sign-in",
  //                   "Incorrect credentials. Please re-check your email address and/or password and try again."
  //                 );
  //               }
  //             });
  //           // only run this part if the lyraquist login was successful
  //           if (isLogInSuccessful) {
  //             // await response of spotify authentication
  //             const spotifyAuthResponse = await promptAsync();
  //             if (spotifyAuthResponse?.type === "success") {
  //               setIsLoggedIn(true);
  //               // save the auth code given to user here to their firebase space
  //               UserReaderWriter.writeUserAuthCode(
  //                 spotifyAuthResponse.params.code.toString()
  //               );
  //               // NEED TO SAVE ACCESS CODE + REFRESH TO FB TOO
  //               UserReaderWriter.writeUserTimeTokenTaken(
  //                 new Date().toISOString()
  //               );
  //               // await response of spotify api access connection
  //               const spotifyAccessResponse = await SpotifyAuth.getAccessCode(
  //                 spotifyAuthResponse.params.code.toString()
  //               );
  //               // if successful, move to home page
  //               // if (isLogInSuccessful && spotifyAccessResponse) {
  //               // saves Spotify user id
  //               await SpotifyAuth.getUserId().then((userId) => {
  //                 UserReaderWriter.writeSpotifyUserId(userId);
  //               });
  //               await UserReaderWriter.getSpotifyUserId().then(async (userId) => {
  //                 await SpotifyPlaylist.getUserPlaylists(userId).then(
  //                   async (playlists) => {
  //                     htmlFor (let i = 0; i < playlists.length; i++) {
  //                       let isInPlaylistDB =
  //                         await PlaylistReaderWriter.isPlaylistInDB(
  //                           playlists[i].id
  //                         );
  //                       if (!isInPlaylistDB) {
  //                         let playID =
  //                           await PlaylistReaderWriter.createPlaylistFromSpotify(
  //                             playlists[i]
  //                           );
  //                         console.log(playlists[i].name);
  //                         await SpotifyPlaylist.downloadSongsDetails(
  //                           playID,
  //                           playlists[i].id
  //                         );
  //                       }
  //                     }
  //                   }
  //                 );
  //               });
  //             }
  //           }
  //           // }
  //         } catch (e) {
  //           window.alert("Account not found.");
  //           //   Alert.alert(
  //           //     "Account not found",
  //           //     "Please check your username or password and try again."
  //           //   );
  //         }
  //       }
  //     };

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
