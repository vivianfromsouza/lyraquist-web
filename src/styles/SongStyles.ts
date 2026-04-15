import { StyleSheet, PixelRatio } from "react-native";
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;

const songStyles = StyleSheet.create({
  card: {
    margin: 8,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#303248",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  art: {
    width: 130,
    height: 130,
    borderRadius: 8,
    backgroundColor: "#e8e1db",
  },
  name: {
    fontSize: getFontSize(13),
    fontWeight: "600",
    color: "#303248",
    marginTop: 8,
  },
  artist: {
    fontSize: getFontSize(12),
    fontWeight: "400",
    color: "rgba(48, 50, 72, 0.5)",
    marginTop: 2,
  },
  addButton: {
    flexDirection: "row",
    marginLeft: "auto",
    alignItems: "center",
    paddingTop: 10,
  },
});

export default songStyles;
