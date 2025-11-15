/* eslint-disable @typescript-eslint/no-explicit-any */
// // Worked on by: Tanvi Singh
import axios from "axios";
import { refresh, checkRefreshNeeded } from "../services/spotifyAuth";
import TokenReaderWriter from "./firebase/TokenReaderWriter";
import LeoProfanity from "leo-profanity";

const SearchSpotify = {
  async searchForSong(title: string): Promise<any> {
    const filter = LeoProfanity;
    const isProfanity = filter.check(title);

    if (isProfanity === true) {
      console.log("Profanity detected in search term.");
      return [];
    }

    if ((await checkRefreshNeeded(new Date())) == "true") {
      await TokenReaderWriter.getRefreshToken().then((refreshToken) => {
        refresh(refreshToken);
        localStorage.setItem("needs_refresh", "false");
      });
    }

    const getSong = function () {
      return new Promise<object[]>((resolve) => {
        TokenReaderWriter.getAccessToken().then((accessCode) => {
          axios({
            url:
              "https://api.spotify.com/v1/search?q=" +
              title +
              "&type=track&limit=50", // Remove "&limit=1"
            method: "GET",
            headers: {
              authorization: "Bearer " + accessCode,
            },
          })
            .then(async (res) => {
              const data = await res.data;

              // const safeTracks = data.tracks.filter((track) => track["id"] == "");

              // console.log("SAFE TRACKS", safeTracks);

              // resolve(safeTracks.items || []); // Ensure 'items' is defined or provide an empty array
              resolve(data.tracks.items || []); // Ensure 'items' is defined or provide an empty array
            })
            .catch((err) => {
              return err;
            });
        });
      });
    };
    return getSong();
  },

  //   // Get tracks from Spotify playlist by playlistID
  //   // Returns promise that resolves to array of playlist tracks
  //   async getSpotifyPlaylist(playlistId: string): Promise<any[]> {
  //     if ((await SpotifyAuth.checkRefreshNeeded(new Date())) == true) {
  //       // Check if token refresh is needed and refresh if necessary
  //       UserReaderWriter.getUserRefreshToken().then((refreshToken) => {
  //         SpotifyAuth.refresh(refreshToken);
  //       });
  //     }

  //     // Gets playlist from Spotify API
  //     const getPlaylist = function () {
  //       return new Promise<object[]>((resolve) => {
  //         // Get user access code
  //         UserReaderWriter.getUserAccessCode().then((accessCode) => {
  //           // Make request to Spotify API for playlist details
  //           axios
  //             .get("https://api.spotify.com/v1/playlists/" + playlistId, {
  //               headers: {
  //                 Authorization: `Bearer ${accessCode}`,
  //               },
  //             })
  //             .then(async (res) => {
  //               const data = await res.data.tracks.items;
  //               resolve(data);
  //             })
  //             .catch((err) => {
  //               console.error("REQ ERROR", err);
  //               console.log("Error status:", err.response?.status);
  //               console.log("Error data:", err.response?.data);
  //               return err;
  //             });
  //         });
  //       });
  //     };
  //     // Return Promise to be unwrapped when called
  //     return getPlaylist();
  //   },
};

export default SearchSpotify;
