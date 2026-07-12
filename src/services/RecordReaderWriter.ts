/* eslint-disable @typescript-eslint/no-unused-vars */
import LocalSupabaseClient from "../services/LocalSupabaseClient";
import { v4 as uuidv4 } from "uuid";

const currentUser = localStorage.getItem("current_user");

const RecordReaderWriter = {
  async addSongToRecords(spotifyURL: string, playID: string) {
    const { error } = await LocalSupabaseClient.from("records").insert({
      record_id: uuidv4(),
      user_id: currentUser,
      playlist_id: playID,
      spotify_url: spotifyURL,
      is_liked: false,
    });
    console.log(error);
    return error;
  },

  async getAllPlaylistSongs(playlistID: string) {
    const { data, error } = await LocalSupabaseClient.from("records")
      .select(
        `
        playlist_id,
        record_id,
        is_liked,
        user_id,
        spotify_url,
        songs (name, artist, image_url, spotify_url, duration)
        `
      )
      .eq("playlist_id", playlistID)
      .eq("user_id", currentUser)
      .order("spotify_url", { ascending: true });

    console.log(error);

    return data;
  },

  async deleteSongFromPlaylist(recordID) {
    const { error } = await LocalSupabaseClient.from("records")
      .delete()
      .eq("record_id", recordID);
    return error;
  },

  async isSongInPlaylist(spotifyURL: string, playlistID: string) {
    const { count, status, error } = await LocalSupabaseClient.from("records")
      .select("*", { count: "exact", head: true })
      .eq("spotify_url", spotifyURL)
      .eq("playlist_id", playlistID)
      .eq("user_id", currentUser);
    console.log(error);
    console.log(status);

    if (count! > 0) {
      return true;
    }
    return false;
  },
};

export default RecordReaderWriter;