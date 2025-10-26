import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edc526",
    height: "100vh",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginHorizontal: 100,
  },
  circle: {
    height: 190,
    width: 190,
    marginBottom: 0,
  },
  logIn: {
    marginTop: 5,
    textAlign: "center",
    flexDirection: "row",
    backgroundColor: "#ff4a2a",
    borderRadius: 20,
    alignSelf: "center",
  },
  arrowLocation: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    marginTop: 30,
    marginLeft: 20,
  },
  title: {
    marginTop: 5,
    fontWeight: "bold",
    color: "#303248",
    fontSize: 20,
  },
  inputOutline: {
    marginTop: 5,
    marginVertical: 3,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "#303248",
    borderRadius: 10,
    alignSelf: "center",
  },
  inputPadding: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    marginLeft: 4,
  },
  inputTxt: {
    marginHorizontal: 10,
    fontSize: 17,
    width: "100%",
  },
  loginLocation: {
    marginHorizontal: 590,
    marginBottom: 90,
  },
  loginBtn: {
    fontSize: 18,
    borderRadius: 7,
    backgroundColor: "#303248",
    color: "#e8e1db",
    padding: 10,
  },
  icon: {
    color: "#303248",
  },
});

export default loginStyles;
