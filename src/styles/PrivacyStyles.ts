import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

const privacyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
    height: "80vh",
    // width: "100%"
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 15,
    color: "#303248",
  },
  introSect: {
    flex: 1,
    width: windowWidth,
    padding: 30,
    backgroundColor: "#edc526",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  circle: {
    height: 190,
    width: 190,
    marginBottom: -30,
  },
  backArrow: { alignSelf: "center", flex: 1 },
  banner: {
    flexDirection: "row",
    // alignItems: "center",
    marginTop: 30,
    // marginLeft: 20,
    // marginRight: 20,
  },
  logo: {
    height: 60,
    alignSelf: "center",
    flex: 1,
    resizeMode: "contain",
    marginBottom: 7,
  },
  firstPara: { fontSize: 15, margin: 13, marginTop: 20 },
  para: { fontSize: 15, margin: 13 },
});

export default privacyStyles;
