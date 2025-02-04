/* eslint-disable @typescript-eslint/no-unused-vars */
// Worked on by: Vivian D'Souza
import LocalSupabaseClient from "../services/LocalSupabaseClient";
import { v4 as uuidv4 } from "uuid";

const currentUser = localStorage.getItem("current_user");

// WorkbookReaderWriter: Service that reads and writes workbook data from Firebase
const RecordReaderWriter = {
  async getMySongs() {
    const { data } = await LocalSupabaseClient.from("records")
      .select(
        `
        record_id,
        is_liked,
        songs (song_id, spotify_url, name, artist, album, image_url, duration)
        `
      )
      .eq("user_id", currentUser)
      .eq("is_liked", true)
      .throwOnError();
    return data;
  },

  async addSongToRecords(songID: string, playID: string) {
    const { error } = await LocalSupabaseClient.from("records").insert({
      record_id: uuidv4(),
      user_id: currentUser,
      playlist_id: playID,
      song_id: songID,
      is_liked: false,
    });
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
        songs (song_id, name, artist, image_url, spotify_url, duration)
        `
      )
      .eq("playlist_id", playlistID)
      .eq("user_id", currentUser)
      .order("song_id", { ascending: true });

    console.log(error);

    return data;
  },

  async deleteSongFromRecords(songID: string) {
    const { error } = await LocalSupabaseClient.from("records")
      .delete()
      .eq("song_id", songID)
      .eq("user_id", currentUser);
    return error;
  },

  async deleteSongFromPlaylist(recordID: string) {
    const { error } = await LocalSupabaseClient.from("records")
      .delete()
      .eq("record_id", recordID);
    return error;
  },

  async likeSong(songID: string) {
    const { error } = await LocalSupabaseClient.from("records")
      .update({ is_liked: true })
      .eq("song_id", songID)
      .eq("user_id", currentUser);
    return error;
  },

  async unlikeSong(songID: string) {
    console.log(songID);
    const { error } = await LocalSupabaseClient.from("records")
      .update({ is_liked: false })
      .eq("song_id", songID)
      .eq("user_id", currentUser);
    return error;
  },

  async isSongInPlaylist(songID: string, playlistID: string) {
    const { count, status, error } = await LocalSupabaseClient.from("records")
      .select("*", { count: "exact", head: true })
      .eq("song_id", songID)
      .eq("playlist_id", playlistID)
      .eq("user_id", currentUser);
    console.log(error);
    console.log(status);

    if (count! > 0) {
      return true;
    }
    return false;
  },

  async isSongInRecords(songID: string) {
    const { count, status, error } = await LocalSupabaseClient.from("records")
      .select("*", { count: "exact", head: true })
      .eq("song_id", songID)
      .eq("user_id", currentUser);

    console.log(error);
    console.log(status);

    if (count! > 0) {
      return true;
    }
    return false;
  },

  async getLike(songID: string) {
    const { data, error } = await LocalSupabaseClient.from("records")
      .select("is_liked")
      .eq("song_id", songID)
      .eq("user_id", currentUser)
      .limit(1)
      .single();
    console.log(error);
    return data;
  },
};

export default RecordReaderWriter;
