import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import UserReaderWriter from "../services/UserReaderWriter";
import axios from "axios";

const Player = () => {
  const [is_paused, setPaused] = useState(true);
  const [is_active, setActive] = useState(false);
  // const [player, setPlayer] = useState(
  //   new window.Spotify.Player({
  //     name: "Web Playback SDK",
  //     getOAuthToken: (cb) => {
  //       cb(accessToken);
  //     },
  //     volume: 0.5,
  //   })
  // );
  const [player, setPlayer] = useState(null);
  const [device_id, setDeviceId] = useState("abc");

  const accessToken = UserReaderWriter.getUserAccessCode();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const location = useLocation();
  // const playItem = {
  //   name: "Everyway That I Can - Aytekin Kurt, Murat Uncuoğlu Remix",
  //   spotifyURL: "https://i.scdn.co/image/ab67616d0000b27387d19f64a67b70c87510dcca",
  //   imageURL: "https://i.scdn.co/image/ab67616d0000b27387d19f64a67b70c87510dcca",
  //   artist: "Sertab",
  // };
  // const playItem = location.state;
  const [currentURL] = useState("");

  const track = {
    name: "trackName",
    spotifyURL: "trackURL",
    album: {
      name: "trackAlbum",
      images: [{ url: "trackImage" }],
    },
    artists: [{ name: "trackArtist" }],
    duration: "trackDuration",
  };

  const [current_track, setCurrentTrack] = useState(track);

  async function playAnySong() {
    UserReaderWriter.getUserAccessCode().then((accessCode) => {
      // Makes request to Spotify API for song search
      axios({
        url: "https://api.spotify.com/v1/me/player/play?device_id=" + device_id, // Remove "&limit=1"
        method: "PUT",
        headers: {
          authorization: "Bearer " + accessCode,
        },
        data: {
          uris: [currentURL],
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
    UserReaderWriter.getUserAccessCode().then((accessCode) => {
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
    UserReaderWriter.getUserAccessCode().then((accessCode) => {
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

    // this is running x2....
    useEffect(() => {
      if (isLoggedIn) {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
          console.log(accessToken);
          const player = new window.Spotify.Player({
            name: "Web Playback SDK",
            getOAuthToken: (cb) => {
              cb(accessToken);
            },
            volume: 0.5,
          });

          setPlayer(player);

          player.addListener("ready", async ({ device_id }) => {
            console.log("Ready with Device ID", device_id);
            setDeviceId(device_id);
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
            // setTrack(track);
            if (!state) {
              return;
            }

            setCurrentTrack(state.track_window.current_track);
            setPaused(state.paused);

            player.getCurrentState().then((state) => {
              !state ? setActive(false) : setActive(true);
            });
          });

          console.log(accessToken);

          player.connect();
        };
      } else {
        pausePlayback();
      }
    }, [isLoggedIn]);

    if (!is_active) {
      return (
        <>
          <div className="container">
            <div className="main-wrapper">
              <b>
                {" "}
                Instance not active. Transfer your playback using your Spotify
                app{" "}
              </b>
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
                    playAnySong();
                  }}
                >
                  PLAY ANY SONG
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

export default Player;