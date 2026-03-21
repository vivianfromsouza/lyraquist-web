import { StyleSheet } from "react-native";

const createPlaylistStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: "#e8e1db",
    height: "80vh",
  },
  newPlaylistName: {
    fontSize: 30,
    color: "#303248",
    margin: 10,
    fontWeight: "bold",
  },
  label: {
    fontSize: 20,
    color: "gray",
    marginLeft: 10,
  },
  input: {
    fontSize: 20,
    color: "gray",
    borderWidth: 0.5,
    padding: 6,
    paddingLeft: 8,
    borderRadius: 5,
    borderColor: "gray",
    marginTop: 15,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  imageInput: {
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default createPlaylistStyles;
