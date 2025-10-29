import { PixelRatio, StyleSheet } from "react-native";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const wordStyles = StyleSheet.create({
  word: {
    margin: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  translation: {
    marginLeft: 5,
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
  modalTextBackground: {
    backgroundColor: "rgba(91,200,166,0.15)",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalText: {
    color: "white",
    fontSize: getFontSize(25),
    flexDirection: "row",
    alignItems: "baseline",
  },

  originalLabel: {
    fontStyle: "italic",
    fontSize: 25,
    color: "white",
  },
  originalText: {
    fontWeight: "bold",
    fontSize: 35,
    color: "white",
  },
  prefLabel: {
    fontStyle: "italic",
    fontSize: 20,
    color: "white",
  },
  dictate: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 10,
    color: "white",
  },
  definition: { fontSize: 20, color: "white" },
  pos: { fontSize: 15, color: "gray", fontStyle: "italic" },
  closeModal: {},
  saveWordModal: {},
  modalButtons: {
    alignContent: "flex-end",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 5,
  },
  dropdown: {
    textAlign: "center",
    paddingLeft: 10,
    height: 35,
    width: 325,
    borderColor: "rgba(183, 193, 189, 0.9)",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: "white",
    zIndex: 100000,
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
  newWorkbookInput: {
    borderWidth: 0.5,
    padding: 6,
    paddingLeft: 8,
    borderRadius: 5,
    borderColor: "gray",
    marginTop: 10,
    marginHorizontal: 14,
    color: "white",
    fontSize: 15,
  },
  closeButton: {
    backgroundColor: "#edc526",
    padding: 10,
    borderRadius: 12,
    paddingHorizontal: 5,
  },
  saveButton: {
    backgroundColor: "#ff4a2a",
    padding: 10,
    borderRadius: 12,
    paddingHorizontal: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
    height: "91vh",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginVertical: 10,
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    alignItems: "center",
  },
  inputWrapper: {
    flex: 1,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    fontSize: 18,
    flex: 1,
    marginLeft: 8,
  },
  wordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
  },
  button: {
    backgroundColor: "#303248",
    marginVertical: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    color: "#edc525",
  },
  header: {
    backgroundColor: "#5bc8a6",
    paddingTop: 45,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingBottom: 15,
    paddingLeft: 20,
  },
  bookNameLocation: { flexDirection: "row", marginLeft: 20, paddingTop: 10 },
  bookNameTitle: { fontSize: 18, fontWeight: "bold", color: "gray" },
  bookNameTxt: {
    fontSize: 18,
    marginLeft: 3,
    fontWeight: "bold",
    color: "gray",
  },
});

export default wordStyles;
