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
import { ArrowBackOutline } from "react-ionicons";
import WordReaderWriter from "../services/WordReaderWriter";
import { useLocation, useNavigate } from "react-router-dom";
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
    <SafeAreaView style={newBookStyles.container}>
      {/* Header */}
      <View style={newBookStyles.header}>
        <View style={newBookStyles.titleLocation}>
          <TouchableOpacity
            onPress={() => navigate(-1)}
            style={newBookStyles.arrowLocation}
          >
            <ArrowBackOutline color={"#e8e1db"} height="25px" width="25px" />
          </TouchableOpacity>
          <Text style={newBookStyles.title}>New Word</Text>
        </View>
        <Text style={newBookStyles.headerSubtitle}>Workbook: {name}</Text>
      </View>

      {/* Section: Word Details */}
      <View style={newBookStyles.sectionHeader}>
        <Text style={newBookStyles.sectionLabel}>Word Details</Text>
        <View style={newBookStyles.sectionLabelLine} />
      </View>

      <View style={newBookStyles.inputContainer}>
        <View style={newBookStyles.inputRow}>
          <AbcIcon style={{ color: "rgba(48,50,72,0.5)" }} />
          <TextInput
            placeholder="New Word"
            value={newWord}
            onChangeText={(newtext) => setNewWord(newtext)}
            style={newBookStyles.input}
            accessibilityLabel="newWord"
            accessible={true}
          />
        </View>
        <View style={newBookStyles.inputRow}>
          <TranslateIcon style={{ color: "rgba(48,50,72,0.5)" }} />
          <TextInput
            placeholder="Translation"
            value={translation}
            onChangeText={setTranslation}
            style={newBookStyles.input}
            accessibilityLabel="newTranslation"
            accessible={true}
          />
        </View>
        <View style={newBookStyles.inputRow}>
          <LanguageIcon style={{ color: "rgba(48,50,72,0.5)" }} />
          <TextInput
            placeholder="Language"
            value={language}
            onChangeText={setLanguage}
            style={newBookStyles.input}
            accessibilityLabel="newLanguage"
            accessible={true}
          />
        </View>
        <View style={newBookStyles.inputRow}>
          <PsychologyIcon style={{ color: "rgba(48,50,72,0.5)" }} />
          <TextInput
            placeholder="Part of Speech"
            value={partOfSpeech}
            onChangeText={setPartOfSpeech}
            style={newBookStyles.input}
            accessibilityLabel="newPartOfSpeech"
            accessible={true}
          />
        </View>
      </View>

      <Pressable
        onPress={addWord}
        style={newBookStyles.button}
        accessibilityLabel="addconfirm"
        accessible={true}
      >
        <Text style={newBookStyles.buttonText}>Add Word</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default NewWordScreen;