// Worked on by Vivian D'Souza
// Built based on this link: https://nabendu82.medium.com/build-a-flashcard-quiz-with-react-c1cb96e3a1e8
import { useState } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Flashcard = ({ wordItem }) => {
  const [flip, setFlip] = useState(false);
  return (
    <Pressable
      onPress={() => {
        setFlip(!flip);
      }}
    >
      <View style={flip ? styles.frontCard : styles.backCard}>
        <Text style={styles.word}>
          {flip ? wordItem.word : wordItem.translation}
        </Text>
        <Text style={styles.wordContext}>{wordItem.language}</Text>
        <Text style={styles.wordContext}> {wordItem.part_of_speech}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  frontCard: {
    padding: 10,
    backgroundColor: "#5bc8a6",
    margin: 100,
    height: SCREEN_HEIGHT * 0.65,
    transformStyle: "preserve-3d",
    transitionDuration: "0.5s",
    transform: "scale(-1, 1)",
  },
  backCard: {
    padding: 10,
    backgroundColor: "#303248",
    margin: 100,
    height: SCREEN_HEIGHT * 0.65,
    transform: "rotateY(-180deg)",
    transformStyle: "preserve-3d",
    transitionDuration: "0.5s",
  },
  word: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
    alignItems: "center",
    marginTop: 150,
    transform: "scale(-1, 1)",
    fontFamily: "Karla",
  },
  wordContext: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    alignItems: "center",
    transform: "scale(-1, 1)",
    fontFamily: "Karla",
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: "#8ecae6",
    borderRadius: 5,
  },
});

export default Flashcard;
