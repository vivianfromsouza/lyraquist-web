import { StyleSheet } from "react-native";
const getFontSize = (size) => size;

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
    //height:'100vh'
  },
  introSect: {
    flex: 1,
    //width: 1000,
    backgroundColor: "#303248",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    //borderRadius: 15,
    paddingBottom: 30,
  },
  shadow: {
    shadowColor: "#171717",
    elevation: 20,
    position: "relative",
  },
  starredLanguagesSect: {
    flex: 1,
  },
  historySect: {
    flex: 1,
  },
  savedSect: {
    flex: 1,
  },
  workbookSect: {
    flex: 1,
  },
  header: {
    paddingLeft: 20,
    paddingTop: 20,
    fontSize: getFontSize(25),
    fontWeight: "bold",
    color: "#303248",
    marginBottom: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e1db",
  },
  noteText: {
    paddingLeft: 20,
    paddingRight: 10,
    fontSize: getFontSize(15),
    color: "#303248",
    textAlign: "left",
    marginBottom: 10,
  },
  settingsLocation: {
    marginRight: 20,
    marginTop: 20,
    marginBottom: -20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  settingIcon: {
    color: "#e8e1db",
    fontSize: 30,
  },
  searchLocation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
    marginTop: 0,
  },
  titleLocation: {
    flexDirection: "row",
  },
  titleText: {
    paddingLeft: 20,
    paddingTop: 40,
    fontSize: 30,
    fontWeight: "bold",
    color: "#e8e1db",
  },
  nameText: {
    paddingLeft: 10,
    paddingTop: 40,
    fontSize: getFontSize(30),
    fontWeight: "bold",
    color: "#edc526",
  },
  subTitleText: {
    paddingLeft: 20,
    fontSize: getFontSize(18),
    color: "#e8e1db",
  },
  iconDivider: {
    justifyContent: "flex-end",
  },
  searchIcon: {
    color: "#e8e1db",
    fontSize: 35,
    marginBottom: 10,
  },
  starredLangText: {
    paddingLeft: 20,
    paddingTop: 20,
    fontSize: getFontSize(25),
    fontWeight: "bold",
    color: "#303248",
  },
  langList: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: "#e8e1db",
    shadowColor: "#171717",
    elevation: 8,
  },
  moreLangBtn: {
    flexDirection: "row",
    marginTop: 8,
    marginLeft: 4,
    alignItems: "center",
  },
  moreLangTxt: {
    fontSize: getFontSize(15),
    marginRight: 10,
    color: "#2D3047",
  },
  hzScroll: { marginRight: 20, marginLeft: 20 },
  noResultsText: {
    fontSize: getFontSize(17),
    textAlign: "center",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    color: "gray",
  },
  addToBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 20,
  },
  sectionTitle: {
    paddingLeft: 20,
    paddingTop: 20,
    fontSize: getFontSize(25),
    fontWeight: "bold",
    color: "#303248",
    marginBottom: 10,
  },
  addBtn: {
    flexDirection: "row",
    marginLeft: 20,
    alignItems: "center",
    paddingTop: 15,
  },
  addIcon: { marginRight: 5, color: "#303248" },
  addTxt: {
    fontSize: getFontSize(15),
    color: "#303248",
    fontWeight: "bold",
  },
});

export default homeStyles;
