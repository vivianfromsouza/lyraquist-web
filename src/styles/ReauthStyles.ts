import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width; 

const reauthStyles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: "#e8e1db",
    height: "93vh",
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  border: {
    borderRadius: 10,
    borderWidth: 2,
    marginHorizontal: 10,
    borderColor: "gray",
    paddingVertical: 10,
  },
  divider: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    paddingTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  deleteAccount: {
    marginVertical: 10,
    textAlign: "center",
    backgroundColor: "#ff4a2a",
    fontSize: 25,
    fontWeight: "bold",
    color: "#e8e1db",
    marginHorizontal: 30,
    borderRadius: 20,
  },
  dropdown: {
    marginRight: 4,
  },

  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default reauthStyles;