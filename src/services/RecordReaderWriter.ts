/* eslint-disable @typescript-eslint/no-unused-vars */
// Worked on by: Vivian D'Souza
import LocalSupabaseClient from "../services/LocalSupabaseClient";
import { v4 as uuidv4 } from "uuid";
import SongReaderWriter from "./SongReaderWriter";

const currentUser = localStorage.getItem("current_user");

const RecordReaderWriter = {
  async getMySongs() {
    const { data } = await LocalSupabaseClient.from("records")
      .select(
        `
        record_id,
        is_liked,
        songs (spotify_url, name, artist, album, image_url, duration)
        `
      )
      .eq("user_id", currentUser)
      .eq("is_liked", true)
      .throwOnError();
    return data;
  },

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
        songs (name, artist, image_url, spotify_url, duration)
        `
      )
      .eq("playlist_id", playlistID)
      .eq("user_id", currentUser)
      .order("spotify_url", { ascending: true });

    console.log(error);

    return data;
  },

  async deleteSongFromRecords(spotifyURL: string) {
    const { error } = await LocalSupabaseClient.from("records")
      .delete()
      .eq("spotify_url", spotifyURL)
      .eq("user_id", currentUser);
    return error;
  },

  async deleteSongFromPlaylist(recordID) {
    const { error } = await LocalSupabaseClient.from("records")
      .delete()
      .eq("record_id", recordID);
    return error;
  },


  async likeSongByURL(spotifyURL: string, songDetails) {
    if (!(await SongReaderWriter.isSongInDB(spotifyURL))) {
      SongReaderWriter.addSongToDBFromSpotifyTrack(songDetails);
    }

    if (await this.isSongInRecords(spotifyURL)) {
      const { error } = await LocalSupabaseClient.from("records")
        .update({ is_liked: true })
        .eq("spotify_url", spotifyURL)
        .eq("user_id", currentUser);
      return error;
    } else {
      const { error } = await LocalSupabaseClient.from("records").insert({
        record_id: uuidv4(),
        user_id: currentUser,
        playlist_id: null,
        spotify_url: spotifyURL,
        is_liked: true,
      });
    }
  },

  async unlikeSongByURL(spotifyURL: string) {
    const { error } = await LocalSupabaseClient.from("records")
      .update({ is_liked: false })
      .eq("spotify_url", spotifyURL)
      .eq("user_id", currentUser);
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

  async isSongInRecords(spotifyURL: string) {
    const { count, status, error } = await LocalSupabaseClient.from("records")
      .select("*", { count: "exact", head: true })
      .eq("spotify_url", spotifyURL)
      .eq("user_id", currentUser);

    console.log(error);
    console.log(status);

    if (count! > 0) {
      return true;
    }
    return false;
  },

  async getLike(spotifyURL: string) {
    const { data, error } = await LocalSupabaseClient.from("records")
      .select("is_liked")
      .eq("spotify_url", spotifyURL)
      .eq("user_id", currentUser)
      .limit(1)
      .single();
    console.log(error);
    return data;
  },
};

export default RecordReaderWriter;
