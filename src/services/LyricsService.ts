import axios from "axios";

const LyricsService = {
  // grabs lyrics using lrclib API: https://lrclib.net/docs
  async getLyrics(track): Promise<string> {
    if (track == undefined || "") {
      return "";
    }
    // to hold lyrics
    let lyrics = "hello";

    //setting up the API call request
    const lyricsAPI =
      "https://lrclib.net/api/get?artist_name=" +
      track.artists[0]["name"] +
      "&track_name=" +
      track.name +
      "&album_name=" +
      track.album["name"] +
      "&duration=" +
      (track.duration_ms) / 1000;

    const lyricsResponse : Promise<string> = axios({
      url: lyricsAPI,
      method: "GET",
    })
      .then(async (res ) => {
        lyrics = res.data.plainLyrics.toString();
        console.log("LYRICS:", lyrics);
        console.log(res);
        return lyrics;
      })
      .catch((err) => {
        console.log("ERROR WITH LYRICS:", err)
        return err;
      });

    return lyricsResponse;
  },
};

export default LyricsService;
