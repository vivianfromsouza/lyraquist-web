/* eslint-disable @typescript-eslint/no-unused-vars */
// Worked on by: Vivian D'Souza
import LocalSupabaseClient from "../services/LocalSupabaseClient";
import { v4 as uuidv4 } from "uuid";

const currentUser = localStorage.getItem("current_user");

// This service handles CRUD operations to Firebase for a user's playlists
const PlaylistReaderWriter = {
  async getMyPlaylists() {
    const { data } = await LocalSupabaseClient.from("playlists")
      .select()
      .eq("user_id", currentUser)
      .throwOnError();
    return data;
  },

  async getMyPlaylistNames() {
    const { data } = await LocalSupabaseClient.from("playlists")
      .select("name")
      .eq("user_id", currentUser)
      .throwOnError();
    return data;
  },

  async createPlaylist(
    playlistName: string,
    description = "",
    imageURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj8ZaSSfYdj9o0Q-S0XPOkSOpTdbQPPpKC2g&s"
  ) {
    const playlist_id = uuidv4();
    console.log("Creating playlist with ID:", playlist_id);
    const { error } = await LocalSupabaseClient.from("playlists").insert({
      playlist_id: playlist_id,
      name: playlistName,
      description: description,
      image_url: imageURL,
      user_id: currentUser,
    });
    console.log(error);

    return playlist_id;
  },

  async createPlaylistFromSpotify(playlist): Promise<string> {
    const playlist_id = uuidv4();
    const { error } = await LocalSupabaseClient.from("playlists").insert({
      playlist_id: playlist_id,
      name: playlist["name"],
      description: playlist["description"],
      image_url: playlist["images"][0].url,
      user_id: currentUser,
      spotify_url: playlist["id"],
    });
    console.log(error);

    return playlist_id;
  },

  async isPlaylistInDB(playlistId: string) {
    const { count, error } = await LocalSupabaseClient.from("playlists")
      .select("*", { count: "exact", head: true })
      .eq("spotify_url", playlistId);

    console.log(error);

    if (count! > 0) {
      return true;
    }

    return false;
  },

  async deletePlaylist(playUID: string) {
    const response = await LocalSupabaseClient.from("playlists")
      .delete()
      .eq("playlist_id", playUID);
    const songsResponse = await LocalSupabaseClient.from("records")
      .delete()
      .eq("playlist_id", playUID);

    console.log(songsResponse);

    return response;
  },
};

export default PlaylistReaderWriter;
