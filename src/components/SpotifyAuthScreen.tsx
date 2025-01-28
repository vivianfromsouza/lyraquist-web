import { useEffect, useState } from "react";
import { redirectToSpotifyAuthorize } from "../utils/spotifyAuth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const SpotifyAuthScreen: React.FC = () => {
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
    // const { setIsLoggedIn } = route.params;
    // let isLogInSuccessful = false;
    // const mySpotifyInfo = useSpotifyContext();
    // const discovery = {
    //   authorizationEndpoint: "https://accounts.spotify.com/authorize",
    //   tokenEndpoint: "https://accounts.spotify.com/api/token",
    // };
    // const [request, response, promptAsync] = useAuthRequest(
    //   {
    //     clientId: mySpotifyInfo.CLIENT_ID,
    //     scopes: [
    //       "user-read-email",
    //       "playlist-modify-public",
    //       "user-read-private",
    //       "user-library-read",
    //       "user-library-modify",
    //       "playlist-read-private",
    //       "streaming",
    //       "app-remote-control",
    //     ],
    //     // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
    //     // this must be set to false
    //     usePKCE: false,
    //     redirectUri: makeRedirectUri({ native: mySpotifyInfo.REDIRECT_URL }),
    //   },
    //   discovery
    // );
    // // logs user in and navigates to their dashboard
  }, []);

  return (
    <>
      <div className="bg-green w-full h-96 absolute top-0 left-0 z-0 bg-hero"></div>
      <section className="z-10 relative h-screen flex flex-col justify-center items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="mb-8 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
            Connect to Spotify
          </h1>

          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center">
            <button
              onClick={redirectToSpotifyAuthorize}
              className="text-black bg-green hover:opacity-80 transition duration-300 ease-in-out font-bold rounded-full text-md px-5 py-2.5 text-center me-2 mb-4"
            >
              Login with Spotify
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SpotifyAuthScreen;
