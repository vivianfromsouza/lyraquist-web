import { Dimensions, PixelRatio, StyleSheet } from "react-native";
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const lyricsStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#303248",
    paddingTop: 20,
    height: SCREEN_HEIGHT - 50,
  },
  UIInfo: {
    fontSize: getFontSize(25),
    color: "#edc526",
    textAlign: "center",
  },
  space: {
    height: 40,
    backgroundColor: "white",
  },
  noteText: {
    fontSize: getFontSize(15),
    color: "#ff4a2a",
    textAlign: "left",
    padding: 15,
  },
  lyricBlock: {
    padding: 32,
    paddingTop: 0,
    lineHeight: 45,
    flexWrap: "wrap",
    flexDirection: "row",
    color: "white",
  },
  lyricsText: {
    fontSize: getFontSize(25),
    color: "white",
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalforefront: {
    backgroundColor: "#303248",
    padding: 15,
    borderRadius: 15,
    borderWidth: 10,
    borderColor: "#5bc8a6",
  },
  modalText: {
    color: "white",
    fontSize: getFontSize(25),
  },
  closeModal: {},
  saveWordModal: {
    zIndex: -10,
  },
  modalButtons: {
    alignContent: "flex-end",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 5,
  },
  placeholderStyle: {
    fontSize: getFontSize(20),
    color: "white",
  },
  selectedTextStyle: {
    fontSize: getFontSize(20),
    color: "white",
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: "white",
  },
  lineFormat: { marginBottom: 10, flexDirection: "row", flexWrap: "wrap" },
  highlight: { marginRight: 4, marginBottom: 4 },
});

export default lyricsStyles;
