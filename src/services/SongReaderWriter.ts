/* eslint-disable @typescript-eslint/no-explicit-any */
// Worked on by: Vivian D'Souza
import axios from "axios";
import LocalSupabaseClient from "../services/LocalSupabaseClient";
import { v4 as uuidv4 } from "uuid";
import RecordReaderWriter from "./RecordReaderWriter";
import TokenReaderWriter from "./firebase/TokenReaderWriter";

// This service handles CRUD operations to Firebase for any song a user adds to their playlists
const SongReaderWriter = {
  async getSongDetails(track_id: string): Promise<object> {
    const getSong = function () {
      return new Promise<any[]>((resolve) => {
        TokenReaderWriter.getAccessToken().then((accessCode) => {
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
            });
        });
      });
    };
    // })
    return getSong();
  },

  // async addSongToDBFromSpotifyTrack(newSong) {
  //   const song_id = uuidv4();
  //   const { error } = await LocalSupabaseClient.from("songs").insert({
  //     song_id: song_id,
  //     name: newSong.track.name,
  //     artist: newSong.track.artists[0].name,
  //     image_url: newSong.track.album.images[0].url,
  //     duration: newSong.track.duration_ms,
  //     album: newSong.track.album.name,
  //     spotify_url: newSong.track.id,
  //   });
  //   console.log(error);

  //   return song_id;
  // },

  async addSongToDBFromSpotifyTrack(newSong) {
    const { data, error } = await LocalSupabaseClient.from("songs").insert({
      name: newSong.name,
      artist: newSong.artists[0].name,
      image_url: newSong.album.images[0].url,
      duration: newSong.duration_ms,
      album: newSong.album.name,
      spotify_url: newSong.id,
    });
    console.log(error);

    return data;
  },

  // async addSongToDBFromPlayItem(newSong) {
  //   console.log(newSong);
  //   const { data, error } = await LocalSupabaseClient.from("songs").insert({
  //     name: newSong.name,
  //     artist: newSong.artist,
  //     image_url: newSong.imageURL,
  //     duration: newSong.duration,
  //     album: newSong.album,
  //     spotify_url: newSong.spotifyURL.split(":")[2],
  //   });
  //   console.log(error);

  //   return data;
  // },

  // async deleteSongFromDB(spotifyURL: string) {
  //   const response = await LocalSupabaseClient.from("songs")
  //     .delete()
  //     .eq("spotify_url", spotifyURL);
  //   RecordReaderWriter.deleteSongFromRecords(spotifyURL);
  //   return response;
  // },

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
};

export default SongReaderWriter;
