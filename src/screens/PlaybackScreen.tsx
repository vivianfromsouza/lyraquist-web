import React, { useState, useEffect } from "react";
import UserReaderWriter from "../services/UserReaderWriter";
import axios from "axios";
import { useLocation } from "react-router-dom";

function PlaybackScreen() {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [device_id, setDeviceId] = useState("");
  const accessToken = UserReaderWriter.getUserAccessCode();

  const location = useLocation();
  const playItem = location.state;
  const [currentURL, setCurrentURL] = useState(playItem.spotifyURL);

  const track = {
    name: playItem.name,
    spotifyURL: playItem.spotifyURL,
    album: {
      images: [{ url: playItem.imageURL }],
    },
    artists: [{ name: playItem.artist }],
  };

  const [current_track, setTrack] = useState(track);

  console.log(current_track);

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

  // this is running x2....
  useEffect(() => {
    // getSpotifyAccessCode()
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

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        console.log("song changed");
        setTrack(track)
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      // console.log(accessToken);

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

export default PlaybackScreen;
