import axios from "axios";
import TokenReaderWriter from "./firebase/TokenReaderWriter";

const HistoryReaderWriter = {
  async getUserHistory() {
    try {
      const accessCode = await TokenReaderWriter.getAccessToken();

      const response = await axios({
        url:
          "https://api.spotify.com/v1/me/player/recently-played?limit=10&before=" +
          Date.now(),
        method: "GET",
        headers: {
          authorization: "Bearer " + accessCode,
        },
      });

      return response.data.items;
    } catch (err) {
      console.error("Error fetching user history:", err);
      throw err;
    }
  },

  async getLastPlayedSong() {
    try {
      const accessCode = await TokenReaderWriter.getAccessToken();

      const response = await axios({
        url:
          "https://api.spotify.com/v1/me/player/recently-played?limit=1&before=" +
          Date.now(),
        method: "GET",
        headers: {
          authorization: "Bearer " + accessCode,
        },
      });

      return response.data.items;
    } catch (err) {
      console.error("Error fetching user history:", err);
      throw err;
    }
  },
};

export default HistoryReaderWriter;
