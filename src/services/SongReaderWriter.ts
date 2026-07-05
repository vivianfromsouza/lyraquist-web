/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import LocalSupabaseClient from "../services/LocalSupabaseClient";
import TokenReaderWriter from "./firebase/TokenReaderWriter";

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
    return getSong();
  },

  async addSongToDBFromSpotifyTrack(newSong) {
    const { data, error } = await LocalSupabaseClient.from("songs").insert({
      name: newSong.name,
      artist: newSong.artists?.[0].name || newSong.artist,
      image_url: newSong.album?.images[0].url,
      duration: newSong.duration_ms,
      album: newSong.album.name,
      spotify_url: newSong.id,
    });
    console.log(error);

    return data;
  },

  async addSongToDBFromSongCard(newSong) {
    const { data, error } = await LocalSupabaseClient.from("songs").insert({
      name: newSong.name,
      artist: newSong.artist,
      image_url: newSong.imageURL,
      duration: newSong.duration,
      album: newSong.album,
      spotify_url: newSong.spotifyURL.split(":")[2],
    });
    console.log(error);

    return data;
  },

  async isSongInDB(spotifyURL: string) {
    const { count, error } = await LocalSupabaseClient.from("songs")
      .select("*", { count: "exact", head: true })
      .eq("spotify_url", spotifyURL);

    if (count! > 0) {
      return true;
    }
    console.log(error);
    return false;
  },
};

export default SongReaderWriter;