// Worked on by: Vivian D'Souza
import LocalSupabaseClient from "../services/LocalSupabaseClient";
import { v4 as uuidv4 } from "uuid";
import SongReaderWriter from "./SongReaderWriter";

const currentUser = localStorage.getItem("current_user");

const HistoryReaderWriter = {
  async getUserHistory() {
    const { data, error } = await LocalSupabaseClient.from("history")
      .select(
        `
    spotify_url,
    songs (name, artist, album, image_url, duration, spotify_url)
    `
      )
      .eq("user_id", currentUser)
      .order("num", { ascending: false });
    console.log(error);
    return data;
  },

  async addUserHistory(spotifyURL: string) {
    // check if that song is in the list of current entries for that user

    // check if there are even 10 entries for that user

    //checks how mnay entries for this particular song under this particular user exist

    // scenarios:
    // song already in list. list not full
    // song already in list. list  full

    const { count, error } = await LocalSupabaseClient.from("history")
      .select("*", { count: "exact", head: true })
      .eq("spotify_url", spotifyURL)
      .eq("user_id", currentUser);
    console.log(error);

    // song in list already
    if (count! > 0) {
      const { data, count } = await LocalSupabaseClient.from("history")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", currentUser);

      console.log(data);

      const numOfEntries = count;

      if (numOfEntries! >= 10) {
        const { data, error } = await LocalSupabaseClient.from("history")
          .update({ num: 10 })
          .eq("spotify_url", spotifyURL)
          .eq("user_id", currentUser);
        console.log(data);

        if (error == null) {
          const { data, error } = await LocalSupabaseClient.rpc("decrement", {
            x: 1,
            user_id: currentUser,
          });
          console.log(data);
          console.log(error);
        }
      } else {
        const { data, error } = await LocalSupabaseClient.from("history")
          .update({ num: count! + 1 })
          .eq("spotify_url", spotifyURL)
          .eq("user_id", currentUser);
        console.log(data);

        if (error == null) {
          const { data, error } = await LocalSupabaseClient.rpc("decrement", {
            x: 1,
            user_id: currentUser,
          });
          console.log(data);
          console.log(error);
        }
      }
    } else {
      // song not in list
      const { data, count } = await LocalSupabaseClient.from("history")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", currentUser);
      console.log(data);

      const numOfEntries = count;

      //list is full
      if (numOfEntries! >= 10) {
        const { error } = await LocalSupabaseClient.from("history")
          .delete()
          .eq("user_id", currentUser)
          .eq("num", 10);

        if (error == null) {
          const { data, error } = await LocalSupabaseClient.rpc("increment", {
            x: 1,
            user_id: currentUser,
          });
          console.log(data);
          console.log(error);
        }

        this.insertHistory(spotifyURL, 1);
      } else {
        // list is not full
        this.insertHistory(spotifyURL, numOfEntries! + 1);
      }
    }
  },

  async insertHistory(spotifyURL: string, numOfEntries: number) {
    const { error } = await LocalSupabaseClient.from("history").insert({
      history_id: uuidv4(),
      user_id: currentUser,
      spotify_url: spotifyURL,
      num: numOfEntries,
    });

    console.log(error);
  },

  async isSongInHistory(spotifyURL: string) {
    const { count, error } = await LocalSupabaseClient.from("history")
      .select("*", { count: "exact", head: true })
      .eq("spotify_url", spotifyURL);

    console.log(error);
    if (count! > 0) {
      return true;
    }

    return false;
  },

  async getLastPlayedSong() {
    const { data, error } = await LocalSupabaseClient.from("history")
      .select(
        `
    spotify_url
    `
      )
      .eq("user_id", currentUser)
      .eq("num", 1)
      .single();

    console.log(data);
    console.log(error);

    // const url = SongReaderWriter.getSongURL(data!["song_id"]);
    return data!["spotify_url"];
  },
};
export default HistoryReaderWriter;
