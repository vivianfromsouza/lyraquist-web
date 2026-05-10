import { StyleSheet } from "react-native";

const starredLangStyles = StyleSheet.create({
  langEntry: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 4,
    marginLeft: 4,
    paddingVertical: 2,
  },
  langText: {
    fontWeight: "600",
    fontFamily: "Karla",
    fontSize: 17,
    color: "#303248",
    marginTop: 11,
    marginBottom: 8,
  },
  starIcon: {
    fontSize: 20,
    color: "#edc526",
  },
  bottomBorder: {
    borderBottomColor: "rgba(48, 50, 72, 0.1)",
    borderBottomWidth: 1,
  },
});

export default starredLangStyles;
