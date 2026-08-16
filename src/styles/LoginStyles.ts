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
    paddingHorizontal: 24,
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    maxWidth: 360,
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
    marginBottom: 20,
    fontWeight: "bold",
    color: "#303248",
    fontSize: 20,
    fontFamily: "Karla",
  },
  inputOutline: {
    marginTop: 5,
    marginVertical: 3,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "#303248",
    borderRadius: 10,
    alignSelf: "center",
    width: "100%",
  },
  inputPadding: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    marginLeft: 4,
    width: "100%",
  },
  inputTxt: {
    marginHorizontal: 10,
    fontSize: 17,
    width: "100%",
    fontFamily: "Karla",
  },
  loginLocation: {
    width: "100%",
    maxWidth: 360,
    alignSelf: "center",
    marginBottom: 90,
    paddingHorizontal: 24,
  },
  loginBtn: {
    fontSize: 18,
    borderRadius: 7,
    backgroundColor: "#303248",
    color: "#e8e1db",
    padding: 10,
    width: "100%",
    fontFamily: "Karla",
  },
  icon: {
    color: "#303248",
  },
});

export default loginStyles;
