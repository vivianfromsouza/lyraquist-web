/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import TokenReaderWriter from "./firebase/TokenReaderWriter";
import LocalSupabaseClient from "./LocalSupabaseClient";

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

      const seen = new Set<string>();
      const items = response.data.items.filter((item: any) => {
        const uri = item.track.uri;
        if (seen.has(uri)) return false;
        seen.add(uri);
        return true;
      });

      const currentUser = localStorage.getItem("current_user");
      const trackIds = items.map((item: any) => item.track.uri.split(":")[2]);

      const { data: likedData } = await LocalSupabaseClient.from("likes")
        .select("spotify_url")
        .eq("user_id", currentUser)
        .in("spotify_url", trackIds);

      const likedSet = new Set((likedData ?? []).map((row: any) => row.spotify_url));

      return items.map((item: any) => ({
        ...item,
        isLiked: likedSet.has(item.track.uri.split(":")[2]),
      }));
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