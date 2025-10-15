// Worked on by: Ashley Bickham, Vivian D'Souza
// TODO: REVISIT THIS CONCEPT NOW THAT WE ARE USING WEB VERSION
import HistoryReaderWriter from "./HistoryReaderWriter";

// currently playing song ID
let currSong = "default value";
// is the music playback active
let isPlaying = false;
// last played song ID
let lastSong = "";

let progress = 0;
let position = 0;
let isFirstStart = true;
let duration = 0;

// setAppStartValues();
const GlobalPlayer = {
  async setAppStartValues() {
    await HistoryReaderWriter.getLastPlayedSong().then((song) => {
      lastSong = song.track.uri;
    });

  },
  getCurrSong() {
    return currSong;
  },
  getIsPlaying() {
    return isPlaying;
  },
  getlastSong() {
    return lastSong;
  },
  getProgress() {
    return progress;
  },
  getPosition() {
    return position;
  },
  getDuration() {
    return duration;
  },
  getIsFirstStart() {
    return isFirstStart;
  },
  setCurrSong(varCurrSong) {
    currSong = varCurrSong;
  },
  setIsPlaying(aIsPlaying) {
    isPlaying = aIsPlaying;
  },
  setlastSong(varLastSong) {
    lastSong = varLastSong;
  },
  setProgress(aProgress) {
    progress = aProgress;
  },
  setPosition(aPosition) {
    position = aPosition;
  },
  setIsFirstStart(aFirstStart) {
    isFirstStart = aFirstStart;
  },
  setDuration(aDuration) {
    duration = aDuration;
  },
};
export default GlobalPlayer;
