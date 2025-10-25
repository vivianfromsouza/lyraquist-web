import { StyleSheet } from "react-native";

const playlistStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
    height: "80vh",
  },
  button: {
    backgroundColor: "#303248",
    marginVertical: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    color: "#edc525",
  },
  playlistCardName: {
    fontSize: 13,
    fontWeight: "500",
    color: "black",
    marginTop: 10,
    width: 130,
  },
  playlistCardImage: {
    width: 130,
    height: 130,
    borderRadius: 5,
    backgroundColor: "white",
    elevation: 8,
  },
  playlistItemEntry: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginVertical: 7,
  },
  playlistImageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  playlistItemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  playlistItemName: {
    fontWeight: "bold",
    fontSize: 14,
    maxWidth: 190,
  },
  playlistItemArtist: {
    maxWidth: 190,
    color: "grey",
  },
  playlistItemLike: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
    alignItems: "center",
  },
  playlistLikeIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
  },
  playlistItemBorder: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginHorizontal: 30,
  },
  addToPlaylistHeader: {
    backgroundColor: "#5bc8a6",
    paddingTop: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingBottom: 15,
    paddingLeft: 20,
  },
  addToPlaylistTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
  },
  addToPlaylistDropdown: {
    marginLeft: 20,
    paddingTop: 30,
    width: "15%",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    zIndex: 10000,
  },
});

export default playlistStyles;
