/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Worked on by: Ashley Bickham and Siri Avula

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  PixelRatio,
  Dimensions,
  ScrollView,
} from "react-native";
import UserReaderWriter from "../services/UserReaderWriter";
import LyricsService from "../services/LyricsService";
import TranslationService from "../services/TranslationService";
import WordModal from "../components/WordModal";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

// saves word that was pressed's data, needs to be loaded here so data doesn't get rewritten while data gets updated from API calls

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// page contents, runs through on each render of page
export default function LyricsToScreen({ currentTrack }) {
  //grabbing Song information from song playback
  const playlistItem = currentTrack;
  // songLang determined by examining song lyrics with detect later
  //pref language determined by detecting language from user's prefLanguage data
  /*locally held prefLang, assigned value from userPrefLang value
  Is a separate value because the formatting of the language is a a two-character code 
  vs plain english (database pref language format).
  Some function renders are reliant when this value changes
  and we do not want those functions to run with the impropely formatted database userPrefLang value*/
  const [prefLang, setPrefLang] = useState("");

  const [lyrics, setLyrics] = useState("");
  const [translation, setTranslation] = useState("");
  const [fromLang, setFromLang] = useState("");

  const [openModal, setOpenModal] = React.useState(false);
  const [clickedWord, setClickedWord] = React.useState("");

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
    <View style={styles.container}>
      <ScrollView>
        {lyrics.split("\n").map((line, lineIdx) => (
          <View
            key={lineIdx}
            style={{ marginBottom: 10, flexDirection: "row", flexWrap: "wrap" }}
          >
            {line.split(" ").map((word, wordIdx) => (
              <TouchableHighlight
                key={wordIdx}
                onPress={() => {
                  setClickedWord(word);
                  setOpenModal(true);
                }}
                style={{ marginRight: 4, marginBottom: 4 }}
                underlayColor="#5bc8a6"
              >
                <Text style={styles.lyricsText}>{word}</Text>
              </TouchableHighlight>
            ))}
          </View>
        ))}
        <Text>TRANSLATION</Text>

        {translation.split("\n").map((line, lineIdx) => (
          <View
            key={lineIdx}
            style={{ marginBottom: 10, flexDirection: "row", flexWrap: "wrap" }}
          >
            {line.split(" ").map((word, wordIdx) => (
              <TouchableHighlight
                key={wordIdx}
                onPress={() => {
                  setClickedWord(word);
                  setOpenModal(true);
                }}
                style={{ marginRight: 4, marginBottom: 4 }}
                underlayColor="#5bc8a6"
              >
                <Text style={styles.lyricsText}>{word}</Text>
              </TouchableHighlight>
            ))}
          </View>
        ))}

        <Text>{"\n\n"}</Text>
      </ScrollView>
      <View style={styles.saveWordModal}>
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
      console.log("CODE IS: " + prefLang);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#303248",
    paddingTop: 20,
    height: SCREEN_HEIGHT - 50,
  },
  UIInfo: {
    fontSize: getFontSize(25),
    color: "#edc526",
    textAlign: "center",
  },
  space: {
    height: 40,
    backgroundColor: "white",
  },
  noteText: {
    fontSize: getFontSize(15),
    color: "#ff4a2a",
    textAlign: "left",
    padding: 15,
  },
  lyricBlock: {
    padding: 32,
    paddingTop: 0,
    lineHeight: 45,
    flexWrap: "wrap",
    flexDirection: "row",
    color: "white",
  },
  lyricsText: {
    fontSize: getFontSize(25),
    color: "white",
  },
  noFlex: {
    flexWrap: "nowrap",
  },
  buttons: {
    alignContent: "flex-end",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  modalbg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalforefront: {
    backgroundColor: "#303248",
    padding: 15,
    borderRadius: 15,
    borderWidth: 10,
    borderColor: "#5bc8a6",
  },
  modalText: {
    color: "white",
    fontSize: getFontSize(25),
  },
  closeModal: {},
  saveWordModal: {
    zIndex: -10,
  },
  modalButtons: {
    alignContent: "flex-end",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 5,
  },
  dropdown: {
    textAlign: "center",
    paddingLeft: 10,
    height: 35,
    width: 325,
    borderColor: "rgba(183, 193, 189, 0.9)",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: "white",
  },
  placeholderStyle: {
    fontSize: getFontSize(20),
    color: "white",
  },
  selectedTextStyle: {
    fontSize: getFontSize(20),
    color: "white",
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: "white",
  },
});
