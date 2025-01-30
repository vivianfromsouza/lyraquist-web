// Worked on by: Tanvi Singh
// TODO: FIX THIS FILE FOR NEW SPOTIFY AUTH
import axios from "axios";
import SpotifyAuth from "./SpotifyAuth";
import UserReaderWriter from "./UserReaderWriter";

const SearchSpotify = {
  // obtains all of a user's playlists as an array
  // Search for song by title and name
  // Returns Promise that resolves to array of search results
  async searchForSong(title: string): Promise<any> {
    if ((await SpotifyAuth.checkRefreshNeeded(new Date())) == true) {
      // Check if token refresh is needed and refresh if necessary
      UserReaderWriter.getUserRefreshToken().then((refreshToken) => {
        SpotifyAuth.refresh(refreshToken);
      });
    }
    // Define function to get the song from Spotify API
    const getSong = function () {
      return new Promise<object[]>((resolve) => {
        // Get user access code
        UserReaderWriter.getUserAccessCode().then((accessCode) => {
          // Makes request to Spotify API for song search
          axios({
            url: "https://api.spotify.com/v1/search?q=" + title + "&type=track", // Remove "&limit=1"
            method: "GET",
            headers: {
              authorization: "Bearer " + accessCode,
            },
          })
            .then(async (res) => {
              const data = await res.data;
              resolve(data.tracks.items || []); // Ensure 'items' is defined or provide an empty array
            })
            .catch((err) => {
              return err;
            });
        });
      });
    };

    // return Promise, to be unwrapped in call and items will be used to set other variables
    return getSong();
  },

  // Get tracks from Spotify playlist by playlistID
  // Returns promise that resolves to array of playlist tracks
  async getSpotifyPlaylist(playlistId: string): Promise<any[]> {
    if ((await SpotifyAuth.checkRefreshNeeded(new Date())) == true) {
      // Check if token refresh is needed and refresh if necessary
      UserReaderWriter.getUserRefreshToken().then((refreshToken) => {
        SpotifyAuth.refresh(refreshToken);
      });
    }

    // Gets playlist from Spotify API
    const getPlaylist = function () {
      return new Promise<object[]>((resolve) => {
        // Get user access code
        UserReaderWriter.getUserAccessCode().then((accessCode) => {
          // Make request to Spotify API for playlist details
          axios
            .get("https://api.spotify.com/v1/playlists/" + playlistId, {
              headers: {
                Authorization: `Bearer ${accessCode}`,
              },
            })
            .then(async (res) => {
              const data = await res.data.tracks.items;
              resolve(data);
            })
            .catch((err) => {
              console.error("REQ ERROR", err);
              console.log("Error status:", err.response?.status);
              console.log("Error data:", err.response?.data);
              return err;
            });
        });
      });
    };
    // Return Promise to be unwrapped when called
    return getPlaylist();
  },
};

export default SearchSpotify;
