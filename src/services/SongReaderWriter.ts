/* eslint-disable @typescript-eslint/no-explicit-any */
// Worked on by: Vivian D'Souza
import { Alert } from "react-native";
import axios from "axios";
import UserReaderWriter from "./UserReaderWriter";
import LocalSupabaseClient from "../services/LocalSupabaseClient";
import { v4 as uuidv4 } from "uuid";
import RecordReaderWriter from "./RecordReaderWriter";

// This service handles CRUD operations to Firebase for any song a user adds to their playlists
const SongReaderWriter = {
  async getSongDetails(track_id: string): Promise<object> {
    const getSong = function () {
      return new Promise<any[]>((resolve) => {
        UserReaderWriter.getUserAccessCode().then((accessCode) => {
          axios
            .get("https://api.spotify.com/v1/tracks/" + track_id, {
              headers: {
                Authorization: `Bearer ${accessCode}`,
              },
            })
            .then(async (res) => {
              const data = await res.data;
              resolve(data);
            })
            .catch((err) => {
              console.log(err);
              console.log(err.response);
              Alert.alert("Error!", "Failed to fetch track");
            });
        });
      });
    };
    // })
    return getSong();
  },

  async addSongToDBFromSpotifyTrack(newSong) {
    const song_id = uuidv4();
    const { error } = await LocalSupabaseClient.from("songs").insert({
      song_id: song_id,
      name: newSong.track.name,
      artist: newSong.track.artists[0].name,
      image_url: newSong.track.album.images[0].url,
      duration: newSong.track.duration_ms,
      album: newSong.track.album.name,
      spotify_url: newSong.track.id,
    });
    console.log(error);

    return song_id;
  },

  async addSongToDBFromPlayItem(newSong) {
    console.log(newSong);
    const song_id = uuidv4();
    const { error } = await LocalSupabaseClient.from("songs").insert({
      song_id: song_id,
      name: newSong.name,
      artist: newSong.artist,
      image_url: newSong.imageURL,
      duration: newSong.duration,
      album: newSong.album,
      spotify_url: newSong.spotifyURL.split(":")[2],
    });
    console.log(error);

    return song_id;
  },

  async deleteSongFromDB(songUID: string) {
    const response = await LocalSupabaseClient.from("songs")
      .delete()
      .eq("song_id", songUID);
    RecordReaderWriter.deleteSongFromRecords(songUID);
    return response;
  },

  async isSongInDB(spotifyURL: string) {
    const { count, error } = await LocalSupabaseClient.from("songs")
      .select("*", { count: "exact", head: true })
      .eq("spotify_url", spotifyURL);

    if (count! > 0) {
      return true;
    }

    return false;
    console.log(error);
  },

  async getSongIDByURL(spotifyURL: string) {
    const { data } = await LocalSupabaseClient.from("songs")
      .select("song_id")
      .eq("spotify_url", spotifyURL)
      .limit(1)
      .single()
      .throwOnError();
    console.log(data);
    return data;
  },

  async getSongURL(songID: string) {
    const { data } = await LocalSupabaseClient.from("songs")
      .select("spotify_url")
      .eq("song_id", songID)
      .limit(1)
      .single()
      .throwOnError();

    return data;
  },
};

export default SongReaderWriter;
