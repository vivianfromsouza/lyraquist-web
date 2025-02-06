// Worked on by Vivian D'Souza
// Built based on this link: https://nabendu82.medium.com/build-a-flashcard-quiz-with-react-c1cb96e3a1e8
import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  // Dimensions,
} from "react-native";

// import Animated, {
//   interpolate,
//   SharedValue,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";

// const { height: SCREEN_HEIGHT } = Dimensions.get("window");
// TODO: REDO FLASHCARDS

// interface FProps {
//   rotate: SharedValue<number>;
//   word: string;
//   fromSong: string;
// }

// interface BProps {
//   rotate: SharedValue<number>;
//   word: string;
// }

// const CardFront = ({ rotate, word, fromSong }: FProps) => {
//   return (
//     <Pressable
//       onPress={() => {
//         rotate.value = rotate.value ? 0 : 1;
//       }}
//       style={frontStyles.container}
//     >
//       <Text style={frontStyles.cardWord}>{word}</Text>
//       <Text style={frontStyles.cardFromSong}>{fromSong}</Text>
//     </Pressable>
//   );
// };

// const CardBack = ({ rotate, word }: BProps) => {
//   return (
//     <Pressable
//       onPress={() => {
//         rotate.value = rotate.value ? 0 : 1;
//       }}
//       style={backStyles.container}
//     >
//       <Text style={backStyles.cardWord}>{word}</Text>
//     </Pressable>
//   );
// };

const Flashcard = ({ wordItem }) => {
  const [flip, setFlip] = useState(false);

  //   const rotate = useSharedValue(0);
  //   const frontAnimatedStyles = useAnimatedStyle(() => {
  //     const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
  //     return {
  //       transform: [
  //         {
  //           rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
  //         },
  //       ],
  //     };
  //   });
  //   const backAnimatedStyles = useAnimatedStyle(() => {
  //     const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
  //     return {
  //       transform: [
  //         {
  //           rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
  //         },
  //       ],
  //     };
  //   });
  return (
    <Pressable
      onPress={() => {
        setFlip(!flip);
      }}
    >
      <View style={flip ? styles.frontCard : styles.backCard}>
        <Text style={styles.word}>
          {flip ? wordItem.word : wordItem.definition}
        </Text>
        <Text style={styles.wordContext}>{wordItem.language}</Text>
        <Text style={styles.wordContext}> {wordItem.partOfSpeech}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  frontCard: {
    padding: 10,
    backgroundColor: "#5bc8a6",
    margin: 100,
    height: 400,
    transformStyle: "preserve-3d",
    transitionDuration: "0.5s",
    transform: "scale(-1, 1)",
  },
  backCard: {
    padding: 10,
    backgroundColor: "#303248",
    margin: 100,
    height: 400,
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
  },
  wordContext: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    alignItems: "center",
    transform: "scale(-1, 1)",
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: "#8ecae6",
    borderRadius: 5,
  },
});

// const frontStyles = StyleSheet.create({
//   container: {
//     backgroundColor: "#5bc8a6",
//     width: 300,
//     height: SCREEN_HEIGHT * 0.70 ,
//     borderRadius: 10,
//     padding: 20,
//   },
//   cardWord: {
//     fontSize: 48,
//     color: "#000000",
//     alignSelf: "center",
//     marginTop: 200,
//     fontFamily: "Karla",
//   },
//   cardFromSong: {
//     fontSize: 30,
//     color: "#e8e1db",
//     alignSelf: "center",
//     marginTop: 200,
//     fontFamily: "Karla",
//   },
// });

// const backStyles = StyleSheet.create({
//   container: {
//     backgroundColor: "#303248",
//     width: 300,
//     height: SCREEN_HEIGHT * 0.70,
//     borderRadius: 10,
//     padding: 20,
//   },
//   cardWord: {
//     fontSize: 48,
//     color: "#e8e1db",
//     alignSelf: "center",
//     marginTop: 200,
//     fontFamily: "Karla",
//   },
// });

export default Flashcard;
