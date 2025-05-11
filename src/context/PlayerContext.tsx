import React, { createContext, useContext, useState } from "react";
import Player from "../components/Player";
import UserReaderWriter from "../services/UserReaderWriter";
import axios from "axios";
import TokenReaderWriter from "../services/firebase/TokenReaderWriter";

interface PlayerContextType {
  playSong: (songId: string) => void;
  playPlaylist: (playlistId: string, offset: string) => void;
  pausePlayback: () => void;
  toggleShuffle: () => void;
  isPaused: boolean;
  isActive: boolean;
  currentTrack: any;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPaused, setPaused] = useState(true);
  const [isActive, setActive] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [deviceId, setDeviceId] = useState("abc");

  // Define the functions you want to expose globally
  const playSong = (songId: string) => {
    // Call the playSong function from Player.tsx
    console.log("Playing song with ID:", songId);
   TokenReaderWriter.getAccessToken().then((accessCode) => {
      // Makes request to Spotify API for song search
      axios({
        url: "https://api.spotify.com/v1/me/player/play", // Remove "&limit=1"
        method: "PUT",
        headers: {
          authorization: "Bearer " + accessCode,
        },
        data: {
          device_ids: [localStorage.getItem("device_id")], // use local storage for now?
          uris: [songId], // keeps it off if it's paused
        },
      })
        .then(async (res) => {
          console.log(res);
        })
        .catch((err) => {
          return err;
        });
    });
  };

  const playPlaylist = (playlistId: string, offset : string = "") => {
    // Call the playSong function from Player.tsx
    console.log("Playing playlist with ID:", playlistId);
    TokenReaderWriter.getAccessToken().then((accessCode) => {
      // Makes request to Spotify API for song search
      axios({
        url: "https://api.spotify.com/v1/me/player/play", // Remove "&limit=1"
        method: "PUT",
        headers: {
          authorization: "Bearer " + accessCode,
        },
        data: {
          device_ids: [localStorage.getItem("device_id")], // use local storage for now?
          context_uri: playlistId, // keeps it off if it's paused
          offset: {uri: offset}
        },
      })
        .then(async (res) => {
          console.log(res);
        })
        .catch((err) => {
          return err;
        });
    });
  };

  const pausePlayback = () => {
    console.log("Pausing playback");
    // Add logic to pause playback
  };

  const toggleShuffle = () => {
    console.log("Toggling shuffle");
    // Add logic to toggle shuffle
  };

  return (
    <PlayerContext.Provider
      value={{
        playSong,
        playPlaylist,
        pausePlayback,
        toggleShuffle,
        isPaused,
        isActive,
        currentTrack,
      }}
    >
      {children}
      <Player /> {/* Render the Player component */}
    </PlayerContext.Provider>
  );
};

// Custom hook to use the Player context
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};

export default PlayerContext;
