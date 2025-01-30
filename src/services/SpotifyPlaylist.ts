// Worked on by: Tanvi Singh, Vivian D'Souza
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import UserReaderWriter from "./UserReaderWriter";
import SongReaderWriter from "./SongReaderWriter";
import RecordReaderWriter from "./RecordReaderWriter";

const SpotifyPlaylist = {
  // obtains all of a user's playlists as an array
  getUserPlaylists(userId: string): Promise<object> {
    // Define function to get the song from Spotify API
    const getPlaylists = function () {
      return new Promise<object[]>((resolve) => {
        UserReaderWriter.getUser().then((user : object) => {
            axios({
                url: "https://api.spotify.com/v1/users/" + user["spotify_user"] + "/playlists",
                method: "GET",
                headers: {
                  authorization: "Bearer " + user["access_code"],
                },
              })
                .then(async (res) => {
                  const data = await res.data;
                  resolve(data.items || []);
                })
                .catch((err) => {
                  return err;
                });
            });
        })          
    };

    // return Promise, to be unwrapped in call and items will be used to set other variables
    return getPlaylists();
  },

  getSongsFromPlaylist(playlistID: string): Promise<any> {
    // Define function to get the song from Spotify API
    const getSongs = function () {
      return new Promise<any[]>((resolve) => {
        UserReaderWriter.getUser().then((user) => {
            axios({
                url: "https://api.spotify.com/v1/playlists/" + playlistID + "/tracks?fields=items(track(album(images),artists(name), name, id,duration_ms)),",
                method: "GET",
                headers: {
                  authorization: "Bearer " + user["access_code"],
                },
              })
                .then(async (res) => {
                  const data = await res.data;
                  resolve(data.items || []);
                })
                .catch((err) => {
                  return err;
                });
            });
        })          
    };

    // return Promise, to be unwrapped in call and items will be used to set other variables
    return getSongs();
  },

  async downloadSongsDetails(playUID : string, spotifyURL : string) {
    await SpotifyPlaylist.getSongsFromPlaylist(spotifyURL).then(
      async (tracks) => {
        for (let i = 0; i < tracks.length; i++) {
          const isSongInDB = await SongReaderWriter.isSongInDB(tracks[i].track.id);
          if (isSongInDB) {
            const songID = await SongReaderWriter.getSongIDByURL(
              tracks[i].track.id
            );

            const isSongInPlaylist = await RecordReaderWriter.isSongInPlaylist(
              songID["song_id"],
              playUID
            );

            if (!isSongInPlaylist) {
              RecordReaderWriter.addSongToRecords(songID["song_id"], playUID);
            }

          } else {
            const newSongID = SongReaderWriter.addSongToDBFromSpotifyTrack(tracks[i]);
            RecordReaderWriter.addSongToRecords(newSongID, playUID);
          }
        }
      }
    );
  }
};

export default SpotifyPlaylist;
