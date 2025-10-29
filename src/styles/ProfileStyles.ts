import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

const profileStyles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: "#e8e1db",
  },
  introSect: {
    flex: 1,
    width: windowWidth,
    backgroundColor: "#303248",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#e8e1db",
    marginBottom: 20,
  },
  circle: {
    height: 150,
    width: 150,
    borderRadius: 100,
    borderColor: "#303248",
    borderWidth: 2,
    marginTop: -15,
  },
  rows: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  border: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "gray",
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  divider: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 70,
    marginTop: 20,
    color: "#ff4a2a",
  },
  spacer: { alignItems: "center", marginTop: 40 },
  settingTxt: {
    fontSize: 20,
    color: "gray",
    marginBottom: 10,
  },
  currValue: {
    fontSize: 20,
    color: "#303248",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#ff4a2a",
    borderRadius: 10,
    marginTop: 5,
    marginHorizontal: 100,
  },
  buttonTxt: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#e8e1db",
    marginVertical: 3,
  },
});
export default profileStyles;
