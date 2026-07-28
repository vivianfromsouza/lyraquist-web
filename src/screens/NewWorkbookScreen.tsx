import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import WorkbookReaderWriter from "../services/WorkbookReaderWriter";
import { ArrowBackOutline } from "react-ionicons";
import DescriptionIcon from "@mui/icons-material/Description";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { PlusCircleOutlined } from "@ant-design/icons";
import WordReaderWriter from "../services/WordReaderWriter";
import { useNavigate } from "react-router-dom";
import newBookStyles from "../styles/NewBookStyles";
import ChangeNotification from "../components/ChangeNotification";
import WordFields from "../components/WordFields";
import { toast, ToastContainer } from "react-toastify";

function NewWorkbookScreen() {
  const [newWorkbookName, setNewWorkbookName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [newWord, setNewWord] = useState<string>("");
  const [newTranslation, setNewTranslation] = useState<string>("");
  const [newLanguage, setNewLanguage] = useState<string>("");
  const [newPartOfSpeech, setNewPartOfSpeech] = useState<string>("");
  const [addWord, setAddWord] = useState(false);
  const navigate = useNavigate();

  function workbookAlreadyExistsNotification() {
    const text =
      "A workbook with this name already exists. Please choose a different name.";
    return <ChangeNotification text={text} />;
  }

  function workbookAddedNotification() {
    const text = "Workbook added successfully!";
    return <ChangeNotification text={text} />;
  }

  function addTranslationNotfication() {
    const text = "Please add a translation to add a word to the workbook.";
    return <ChangeNotification text={text} />;
  }

  async function createWorkbook() {
    const workbooks = await WorkbookReaderWriter.getWorkbooks();
    if (newWorkbookName !== undefined && newWorkbookName.trim() !== "") {
      const workbookExists = workbooks.some(
        (workbook) => workbook.name === newWorkbookName,
      );
      if (workbookExists) {
        toast(workbookAlreadyExistsNotification(), {
          autoClose: 5000,
        });
      } else {
        WorkbookReaderWriter.createWorkbook(
          newWorkbookName.trim(),
          description,
        );
        toast(workbookAddedNotification(), {
          autoClose: 5000,
        });
        setTimeout(() => navigate("/home"), 1500);
      }
    }
  }

  async function createWorkbookWithWord() {
    if (newWorkbookName !== undefined && newWorkbookName.trim() !== "") {
      const workbooks = await WorkbookReaderWriter.getWorkbooks();
      const workbookExists = workbooks.some(
        (workbook) => workbook.name === newWorkbookName,
      );
      if (workbookExists) {
        toast(workbookAlreadyExistsNotification(), {
          autoClose: 5000,
        });
      } else {
        if (newWord != "" && newTranslation != "") {
          WorkbookReaderWriter.createWorkbook(
            newWorkbookName.trim(),
            description,
          ).then((bookUID) => {
            WordReaderWriter.addWord(
              newWord,
              newTranslation,
              bookUID,
              newLanguage,
              newPartOfSpeech,
              "Added by User",
              false,
            );
          });

          toast(workbookAddedNotification(), {
            autoClose: 5000,
          });
          setTimeout(() => navigate("/home"), 1500);
        } else {
          toast(addTranslationNotfication(), {
            autoClose: 5000,
          });
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
      <ToastContainer />
      <View style={newBookStyles.header}>
        <View style={newBookStyles.titleLocation}>
          <TouchableOpacity
            onPress={() => navigate(-1)}
            style={newBookStyles.arrowLocation}
          >
            <ArrowBackOutline color={"#e8e1db"} height="25px" width="25px" />
          </TouchableOpacity>
          <Text style={newBookStyles.title}>
            {newWorkbookName !== "" ? newWorkbookName : "New Workbook"}
          </Text>
        </View>
      </View>

      <View style={newBookStyles.sectionHeader}>
        <Text style={newBookStyles.sectionLabel}>Workbook Details</Text>
        <View style={newBookStyles.sectionLabelLine} />
      </View>

      <View style={newBookStyles.inputContainer}>
        <View style={newBookStyles.inputRow}>
          <FontAwesomeIcon icon={faPencil} style={newBookStyles.pencilIcon} />
          <TextInput
            placeholder="Workbook Name"
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
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={newBookStyles.input}
            accessibilityLabel="description"
            accessible={true}
          />
        </View>
      </View>

      {!addWord && (
        <Pressable
          onPress={() => setAddWord(true)}
          style={newBookStyles.addWordBtn}
        >
          <PlusCircleOutlined style={newBookStyles.addWordIcon} />
          <Text style={newBookStyles.addWordTxt}>Add a Word</Text>
        </Pressable>
      )}

      {addWord && (
        <View>
          <View style={newBookStyles.sectionHeader}>
            <Text style={newBookStyles.sectionLabel}>Word</Text>
            <View style={newBookStyles.sectionLabelLine} />
          </View>

          <WordFields
            word={newWord}
            setWord={setNewWord}
            translation={newTranslation}
            setTranslation={setNewTranslation}
            language={newLanguage}
            setLanguage={setNewLanguage}
            partOfSpeech={newPartOfSpeech}
            setPartOfSpeech={setNewPartOfSpeech}
          />

          <Pressable
            onPress={() => removeWord()}
            style={newBookStyles.removeWordBtn}
          >
            <Text style={newBookStyles.removeWordTxt}>Remove Word</Text>
          </Pressable>
        </View>
      )}

      <ButtonShown />
    </SafeAreaView>
  );
}

export default NewWorkbookScreen;