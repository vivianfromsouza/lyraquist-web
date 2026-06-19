import { StyleSheet, PixelRatio } from "react-native";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;

const createPlaylistStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
    height: "93vh",
  },
  header: {
    paddingTop: 20,
    backgroundColor: "#303248",
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  titleLocation: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  arrowLocation: { marginLeft: 20, marginTop: 12 },
  title: {
    fontSize: getFontSize(26),
    fontWeight: "800",
    color: "#e8e1db",
    marginLeft: 16,
    paddingTop: 8,
    flex: 1,
    fontFamily: "Karla",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  sectionLabel: {
    fontSize: getFontSize(16),
    fontWeight: "700",
    color: "#5bc8a6",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontFamily: "Karla",
  },
  sectionLabelLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(48, 50, 72, 0.12)",
    marginLeft: 12,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(48, 50, 72, 0.12)",
    paddingVertical: 12,
    marginBottom: 4,
  },
  input: {
    fontSize: getFontSize(16),
    flex: 1,
    marginLeft: 10,
    color: "#303248",
    fontFamily: "Karla",
  },
  pencilIcon: { fontSize: 20, marginRight: 4, color: "rgba(48,50,72,0.5)" },
  paperIcon: { fontSize: 24, marginRight: 2, color: "rgba(48,50,72,0.5)" },
  imageInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 4,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(48, 50, 72, 0.12)",
    paddingVertical: 12,
    marginBottom: 4,
  },
  imageIcon: { fontSize: 24, color: "rgba(48,50,72,0.5)", marginRight: 10 },
  imageLabel: {
    fontSize: getFontSize(12),
    fontWeight: "700",
    color: "rgba(48,50,72,0.45)",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 4,
    fontFamily: "Karla",
  },
});

export default createPlaylistStyles;
