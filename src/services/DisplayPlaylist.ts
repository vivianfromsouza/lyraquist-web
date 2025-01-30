// Worked on by: Tanvi Singh
// TODO: REWORK THIS WITH NEW SPOTIFY AUTH
import axios from "axios";
import SpotifyAuth from "./SpotifyAuth";
import UserReaderWriter from "./UserReaderWriter";

const DisplayPlaylistService = {
  // Get tracks from Spotify playlist by playlistID
  // Returns promise that resolves to array of playlist tracks
  async getPlaylist(playlistId: string): Promise<object[]> {
    if (await SpotifyAuth.checkRefreshNeeded(new Date()) == true) {
      // Check if token refresh is needed and refresh if necessary
      const refreshToken = await UserReaderWriter.getUserRefreshToken();
      await SpotifyAuth.refresh(refreshToken);
    }
    
    // Gets playlist from Spotify API
    const getPlaylistData = async () => {
      const accessCode = await UserReaderWriter.getUserAccessCode();
      try {
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
          headers: {
            Authorization: `Bearer ${accessCode}`,
          },
        });
        return response.data.tracks.items;
      } catch (error) {
        console.error("Error fetching playlist:", error);
        throw error;
      }
    };

    // Return Promise to be unwrapped when called
    return getPlaylistData();
  },
};

export default DisplayPlaylistService;
