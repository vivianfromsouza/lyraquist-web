// Worked on by: Vivian D'Souza
import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import WorkbookReaderWriter from "../services/WorkbookReaderWriter";
import { ArrowBackOutline } from "react-ionicons";
import DescriptionIcon from "@mui/icons-material/Description";
import PsychologyIcon from "@mui/icons-material/Psychology";
import LanguageIcon from "@mui/icons-material/Language";
import TranslateIcon from "@mui/icons-material/Translate";
import AbcIcon from "@mui/icons-material/Abc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { PlusCircleOutlined } from "@ant-design/icons";
import WordReaderWriter from "../services/WordReaderWriter";
import { useNavigate } from "react-router-dom";
import newBookStyles from "../styles/NewBookStyles";

function NewWorkbookScreen() {
  const [newWorkbookName, setNewWorkbookName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [newWord, setNewWord] = useState<string>("");
  const [newTranslation, setNewTranslation] = useState<string>("");
  const [newLanguage, setNewLanguage] = useState<string>("");
  const [newPartOfSpeech, setNewPartOfSpeech] = useState<string>("");
  const [addWord, setAddWord] = useState(false);
  const navigate = useNavigate();

  async function createWorkbook() {
    const workbooks = await WorkbookReaderWriter.getWorkbooks();
    if (newWorkbookName !== undefined && newWorkbookName.trim() !== "") {
      const workbookExists = workbooks.some(
        (workbook) => workbook.name === newWorkbookName
      );
      if (workbookExists) {
        Alert.alert(
          "Workbook with this name already exists. Please choose a different name."
        );
      } else {
        WorkbookReaderWriter.createWorkbook(
          newWorkbookName.trim(),
          description
        );
        navigate("/home");
        Alert.alert("Workbook Added!");
      }
    }
  }

  async function createWorkbookWithWord() {
    if (newWorkbookName !== undefined && newWorkbookName.trim() !== "") {
      const workbooks = await WorkbookReaderWriter.getWorkbooks();
      const workbookExists = workbooks.some(
        (workbook) => workbook.name === newWorkbookName
      );
      if (workbookExists) {
        Alert.alert(
          "Workbook with this name already exists. Please choose a different name."
        );
      } else {
        if (newWord != "" && newTranslation != "") {
          WorkbookReaderWriter.createWorkbook(
            newWorkbookName.trim(),
            description
          ).then((bookUID) => {
            WordReaderWriter.addWord(
              newWord,
              newTranslation,
              bookUID,
              newLanguage,
              newPartOfSpeech,
              "Added by User",
              false
            );
          });

          navigate("/home");
          Alert.alert("Workbook created successfully!");
        } else {
          Alert.alert(
            "Please add a translation to add a word to the workbook."
          );
        }
      }
    }
  }

  function removeWord() {
    setAddWord(false);
    setNewWord("");
  }

  const ButtonShown = () => {
    if (addWord && newWord != "") {
      return (
        <Pressable
          onPress={createWorkbookWithWord}
          style={newBookStyles.button}
        >
          <Text style={newBookStyles.buttonText}>Add Workbook with Word</Text>
        </Pressable>
      );
    } else {
      return (
        <Pressable
          onPress={createWorkbook}
          style={newBookStyles.button}
          accessibilityLabel="add"
          accessible={true}
        >
          <Text style={newBookStyles.buttonText}>Add Workbook</Text>
        </Pressable>
      );
    }
  };

  return (
    <SafeAreaView style={newBookStyles.container}>
      <View style={newBookStyles.header}>
        <View style={newBookStyles.titleLocation}>
          <TouchableOpacity
            onPress={() => navigate(-1)}
            style={newBookStyles.arrowLocation}
          >
            <ArrowBackOutline color={"#00000"} height="25px" width="25px" />
          </TouchableOpacity>
          {newWorkbookName == "" && (
            <Text style={newBookStyles.title}>New Workbook</Text>
          )}
          {newWorkbookName != "" && (
            <Text style={newBookStyles.title}>{newWorkbookName}</Text>
          )}
        </View>
      </View>

      <View style={newBookStyles.inputContainer}>
        <FontAwesomeIcon icon={faBook} style={newBookStyles.bookIcon} />

        <View style={newBookStyles.inputWrapper}>
          <View style={newBookStyles.inputRow}>
            <FontAwesomeIcon icon={faPencil} style={newBookStyles.pencilIcon} />
            <TextInput
              placeholder="New Workbook Name"
              value={newWorkbookName}
              onChangeText={(newtext) => setNewWorkbookName(newtext)}
              style={newBookStyles.input}
              accessibilityLabel="name"
              accessible={true}
            />
          </View>
          <View style={newBookStyles.inputRow}>
            <DescriptionIcon style={newBookStyles.paperIcon} />
            <TextInput
              placeholder="New Workbook Description"
              value={description}
              onChangeText={setDescription}
              style={newBookStyles.input}
              accessibilityLabel="description"
              accessible={true}
            />
          </View>
        </View>
      </View>
      {!addWord && (
        <Pressable
          onPress={() => setAddWord(true)}
          style={newBookStyles.addWordBtn}
        >
          <PlusCircleOutlined style={newBookStyles.addWordIcon} />
          <Text style={newBookStyles.addWordTxt}>Add Word</Text>
        </Pressable>
      )}
      {addWord && (
        <View>
          <Pressable
            onPress={() => removeWord()}
            style={newBookStyles.removeWordBtn}
          >
            <Text style={newBookStyles.removeWordTxt}>Remove Word</Text>
          </Pressable>
          <View style={newBookStyles.wordInputContainer}>
            <AbcIcon />
            <TextInput
              placeholder="Add Word"
              value={newWord}
              onChangeText={setNewWord}
              style={newBookStyles.input}
            />
          </View>
          <View style={newBookStyles.wordInputContainer}>
            <TranslateIcon />
            <TextInput
              placeholder="Add Translation"
              value={newTranslation}
              onChangeText={setNewTranslation}
              style={newBookStyles.input}
            />
          </View>

          <View style={newBookStyles.wordInputContainer}>
            <LanguageIcon />
            <TextInput
              placeholder="Add Language"
              value={newLanguage}
              onChangeText={setNewLanguage}
              style={newBookStyles.input}
            />
          </View>

          <View style={newBookStyles.wordInputContainer}>
            <PsychologyIcon />
            <TextInput
              placeholder="Add Part of Speech"
              value={newPartOfSpeech}
              onChangeText={setNewPartOfSpeech}
              style={newBookStyles.input}
            />
          </View>
        </View>
      )}
      <ButtonShown />
    </SafeAreaView>
  );
}

export default NewWorkbookScreen;