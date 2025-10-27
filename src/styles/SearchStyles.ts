import { StyleSheet } from "react-native";

const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
    height: "91vh",
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
  searchResultItem: {
    flex: 1,
    margin: 5,
    alignItems: "center",
  },
  albumContainer: {
    alignItems: "center",
  },
  coverImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    color: "black",
    textAlign: "center",
    marginTop: 5,
  },
  artist: {
    color: "#989898",
    textAlign: "center",
  },
  flatListContainer: {
    paddingHorizontal: 5,
  },
  languageButton: {
    marginHorizontal: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingVertical: 10,
  },
  buttonText: {
    fontWeight: "bold",
  },
  space: {
    height: 20,
  },
  noteAndButtonContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  noteText: {
    marginBottom: 10,
    marginLeft: 10,
  },
  placeholderTxt: { paddingLeft: 20 },
  noSearchTxt: { flex: 1, height: 100, backgroundColor: "#e8e1db" },
  languagesTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  languagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  languageItem: {
    alignItems: "center",
  },
  playlistImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginBottom: 5,
  },
  languageText: {
    fontWeight: "bold",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e1db",
  },
});

export default searchStyles;
