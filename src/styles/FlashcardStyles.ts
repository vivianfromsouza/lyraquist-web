import { StyleSheet, Dimensions, PixelRatio } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;

const flashcardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
    height: "91vh",
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
  },
  headerCount: {
    fontSize: getFontSize(13),
    color: "rgba(232,225,219,0.5)",
    fontWeight: "600",
  },

  // Cards — word side (initial)
  backCard: {
    backgroundColor: "#303248",
    marginHorizontal: 24,
    marginTop: 24,
    height: SCREEN_HEIGHT * 0.55,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    shadowColor: "#303248",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },

  // Cards — translation side (flipped)
  frontCard: {
    backgroundColor: "#5bc8a6",
    marginHorizontal: 24,
    marginTop: 24,
    height: SCREEN_HEIGHT * 0.55,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    shadowColor: "#5bc8a6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },

  word: {
    color: "white",
    fontSize: getFontSize(36),
    textAlign: "center",
    fontFamily: "Karla",
    fontWeight: "700",
    lineHeight: getFontSize(44),
  },
  wordContext: {
    color: "rgba(255,255,255,0.5)",
    fontSize: getFontSize(14),
    textAlign: "center",
    fontFamily: "Karla",
    display: "block",
    marginTop: 6,
    fontStyle: "italic",
  },
  tapHint: {
    position: "absolute",
    bottom: 20,
    color: "rgba(255,255,255,0.35)",
    fontSize: getFontSize(12),
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});

export default flashcardStyles;
