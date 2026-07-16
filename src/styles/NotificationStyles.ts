import { PixelRatio, StyleSheet } from "react-native";
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const notificationStyles = StyleSheet.create({
  text: {
    fontFamily: "Karla",
    fontSize: 14,
    padding: 10,
    marginRight: 15,
  },
  cancelButton: {
    width: 100,
    margin: 5,
    marginRight: 10,
    borderRadius: 5,
    border: "none",
    backgroundColor: "#303248",
    color: "#e8e1db",
    padding: 5,
  },
  deleteButton: {
    width: 100,
    margin: 5,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#ff4a2a",
    border: "none",
    color: "#e8e1db",
    padding: 5,
  },
});

export default notificationStyles;
