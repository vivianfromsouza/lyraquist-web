import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ArrowBackOutline } from "react-ionicons";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import fullLogo from "../assets/Full_Logo.png";
import { ImageSourcePropType } from "react-native";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
  Pressable,
  TextInput,
  View,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import {
  getSpotifyAccessCode,
  getSpotifyAuthCode,
  redirectToSpotifyAuthorize,
} from "../services/spotifyAuth";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLyraquistLogIn = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault(); // Prevents default form submission

    if (email && password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user.uid;
          localStorage.setItem("current_user", user);
          redirectToSpotifyAuthorize();
          //navigate("/SpotifyAuth");
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
      <View style={styles.container}>
        <Pressable
          style={{
            alignSelf: "flex-start",
            justifyContent: "flex-start",
            marginTop: 60,
            marginLeft: 20,
          }}
          onPress={() => navigate("/")}
        >
          {/* <Ionicons style={{}} name="arrow-back" size={42} color="#e8e1db" /> */}
          <ArrowBackOutline color={"#00000"} height="25px" width="25px" />
        </Pressable>
        <View style={styles.content}>
          <View style={styles.info}>
            <Image
              style={styles.circle}
              source={fullLogo as ImageSourcePropType}
            />
            <Text>LYRAQUIST</Text>

            <View
              style={{
                marginTop: 5,
                marginVertical: 3,
                borderWidth: 1,
                alignItems: "center",
                borderColor: "#e8e1db",
                borderRadius: 10,
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 5,
                  alignItems: "center",
                  marginLeft: 4,
                }}
              >
                <EmailOutlinedIcon />
                {/* 
                <MaterialCommunityIcons
                  style={{ marginLeft: 5 }}
                  name="email-outline"
                  size={25}
                  color="#e8e1db"
                /> */}
                <TextInput
                  accessibilityLabel="username"
                  placeholder="Email                                         "
                  placeholderTextColor="#e8e1db"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  inputMode="email"
                  style={{ marginHorizontal: 10, fontSize: 17, width: "100%" }}
                />
              </View>
            </View>

            <View
              style={{
                marginTop: 5,
                marginVertical: 3,
                borderWidth: 1,
                alignItems: "center",
                borderColor: "#e8e1db",
                borderRadius: 10,
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 5,
                  alignItems: "center",
                  marginLeft: 4,
                }}
              >
                {/* <Feather
                  style={{ marginLeft: 5 }}
                  name="lock"
                  size={24}
                  color="#e8e1db"
                /> */}
                <LockOutlinedIcon />
                <TextInput
                  accessibilityLabel="password"
                  placeholder="Password                                         "
                  placeholderTextColor="#e8e1db"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={{ marginHorizontal: 10, fontSize: 17, width: "100%" }}
                />
              </View>
            </View>
          </View>
          {/* THIS WONT WORK WITH TOAST NOTIFICATIONS. <Pressable
            style={{
              marginTop: 5,
              marginVertical: 3,
              alignItems: "center",
              backgroundColor: "#ff4a2a",
              borderRadius: 10,
              alignSelf: "center",
            }}
            accessibilityLabel="loginButton"
            onPress={handleLyraquistLogIn}
          >
            <Text> Log In </Text>
          </Pressable> */}
        </View>
      </View>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleLyraquistLogIn}
        data-testid="login-button"
      >
        <ToastContainer />
        Login
      </button>
    </>
    // <>
    //   <div className="bg-green w-full h-96 absolute top-0 left-0 z-0 bg-hero"></div>
    //   <section className="z-10 relative h-screen flex flex-col justify-center items-center">
    //     <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
    //       <h1 className="mb-8 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
    //         Login
    //       </h1>

    //       <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center">
    //         <form className="max-w-sm mx-auto">
    //           <div className="mb-5">
    //             <label
    //               htmlFor="email"
    //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               Your email
    //             </label>
    //             <input
    //               type="email"
    //               id="email"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //               placeholder=""
    //               required
    //             />
    //           </div>
    //           <div className="mb-5">
    //             <label
    //               htmlFor="password"
    //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               Your password
    //             </label>
    //             <input
    //               type="password"
    //               id="password"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //               required
    //             />
    //           </div>
    //           <button
    //             type="submit"
    //             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //             onClick={handleLyraquistLogIn}
    //           >
    //             <ToastContainer />
    //             Login
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   </section>
    // </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edc526",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginHorizontal: 100,
  },
  circle: {
    height: 190,
    width: 190,
    marginBottom: -30,
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "900",
    color: "#303248",
    marginBottom: 15,
  },
  logIn: {
    marginTop: 5,
    textAlign: "center",
    flexDirection: "row",
    backgroundColor: "#ff4a2a",
    borderRadius: 20,
    alignSelf: "center",
  },
});

export default LoginScreen;
