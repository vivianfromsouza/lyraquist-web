// Worked on by: Vivian D'Souza, Ashley Bickham
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
import PsychologyIcon from "@mui/icons-material/Psychology";
import LanguageIcon from "@mui/icons-material/Language";
import TranslateIcon from "@mui/icons-material/Translate";
import AbcIcon from "@mui/icons-material/Abc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowBackOutline } from "react-ionicons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import WordReaderWriter from "../services/WordReaderWriter";
import { useLocation, useNavigate } from "react-router-dom";
import wordStyles from "../styles/WordStyles";
import newBookStyles from "../styles/NewBookStyles";

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
    <SafeAreaView style={wordStyles.container}>
      <View style={wordStyles.header}>
        <TouchableOpacity onPress={() => navigate(-1)}>
          <ArrowBackOutline color={"#00000"} height="25px" width="25px" />
        </TouchableOpacity>
        <Text style={wordStyles.title}>New Word</Text>
      </View>
      <View style={wordStyles.bookNameLocation}>
        <Text style={wordStyles.bookNameTitle}>Workbook: </Text>
        <Text style={wordStyles.bookNameTxt}>{name}</Text>
      </View>

      <View style={wordStyles.inputContainer}>
        <FontAwesomeIcon icon={faBook} style={newBookStyles.bookIcon} />

        <View style={wordStyles.inputWrapper}>
          <View style={wordStyles.inputRow}>
            <AbcIcon />
            <TextInput
              placeholder="New Word"
              value={newWord}
              onChangeText={(newtext) => setNewWord(newtext)}
              style={wordStyles.input}
              accessibilityLabel="newWord"
              accessible={true}
            />
          </View>
          <View style={wordStyles.inputRow}>
            <TranslateIcon />
            <TextInput
              placeholder="New Word Translation"
              value={translation}
              onChangeText={setTranslation}
              style={wordStyles.input}
              accessibilityLabel="newTranslation"
              accessible={true}
            />
          </View>

          <View style={wordStyles.inputRow}>
            <LanguageIcon />
            <TextInput
              placeholder="Language"
              value={language}
              onChangeText={setLanguage}
              style={wordStyles.input}
              accessibilityLabel="newLanguage"
              accessible={true}
            />
          </View>

          <View style={wordStyles.inputRow}>
            <PsychologyIcon />
            <TextInput
              placeholder="Part of Speech"
              value={partOfSpeech}
              onChangeText={setPartOfSpeech}
              style={wordStyles.input}
              accessibilityLabel="newPartOfSpeech"
              accessible={true}
            />
          </View>
        </View>
      </View>
      <Pressable
        onPress={addWord}
        style={wordStyles.button}
        accessibilityLabel="addconfirm"
        accessible={true}
      >
        <Text style={wordStyles.buttonText}>Add Word</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default NewWordScreen;
