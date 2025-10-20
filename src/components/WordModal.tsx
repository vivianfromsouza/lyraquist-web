import {
  Text,
  View,
  StyleSheet,
  Modal,
  TextInput,
  PixelRatio,
} from "react-native";
import { Pressable } from "react-native-web";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect, useRef, useState } from "react";
import WorkbookReaderWriter from "../services/WorkbookReaderWriter";
import TranslationService from "../services/TranslationService";
import UserReaderWriter from "../services/UserReaderWriter";
import DictionaryService from "../services/DictionaryService";
import { toast, ToastContainer } from "react-toastify";
import WordReaderWriter from "../services/WordReaderWriter";
import { languages } from "../constants/ProjectConstants";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const WordModal = ({ openModal, setOpenModal, word, songLang, songName }) => {
  const [bookUID, setbookUID] = useState<any>();
  const [translation, setTranslation] = useState("");
  const [definition, setDefinition] = useState("");
  const [pos, setPos] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [workbookName, setWorkbookName] = useState<string>();
  const [newWorkbookName, setNewWorkbookName] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [workbooks, setWorkbooks] = useState<any>([]);

  console.log(workbookName);
  console.log(setPronunciation);

  async function getEntryDetails() {
    let prefLang = await UserReaderWriter.getPreferredLanguage();

    if (prefLang === songLang) {
      prefLang = await UserReaderWriter.getTargetLanguage();
    }

    const translationResponse = await TranslationService.getSingleTranslation(
      word,
      songLang,
      prefLang
    );

    const translation =
      (await translationResponse?.results?.[0]?.lexicalEntries?.[0]
        ?.entries?.[0]?.senses?.[0]?.translations?.[0]?.text) ?? "";

    setTranslation(translation);

    if (songLang === "en") {
      setPronunciation(
        translationResponse?.results?.[0]?.lexicalEntries?.[0]?.entries?.[0]
          ?.pronunciations?.[0]?.audioFile ?? ""
      );
    }

    const definitionResponse = await DictionaryService.getDefinition(
      translation,
      prefLang
    );

    setDefinition(
      definitionResponse?.results?.[0]?.lexicalEntries?.[0]?.entries?.[0]
        ?.senses?.[0]?.definitions?.[0] ?? ""
    );
    setPos(
      definitionResponse?.results?.[0]?.lexicalEntries?.[0]?.lexicalCategory
        ?.text ?? ""
    );
  }

  async function getWorkbooks() {
    await WorkbookReaderWriter.getWorkbooks().then((workbooks) => {
      const workbooksToDropdown = [{}];
      workbooks.map((book) => {
        workbooksToDropdown.push({ label: book.name, value: book.book_id });
      });
      workbooksToDropdown.push({ label: "Create a Workbook", value: "0" });
      setWorkbooks(workbooksToDropdown);
    });
  }

  async function addWordToWorkbook() {
    if (bookUID == "" || bookUID === undefined) {
      toast("Please choose a workbook to add the word to!");
    } else if (bookUID === "0") {
      const workbookExists = workbooks.some(
        (workbook) => workbook.label === newWorkbookName
      );
      if (workbookExists) {
        toast(
          "Workbook with this name already exists. Please choose a different name."
        );
      } else {
        const newBookUID = await WorkbookReaderWriter.createWorkbook(
          newWorkbookName.trim(),
          ""
        );
        WordReaderWriter.addWord(
          word,
          translation,
          newBookUID,
          songLang,
          pos,
          songName,
          false
        );
        toast(
          "New word added!." +
            '"' +
            word +
            '" ' +
            "added to " +
            newWorkbookName +
            " workbook."
        );
      }
    } else {
      const language = languages.find((l) => l.code === songLang)?.language;

      WordReaderWriter.addWord(
        word,
        translation,
        bookUID,
        language,
        pos,
        songName,
        false
      );
      toast(
        "New word added!." +
          '"' +
          word +
          '" ' +
          "added to " +
          newWorkbookName +
          " workbook."
      );
    }
  }

  useEffect(() => {
    getWorkbooks();

    getEntryDetails();
  }, [pronunciation]);

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
                  style={{ fontWeight: "bold", fontSize: 35, color: "white" }}
                >
                  {translation}
                </Text>
                {/* <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 30,
                    color: "#edc526",
                    fontStyle: "italic",
                  }}
                >
                  {pos}
                </Text> */}
              </View>
            </View>
            {/*Button for dictation */}
            {/* <audio controls id="player" src="https://audio.oxforddictionaries.com/en/mp3/amazing__gb_1.mp3"></audio>
              return <button onClick={play}>Boop!</button>; */}
            <Pressable
              onPress={() => {
                if (audioRef.current) {
                  audioRef.current.play();
                }
              }}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Text style={{ fontSize: 10, color: "white" }}>
                Press to Dictate
              </Text>

              <audio ref={audioRef} src={pronunciation} />
            </Pressable>
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, color: "white" }}>{definition}</Text>
            <Text style={{ fontSize: 15, color: "gray", fontStyle: "italic" }}>
              {pos}
            </Text>
          </View>

          <DropDownPicker
            open={open}
            value={value}
            items={workbooks}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setWorkbooks}
            onSelectItem={(item) => {
              setbookUID(item.value);
              setWorkbookName(item.label);
            }}
          />

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
              onPress={addWordToWorkbook}
            >
              <Text style={styles.modalButtons}> Save </Text>
              <ToastContainer />
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
    zIndex: 100000,
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
