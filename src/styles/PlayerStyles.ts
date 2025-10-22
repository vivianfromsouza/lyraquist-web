import { StyleSheet } from "react-native";

const playerStyles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e1db",
  },
  container: {
    backgroundColor: "#303248",
  },
  wrapper: {
    flexDirection: "row",
    marginRight: 10,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  albumText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  albumCover: {
    height: 70,
    width: 70,
    marginBottom: 10,
  },
  trackText: {
    fontWeight: "bold",
    color: "#e8e1db",
  },
  artistText: {
    color: "#e8e1db",
  },
  seekbar: {
    justifyContent: "center",
    marginRight: 30,
  },
  seekbarControls: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 15,
    color: "#e8e1db",
  },
  volume: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  volumeText: {
    marginRight: 5,
    color: "#e8e1db",
  },
  lyrics: {
    flexDirection: "row",
    justifyContent: "center",
  },
  lyricsButton: {
    marginRight: 30,
    marginBottom: 10,
    fontWeight: "bold",
    backgroundColor: "#edc526",
    borderRadius: 5,
    fontSize: 15,
  },
  lyricsScroll: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default playerStyles;
