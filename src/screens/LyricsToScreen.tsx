/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Worked on by: Ashley Bickham and Siri Avula
import React, { useState, useEffect } from "react";
import { Text, TouchableHighlight, View, ScrollView } from "react-native";
import UserReaderWriter from "../services/UserReaderWriter";
import LyricsService from "../services/LyricsService";
import TranslationService from "../services/TranslationService";
import WordModal from "../components/WordModal";
import lyricsStyles from "../styles/LyricsStyles";

export default function LyricsToScreen({ currentTrack }) {
  const playlistItem = currentTrack;
  const [prefLang, setPrefLang] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [translation, setTranslation] = useState("");
  const [fromLang, setFromLang] = useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [clickedWord, setClickedWord] = React.useState("");

  async function getUserPrefLang() {
    await UserReaderWriter.getPreferredLanguage().then((DBPrefLang) => {
      if (DBPrefLang.toLowerCase() == "english") {
        setPrefLang("en");
      } else if (
        DBPrefLang.toLowerCase() == "deutsch" ||
        DBPrefLang.toLowerCase() == "german"
      ) {
        setPrefLang("de");
      } else if (
        DBPrefLang.toLowerCase() == "espanol" ||
        DBPrefLang.toLowerCase() == "spanish"
      ) {
        setPrefLang("es");
      } else if (
        DBPrefLang.toLowerCase() == "francias" ||
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
    TranslationService.getTranslationAllLyrics(lyricsResponse, "en").then(
      (response) => {
        setTranslation(response.data[0].translations[0].text);
        setFromLang(response.data[0].detectedLanguage.language);
      }
    );
  }

  useEffect(() => {
    getLyrics();
  }, []);

  return (
    <View style={lyricsStyles.container}>
      <ScrollView>
        {lyrics.split("\n").map((line, lineIdx) => (
          <View key={lineIdx} style={lyricsStyles.lineFormat}>
            {line.split(" ").map((word, wordIdx) => (
              <TouchableHighlight
                key={wordIdx}
                onPress={() => {
                  setClickedWord(word);
                  setOpenModal(true);
                }}
                style={lyricsStyles.highlight}
                underlayColor="#5bc8a6"
              >
                <Text style={lyricsStyles.lyricsText}>{word}</Text>
              </TouchableHighlight>
            ))}
          </View>
        ))}
        <Text>TRANSLATION</Text>

        {translation.split("\n").map((line, lineIdx) => (
          <View key={lineIdx} style={lyricsStyles.lineFormat}>
            {line.split(" ").map((word, wordIdx) => (
              <TouchableHighlight
                key={wordIdx}
                onPress={() => {
                  setClickedWord(word);
                  setOpenModal(true);
                }}
                style={lyricsStyles.highlight}
                underlayColor="#5bc8a6"
              >
                <Text style={lyricsStyles.lyricsText}>{word}</Text>
              </TouchableHighlight>
            ))}
          </View>
        ))}

        <Text>{"\n\n"}</Text>
      </ScrollView>
      <View style={lyricsStyles.saveWordModal}>
        {openModal && (
          <WordModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            word={clickedWord}
            songLang={fromLang}
            songName={currentTrack.name}
          ></WordModal>
        )}
      </View>
    </View>
  );
}
