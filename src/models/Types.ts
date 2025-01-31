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
    artist: string,
    spotifyURL: string,
    imageURL: string,
    name: string,
    album?: string,
    duration?: number,
    songID?: string,
    recordID?: string,
    isLiked?: boolean,
  };