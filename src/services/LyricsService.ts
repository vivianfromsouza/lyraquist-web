// Worked on by: Ashley Bickham and Siri Avula

const LyricsService = {

    // grabs lyrics using musixmatch API
    async getLyrics (artist, trackName) : Promise<string> {
        if (artist === undefined || artist == "" || trackName === undefined || trackName == "" ){return ""}
        // to hold lyrics
        var lyrics;

        //setting up the API call request
        var apiKey = process.env.MUSIXMATCH_API_KEY;
        if (apiKey === undefined || apiKey == "") {
            console.error("MUSIXMATCH_API_KEY is not set in the environment variables.");
            return "";
        }   
        // API endpoint for fetching lyrics
        var lyricsAPI =
        "https://api.musixmatch.com/ws/1.1/" +
        "matcher.lyrics.get" +
        "?format=json&callback=callback" +
        "&q_artist=" +
        artist +
        "&q_track=" +
        trackName +
        apiKey;

        // fetches lyrics through the JSON response of the API call
        fetch(lyricsAPI)
        .then((response) => response.json())
        .then((lyricJson) => {
            // if the JSON response does not contain any lyrics for a song, return empty lyrics (JSON return is actually undefined)
            if (lyricJson.message.body.lyrics === undefined ) {
                lyrics = ''
            }
            else {
            lyrics = (lyricJson.message.body.lyrics.lyrics_body)
            }
        })
        .catch((err) => {
            console.error("GetLyrics Error: " + err + "with request: " + lyricsAPI);
        });
        return lyrics
    }
}

export default LyricsService;