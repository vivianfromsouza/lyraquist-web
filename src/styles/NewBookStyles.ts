import { StyleSheet, PixelRatio } from "react-native";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;

const newBookStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
    height: "91vh",
  },
  header: {
    paddingTop: 20,
    backgroundColor: "#303248",
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  titleLocation: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  arrowLocation: { marginLeft: 16 },
  title: {
    fontSize: getFontSize(26),
    fontWeight: "800",
    color: "#e8e1db",
    marginLeft: 16,
    paddingTop: 8,
    flex: 1,
  },

  // Section label pattern
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  sectionLabel: {
    fontSize: getFontSize(12),
    fontWeight: "700",
    color: "#5bc8a6",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  sectionLabelLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(48, 50, 72, 0.12)",
    marginLeft: 12,
  },

  // Input fields
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 4,
  },
  inputWrapper: {
    flex: 1,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(48, 50, 72, 0.12)",
    paddingVertical: 12,
    marginBottom: 4,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    fontSize: getFontSize(16),
    flex: 1,
    marginLeft: 10,
    color: "#303248",
  },

  // Word section inputs
  wordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(48, 50, 72, 0.12)",
    paddingVertical: 12,
    marginBottom: 4,
    marginHorizontal: 20,
  },

  // Primary button
  button: {
    backgroundColor: "#303248",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 20,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    marginBottom: 20,
  },
  buttonText: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: getFontSize(15),
    color: "#5bc8a6",
    letterSpacing: 0.5,
  },

  // Add word outlined pill button
  addWordBtn: {
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#5bc8a6",
    borderRadius: 20,
    paddingVertical: 12,
    marginTop: 16,
    marginBottom: 4,
  },
  addWordIcon: { marginRight: 6, color: "#5bc8a6", fontSize: 16 },
  addWordTxt: {
    fontSize: getFontSize(14),
    color: "#5bc8a6",
    fontWeight: "700",
    letterSpacing: 0.5,
    marginLeft: 6,
  },

  // Remove word outlined pill button
  removeWordBtn: {
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgba(48, 50, 72, 0.25)",
    borderRadius: 20,
    paddingVertical: 12,
    marginTop: 12,
    marginBottom: 4,
  },
  removeWordTxt: {
    fontSize: getFontSize(14),
    color: "rgba(48, 50, 72, 0.5)",
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  // Kept for NewWordScreen compatibility
  bookIcon: { fontSize: 70, marginRight: 30 },
  pencilIcon: { fontSize: 20, marginRight: 4, color: "rgba(48,50,72,0.5)" },
  paperIcon: { fontSize: 24, marginRight: 2, color: "rgba(48,50,72,0.5)" },
});

export default newBookStyles;
