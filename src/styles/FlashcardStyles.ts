import { StyleSheet, PixelRatio } from "react-native";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;

const flashcardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
    height: "93vh",
  },

  // Header
  header: {
    paddingTop: 20,
    backgroundColor: "#303248",
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 16,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: getFontSize(22),
    fontWeight: "800",
    color: "#e8e1db",
    marginLeft: 16,
    flex: 1,
    fontFamily: "Karla",
  },
  headerCount: {
    fontSize: getFontSize(13),
    color: "rgba(232,225,219,0.5)",
    fontWeight: "600",
    fontFamily: "Karla",
  },

  // Card word text (shared by both faces)
  word: {
    color: "white",
    fontSize: getFontSize(36),
    textAlign: "center",
    fontFamily: "Karla",
    fontWeight: "700",
    lineHeight: getFontSize(44),
  },
});

export default flashcardStyles;
