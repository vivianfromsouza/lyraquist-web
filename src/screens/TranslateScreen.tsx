/* eslint-disable prefer-const */
// Worked on by: Ashley Bickham and Siri Avula
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  PixelRatio,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
// import TranslationService from "../services/TranslationService";
import UserReaderWriter from "../services/UserReaderWriter";
// import { APIKeys } from "../APIKeys";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const TranslateScreen = ({ currentTrack }) => {
  //grabbing Song information from previous page (song playback)

  //pref language determined by detecting language from user's prefLanguage data
  const [userPrefLang, setUserPrefLang] = useState("");
  /*locally held prefLang, assigned value from userPrefLang value
  Is a separate value because the formatting of the language is a a two-character code 
  vs plain english (database pref language format).
  Some function renders are reliant when this value changes
  and we do not want those functions to run with the impropely formatted database userPrefLang value*/
  const [prefLang, setPrefLang] = useState("");

  const [TLedLyrics, setTLedLyrics] = useState("");

  interface LyricsObject {
    lyricsList: string[];
    linelocations: number[];
}
  //hold list of words in lyrics and location of line breaks - the index of the word with the \n (for formatting)
  let lyricsObject: LyricsObject = { 
    lyricsList:  [], 
    linelocations: []
};

  //prepping API Call for lyric pull
  //   let apiKey = APIKeys.LyricKey;
  //   let lyricsAPI =
  //     "https://api.musixmatch.com/ws/1.1/" +
  //     "matcher.lyrics.get" +
  //     "?format=json&callback=callback" +
  //     "&q_artist=" +
  //     artist +
  //     "&q_track=" +
  //     name +
  //     apiKey;

  // parsing data from JSON response and put it in a string
  useEffect(() => {
    getUserPrefLang();
    if (prefLang != "") {
      setTLedLyrics("TO BE WRITTEN...");

      //   fetch(lyricsAPI)
      //     .then((response) => response.json())
      //     .then(async (lyricJson) => {
      //       //translates lyrics into preferred language long as not empty
      //       if (
      //         lyricJson.message.body.lyrics === undefined ||
      //         lyricJson.message.body.lyrics.lyrics_body == ""
      //       ) {
      //         TranslationService.translateAuto(
      //           "There are no lyrics to translate.",
      //           prefLang
      //         ).then((translation) => {
      //           setTLedLyrics(translation);
      //         });
      //       } else {
      //         TranslationService.translateAuto(
      //           lyricJson.message.body.lyrics.lyrics_body,
      //           prefLang
      //         ).then((translation) => {
      //           setTLedLyrics(translation);
      //         });
      //       }
      //     })
      //     .catch((err) => {
      //       console.log("print error: " + err);
      //     });
    } else {
      setTLedLyrics("LOADING...");
    }
  }, [prefLang]);

  // Parsing Lyrics for rendering
  let lyricLines = TLedLyrics.split("\n...\n\n*******")[0].split("\n");
  let count = 0;
  for (let line of lyricLines) {
    for (let word of line.split(" ")) {
      lyricsObject.lyricsList.push(word);
      count++;
    }
    lyricsObject.linelocations.push(count);
  }

  // grabs prefLang from Database
  async function getUserPrefLang() {
    await UserReaderWriter.getPreferredLanguage().then((DBPrefLang) => {
      //grabbing specific language code for for translation and sets local prefLang value
      setUserPrefLang(DBPrefLang);
      console.log("USER PREF LANG: " + userPrefLang);
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

  // this shows the lyrics translated to prefLang
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.lyricBlock}>
          {lyricsObject.lyricsList.map((prop, key) => {
            return (
              <Text key={key} style={styles.lyricsText}>
                {prop}{" "}
              </Text>
            );
          })}
        </Text>
        <Text>{"\n\n"}</Text>
      </ScrollView>
    </View>
  );
};
export default TranslateScreen;

const translucent = "rgba(0,0,0,0.5)";

// UI styling
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#303248",
    paddingTop: 20,
    height: SCREEN_HEIGHT - 50,
  },
  lyricBlock: {
    padding: 32,
    paddingTop: 0,
    lineHeight: 45,
  },
  lyricsText: {
    fontSize: getFontSize(25),
    color: "white",
  },
  buttons: {
    alignContent: "flex-end",
    color: "white",
  },
  modalbg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: translucent,
  },
  modalforefront: {
    backgroundColor: "#303248",
    padding: 15,
    width: "95%",
    height: "40%",
  },
  modalText: {
    color: "white",
    fontSize: getFontSize(25),
  },
  closeModal: {},
  saveWordModal: {},
  modalButtons: {
    alignContent: "flex-end",
    color: "white",
  },
  dropdown: {
    textAlign: "center",
    marginLeft: 15,
    paddingLeft: 10,
    height: 35,
    width: 325,
    borderColor: "rgba(183, 193, 189, 0.9)",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: getFontSize(20),
  },
  selectedTextStyle: {
    fontSize: getFontSize(20),
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: "white",
  },
});
