import { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import {
  getSpotifyAccessCode,
  getSpotifyAuthCode,
} from "../services/spotifyAuth";
import TokenReaderWriter from "../services/firebase/TokenReaderWriter";
import LyricsToScreen from "../screens/LyricsToScreen";
import TranslateScreen from "../screens/TranslateScreen";

const Player = () => {
  const [authCode, setAuthCode] = useState<string | null>("");
  const [accessCode, setAccessCode] = useState<string | null>("");
  const [is_paused, setPaused] = useState(true);
  const [is_active, setActive] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);

  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("0:00");

  const [player, setPlayer] = useState(null);
  const [device_id, setDeviceId] = useState("abc");

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
    const [isTranslationOpen, setIsTranslationOpen] = useState(false);


  const [currentURL] = useState("");

  // this has to match template coming in from spotify's api
  const track = {
    name: "trackName",
    spotifyURL: "trackURL",
    album: {
      name: "trackAlbum",
      images: [{ url: "trackImage" }],
    },
    artists: [{ name: "trackArtist" }],
    duration_ms: 0,
  };

  const [current_track, setCurrentTrack] = useState(track);

  async function getAccessCode() {
    const accessCode = await getSpotifyAccessCode();
    setAccessCode(accessCode);
  }

  async function getAuthCode() {
    const authCode = await getSpotifyAuthCode();
    setAuthCode(authCode);
  }

  const handleLyricsClose = () => {
    setIsLyricsOpen(false);
  };

  const handleLyricsOpen = () => {
    setIsLyricsOpen(true);
  };

  async function openLyrics() {
   if (isLyricsOpen) {
    handleLyricsClose();
   } else {
    handleLyricsOpen();
   }
  }

    const handleTranslationClose = () => {
    setIsTranslationOpen(false);
  };

  const handleTranslationOpen = () => {
    setIsTranslationOpen(true);
  };

  async function openTranslation() {
   if (isTranslationOpen) {
    handleTranslationClose();
   } else {
    handleTranslationOpen();
   }
  }

  async function toggleShuffle() {
    TokenReaderWriter.getAccessToken().then((accessCode) => {
      // Makes request to Spotify API for song search
      axios({
        url:
          "https://api.spotify.com/v1/me/player/shuffle?state=" + !isShuffled,
        method: "PUT",
        headers: {
          authorization: "Bearer " + accessCode,
        },
        data: {
          state: !isShuffled,
          device_ids: [device_id],
        },
      })
        .then(async (res) => {
          console.log(res);
        })
        .catch((err) => {
          return err;
        });
    });
  }

  async function transferPlayback(device_id: string) {
    console.log("TRANSFERRING PLAYBACK");
    await TokenReaderWriter.getAccessToken().then((accessCode) => {
      // Makes request to Spotify API for song search
      axios({
        url: "https://api.spotify.com/v1/me/player", // Remove "&limit=1"
        method: "PUT",
        headers: {
          authorization: "Bearer " + accessCode,
        },
        data: {
          device_ids: [device_id],
          play: false, // keeps it off if it's paused
        },
      })
        .then(async (res) => {
          console.log(res);
        })
        .catch((err) => {
          return err;
        });
    });
  }

  async function pausePlayback() {
    console.log("ENDING PLAYBACK");
    TokenReaderWriter.getAccessToken().then((accessCode) => {
      // Makes request to Spotify API for song search
      axios({
        url: "https://api.spotify.com/v1/me/player/pause", // Remove "&limit=1"
        method: "PUT",
        headers: {
          authorization: "Bearer " + accessCode,
        },
        data: {
          device_ids: [device_id],
        },
      })
        .then(async (res) => {
          console.log(res);
        })
        .catch((err) => {
          return err;
        });
    });
  }

  function calculateDurationInSecs(duration_ms) {
    const seconds = parseInt(Math.floor(duration_ms / 1000).toFixed(2));
    const minutes = Math.floor(seconds / 60); // in minutes
    const seconds_left = seconds % 60; // in seconds left

    if (seconds_left < 10) {
      return minutes + ":0" + seconds_left;
    } else {
      return minutes + ":" + seconds_left;
    }
  }
  // this is running x2....
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") == "true") {
      getAuthCode();
      getAccessCode();
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = async () => {
        const accessToken = await TokenReaderWriter.getAccessToken();
        // const accessToken = localStorage.getItem("access_code");

        console.log("INNER ACCESS:" + accessToken);

        const player = new window.Spotify.Player({
          name: "Web Playback SDK",
          getOAuthToken: (cb) => {
            cb(accessToken);
          },
          volume: 0.5,
        });

        setPlayer(player);

        player.on("initialization_error", ({ message }) => {
          console.error("Failed to initialize", message);
        });

        player.on("authentication_error", ({ message }) => {
          console.error("Failed to authenticate", message);
        });

        player.on("account_error", ({ message }) => {
          console.error("Failed to validate Spotify account", message);
        });

        player.on("playback_error", ({ message }) => {
          console.error("Failed to perform playback", message);
        });

        player.addListener("ready", async ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          setDeviceId(device_id);
          localStorage.setItem("device_id", device_id);
          await transferPlayback(device_id);
          player.getCurrentState().then((state) => {
            !state ? setActive(false) : setActive(true);
          });
        });

        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.addListener("player_state_changed", (state) => {
          console.log("song changed");
          console.log(state.track_window.current_track);

          // setTrack(track);
          if (!state) {
            return;
          }

          setCurrentTrack(state.track_window.current_track);
          setPaused(state.paused);
          setIsShuffled(state.shuffle_state);

          setTotalTime(
            calculateDurationInSecs(
              state.track_window.current_track.duration_ms
            )
          );

          player.getCurrentState().then((state) => {
            !state ? setActive(false) : setActive(true);
            // setCurrentTime(calculateDurationInSecs(calculateDurationInSecs(100)));
          });
        });

        player.connect();
      };
    } else {
      console.log("NOT LOGGED IN");
      setActive(false);
      pausePlayback();
    }
  }, [isLoggedIn]);

  if (localStorage.getItem("isLoggedIn") == "false") {
    return <> </>;
  } else if (!is_active) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            {/* <b>
              {" "}
              Instance not active. Transfer your playback using your Spotify app{" "}
            </b> */}

            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#303248" />
            </View>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <img
              src={current_track.album.images[0].url}
              className="now-playing__cover"
              alt=""
            />

            <div className="now-playing__side">
              <div className="now-playing__name">{current_track.name}</div>
              <div className="now-playing__artist">
                {current_track.artists[0].name}
              </div>

              <div className="now-playing__artist">{currentTime}</div>

              <div className="now-playing__artist">{totalTime}</div>

              <button
                className="btn-spotify"
                onClick={() => {
                  player.previousTrack();
                }}
              >
                &lt;&lt;
              </button>

              <button
                className="btn-spotify"
                onClick={() => {
                  player.togglePlay();
                }}
              >
                {is_paused ? "PLAY" : "PAUSE"}
              </button>

              <button
                className="btn-spotify"
                onClick={() => {
                  player.nextTrack();
                }}
              >
                &gt;&gt;
              </button>

              <button
                className="btn-spotify"
                onClick={() => {
                  toggleShuffle();
                }}
              >
                Toggle Shuffle
              </button>

              <button
                className="btn-spotify"
                onClick={() => {
                  openLyrics();
                }}
              >
                Open Lyrics
              </button>

              
              <button
                className="btn-spotify"
                onClick={() => {
                  openTranslation();
                }}
              >
                Open Translation
              </button>

              {isLyricsOpen && (
                <LyricsToScreen currentTrack={track}></LyricsToScreen>
              )}

              {isTranslationOpen && (
                <TranslateScreen currentTrack={track}></TranslateScreen>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e1db",
  },
});

export default Player;
