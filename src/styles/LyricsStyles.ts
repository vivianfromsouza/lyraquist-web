import { Dimensions, PixelRatio, StyleSheet } from "react-native";
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const lyricsStyles = StyleSheet.create({
  container: {
    backgroundColor: "#303248",
    paddingTop: 16,
    height: SCREEN_HEIGHT - 50,
  },
  sectionLabelContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  sectionLabel: {
    fontSize: getFontSize(13),
    fontWeight: "700",
    color: "#edc526",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  sectionLabelLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(237, 197, 38, 0.2)",
    marginLeft: 12,
  },
  columnsRow: {
    flexDirection: "row",
    flex: 1,
  },
  column: {
    flex: 1,
  },
  columnDivider: {
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    marginVertical: 8,
  },
  UIInfo: {
    fontSize: getFontSize(13),
    fontWeight: "700",
    color: "#edc526",
    letterSpacing: 1.5,
  },
  noteText: {
    fontSize: getFontSize(13),
    color: "rgba(232, 225, 219, 0.5)",
    textAlign: "left",
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  lyricBlock: {
    padding: 24,
    paddingTop: 0,
    lineHeight: 40,
    flexWrap: "wrap",
    flexDirection: "row",
    color: "white",
  },
  lyricsText: {
    fontSize: getFontSize(20),
    color: "#e8e1db",
  },
  lineFormat: {
    marginBottom: 6,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
  },
  highlight: {
    marginRight: 3,
    marginBottom: 3,
    paddingHorizontal: 3,
    paddingVertical: 2,
    borderRadius: 4,
  },
  noFlex: {
    flexWrap: "nowrap",
  },
  buttons: {
    alignContent: "flex-end",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  modalbg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalforefront: {
    backgroundColor: "#303248",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    minWidth: 320,
  },
  modalText: {
    color: "white",
    fontSize: getFontSize(20),
    flexDirection: "row",
    alignItems: "baseline",
  },
  closeModal: {},
  saveWordModal: {
    zIndex: -10,
  },
  modalButtons: {
    alignContent: "flex-end",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginHorizontal: 5,
  },
  placeholderStyle: {
    fontSize: getFontSize(16),
    color: "white",
  },
  selectedTextStyle: {
    fontSize: getFontSize(16),
    color: "white",
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: "white",
  },
});

export default lyricsStyles;
