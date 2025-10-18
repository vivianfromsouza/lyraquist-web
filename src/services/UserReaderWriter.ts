import {
  deleteUser,
  getAuth,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import LocalSupabaseClient from "../services/LocalSupabaseClient";
import LocalFirebaseClient from "./firebase/LocalFirebaseClient";
import { getDatabase, ref, set } from "firebase/database";
import { faSignLanguage } from "@fortawesome/free-solid-svg-icons";

const currentUser = localStorage.getItem("current_user");
const auth = getAuth(LocalFirebaseClient);
const db = getDatabase();
const newTableRef = ref(db, "tokens");

const UserReaderWriter = {
  async createProfile(
    userId: string,
    name: string,
    email: string,
    password: string,
    preferredLanguage: string,
    targetLanguage: string
  ): Promise<boolean> {
    const { error } = await LocalSupabaseClient.from("users").insert({
      user_id: userId,
      current_track: "1kCewNSs909Xj1naXr36X8",
      email: email,
      name: name,
      password: password,
      preferred_language: preferredLanguage,
      target_language: targetLanguage,
      spotify_user: "",
    });
    console.log(error);

    return false;
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
        console.log(error);
        console.log("email sent");
        return true;
      })
      .catch((error: string) => {
        console.log(error);
        return false;
      });

    return true;
  },

  // async writeUserPassword(newPassword: string) {
  //   updatePassword(auth.currentUser!, newPassword)
  //     .then(async () => {
  //       // Password updated successfully
  //       const { error } = await LocalSupabaseClient.from("users")
  //         .update({ password: newPassword })
  //         .eq("user_id", currentUser);
  //       console.log("Password updated!");
  //       console.log(error);

  //       return true;
  //     })
  //     .catch((error: string) => {
  //       // An error happened.
  //       console.error(error);
  //       return false;
  //     });
  //   return true;
  // },

  async getPreferredLanguage() {
    const { data } = await LocalSupabaseClient.from("users")
      .select("preferred_language")
      .eq("user_id", currentUser)
      .single()
      .throwOnError();
    return data["preferred_language"];
  },

  async setPreferredLanguage(lang: (string | undefined)) {
    const { error } = await LocalSupabaseClient.from("users")
      .update({ preferred_language: lang })
      .eq("user_id", currentUser);
    return error;
  },

  async getTargetLanguage() {
    const { data } = await LocalSupabaseClient.from("users")
      .select("target_language")
      .eq("user_id", currentUser)
      .single()
      .throwOnError();
    return data["target_language"];
  },

    async setTargetLanguage(lang: string | undefined) {
    const { error } = await LocalSupabaseClient.from("users")
      .update({ target_language: lang })
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
        songs (spotify_url, name, album, artist, image_url, duration)
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
      .eq("user_id", currentUser)
      .single();
      console.log("data", data)
    console.log(error);
    return data;
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
    deleteUser(auth.currentUser!)
      .then(() => {
        console.log("User deleted successfully");
      })
      .catch((error) => {
       console.log("Error deleting user:", error);
      });
      
    const response = await LocalSupabaseClient.from("users")
      .delete()
      .eq("user_id", currentUser);
    return response;
  },

  async makeTable() {
    set(newTableRef, {
      field1: "value1",
      field2: "value2",
      field3: "value3",
    })
      .then(() => {
        console.log("New table created successfully!");
      })
      .catch((error) => {
        console.error("Error creating table:", error);
      });
  },
};
export default UserReaderWriter;
