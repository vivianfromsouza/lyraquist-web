import { useEffect, useState } from "react";
import TappableTextPanel from "./TappableTextPanel";
import UserReaderWriter from "../services/UserReaderWriter";

export default function LyricsPanel({ lyrics, songLang, currentTrack }) {
  const [prefLang, setPrefLang] = useState("");

  useEffect(() => {
    UserReaderWriter.getPreferredLanguage().then(setPrefLang);
  }, []);

  return (
    <TappableTextPanel
      text={lyrics}
      fromLang={songLang}
      toLang={prefLang}
      songName={currentTrack.name}
    />
  );
}
