/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Worked on by: Ashley Bickham and Siri Avula
import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import UserReaderWriter from "../services/UserReaderWriter";
import LyricsService from "../services/LyricsService";
import TranslationService from "../services/TranslationService";
import lyricsStyles from "../styles/LyricsStyles";
import LyricsPanel from "./LyricsPanel";
import TranslationPanel from "./TranslationPanel";

export default function LyricsToScreen({ currentTrack }) {
  const playlistItem = currentTrack;
  const [prefLang, setPrefLang] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [translation, setTranslation] = useState("");
  const [fromLang, setFromLang] = useState("");

  async function getUserPrefLang() {
    await UserReaderWriter.getPreferredLanguage().then((DBPrefLang) => {
      if (
        DBPrefLang.toLowerCase() == "en" ||
        DBPrefLang.toLowerCase() == "english"
      ) {
        setPrefLang("en");
      } else if (
        DBPrefLang.toLowerCase() == "es" ||
        DBPrefLang.toLowerCase() == "spanish"
      ) {
        setPrefLang("es");
      } else if (
        DBPrefLang.toLowerCase() == "fr" ||
        DBPrefLang.toLowerCase() == "french"
      ) {
        setPrefLang("fr");
      }
    });
  }

  async function getLyrics() {
    await LyricsService.getLyrics(playlistItem).then((lyricsResponse) => {
      setLyrics(lyricsResponse);
      getTranslation(lyricsResponse);
    });
  }

  async function getTranslation(lyricsResponse) {
    await getUserPrefLang();
    TranslationService.getTranslationAllLyrics(lyricsResponse, prefLang).then(
      (response) => {
        setTranslation(response.data[0].translations[0].text);
        setFromLang(response.data[0].detectedLanguage.language);
      },
    );
  }

  useEffect(() => {
    getLyrics();
  }, [currentTrack]);

  return (
    <View style={lyricsStyles.container}>
      <LyricsPanel
        lyrics={lyrics}
        songLang={fromLang}
        currentTrack={currentTrack}
      />
      <Text>TRANSLATION</Text>
      <TranslationPanel
        translation={translation}
        prefLang={prefLang}
        songLang={fromLang}
        currentTrack={currentTrack}
      />
      <Text>{"\n\n"}</Text>
    </View>
  );
}
