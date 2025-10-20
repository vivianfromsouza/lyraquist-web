import { StyleSheet } from "react-native";

const playlistStyles = StyleSheet.create({
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
});

export default playlistStyles;
