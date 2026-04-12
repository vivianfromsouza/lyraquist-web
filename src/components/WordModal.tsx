import { Text, View, Modal, TextInput } from "react-native";
import { Pressable } from "react-native-web";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect, useRef, useState } from "react";
import WorkbookReaderWriter from "../services/WorkbookReaderWriter";
import TranslationService from "../services/TranslationService";
import UserReaderWriter from "../services/UserReaderWriter";
import { toast, ToastContainer } from "react-toastify";
import WordReaderWriter from "../services/WordReaderWriter";
import { languages } from "../constants/ProjectConstants";
import wordStyles from "../styles/WordStyles";

const WordModal = ({ openModal, setOpenModal, word, fromLang, toLang, songName }) => {
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
    console.log("Getting entry details for word:", word, "from language:", fromLang);
    try {
      const prefLang = await UserReaderWriter.getPreferredLanguage();

      //ex, if prefLang is English and song in English, then we translate to Spanish
      // if (prefLang === fromLang) {
      //   prefLang = await UserReaderWriter.getTargetLanguage();
      // }

      await TranslationService.lexicalaTranslation(
        word,
        fromLang,
      ).then((response) => {
        if (
          response &&
          typeof response === "object" &&
          response.results &&
          response.results.length > 0
        ) {
          console.log("First result:", response.results[0].senses[0]);
          setPos(response.results[0].headword.pos);
          setDefinition(response.results[0].senses[0].definition);
          setTranslation(response.results[0].senses[0].translations[toLang].text);
          // setTranslation(response.results[0].senses[0].translations[`${fromLang}`].text);
        } else {
          setPos("");
          setDefinition("Definition not available");
          setTranslation("");
        }
      });

    } catch (err) {
      console.error("getEntryDetails error", err);
    }
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
        (workbook) => workbook.label === newWorkbookName,
      );
      if (workbookExists) {
        toast(
          "Workbook with this name already exists. Please choose a different name.",
        );
      } else {
        const newBookUID = await WorkbookReaderWriter.createWorkbook(
          newWorkbookName.trim(),
          "",
        );
        WordReaderWriter.addWord(
          word,
          translation,
          newBookUID,
          fromLang,
          pos,
          songName,
          false,
        );
        toast(
          "New word added!." +
            '"' +
            word +
            '" ' +
            "added to " +
            newWorkbookName +
            " workbook.",
        );
      }
    } else {
      const language = languages.find((l) => l.code === fromLang)?.language;

      WordReaderWriter.addWord(
        word,
        translation,
        bookUID,
        language,
        pos,
        songName,
        false,
      );
      toast(
        "New word added!." +
          '"' +
          word +
          '" ' +
          "added to " +
          newWorkbookName +
          " workbook.",
      );
    }
  }

  useEffect(() => {
    getWorkbooks();

    getEntryDetails();
  }, [openModal, word, fromLang]);

  return (
    <Modal visible={openModal} animationType="slide" transparent={true}>
      <View data-testid="word-modal" style={wordStyles.modalbg}>
        <View style={wordStyles.modalforefront}>
          <View style={wordStyles.modalTextBackground}>
            <View>
              <View style={wordStyles.modalText}>
                <Text style={wordStyles.originalLabel}>word: </Text>
                <Text style={wordStyles.originalText}>{word}</Text>
              </View>
              <View style={wordStyles.modalText}>
                <Text style={wordStyles.prefLabel}>translation: </Text>
                <Text style={wordStyles.originalText}>{translation}</Text>
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
            {/* <Pressable
              onPress={() => {
                if (audioRef.current) {
                  audioRef.current.play();
                }
              }}
            >
              <Text style={wordStyles.dictate}>Press to Dictate</Text>

              <audio ref={audioRef} src={pronunciation} />
            </Pressable> */}
          </View>
          <View style={{ padding: 10 }}>
            <Text style={wordStyles.definition}>{definition}</Text>
            <Text style={wordStyles.pos}>{pos}</Text>
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
            <View style={wordStyles.newWorkbookInput}>
              <TextInput
                placeholder="Enter new workbook name"
                placeholderTextColor={"white"}
                editable
                value={newWorkbookName}
                onChangeText={(text) => setNewWorkbookName(text)}
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
              style={wordStyles.closeButton}
            >
              <Text style={wordStyles.modalButtons}> Close </Text>
            </Pressable>
            <Pressable
              style={wordStyles.saveButton}
              onPress={addWordToWorkbook}
            >
              <Text style={wordStyles.modalButtons}> Save </Text>
              <ToastContainer />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WordModal;
