// Worked on by: Tanvi Singh, Vivian D'Souza
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import UserReaderWriter from "./UserReaderWriter";
import SongReaderWriter from "./SongReaderWriter";
import RecordReaderWriter from "./RecordReaderWriter";
import TokenReaderWriter from "./firebase/TokenReaderWriter";

const SpotifyPlaylist = {
  // obtains all of a user's playlists as an array
  getUserPlaylists(): Promise<object> {
    // Define function to get the song from Spotify API
    const getPlaylists = function () {
      return new Promise<object[]>((resolve) => {
        TokenReaderWriter.getAccessToken().then(async (accessToken: string) => {
          const userId = await UserReaderWriter.getSpotifyUserId();
          console.log("user in getUserPlaylists: ", userId!["spotify_user"]);
          axios({
            url:
              "https://api.spotify.com/v1/users/" +
              userId!["spotify_user"] +
              "/playlists",
            method: "GET",
            headers: {
              authorization: "Bearer " + accessToken,
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
      });
    };

    // return Promise, to be unwrapped in call and items will be used to set other variables
    return getPlaylists();
  },

  getSongsFromPlaylist(playlistID: string): Promise<any> {
    const getSongs = function () {
      return new Promise<any[]>((resolve) => {
        TokenReaderWriter.getAccessToken().then(async (accessToken: string) => {
          axios({
            url:
              "https://api.spotify.com/v1/playlists/" +
              playlistID +
              "/tracks?fields=items(track(album(images),artists(name), name, id,duration_ms)),",
            method: "GET",
            headers: {
              authorization: "Bearer " + accessToken,
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
      });
    };

    // return Promise, to be unwrapped in call and items will be used to set other variables
    return getSongs();
  },

  async downloadSongsDetails(playUID: string, playlistURL: string) {
    await SpotifyPlaylist.getSongsFromPlaylist(playlistURL).then(
      async (tracks) => {
        console.log("tracks in downloadSongsDetails:", tracks);
        for (let i = 0; i < tracks.length; i++) {
          const isSongInDB = await SongReaderWriter.isSongInDB(
            tracks[i].track.id
          );
          if (isSongInDB) {
            const isSongInPlaylist = await RecordReaderWriter.isSongInPlaylist(
              tracks[i].track.id,
              playUID
            );

            if (!isSongInPlaylist) {
              RecordReaderWriter.addSongToRecords(tracks[i].track.id, playUID);
            }
          } else {
            await SongReaderWriter.addSongToDBFromSpotifyTrack(tracks[i].track).then(
              async (songID) => {
                console.log("songID after adding to DB:", songID);
              }
            );
            await RecordReaderWriter.addSongToRecords(tracks[i].track.id, playUID);
          }
        }
      }
    );
  },
};

export default SpotifyPlaylist;
