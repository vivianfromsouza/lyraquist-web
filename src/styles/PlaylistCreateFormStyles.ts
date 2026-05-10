import { StyleSheet, PixelRatio } from "react-native";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;

const createPlaylistStyles = StyleSheet.create({
  formContainer: {
    marginTop: 4,
  },
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
    color: "#edc526",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  sectionLabelLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(48, 50, 72, 0.12)",
    marginLeft: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(48, 50, 72, 0.12)",
    paddingVertical: 12,
    marginBottom: 4,
    marginHorizontal: 20,
  },
  input: {
    fontSize: getFontSize(16),
    flex: 1,
    color: "#303248",
  },
  imageInputRow: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 4,
  },
  imageLabel: {
    fontSize: getFontSize(12),
    fontWeight: "700",
    color: "rgba(48,50,72,0.45)",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
});

export default createPlaylistStyles;
