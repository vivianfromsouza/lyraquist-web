// Worked on by Vivian D'Souza
// Built based on this link: https://nabendu82.medium.com/build-a-flashcard-quiz-with-react-c1cb96e3a1e8
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import flashcardStyles from "../styles/Flashcard"

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
            <>
              <Text>{wordItem.translation}</Text>
            </>
          ) : (
            <>
              <Text>{wordItem.word}</Text>
              <Text style={flashcardStyles.wordContext}>{wordItem.language}</Text>
              <Text style={flashcardStyles.wordContext}>{wordItem.part_of_speech}</Text>
            </>
          )}
        </Text>
      </View>
    </Pressable>
  );
};

export default Flashcard;
