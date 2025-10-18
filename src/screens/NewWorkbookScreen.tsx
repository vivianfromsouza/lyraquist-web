// Worked on by: Vivian D'Souza
import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
  TouchableOpacity
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
    if (newWorkbookName === undefined || newWorkbookName.trim() == "") {
      /*DO NOTHING*/
    } else {
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
    if (newWorkbookName === undefined || newWorkbookName.trim() == "") {
      /*DO NOTHING*/
    } else {
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
        <Pressable onPress={createWorkbookWithWord} style={styles.button}>
          <Text style={styles.buttonText}>Add Workbook with Word</Text>
        </Pressable>
      );
    } else {
      return (
        <Pressable
          onPress={createWorkbook}
          style={styles.button}
          accessibilityLabel="add"
          accessible={true}
        >
          <Text style={styles.buttonText}>Add Workbook</Text>
        </Pressable>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "#5bc8a6",
          paddingTop: 10,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          paddingBottom: 15,
          paddingLeft: 20,
          
          
        }}
      >
        <View style={{flexDirection:'row', alignItems:'center', marginTop:30}}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigate(-1)}
            style={{marginRight: 10,marginTop:7}}
          >
            <ArrowBackOutline color={"#00000"} height="25px" width="25px" />
        </TouchableOpacity>
        {newWorkbookName == "" && (
          <Text style={styles.title}>New Workbook</Text>
        )}
        {newWorkbookName != "" && (
          <Text style={styles.title}>{newWorkbookName}</Text>
        )}
        </View>
      </View>

      <View style={styles.inputContainer}>
        {/* <FontAwesome
          name="book"
          size={80}
          color="black"
          style={{ marginRight: 18 }}
        /> */}
        <FontAwesomeIcon icon={faBook} style={{fontSize:70, marginRight: 30}}/>

        <View style={styles.inputWrapper}>
          <View style={styles.inputRow}>
            {/* <FontAwesome
              name="pencil"
              size={24}
              color="black"
              style={styles.icon}
            /> */}
            <FontAwesomeIcon icon={faPencil} style={{fontSize:20, marginRight:10}} />

            <TextInput
              placeholder="New Workbook Name"
              value={newWorkbookName}
              onChangeText={(newtext) => setNewWorkbookName(newtext)}
              style={styles.input}
              accessibilityLabel="name"
              accessible={true}
            />
          </View>
          <View style={styles.inputRow}>
            <DescriptionIcon style={{fontSize:24, marginRight:7}}/>
            <TextInput
              placeholder="New Workbook Description"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
              accessibilityLabel="description"
              accessible={true}
            />
          </View>
        </View>
      </View>
      {!addWord && (
        <Pressable
          onPress={() => setAddWord(true)}
          style={{
            flexDirection: "row",
            marginLeft: 70,
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          {/* <AntDesign
            name="pluscircleo"
            size={23}
            color="#303248"
            style={{ marginRight: 8 }}
          /> */}
          <PlusCircleOutlined style={{marginRight:8}}/>
          <Text style={{ fontSize: 18, color: "#303248", fontWeight: "bold" }}>
            Add Word
          </Text>
        </Pressable>
      )}
      {addWord && (
        <View>
          <Pressable
            onPress={() => removeWord()}
            style={{
              flexDirection: "row",
              marginLeft: 20,
              alignItems: "center",
              paddingBottom: 10,
            }}
          >
            {/* <SimpleLineIcons
              name="minus"
              size={23}
              color="black"
              style={{ marginRight: 8 }}
            /> */}

            {/* <SimpleLineIcon name="minus" /> */}

            <Text
              style={{ fontSize: 18, color: "#303248", fontWeight: "bold" }}
            >
              Remove Word
            </Text>
          </Pressable>
          <View style={styles.wordInputContainer}>
            {/* <MaterialCommunityIcons
              name="alphabet-latin"
              size={24}
              color="black"
              style={styles.icon}
            /> */}
            <AbcIcon />

            <TextInput
              placeholder="Add Word"
              value={newWord}
              onChangeText={setNewWord}
              style={[styles.input, { flex: 1 }]}
            />
          </View>
          <View style={styles.wordInputContainer}>
            {/* <MaterialCommunityIcons
              name="translate"
              size={24}
              color="black"
              style={styles.icon}
            /> */}
            <TranslateIcon />
            <TextInput
              placeholder="Add Translation"
              value={newTranslation}
              onChangeText={setNewTranslation}
              style={[styles.input, { flex: 1 }]}
            />
          </View>

          <View style={styles.wordInputContainer}>
            <LanguageIcon />
            <TextInput
              placeholder="Add Language"
              value={newLanguage}
              onChangeText={setNewLanguage}
              style={[styles.input, { flex: 1 }]}
            />
          </View>

          <View style={styles.wordInputContainer}>
            <PsychologyIcon />
            <TextInput
              placeholder="Add Part of Speech"
              value={newPartOfSpeech}
              onChangeText={setNewPartOfSpeech}
              style={[styles.input, { flex: 1 }]}
            />
          </View>
        </View>
      )}

      <ButtonShown />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
    height:'80vh'
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: 0,
  },
  inputContainer: {
    flexDirection: "row",
    marginVertical: 10,
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    alignItems: "center",
  },
  inputWrapper: {
    flex: 1,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    fontSize: 18,
    flex: 1,
  },
  wordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
  },
  button: {
    backgroundColor: "#303248",
    marginVertical: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    color: "#edc525",
  },
});

export default NewWorkbookScreen;
