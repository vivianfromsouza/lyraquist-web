import { View, TextInput } from "react-native";
import PsychologyIcon from "@mui/icons-material/Psychology";
import LanguageIcon from "@mui/icons-material/Language";
import TranslateIcon from "@mui/icons-material/Translate";
import AbcIcon from "@mui/icons-material/Abc";
import newBookStyles from "../styles/NewBookStyles";

interface WordFieldsProps {
  word: string;
  setWord: (value: string) => void;
  translation: string;
  setTranslation: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
  partOfSpeech: string;
  setPartOfSpeech: (value: string) => void;
  wordPlaceholder?: string;
}

function WordFields({
  word,
  setWord,
  translation,
  setTranslation,
  language,
  setLanguage,
  partOfSpeech,
  setPartOfSpeech,
  wordPlaceholder = "Word",
}: WordFieldsProps) {
  return (
    <>
      <View style={newBookStyles.wordInputContainer}>
        <AbcIcon style={{ color: "rgba(48,50,72,0.5)" }} />
        <TextInput
          placeholder={wordPlaceholder}
          value={word}
          onChangeText={setWord}
          style={newBookStyles.input}
          accessibilityLabel="newWord"
          accessible={true}
        />
      </View>
      <View style={newBookStyles.wordInputContainer}>
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
      <View style={newBookStyles.wordInputContainer}>
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
      <View style={newBookStyles.wordInputContainer}>
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
    </>
  );
}

export default WordFields;
