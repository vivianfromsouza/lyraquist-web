import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  PixelRatio,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import WorkbookReaderWriter from "../services/WorkbookReaderWriter";
import WordReaderWriter from "../services/WordReaderWriter";
import DictionaryService from "../services/DictionaryService";
import { set } from "firebase/database";
import useSound from 'use-sound';

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const WordModal = ({ openModal, setOpenModal, word }) => {
  const [workbookItems] = useState<any>([]);
  const [bookUID, setbookUID] = useState<string>();
  const [translation, setTranslation] = useState("");
  const [definition, setDefinition] = useState("");
  const [pos, setPos] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [play] = useSound(pronunciation);
  const [workbookName, setWorkbookName] = useState<string>();
  const [newWorkbookName, setNewWorkbookName] = useState("");

   async function getDefinition() {
    await DictionaryService.getDefinition(word, ).then((definitionResponse) => {
      setPos(definitionResponse[0].fl)
      setDefinition(definitionResponse[0].shortdef[0])
      setPronunciation(definitionResponse[0].pronunciationAudio)
      console.log("definitionResponse", definitionResponse);
    });
  }

    // parsing data from JSON response and put it in a string
    useEffect(() => {
      console.log("Ich renne...")
      getDefinition();
    }, [pronunciation, play]);
  

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
                  in {"songLang"}:{" "}
                </Text>
                <Text
                  style={{ fontWeight: "bold", fontSize: 35, color: "white" }}
                >
                  {word}
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
                  in {"prefLang"}:{" "}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 30,
                    color: "#edc526",
                    fontStyle: "italic",
                  }}
                >
                  {definition}
                </Text>
              </View>
            </View>
            {/*Button for dictation */}
            <Pressable
              onPress={() => play}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <FontAwesomeIcon icon={faVolumeUp} />

              <Text style={{ fontSize: 10, color: "white" }}>
                Press to Dictate
              </Text>
              <audio src={pronunciation} />
            </Pressable>
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, color: "white" }}>{definition}</Text>
            <Text style={{ fontSize: 15, color: "gray", fontStyle: "italic" }}>
              {pos}
            </Text>
          </View>

          <Dropdown
            options={workbookItems}
            value={bookUID}
            onChange={(e) => {
              setbookUID(e.value.uid);
              setWorkbookName(e.value.name);
            }}
            optionLabel="name"
            placeholder="Choose a workbook"
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
                    const workbooks = await WorkbookReaderWriter.getWorkbooks();
                    const workbookExists = workbooks.some(
                      (workbook) => workbook.name === newWorkbookName
                    );
                    if (workbookExists) {
                      Alert.alert(
                        "Workbook with this name already exists. Please choose a different name."
                      );
                    } else {
                      // const newBookUID =
                      //   await WorkbookReaderWriter.createWorkbook(
                      //     newWorkbookName.trim(),
                      //     ""
                      //   );
                      // WordReaderWriter.addWord(
                      //   savedWord.word,
                      //   savedWord.TLWord,
                      //   newBookUID,
                      //   songLang,
                      //   savedWord.POS,
                      //   name,
                      //   false
                      // );
                      // Alert.alert(
                      //   "New word added!.",
                      //   '"' +
                      //     savedWord.word +
                      //     '" ' +
                      //     "added to " +
                      //     newWorkbookName +
                      //     " workbook."
                      // );
                      // newWorkbookBool = true;
                    }
                  } else {
                    // WordReaderWriter.addWord(
                    //   savedWord.word,
                    //   savedWord.TLWord,
                    //   bookUID,
                    //   songLang,
                    //   savedWord.POS,
                    //   name,
                    //   false
                    // );
                    // newWorkbookBool = false;
                  }

                  if (!newWorkbookBool) {
                    // Alert.alert(
                    //   "New word added!.",
                    //   '"' +
                    //     savedWord.word +
                    //     '" ' +
                    //     "added to " +
                    //     workbookName +
                    //     " workbook."
                    // );
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
};

export default WordModal;

const styles = StyleSheet.create({
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
