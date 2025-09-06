import { useEffect, useState, useRef } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import {
  checkRefreshNeeded,
  getSpotifyAccessCode,
  getSpotifyAuthCode,
  refresh,
} from "../services/spotifyAuth";
import TokenReaderWriter from "../services/firebase/TokenReaderWriter";
import { useLocalStorage } from "usehooks-ts";
import { Seekbar } from "react-seekbar";
import { PlayerType } from "../models/Types";
import LyricsToScreen from "../screens/LyricsToScreen";
import TranslateScreen from "../screens/TranslateScreen";

const Player = () => {
  const defaultPlayer: PlayerType = {
    seek: async () => {},
    togglePlay: async () => {},
    nextTrack: async () => {},
    previousTrack: async () => {},
    setVolume: async () => {},
    // Add other methods as needed
  };
  const [authCode, setAuthCode] = useState<string | null>("");
  const [accessCode, setAccessCode] = useState<string | null>("");
  const [is_paused, setPaused] = useState(true);
  const [is_active, setActive] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);

  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("0:00");
  const [volume, setVolume] = useState(0.0); // Default volume

  const [player, setPlayer] = useState<PlayerType>(defaultPlayer);
  const [device_id, setDeviceId] = useState("abc");

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [value] = useLocalStorage("isLoggedIn", isLoggedIn || "false");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [seekPosition, setSeekPosition] = useState(0);
  const [seekDuration, setSeekDuration] = useState(0);

  const handleSeek = (position) => {
    setSeekPosition(position);
    player?.seek(position).then(() => {
      // console.log("Changed position!");
    });
  };

  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [isTranslationOpen, setIsTranslationOpen] = useState(false);

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
    console.log("Access Code:", accessCode);
  }

  async function getAuthCode() {
    const authCode = await getSpotifyAuthCode();
    setAuthCode(authCode);
    console.log(authCode);
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

  // async function playSong(songId: string) {
  //   TokenReaderWriter.getAccessToken().then((accessCode) => {
  //     // Makes request to Spotify API for song search
  //     axios({
  //       url: "https://api.spotify.com/v1/me/player/play", // Remove "&limit=1"
  //       method: "PUT",
  //       headers: {
  //         authorization: "Bearer " + accessCode,
  //       },
  //       data: {
  //         device_ids: [device_id],
  //         uris: [songId], // keeps it off if it's paused
  //       },
  //     })
  //       .then(async (res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         return err;
  //       });
  //   });
  // }

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

  async function volumeUp() {
    if (volume < 100) {
      player.setVolume(volume / 100 + 0.1).then(() => {
        setVolume(volume + 10);
      });
    }
  }

  async function volumeDown() {
    if (volume > 0) {
      player.setVolume(volume / 100 - 0.1).then(() => {
        setVolume(volume - 10);
      });
    }
  }

  useEffect(() => {
    getAuthCode();
    getAccessCode();
  }, []);

  // this is running x2....
  useEffect(() => {
    let accessToken = "";

    if (localStorage.getItem("isLoggedIn") == "true") {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = async () => {
        // const accessToken = localStorage.getItem("access_code");

        console.log("INNER ACCESS:" + accessToken);

        const player = new window.Spotify.Player({
          name: "Web Playback SDK",
          getOAuthToken: async (cb) => {
            console.log("LET US CHECK REFRESH");
            await checkRefreshNeeded(new Date())
              .then(async (response) => {
                if (response === "true") {
                  TokenReaderWriter.getRefreshToken().then(
                    async (refreshToken) => {
                      console.log("Refreshing access token...");
                      await refresh(refreshToken);
                    }
                  );
                  TokenReaderWriter.getAccessToken().then((token) => {
                    accessToken = token;
                  });
                } else {
                  accessToken = await TokenReaderWriter.getAccessToken();
                }
              })

            cb(accessToken);
            console.log("AUTHING YET AGAIN");
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
          checkRefreshNeeded(new Date()).then(async (response) => {
            if (response === "true") {
              TokenReaderWriter.getRefreshToken().then(async (refreshToken) => {
                console.log("Refreshing access token while online...");
                await refresh(refreshToken);
              });
              TokenReaderWriter.getAccessToken().then((token) => {
                accessToken = token;
              });
            }
          });

          // console.log("song changed");
          // console.log(state.track_window.current_track);

          // setTrack(track);
          if (!state) {
            return;
          }

          setCurrentTrack(state.track_window.current_track);
          setPaused(state.paused);
          setIsShuffled(state.shuffle_state);

          player.getVolume().then((volume) => {
            setVolume(Math.round(volume * 100));
          });

          setTotalTime(
            calculateDurationInSecs(
              state.track_window.current_track.duration_ms
            )
          );

          setSeekDuration(state.track_window.current_track.duration_ms);

          player.getCurrentState().then((state) => {
            !state ? setActive(false) : setActive(true);
          });
        });

        intervalRef.current = setInterval(async () => {
          const state = await player.getCurrentState();
          if (state) {
            // state.position is the current playback position in ms
            setCurrentTime(calculateDurationInSecs(state.position));
            setSeekPosition(state.position);

            // You can update your state here if needed
          }
        }, 1000); // Poll every second

        player.connect();
        return () => {
          if (intervalRef.current) clearInterval(intervalRef.current);
        };
      };
    } else {
      console.log("NOT LOGGED IN");
      setActive(false);
      pausePlayback();
    }
  }, [isLoggedIn]);

  if (value === "false") {
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
        <div className="container" style={{backgroundColor:"#303248"}}>
          <div className="main-wrapper">
            <View
              style={{flexDirection:'row', marginRight: 10, marginLeft: 10, alignItems:'center', justifyContent:'space-between'}}
            >
              <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
                <img
                    src={current_track.album.images[0].url}
                    className="now-playing__cover"
                    alt=""
                    style = {{height:70, width:70, marginBottom:10}}
                />
                <View style={{ marginLeft:10}}>
                  <div className="now-playing__name" style={{fontWeight:'bold', color:"#e8e1db"}}>{current_track.name}</div>
                  <div className="now-playing__artist" style={{color:"#e8e1db"}}>
                    {current_track.artists[0].name}
                  </div>
                </View>
              </View>
              <View style={{justifyContent:'center', marginRight:30}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <div className="now-playing__artist" style={{fontSize:15, color:"#e8e1db"}}>{currentTime}</div>
                  <View style={{alignItems:'center'}}>
                  <Seekbar
                      position={seekPosition}
                      duration={seekDuration}
                      onSeek={handleSeek}
                  />
                </View>
                  <div className="now-playing__artist" style={{fontSize:15, color:"#e8e1db"}}>{totalTime}</div>
                </View>
                
                <div className="now-playing__side">
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
                      volumeUp();
                    }}
                  >
                    Volume Up
                  </button>

                  <button
                    className="btn-spotify"
                    onClick={() => {
                      volumeDown();
                    }}
                  >
                    Volume Down
                  </button>
                </div>
              </View>
              <View style={{flexDirection:'row', alignItems:'center', marginRight:20, color:"#e8e1db"}}>
                <h4 style={{marginRight:5}}>Current Volume: </h4>
                {volume}
              </View>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'center'}}>
                            <button
                className="btn-spotify"
                onClick={() => {
                  openLyrics();
                }}
                style={{marginRight:30, marginBottom:10, fontWeight:'bold', backgroundColor: "#edc526",borderRadius:5, fontSize:15}}
              >
                Open Lyrics
              </button>

              
              <button
                className="btn-spotify"
                onClick={() => {
                  openTranslation();
                }}
                style={{ marginBottom:10, fontWeight:'bold', backgroundColor: "#edc526",borderRadius:5, fontSize:15}}>
                Open Translation
              </button>

              {isLyricsOpen && (
                <LyricsToScreen currentTrack={current_track}></LyricsToScreen>
              )}

              {isTranslationOpen && (
                <TranslateScreen></TranslateScreen>
                // reintroduce later
                // <TranslateScreen currentTrack={current_track}></TranslateScreen>
              )}
            </View>
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
