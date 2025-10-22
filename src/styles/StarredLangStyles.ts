import { StyleSheet } from "react-native";

const starredLangStyles = StyleSheet.create({
  langEntry: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 5,
    marginLeft: 5,
  },
  langText: {
    fontWeight: "bold",
    fontFamily: "Karla",
    fontSize: 20,
    color: "#2D3047",
    marginTop: 10,
    marginBottom: 7,
  },
  starIcon: {
    fontSize: 23,
    color: "#edc526",
  },
  bottomBorder: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.2,
  },
});

export default starredLangStyles;
