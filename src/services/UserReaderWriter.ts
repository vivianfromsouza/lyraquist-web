// Worked on by: Vivian D'Souza
import {
  getAuth,
  updatePassword,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import LocalSupabaseClient from "../services/LocalSupabaseClient";
import LocalFirebaseClient from "./firebase/LocalFirebaseClient";

const currentUser = localStorage.getItem("current_user");
const auth = getAuth(LocalFirebaseClient);

const UserReaderWriter = {
  async createProfile(
    userId: string,
    name: string,
    email: string,
    password: string,
    preferredLanguage: string
  ): Promise<boolean> {
    const { error } = await LocalSupabaseClient.from("users").insert({
      user_id: userId,
      access_code: "",
      auth_code: "",
      current_track: "1kCewNSs909Xj1naXr36X8",
      email: email,
      name: name,
      password: password,
      preferred_language: preferredLanguage,
      refresh_token: "",
      time_token_taken: "",
      spotify_user: "",
    });
    console.log(error);

    return false;
  },

  async writeUserAuthCode(authCode: string) {
    const { error } = await LocalSupabaseClient.from("users")
      .update({ auth_code: authCode })
      .eq("user_id", currentUser);
    return error;
  },

  async getUserAuthCode(): Promise<string> {
    const { data } = await LocalSupabaseClient.from("users")
      .select("auth_code")
      .eq("user_id", currentUser)
      .single()
      .throwOnError();
    return data["auth_code"];
  },

  async writeUserAccessCode(accessCode: string) {
    const { error } = await LocalSupabaseClient.from("users")
      .update({ access_code: accessCode })
      .eq("user_id", currentUser);
    return error;
  },

  async getUserAccessCode(): Promise<string> {
    const { data } = await LocalSupabaseClient.from("users")
      .select("access_code")
      .eq("user_id", currentUser)
      .single()
      .throwOnError();
    return data["access_code"];
  },

  async writeUserRefreshToken(refreshToken: string) {
    const { error } = await LocalSupabaseClient.from("users")
      .update({ refresh_token: refreshToken })
      .eq("user_id", currentUser);
    return error;
  },

  async getUserRefreshToken(): Promise<string> {
    const { data } = await LocalSupabaseClient.from("users")
      .select("refresh_token")
      .eq("user_id", currentUser)
      .single()
      .throwOnError();
    return data["refresh_token"];
  },

  async writeUserTimeTokenTaken(timeTokenTaken: string) {
    const { error } = await LocalSupabaseClient.from("users")
      .update({ time_token_taken: timeTokenTaken })
      .eq("user_id", currentUser);
    return error;
  },

  async getUserTimeTokenTaken(): Promise<string> {
    const { data } = await LocalSupabaseClient.from("users")
      .select("time_token_taken")
      .eq("user_id", currentUser)
      .single()
      .throwOnError();
    return data["time_token_taken"];
  },

  async getUserName() {
    const { data } = await LocalSupabaseClient.from("users")
      .select("name")
      .eq("user_id", currentUser)
      .single()
      .throwOnError();
    return data["name"];
  },

  async writeUserName(newName: string) {
    const { error } = await LocalSupabaseClient.from("users")
      .update({ name: newName })
      .eq("user_id", currentUser);
    return error;
  },

  async getUserEmail() {
    const { data } = await LocalSupabaseClient.from("users")
      .select("email")
      .eq("user_id", currentUser)
      .single()
      .throwOnError();
    return data["email"];
  },

  async writeUserEmail(newEmail: string) {
    verifyBeforeUpdateEmail(auth.currentUser!, newEmail)
      .then(async () => {
        const { error } = await LocalSupabaseClient.from("users")
          .update({ email: newEmail })
          .eq("user_id", currentUser);
        console.log("email sent");
        return true;
      })
      .catch((error: string) => {
        console.log(error);
        return false;
      });

    return true;
  },

  async writeUserPassword(newPassword: string) {
    updatePassword(auth.currentUser!, newPassword)
      .then(async () => {
        // Password updated successfully
        const { error } = await LocalSupabaseClient.from("users")
          .update({ password: newPassword })
          .eq("user_id", currentUser);
        console.log("Password updated!");
        return true;
      })
      .catch((error: string) => {
        // An error happened.
        console.error(error);
        return false;
      });
    return true;
  },

  async getPreferredLanguage() {
    const { data } = await LocalSupabaseClient.from("users")
      .select("preferred_language")
      .eq("user_id", currentUser)
      .single()
      .throwOnError();
    return data["preferred_language"];
  },

  async setPreferredLanguage(lang: string) {
    const { error } = await LocalSupabaseClient.from("users")
      .update({ preferred_language: lang })
      .eq("user_id", currentUser);
    return error;
  },

  async getCurrentTrack() {
    const { data } = await LocalSupabaseClient.from("users")
      .select("current_track")
      .eq("user_id", currentUser)
      .single()
      .throwOnError();
    return data["current_track"];
  },

  //PROBLEM!!
  async getCurrentTrackDetails() {
    const { data } = await LocalSupabaseClient.from("users")
      .select(
        `
        current_track,
        user_id,
        songs (spotify_url, song_id, name, album, artist, image_url, duration)
        `
      )
      .eq("user_id", currentUser)
      .single()
      .throwOnError();
    return data;
  },

  async writeCurrentTrack(newTrack: string) {
    const { error } = await LocalSupabaseClient.from("users")
      .update({ current_track: newTrack })
      .eq("user_id", currentUser);
    return error;
  },

  async getSpotifyUserId() {
    const { data, error } = await LocalSupabaseClient.from("users")
      .select("spotify_user")
      .eq("user_id", currentUser);
    console.log(error);

    return data!["spotify_user"];
  },

  async writeSpotifyUserId(spotifyUser: string) {
    const { error } = await LocalSupabaseClient.from("users")
      .update({ spotify_user: spotifyUser })
      .eq("user_id", currentUser);
    return error;
  },

  async getUser(): Promise<object> {
    const { data } = await LocalSupabaseClient.from("users")
      .select()
      .eq("user_id", currentUser)
      .single()
      .throwOnError();
    return data;
  },

  async deleteAccount() {
    const response = await LocalSupabaseClient.from("users")
      .delete()
      .eq("user_id", currentUser);
    return response;
  },
};
export default UserReaderWriter;
