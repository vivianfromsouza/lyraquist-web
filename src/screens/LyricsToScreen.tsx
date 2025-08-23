/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Worked on by: Ashley Bickham and Siri Avula

import React, { useState, useEffect } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  PixelRatio,
  Alert,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import WorkbookReaderWriter from "../services/WorkbookReaderWriter";
import { Dropdown } from "primereact/dropdown";
import UserReaderWriter from "../services/UserReaderWriter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WordReaderWriter from "../services/WordReaderWriter";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import LyricsService from "../services/LyricsService";
import TranslationService from "../services/TranslationService";

//setting up pixelRatio so the font sizing scale is based off device size
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

// counters to help format the lyrics
// var currWordCount = 0;
// var lineLocIndex = 0;

// saves word that was pressed's data, needs to be loaded here so data doesn't get rewritten while data gets updated from API calls
let savedWord = { word: "", TLWord: "", POS: "", def: "" };

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// page contents, runs through on each render of page
export default function LyricsToScreen({ currentTrack }) {
  //grabbing Song information from song playback
  const playlistItem = currentTrack;
  let name = playlistItem.name;
  // songLang determined by examining song lyrics with detect later
  const [songLang] = useState("");
  //pref language determined by detecting language from user's prefLanguage data
  /*locally held prefLang, assigned value from userPrefLang value
  Is a separate value because the formatting of the language is a a two-character code 
  vs plain english (database pref language format).
  Some function renders are reliant when this value changes
  and we do not want those functions to run with the impropely formatted database userPrefLang value*/
  const [prefLang, setPrefLang] = useState("");

  // string to contain lyrics data
  // const [data, setData] = useState("");

  //hold list of words in lyrics and location of line breaks - the index of the word with the \n (for formatting)
  let lyricsObject = { lyricsList: [], linelocations: [] };
  const [lyrics, setLyrics] = useState("");
  const [translation, setTranslation] = useState("");

  // this header is to show display for clicking the song instructions
  const [header] = useState(true);
  const [newWorkbookName, setNewWorkbookName] = useState("");

  //managing states for pop-up
  const [openModal, setOpenModal] = React.useState(false);

  // to hold the word to dictate
  // const [speechWord, setSpeechWord] = useState("");

  //for workbook selection
  const [bookUID, setbookUID] = useState<string>();
  const [workbookName, setWorkbookName] = useState<string>();
  // const [isFocus, setIsFocus] = useState(false);
  const [workbookItems] = useState<any>([]);

  //grabs workbooks and sets prefLang from user if loggin
  // function onAuthStateChanged(user) {
  //   setTimeout(async () => {
  //     if (user) {
  //       WorkbookReaderWriter.getWorkbooks().then((myBooks) => {
  //         let list: any[] = [""];
  //         for (const i in myBooks) {
  //           list.push(myBooks[i]);
  //         }
  //         list.push({
  //           name: "Create New Workbook",
  //           uid: "0",
  //         });

  //         setWorkbookItems(list);
  //       });
  //     }
  //   }, 1000);
  // }

  async function getLyrics() {
    const lyricsResponse = await LyricsService.getLyrics(playlistItem);
    setLyrics(lyricsResponse);
    getTranslation();
  }

  async function getTranslation() {
    await getUserPrefLang();
    console.log(lyrics);
    const translationResponse =
      await TranslationService.getTranslationAllLyrics(lyrics, "en");
    setTranslation(translationResponse);
    // await LyricsService.getLyrics(playlistItem).then((lyricString) => {
    //   console.log(lyricString + " from LyricsService");
    //   setLyrics(lyricString);
    // });
  }

  //for dictation functionality - NEED TO UPDATE
  const speak = () => {
    // Speech.speak(speechWord, {
    //   language: songLang,
    // });
  };

  //prepping API Call for lyric pull - NEED TO UPDATE
  //   var apiKey = APIKeys.LyricKey;
  //   var lyricsAPI =
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
    getLyrics();

    if (prefLang != "") {
      //   fetch(lyricsAPI)
      //     .then((response) => response.json())
      //     .then(async (lyricJson) => {
      //       if (
      //         lyricJson.message.body.lyrics === undefined ||
      //         lyricJson.message.body.lyrics.lyrics_body == ""
      //       ) {
      //         setHeader(false);
      //         setData(
      //           "Musixmatch does not have lyrics for this song available yet."
      //         );
      //         setSongLang("en");
      //       } else {
      //         setHeader(true);
      //         console.log(
      //           "lyric musixmatch \n" + lyricJson.message.body.lyrics.lyrics_body
      //         );
      //         setData(lyricJson.message.body.lyrics.lyrics_body);
      //         // for detecting the song's language
      //         setSongLang(
      //           await TranslationService.detectLanguage(
      //             lyricJson.message.body.lyrics.lyrics_body
      //           )
      //         );
      //       }
      //     })
      //     .catch((err) => {
      //       console.log(lyricsAPI);
      //       console.log("print error: " + err);
      //     });
    } else {
      // setData("LOADING...");
      console.log("LOADING...");
    }
  }, []);

  // Parsing Lyrics for rendering
  //   var lyricLines = data.split("\n...\n\n*******")[0].split("\n"); //removes the usixmatch's postscript on their lyric returned
  //   var count = 0;
  //   for (var line of lyricLines) {
  //     for (var word of line.split(" ")) {
  //       lyricsObject.lyricsList.push(word);
  //       count++;
  //     }
  //     lyricsObject.linelocations.push(count);
  //   }

  //displays words
  return (
    <View style={styles.container}>
      {/* contains lyrics below with each word as a pressable */}

      <ScrollView>
        {/* {header && (
          <>
            <Text
              accessibilityLabel="copyright"
              accessible={true}
              style={styles.noteText}
            >
              *NOTE Translation functionality may vary by language.{"\n"}ES, FR,
              and DE are supported
              {"\n"}As lyrics are copyrighted material only 30% is provided.
              These lyrics are NOT for commercial use
            </Text>
          </>
        )} */}
        {header && (
          <Text style={styles.UIInfo}>Click a word to see its meaning!</Text>
        )}
        <Text>{lyrics}</Text>
        <Text>TRANSLATION</Text>
        <Text>{translation}</Text>

        <View style={styles.lyricBlock}>
          {lyricsObject.lyricsList.map((prop: string) => {
            // if at a word index to add a newLine renders an additonal text element of "\n"
            if (addnewLine()) {
              return (
                <View>
                  <Text style={styles.noFlex}>{"\n"}</Text>
                  <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#5bc8a6"
                    onPress={() => {
                      //does all stuff neeeded to populate info on modal - POS, Def, TL etc
                      wordAssignment(
                        // disallow list of grammatical symbols to only get the word by itself without punctuation etc
                        prop
                          .replace(
                            /`|~|!|@|#|\$|%|\^|&|\*|\(|\)|_|\+|=|{|}|\||\[|\]|:|\\|"|;|<|>|\?|,|\/|—|…|•|¡|¿|《|》|『|』|「|」|。|«|»/g,
                            ""
                          )
                          .replace(".", "")
                      );
                      // setSpeechWord(
                      //   prop
                      //     .replace(
                      //       /`|~|!|@|#|\$|%|\^|&|\*|\(|\)|_|\+|=|{|}|\||\[|\]|:|\\|"|;|<|>|\?|,|\/|—|…|•|¡|¿|《|》|『|』|「|」|。|«|»/g,
                      //       ""
                      //     )
                      //     .replace(".", "")
                      // );
                      setOpenModal(true);
                    }}
                  >
                    <Text key={prop} style={styles.lyricsText}>
                      {prop}{" "}
                    </Text>
                  </TouchableHighlight>
                </View>
              );
            } else {
              return (
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor="#5bc8a6"
                  onPress={() => {
                    //does all stuff neeeded to populate info on modal - POS, Def, TL etc
                    wordAssignment(
                      prop
                        .replace(
                          /`|~|!|@|#|\$|%|\^|&|\*|\(|\)|_|\+|=|{|}|\||\[|\]|:|\\|"|;|<|>|\?|,|\/|—|…|•|¡|¿|《|》|『|』|「|」|。|«|»/g,
                          ""
                        )
                        .replace(".", "")
                    );
                    // setSpeechWord(
                    //   prop
                    //     .replace(
                    //       /`|~|!|@|#|\$|%|\^|&|\*|\(|\)|_|\+|=|{|}|\||\[|\]|:|\\|"|;|<|>|\?|,|\/|—|…|•|¡|¿|《|》|『|』|「|」|。|«|»/g,
                    //       ""
                    //     )
                    //     .replace(".", "")
                    // );
                    setOpenModal(true);
                  }}
                >
                  <Text key={prop} style={styles.lyricsText}>
                    {prop}{" "}
                  </Text>
                </TouchableHighlight>
              );
            }
          })}
        </View>
        <Text>{"\n\n"}</Text>
      </ScrollView>
      {renderModal()}
    </View>
  );

  // controls contents that modal renders
  function renderModal() {
    return (
      <Modal visible={openModal} animationType="slide" transparent={true}>
        <View style={styles.modalbg}>
          <View style={styles.modalforefront}>
            <View
              style={{
                backgroundColor: "rgba(91,200,166,0.15)",
                padding: 10,
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                  <Text
                    style={{
                      fontStyle: "italic",
                      fontSize: 25,
                      color: "white",
                    }}
                  >
                    in {songLang}:{" "}
                  </Text>
                  <Text
                    style={{ fontWeight: "bold", fontSize: 35, color: "white" }}
                  >
                    {savedWord.word}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                  <Text
                    style={{
                      fontStyle: "italic",
                      fontSize: 20,
                      color: "white",
                    }}
                  >
                    in {prefLang}:{" "}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 30,
                      color: "#edc526",
                      fontStyle: "italic",
                    }}
                  >
                    {savedWord.TLWord}
                  </Text>
                </View>
              </View>
              {/*Button for dictation */}
              <Pressable
                onPress={speak}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                {/* <FontAwesome5
                  name="volume-up"
                  size={35}
                  color="white"
                  style={{ paddingRight: 0, paddingBottom: 5 }}
                /> */}

                <FontAwesomeIcon icon={faVolumeUp} />

                <Text style={{ fontSize: 10, color: "white" }}>
                  Press to Dictate
                </Text>
              </Pressable>
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 15, color: "white" }}>Definition:</Text>
              <Text
                style={{ fontSize: 15, color: "gray", fontStyle: "italic" }}
              >
                {savedWord.POS}
              </Text>
              <Text style={{ fontSize: 20, color: "white" }}>
                {savedWord.def}
              </Text>
            </View>
            {/* Dropdown choices for adding word chosen to workbook */}
            {/* <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "green" }]}
              containerStyle={{ zIndex: 60, top: -100 }}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={workbookItems}
              maxHeight={1000}
              labelField="name"
              valueField="uid"
              value={bookUID}
              placeholder="Select a Workbook"
              onChange={(item) => {
                setbookUID(item.uid);
                setWorkbookName(item.name);
              }}
            /> */}

            <Dropdown
              options={workbookItems}
              value={bookUID}
              onChange={(e) => {
                setbookUID(e.value.uid);
                setWorkbookName(e.value.name);
              }}
              optionLabel="name"
              placeholder="hoose a workbook"
              className="w-full md:w-14rem"
            />
            {/* renders a TextInput when "create own workbook" option is chosen */}
            {bookUID === "0" && (
              <View
                style={{
                  borderWidth: 0.5,
                  padding: 6,
                  paddingLeft: 8,
                  borderRadius: 5,
                  borderColor: "gray",
                  marginTop: 10,
                  marginHorizontal: 14,
                }}
              >
                <TextInput
                  placeholder="Enter new workbook name"
                  placeholderTextColor={"white"}
                  editable
                  value={newWorkbookName}
                  onChangeText={(text) => setNewWorkbookName(text)}
                  style={{ color: "white", fontSize: 15 }}
                />
              </View>
            )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 30,
                marginHorizontal: 10,
              }}
            >
              {/* Button that closes the modal when clicked */}
              <Pressable
                onPress={() => setOpenModal(false)}
                style={{
                  backgroundColor: "#edc526",
                  padding: 10,
                  borderRadius: 12,
                  paddingHorizontal: 5,
                }}
              >
                <Text style={styles.modalButtons}> Close </Text>
              </Pressable>
              {/* Adds word to workbook selected from the dropdown*/}
              <Pressable
                style={{
                  backgroundColor: "#ff4a2a",
                  padding: 10,
                  borderRadius: 12,
                  paddingHorizontal: 5,
                }}
                onPress={async () => {
                  let newWorkbookBool = false;
                  if (bookUID == "" || bookUID === undefined) {
                    Alert.alert("Please choose a workbook to add the word to!");
                  } else {
                    if (bookUID == "0") {
                      const workbooks =
                        await WorkbookReaderWriter.getWorkbooks();
                      const workbookExists = workbooks.some(
                        (workbook) => workbook.name === newWorkbookName
                      );
                      if (workbookExists) {
                        Alert.alert(
                          "Workbook with this name already exists. Please choose a different name."
                        );
                      } else {
                        const newBookUID =
                          await WorkbookReaderWriter.createWorkbook(
                            newWorkbookName.trim(),
                            ""
                          );

                        WordReaderWriter.addWord(
                          savedWord.word,
                          savedWord.TLWord,
                          newBookUID,
                          songLang,
                          savedWord.POS,
                          name,
                          false
                        );

                        Alert.alert(
                          "New word added!.",
                          '"' +
                            savedWord.word +
                            '" ' +
                            "added to " +
                            newWorkbookName +
                            " workbook."
                        );

                        newWorkbookBool = true;
                      }
                    } else {
                      WordReaderWriter.addWord(
                        savedWord.word,
                        savedWord.TLWord,
                        bookUID,
                        songLang,
                        savedWord.POS,
                        name,
                        false
                      );
                      newWorkbookBool = false;
                    }

                    if (!newWorkbookBool) {
                      Alert.alert(
                        "New word added!.",
                        '"' +
                          savedWord.word +
                          '" ' +
                          "added to " +
                          workbookName +
                          " workbook."
                      );
                    }
                  }
                }}
              >
                <Text style={styles.modalButtons}> Save </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  // grabs prefLang from Database
  async function getUserPrefLang() {
    await UserReaderWriter.getPreferredLanguage().then((DBPrefLang) => {
      //grabbing specific language code for for translation and sets local prefLang value
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

  //assigns word and definition from the pressed word
  async function wordAssignment(word) {
    //resets savedWordValue and sets it to LOADING... while waiting on API call returns
    savedWord.word = " LOADING...";
    savedWord.POS = " LOADING...";
    savedWord.TLWord = " LOADING...";
    savedWord.def = " LOADING...";

    //assigning variables needed to grab definition
    savedWord.word = word;

    // translation of selected word
    console.log("TRANSLATING");
    //FIX THIS
    // let TLedWord = await TranslationService.translateFRINTO(
    //   word,
    //   songLang,
    //   prefLang
    // );

    let TLedWord = "HELLO";
    savedWord.TLWord = TLedWord;

    //function to populate definition
    console.log("\nPOPULATING DEF");
    // var fromLang = songLang;
    // var toLang = prefLang;

    // FIX THIS - intermediate definition value incase undefined return and need to make another attempt
    // let intermedDef = await DefinitionService.getDefinition(word, fromLang);
    let intermedDef = "a greeting";

    // if definition is empty (no def found) attempts another definition pull with translated word (translated into user's preferred language)
    if (intermedDef == "" || intermedDef === undefined) {
      // attempt def with TLWord
      console.log("DEF EMPTY ATTEMPTING OR UNDEFINED DEF FOR TLED WORD");
      //   FIX _ THIS intermedDef = await DefinitionService.getDefinition(TLedWord, prefLang);
      intermedDef = "another greeting";
      if (intermedDef == "" || intermedDef === undefined) {
        intermedDef =
          "Lexicala API does not have a definition for this word yet.";
        // fromLang = "en";
      } else {
        // fromLang = prefLang;
      }
    }

    //grabbing part of speech from Lexicala only after definition has been attempted
    // FIX THIS - savedWord.POS = await DefinitionService.getPartOfSpeech();
    savedWord.POS = "interjection";
    if (savedWord.POS == "" || savedWord.POS === undefined) {
      savedWord.POS = "NONE PROVIDED";
    }

    // translates definition into user's prefLanguage
    // savedWord.def = await TranslationService.translateFRINTO(
    //   intermedDef,
    //   fromLang,
    //   toLang
    // );
  }

  function addnewLine() {
    // if (currWordCount == lyricsObject.linelocations[lineLocIndex]) {
    //   currWordCount++;
    //   lineLocIndex++;
    //   return true;
    // } else {
    //   currWordCount++;
    //   return false;
    // }
    return true;
  }
}

// UI styling
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
  saveWordModal: {},
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
