// Worked on by: Vivian D'Souza
import LocalSupabaseClient from "../services/LocalSupabaseClient";
import { v4 as uuidv4 } from "uuid";


const currentUser = localStorage.getItem("current_user");

const UserReaderWriter = {
  
  // creatProfile(response, name, email, password, birthDate, preferredLanguage):
  // upon sign-up, takes the successful Firebase User Credential response and make a new user node in db
//   async createProfile(
//     userId,
//     name,
//     email,
//     password,
//     preferredLanguage
//   ): Promise<boolean> {
//     const { error } = await LocalSupabaseClient.from("users").insert({
//       user_id: userId,
//       access_code: "",
//       auth_code: "",
//       current_track: "1kCewNSs909Xj1naXr36X8",
//       email: email,
//       name: name,
//       password: password,
//       preferred_language: preferredLanguage,
//       refresh_token: "",
//       time_token_taken: "",
//       spotify_user: "",
//     });

//     return false;
//   },

  // writeUserAuthCode(authCode): saves the given Spotify Auth Code to a user's db node, after their Spotify account has been linked
  // to their Lyraquist account
  async writeUserAuthCode(authCode : string) {
    const { error } = await LocalSupabaseClient.from("users")
      .update({ auth_code: authCode })
      .eq("user_id", currentUser);
    return error;
  },

  // getUserAuthCode(): gets a user's current Spotify auth code
  async getUserAuthCode(): Promise<string> {
    const { data } = await LocalSupabaseClient.from("users")
      .select("auth_code")
      .eq("user_id", currentUser)
      .single()
      .throwOnError();
    return data["auth_code"];
  },

  // writeUserAccessCode(accessCode): saves the given Spotify Access Code to a user's db node
  async writeUserAccessCode(accessCode : string) {
    const { error } = await LocalSupabaseClient.from("users")
      .update({ access_code: accessCode })
      .eq("user_id", currentUser);
    return error;
  },

  // getUserAccessCode(): gets a user's given Spotify access code, needed to make any API calls
  async getUserAccessCode(): Promise<string> {
    const { data } = await LocalSupabaseClient.from("users")
      .select("access_code")
      .eq("user_id", currentUser)
      .single()
      .throwOnError();
    return data["access_code"];
  },

  // writeUserRefreshToken(refreshToken): saves the given Spotify Refresh token to a user's db node
  async writeUserRefreshToken(refreshToken : string) {
    const { error } = await LocalSupabaseClient.from("users")
      .update({ refresh_token: refreshToken })
      .eq("user_id", currentUser);
    return error;
  },

  // getUserRefreshToken(): gets a user's given Spotify refresh token, needed to refresh access code (this expires after an hour)
  async getUserRefreshToken(): Promise<string> {
    const { data } = await LocalSupabaseClient.from("users")
      .select("refresh_token")
      .eq("user_id", currentUser)
      .single()
      .throwOnError();
    return data["refresh_token"];
  },

  // writeUserTimeTokenTaken(timeTokenTaken): saves the time at which the access token was last updated
  async writeUserTimeTokenTaken(timeTokenTaken : string) {
    const { error } = await LocalSupabaseClient.from("users")
      .update({ time_token_taken: timeTokenTaken })
      .eq("user_id", currentUser);
    return error;
  },

  // getUserTimeTokenTaken(): gets the time at which the access token was last updated, used to calculate
  // if a new access token should be generated
  async getUserTimeTokenTaken(): Promise<string> {
    const { data } = await LocalSupabaseClient.from("users")
      .select("time_token_taken")
      .eq("user_id", currentUser)
      .single()
      .throwOnError();
    return data["time_token_taken"];
  },

  // getUserName(): gets a user's name
  async getUserName() {
    const { data } = await LocalSupabaseClient.from("users")
      .select("name")
      .eq("user_id", currentUser)
      .single()
      .throwOnError();
    return data["name"];
  },

  // writeUserName(newName): updates a user's name
  async writeUserName(newName : string) {
    const { error } = await LocalSupabaseClient.from("users")
      .update({ name: newName })
      .eq("user_id", currentUser);
    return error;
  },

  // getUserEmail(): gets a user's email
//   async getUserEmail() {
//     const { data } = await LocalSupabaseClient.from("users")
//       .select("email")
//       .eq("user_id", auth().currentUser.uid)
//       .single()
//       .throwOnError();
//     return data["email"];
//   },

//   // writeUserEmail(newEmail): updates a user's email
//   async writeUserEmail(newEmail) {
//     // TODO: VERIFY UPDATE NOW FOR SUPABASE
//     auth().currentUser.verifyBeforeUpdateEmail(newEmail);
//     const { error } = await LocalSupabaseClient.from("users")
//       .update({ email: newEmail })
//       .eq("user_id", auth().currentUser.uid);
//     return error;
//   },

//   // writeUserPassword(newPassword): updates a user's password
//   async writeUserPassword(newPassword) {
//     auth()
//       .currentUser.updatePassword(newPassword)
//       .then(async () => {
//         // Password updated successfully
//         const { error } = await LocalSupabaseClient.from("users")
//         .update({ password: newPassword })
//         .eq("user_id", auth().currentUser.uid); 
//         console.log("Password updated!");
//         return true
//       })
//       .catch((error) => {
//         // An error happened.
//         console.error(error);
//         return false
//       });
//       return true
//   },

//   // getPreferredLanguage() : gets the user's preferred language
//   async getPreferredLanguage() {
//     const { data } = await LocalSupabaseClient.from("users")
//       .select("preferred_language")
//       .eq("user_id", auth().currentUser.uid)
//       .single()
//       .throwOnError();
//     return data["preferred_language"];
//   },

//   // changePreferredLanguage(lang) : sets the user's preferred language to @lang
//   async setPreferredLanguage(lang) {
//     const { error } = await LocalSupabaseClient.from("users")
//       .update({ preferred_language: lang })
//       .eq("user_id", auth().currentUser.uid);
//     return error;
//   },

//   async getCurrentTrack() {
//     const { data } = await LocalSupabaseClient.from("users")
//       .select("current_track")
//       .eq("user_id", auth().currentUser.uid)
//       .single()
//       .throwOnError();
//     return data["current_track"];
//   },

//   //PROBLEM!!
//   async getCurrentTrackDetails() {
//     const { data } = await LocalSupabaseClient.from("users")
//       .select(
//         `
//         current_track,
//         user_id,
//         songs (spotify_url, song_id, name, album, artist, image_url, duration)
//         `
//       )
//       .eq("user_id", auth().currentUser.uid)
//       .single()
//       .throwOnError();
//     return data;
//   },

//   // writeUserName(newName): updates a user's name
//   async writeCurrentTrack(newTrack) {
//     const { error } = await LocalSupabaseClient.from("users")
//       .update({ current_track: newTrack })
//       .eq("user_id", auth().currentUser.uid);
//     return error;
//   },

//   // getSpotifyUserId() : gets the user's spotify user id
//   async getSpotifyUserId() {
//     const { data, error } = await LocalSupabaseClient.from("users")
//       .select("spotify_user")
//       .eq("user_id", auth().currentUser.uid);
//     return data["spotify_user"];
//   },

//   // writeUserSpotifyId(username): saves the given Spotify username to a user's db node
//   async writeSpotifyUserId(spotifyUser) {
//     const { error } = await LocalSupabaseClient.from("users")
//       .update({ spotify_user: spotifyUser })
//       .eq("user_id", auth().currentUser.uid);
//     return error;
//   },

//   async getUser(): Promise<object> {
//     const { data } = await LocalSupabaseClient.from("users")
//       .select()
//       .eq("user_id", auth().currentUser.uid)
//       .single()
//       .throwOnError();
//     return data;
//   },

//   // deleteAccount(), deletes current user's account from db
//   async deleteAccount() {
//     const response = await LocalSupabaseClient.from("users")
//       .delete()
//       .eq("user_id", auth().currentUser.uid);
//     return response;
//   },
};
export default UserReaderWriter;
