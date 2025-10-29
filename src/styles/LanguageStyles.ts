import { StyleSheet, Dimensions } from "react-native";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const langStyles = StyleSheet.create({
  container: {
    height: "91vh",
    backgroundColor: "#e8e1db",
  },
  blueSection: {
    backgroundColor: "#303248",
    paddingVertical: 20,
    paddingHorizontal: 10,
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#e8e1db",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    color: "#000",
    paddingHorizontal: 10,
  },
  SpanishText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "bold",
  },
  languageButton: {
    marginTop: 10,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingVertical: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e1db",
    marginTop: SCREEN_HEIGHT / 2.5,
  },
  text: {
    margin: 10,
  },
  langTitleView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 30,
    marginTop: 15,
  },
  langTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noResultsText: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 30,
    marginLeft: 30,
  },
  resultsGrid: { marginRight: 30, marginLeft: 30, marginBottom: 10 },
});

export default langStyles;
