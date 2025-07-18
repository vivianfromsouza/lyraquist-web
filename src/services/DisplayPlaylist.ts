// Worked on by: Tanvi Singh
// TODO: REWORK THIS WITH NEW SPOTIFY AUTH
import axios from "axios";
import { refresh, checkRefreshNeeded } from "../services/spotifyAuth";
import TokenReaderWriter from "./firebase/TokenReaderWriter";

const DisplayPlaylistService = {
  async getPlaylist(playlistId: string): Promise<object[]> {
    if ((await checkRefreshNeeded(new Date())) == "true") {
      const refreshToken = await TokenReaderWriter.getRefreshToken();
      await refresh(refreshToken);
    }

    const getPlaylistData = async () => {
      const accessCode = await TokenReaderWriter.getAccessToken();
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistId}`,
          {
            headers: {
              Authorization: `Bearer ${accessCode}`,
            },
          }
        );
        return response.data.tracks.items;
      } catch (error) {
        console.error("Error fetching playlist:", error);
        throw error;
      }
    };

    return getPlaylistData();
  },
};

export default DisplayPlaylistService;
