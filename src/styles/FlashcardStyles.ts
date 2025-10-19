import { StyleSheet, Dimensions } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const flashcardStyles = StyleSheet.create({
  frontCard: {
    padding: 10,
    backgroundColor: "#5bc8a6",
    margin: 100,
    height: SCREEN_HEIGHT * 0.65,
    transformStyle: "preserve-3d",
    transitionDuration: "0.5s",
    transform: "rotateY(180deg)",
    // transform: "scale(-1, 1)",
  },
  backCard: {
    padding: 10,
    backgroundColor: "#303248",
    margin: 100,
    height: SCREEN_HEIGHT * 0.65,
    transform: "rotateY(180deg)",
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
    fontFamily: "Karla",
    display: "block",
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: "#8ecae6",
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
    height: "91vh",
  },
});

export default flashcardStyles;
