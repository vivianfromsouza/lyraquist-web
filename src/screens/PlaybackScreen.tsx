/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState, useEffect } from "react";
import UserReaderWriter from "../services/UserReaderWriter";
import axios from "axios";
import { useLocation } from "react-router-dom";

function PlaybackScreen() {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const location = useLocation();
  const playbackItem = location.state;
  const [player, setPlayer] = useState(null);
  const [device_id, setDeviceId] = useState("");
  const accessToken = UserReaderWriter.getUserAccessCode();

  const [currentURL] = useState(playbackItem.spotifyURL);

  const track = {
    name: playbackItem.name,
    spotifyURL: playbackItem.spotifyURL,
    // add album name to this
    album: {
      name: playbackItem.albumName,
      images: [{ url: playbackItem.imageURL }],
    },
    artists: [{ name: playbackItem.artist }],
    duration_ms: playbackItem.duration_ms,
  };

  const [current_track, setTrack] = useState(track);

  console.log("CURRENT TRACK:" + current_track);

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

  async function startPlayback() {
    //https://api.spotify.com/v1/me/player/play
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
          uris: [currentURL], // keeps it off if it's paused
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
    // getSpotifyAccessCode()
    localStorage.setItem("showPlayer", "false");
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
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        console.log("song changed");
        setTrack(track);
        if (!state) {
          return;
        }

        // setTrack(state.track_window.current_track);
        // setTrack(track);

        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      console.log(accessToken);

      player.connect();
    };
  }, []);

  if (!is_active) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b>
              {" "}
              Instance not active. Transfer your playback using your Spotify app{" "}
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
                  startPlayback();
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

export default PlaybackScreen;
