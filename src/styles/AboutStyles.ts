import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

const aboutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
    height: "80vh",
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 20,
    color: "#303248",
  },
  introSect: {
    flex: 1,
    width: windowWidth,
    backgroundColor: "#edc526",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  circle: {
    height: 150,
    width: 150,
    borderRadius: 100,
    marginTop: 20,
    backgroundColor: "#303248",
  },
  centerDisplay: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  backArrow: { alignSelf: "center", flex: 1 },
  logo: {
    height: 60,
    alignSelf: "center",
    flex: 1,
    resizeMode: "contain",
    marginBottom: 7,
  },
});

export default aboutStyles;
