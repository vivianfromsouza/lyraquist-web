import { Dimensions, PixelRatio, StyleSheet } from "react-native";
const windowWidth = Dimensions.get("window").width;
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const signupStyles = StyleSheet.create({
  container: {
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
    fontSize: getFontSize(30),
    fontWeight: "bold",
    color: "#303248",
    marginBottom: 10,
  },
  dropdown: {
    textAlign: "center",
    paddingLeft: 10,
    height: 35,
    borderColor: "rgba(183, 193, 189, 0.9)",
    borderWidth: 0.5,
    borderRadius: 8,
    marginBottom: 20,
  },
  placeholderStyle: {
    fontSize: getFontSize(16),
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: getFontSize(16),
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: getFontSize(16),
  },
  noteText: {
    paddingLeft: 5,
    fontSize: getFontSize(12),
    color: "gray",
    textAlign: "left",
    marginBottom: 7,
  },
  header: {
    backgroundColor: "#edc526",
    width: windowWidth,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  arrowLocation: { alignSelf: "center", flex: 1 },
  logoImage: {
    height: 60,
    alignSelf: "center",
    flex: 1,
    resizeMode: "contain",
    marginBottom: 7,
  },
  flexView: {
    flex: 1,
  },
  sectionTitle: {
    marginHorizontal: 20,
    fontSize: getFontSize(25),
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  sectionTxt: {
    marginHorizontal: 20,
    fontSize: getFontSize(15),
    marginBottom: 30,
  },
  userLocation: {
    marginTop: 5,
    marginVertical: 3,
    borderWidth: 0.5,
    alignItems: "center",
    borderColor: "#AAAAAA",
    borderRadius: 10,
    alignSelf: "center",
    marginRight: "auto",
    marginLeft: "auto",
    width: "90%",
    flexDirection: "row",
    paddingEnd: 60,
    bottom: 15,
    gap: 10,
    paddingVertical: 3,
  },
  userIcon: {
    marginLeft: 5,
  },
  inputFlex: { flex: 1 },
  inputText: {
    fontSize: getFontSize(17),
  },
  alertTxt: {
    marginHorizontal: 70,
    fontSize: getFontSize(12),
    color: "#ff4a2a",
  },
  passwordLocation: {
    marginTop: 5,
    marginVertical: 3,
    borderWidth: 0.5,
    alignItems: "center",
    borderColor: "#AAAAAA",
    borderRadius: 10,
    alignSelf: "center",
    marginRight: "auto",
    marginLeft: "auto",
    width: "90%",
    flexDirection: "row",
    paddingEnd: 60,
    gap: 10,
    paddingVertical: 3,
    justifyContent: "space-between",
  },
  passwordIcon: {
    flexDirection: "row",
    gap: 10,
  },
  passwordTxt: {
    fontSize: getFontSize(17),
    width: "90%",
    paddingRight: 13,
  },
  langHeader: {
    fontSize: getFontSize(17),
    color: "black",
    fontWeight: "bold",
  },
  prefLangVisibility: { marginHorizontal: 20, zIndex: 10001 },
  targetLangVisibility: { marginHorizontal: 20, zIndex: 10000 },
  checkboxLocation: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxTxt: { fontSize: getFontSize(12), color: "gray", zIndex: -40 },
  signupBtn: {
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: "#303248",
    color: "#e8e1db",
    fontWeight: "bold",
  },
});

export default signupStyles;
