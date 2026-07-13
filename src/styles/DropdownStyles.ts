 import { PixelRatio, StyleSheet } from "react-native";
 const fontScale = PixelRatio.getFontScale();
 const getFontSize = (size) => size / fontScale;

 const dropdownStyles = StyleSheet.create({
 
 dropdownWrapper: {
    fontFamily: "Karla",
    marginHorizontal: 20,
    marginBottom: 8,
  },

  dropdownText: {
    fontSize: getFontSize(14),
    color: "#303248",
    fontFamily: "Karla",
  },

  dropdownContainer: {
    borderColor: "rgba(48, 50, 72, 0.12)",
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#303248",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  }
});

export default dropdownStyles;