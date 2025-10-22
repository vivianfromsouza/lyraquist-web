import { StyleSheet, Dimensions } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const workbookStyles = StyleSheet.create({
  icon: {
    elevation: 8,
    fontSize: 75,
  },
  name: {
    fontSize: 13,
    fontWeight: "500",
    color: "black",
    marginTop: 10,
    width: 80,
  },
});

export default workbookStyles;
