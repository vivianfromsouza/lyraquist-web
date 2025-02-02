// Worked on by: Vivian D'Souza, Ashley Bickham
import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import PsychologyIcon from "@mui/icons-material/Psychology";
import LanguageIcon from "@mui/icons-material/Language";
import TranslateIcon from "@mui/icons-material/Translate";
import AbcIcon from "@mui/icons-material/Abc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowBackOutline } from "react-ionicons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import WordReaderWriter from "../services/WordReaderWriter";
import { useLocation, useNavigate } from "react-router-dom";

function NewWordScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const workbookItem = location.state;
  const name = workbookItem.name;
  const bookUID = workbookItem.book_id;

  const [newWord, setNewWord] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [partOfSpeech, setPartOfSpeech] = useState<string>("");

  /*adds word to the current workbook
  provides user feedback after completion and on invalid inputs
  */
  async function addWord() {
    if (newWord === undefined || newWord.trim() == "") {
      Alert.alert("Choose a word to add to the workbook!");
    } else if (translation === undefined || translation.trim() == "") {
      Alert.alert("You must add a translation");
    } else {
      WordReaderWriter.addWord(
        newWord.trim(),
        translation.trim(),
        bookUID,
        language.trim(),
        partOfSpeech.trim(),
        "Added by User",
        false
      );
      navigate(-1);
      Alert.alert(
        "The word " + newWord.trim() + " was added!",
        "translation: " + translation.trim()
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "#5bc8a6",
          paddingTop: 45,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          paddingBottom: 15,
          paddingLeft: 20,
        }}
      >
        <Pressable onPress={() => navigate(-1)} style={{}}>
          {/* <Ionicons style={{}} name="arrow-back" size={35} color="white" /> */}
          <ArrowBackOutline />
        </Pressable>
        <Text style={styles.title}>New Word</Text>
      </View>
      <View style={{ flexDirection: "row", marginLeft: 20, paddingTop: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "gray" }}>
          Workbook:{" "}
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginLeft: 3,
            fontWeight: "bold",
            color: "gray",
          }}
        >
          {name}
        </Text>
      </View>

      <View style={styles.inputContainer}>
        {/* <FontAwesome
          name="book"
          size={80}
          color="black"
          style={{ marginRight: 18 }}
        /> */}
        <FontAwesomeIcon icon={faBook} />

        <View style={styles.inputWrapper}>
          <View style={styles.inputRow}>
            {/* <MaterialCommunityIcons
              name="alphabet-latin"
              size={24}
              color="black"
              style={styles.icon}
            /> */}
            <AbcIcon />
            <TextInput
              placeholder="New Word"
              value={newWord}
              onChangeText={(newtext) => setNewWord(newtext)}
              style={styles.input}
              accessibilityLabel="newWord"
              accessible={true}
            />
          </View>
          <View style={styles.inputRow}>
            {/* <MaterialIcons
              name="translate"
              size={24}
              color="black"
              style={styles.icon}
            /> */}
            <TranslateIcon />
            <TextInput
              placeholder="New Word Translation"
              value={translation}
              onChangeText={setTranslation}
              style={styles.input}
              accessibilityLabel="newTranslation"
              accessible={true}
            />
          </View>

          <View style={styles.inputRow}>
            {/* <MaterialIcons
              name="language"
              size={24}
              color="black"
              style={styles.icon}
            /> */}
            <LanguageIcon />
            <TextInput
              placeholder="Language"
              value={language}
              onChangeText={setLanguage}
              style={styles.input}
              accessibilityLabel="newLanguage"
              accessible={true}
            />
          </View>

          <View style={styles.inputRow}>
            {/* <MaterialIcons
              name="psychology"
              size={24}
              color="black"
              style={styles.icon}
            /> */}
            <PsychologyIcon />
            <TextInput
              placeholder="Part of Speech"
              value={partOfSpeech}
              onChangeText={setPartOfSpeech}
              style={styles.input}
              accessibilityLabel="newPartOfSpeech"
              accessible={true}
            />
          </View>
        </View>
      </View>
      <Pressable
        onPress={addWord}
        style={styles.button}
        accessibilityLabel="addconfirm"
        accessible={true}
      >
        <Text style={styles.buttonText}>Add Word</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
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

export default NewWordScreen;
