/* eslint-disable @typescript-eslint/no-explicit-any */
export type Word = {
  wordUID: string;
  word: string;
  translation: string;
  language: string;
  partOfSpeech: string;
  fromSong: string;
  isStarred: boolean;
  bookUID: string;
};

export type PlayItem = {
  artist: string;
  spotifyURL: string;
  imageURL: string;
  name: string;
  album?: string;
  duration?: number;
  songID?: string;
  recordID?: string;
  isLiked?: boolean;
};

export interface PlayerType {
  seek: (position: number) => Promise<void>;
  togglePlay: () => Promise<void>;
  nextTrack: () => Promise<void>;
  previousTrack: () => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
}
export {};

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: any;
    Spotify: any;
  }
}
