import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";

import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface FProps {
  rotate: SharedValue<number>;
  word: string;
  fromSong: string;
}

interface BProps {
  rotate: SharedValue<number>;
  word: string;
}

const CardFront = ({ rotate, word, fromSong }: FProps) => {
  return (
    <Pressable
      onPress={() => {
        rotate.value = rotate.value ? 0 : 1;
      }}
      style={frontStyles.container}
    >
      <Text style={frontStyles.cardWord}>{word}</Text>
      <Text style={frontStyles.cardFromSong}>{fromSong}</Text>
    </Pressable>
  );
};

const CardBack = ({ rotate, word }: BProps) => {
  return (
    <Pressable
      onPress={() => {
        rotate.value = rotate.value ? 0 : 1;
      }}
      style={backStyles.container}
    >
      <Text style={backStyles.cardWord}>{word}</Text>
    </Pressable>
  );
};

const Flashcard = (props) => {
  const rotate = useSharedValue(0);
  const frontAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
        },
      ],
    };
  });
  const backAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
        },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.frontcard, frontAnimatedStyles]}>
        <CardFront rotate={rotate} word={props.word["word"]} fromSong={props.word["from_song"]} />
      </Animated.View>
      <Animated.View style={[styles.backCard, backAnimatedStyles]}>
        <CardBack rotate={rotate} word={props.word["translation"]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    
    backgroundColor: "#e8e1db",
    alignItems: "center",
    justifyContent: "center",
  },
  frontcard: {
    position: "absolute",
    backfaceVisibility: "hidden",
  },
  backCard: {
    backfaceVisibility: "hidden",
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: "#8ecae6",
    borderRadius: 5,
  },
});

const frontStyles = StyleSheet.create({
  container: {
    backgroundColor: "#5bc8a6",
    width: 300,
    height: SCREEN_HEIGHT * 0.70 ,
    borderRadius: 10,
    padding: 20,
  },
  cardWord: {
    fontSize: 48,
    color: "#000000",
    alignSelf: "center",
    marginTop: 200,
    fontFamily: "Karla",
  },
  cardFromSong: {
    fontSize: 30,
    color: "#e8e1db",
    alignSelf: "center",
    marginTop: 200,
    fontFamily: "Karla",
  },
});

const backStyles = StyleSheet.create({
  container: {
    backgroundColor: "#303248",
    width: 300,
    height: SCREEN_HEIGHT * 0.70,
    borderRadius: 10,
    padding: 20,
  },
  cardWord: {
    fontSize: 48,
    color: "#e8e1db",
    alignSelf: "center",
    marginTop: 200,
    fontFamily: "Karla",
  },
});

export default Flashcard;
