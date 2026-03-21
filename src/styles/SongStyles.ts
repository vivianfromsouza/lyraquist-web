import { StyleSheet } from "react-native";

const songStyles = StyleSheet.create({
  card: { marginLeft: 10, margin: 10 },
  art: {
    width: 130,
    height: 130,
    borderRadius: 5,
    backgroundColor: "white",
    elevation: 8,
  },
  name: {
    fontSize: 13,
    fontWeight: "500",
    color: "black",
    marginTop: 10,
  },
  artist: {
    fontSize: 13,
    fontWeight: "500",
    color: "black",
    marginTop: 1,
  },
  addButton: {
    flexDirection: "row",
    marginLeft: 20,
    alignItems: "center",
    paddingTop: 15,
  },
});

export default songStyles;
