// Worked on by Vivian D'Souza
// Built based on this link: https://nabendu82.medium.com/build-a-flashcard-quiz-with-react-c1cb96e3a1e8
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import flashcardStyles from "../styles/FlashcardStyles";

const Flashcard = ({ wordItem }) => {
  const [flip, setFlip] = useState(false);
  return (
    <Pressable
      onPress={() => {
        setFlip(!flip);
      }}
    >
      <View style={flip ? flashcardStyles.frontCard : flashcardStyles.backCard}>
        <Text style={flashcardStyles.word}>
          {flip ? (
            <Text>{wordItem.translation}</Text>
          ) : (
            <>
              <Text>{wordItem.word}</Text>
              {wordItem.language ? (
                <Text style={flashcardStyles.wordContext}>{wordItem.language}</Text>
              ) : null}
              {wordItem.part_of_speech ? (
                <Text style={flashcardStyles.wordContext}>{wordItem.part_of_speech}</Text>
              ) : null}
            </>
          )}
        </Text>
        <Text style={flashcardStyles.tapHint}>
          {flip ? "tap to flip back" : "tap to reveal"}
        </Text>
      </View>
    </Pressable>
  );
};

export default Flashcard;
