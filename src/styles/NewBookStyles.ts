import { StyleSheet } from "react-native";

const newBookStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
    height: "80vh",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: 0,
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
    paddingTop: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingBottom: 15,
    paddingLeft: 20,
  },
  titleLocation: { flexDirection: "row", alignItems: "center", marginTop: 30 },
  arrowLocation: { marginRight: 10, marginTop: 7 },
  bookIcon: { fontSize: 70, marginRight: 30 },
  pencilIcon: { fontSize: 20, marginRight: 10 },
  paperIcon: { fontSize: 24, marginRight: 7 },
  addWordBtn: {
    flexDirection: "row",
    marginLeft: 70,
    alignItems: "center",
    paddingBottom: 10,
  },
  addWordIcon: { marginRight: 8 },
  addWordTxt: { fontSize: 18, color: "#303248", fontWeight: "bold" },
  removeWordBtn: {
    flexDirection: "row",
    marginLeft: 20,
    alignItems: "center",
    paddingBottom: 10,
  },
  removeWordTxt: { fontSize: 18, color: "#303248", fontWeight: "bold" },
});

export default newBookStyles;
