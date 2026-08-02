import { StyleSheet, PixelRatio } from "react-native";
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;

const songStyles = StyleSheet.create({
  card: {
    margin: 8,
    borderRadius: 20,
    borderWidth: 2,
    padding: 10,
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
    fontFamily: "Karla",
  },
  artist: {
    fontSize: getFontSize(12),
    fontWeight: "400",
    color: "rgba(48, 50, 72, 0.5)",
    marginTop: 2,
    fontFamily: "Karla",
  },
  iconsRow: {
    flexDirection: "row",
    alignItems: "center",
    // marginLeft: "auto",
    paddingTop: 10,
  },
  addButton: {
    alignItems: "center",
    marginRight: 12,
    color: "#303248",
  },
});

export default songStyles;
