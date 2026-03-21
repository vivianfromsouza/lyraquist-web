import { PixelRatio, StyleSheet } from "react-native";
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const startStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edc526",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    height: 190,
    width: 190,
    marginBottom: -30,
  },
  bigCircle: {
    height: 250,
    width: 500,
    right: 0,
    left: 0,
    marginHorizontal: 0,
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    marginTop: 20,
    fontSize: getFontSize(30),
    fontWeight: "900",
    color: "#303248",
  },
  warning: {
    marginTop: 10,
    fontSize: getFontSize(15),
    color: "#ff4a2a",
    justifyContent: "center",
  },
  signUp: {
    backgroundColor: "#ff4a2a",
    borderRadius: 10,
    marginTop: 20,
  },
  logIn: {
    backgroundColor: "#303248",
    borderRadius: 10,
    marginTop: 15,
  },
  alertTxt: { flexDirection: "row", alignItems: "center" },
  signUpTxt: {
    margin: 10,
    fontSize: 18,
    fontWeight: "400",
    marginHorizontal: 70,
    color: "#e8e1db",
  },
  loginTxt: {
    margin: 10,
    fontSize: 18,
    fontWeight: "400",
    marginHorizontal: 77,
    color: "#e8e1db",
  },
});

export default startStyles;
