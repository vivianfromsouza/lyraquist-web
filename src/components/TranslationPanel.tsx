import TappableTextPanel from "./TappableTextPanel";

export default function TranslationPanel({
  translation,
  prefLang,
  songLang,
  currentTrack,
}) {
  return (
    <TappableTextPanel
      text={translation}
      fromLang={prefLang}
      toLang={songLang}
      songName={currentTrack.name}
    />
  );
}
