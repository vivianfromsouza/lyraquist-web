import { Text, View, Modal, TextInput } from "react-native";
import { Pressable } from "react-native-web";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect, useState } from "react";
import WorkbookReaderWriter from "../services/WorkbookReaderWriter";
import TranslationService from "../services/TranslationService";
import { toast, ToastContainer } from "react-toastify";
import WordReaderWriter from "../services/WordReaderWriter";
import { languages } from "../constants/ProjectConstants";
import wordStyles from "../styles/WordStyles";

const WordModal = ({
  openModal,
  setOpenModal,
  word,
  fromLang,
  toLang,
  songName,
}) => {
  const [bookUID, setbookUID] = useState<any>();
  const [translation, setTranslation] = useState("");
  const [definition, setDefinition] = useState("");
  const [pos, setPos] = useState("");

  // const [translation2, setTranslation2] = useState("");
  const [definition2, setDefinition2] = useState("");
  // const [pos2, setPos2] = useState("");

  const [workbookName, setWorkbookName] = useState<string>();
  const [newWorkbookName, setNewWorkbookName] = useState("");
  // const audioRef = useRef<HTMLAudioElement>(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [workbooks, setWorkbooks] = useState<any>([]);

  console.log(workbookName);

  async function getEntryDetails() {
    console.log(
      "Getting entry details for word:",
      word,
      "from language:",
      fromLang,
    );
    console.log("toLang:", toLang);

    try {
      // Method #1: Get translation from Azure, then get definition and pos from Lexicala, no lemmatization
      await TranslationService.getIndividualTranslation(
        word,
        fromLang,
        toLang,
      ).then(async (response) => {
        if (response && typeof response === "object") {
          const translationText =
            response?.data?.[0]?.translations?.[0]?.normalizedTarget ||
            "Translation not available for this word.";

          setTranslation(translationText);

          const resolvedPos =
            response.data[0].translations[0].posTag == "OTHER"
              ? "verb"
              : response.data[0].translations[0].posTag || "";

          if (resolvedPos !== "OTHER") {
            setPos(resolvedPos);
          }

          const lexicalaResponse = await TranslationService.lexicalaDefinition(
            word,
            fromLang,
          );
          if (
            lexicalaResponse &&
            typeof lexicalaResponse === "object" &&
            lexicalaResponse.results &&
            lexicalaResponse.results.length > 0
          ) {
            setPos(lexicalaResponse.results[0].headword.pos);

            const topResults = lexicalaResponse.results.slice(0, 3);

            const definitions = topResults
              .map((r) => r.senses?.[0]?.definition)
              .filter(Boolean);
            setDefinition(
              definitions.length > 1
                ? definitions.map((d, i) => `${i + 1}. ${d}`).join("\n")
                : (definitions[0] ?? "Definition not available"),
            );
          } else {
            setPos("");
            setDefinition("Definition not available");
            setTranslation("");
          }
        } else {
          setPos("");
          setTranslation("Translation not available for this word.");
        }
      });
      // Method #2: Get translation, definition, and pos all from Lexicala, with lemmatization

      await TranslationService.getIndividualTranslation(
        word,
        fromLang,
        toLang,
      ).then(async (response) => {
        if (response && typeof response === "object") {
          const translationText =
            response?.data?.[0]?.translations?.[0]?.normalizedTarget ||
            "Translation not available for this word.";

          setTranslation(translationText);

          const lemmatizeResponse = await TranslationService.lemmatize(
            word,
            fromLang,
          );

          console.log(
            "Lemmatize response:",
            lemmatizeResponse.results[0].headwords[0].pos,
          );

          const lexicalaResponse = await TranslationService.lexicalaDefinition(
            word,
            fromLang,
            lemmatizeResponse.results[0].headwords[0].pos,
          );
          if (
            lexicalaResponse &&
            typeof lexicalaResponse === "object" &&
            lexicalaResponse.results &&
            lexicalaResponse.results.length > 0
          ) {
            setPos(lexicalaResponse.results[0].headword.pos);

            const topResults = lexicalaResponse.results.slice(0, 3);

            setDefinition2(
              topResults
                .map((r) => r.senses?.[0]?.definition)
                .filter(Boolean)
                .slice(0, 3)
                .join("\n"),
            );
          } else {
            setPos("");
            setDefinition("Definition not available");
            setTranslation("");
          }
        } else {
          setPos("");
          setTranslation("Translation not available for this word.");
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
      toast("Please choose a workbook to add the word to!", {
        className: "toast-custom",
      });
    } else if (bookUID === "0") {
      const workbookExists = workbooks.some(
        (workbook) => workbook.label === newWorkbookName,
      );
      if (workbookExists) {
        toast(
          "Workbook with this name already exists. Please choose a different name.",
          {
            className: "toast-custom",
          },
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
          {
            className: "toast-custom",
          },
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
        {
          className: "toast-custom",
        },
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
                <Text style={wordStyles.prefText}>{translation}</Text>
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
            <Text style={wordStyles.definition}><b>Second Definition</b></Text>
            <Text style={wordStyles.definition}>{definition2}</Text>

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
                style={{ color: "white" }}
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
              <Text style={wordStyles.modalButtonsClose}>Close</Text>
            </Pressable>
            <Pressable
              style={wordStyles.saveButton}
              onPress={addWordToWorkbook}
            >
              <Text style={wordStyles.modalButtons}>Save Word</Text>
              <ToastContainer />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WordModal;