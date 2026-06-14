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
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.07)",
    paddingTop: 15,
    position: "fixed" as "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  wrapper: {
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  albumText: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minWidth: 0,
  },
  albumCover: {
    height: 40,
    width: 40,
    borderRadius: 8,
    marginBottom: 8,
  },
  trackInfo: {
    marginLeft: 12,
    marginBottom: 15,
    flexShrink: 1,
  },
  trackText: {
    fontWeight: "700",
    fontSize: 18,
    color: "#e8e1db",
    letterSpacing: 0.2,
    fontFamily: "Karla",
  },
  artistText: {
    fontSize: 12,
    color: "rgba(232, 225, 219, 0.6)",
    marginTop: 2,
    fontFamily: "Karla",
  },
  centerGroup: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  seekbar: {
    flex: 1,
    justifyContent: "center",
    marginTop: 5,
  },
  seekbarControls: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 11,
    color: "rgba(232, 225, 219, 0.5)",
    fontFamily: "Karla",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    gap: 4,
  },
  volume: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    marginBottom: 15,
  },
  volumeNum: {
    fontSize: 13,
    fontWeight: "600",
    color: "#e8e1db",
    minWidth: 28,
    textAlign: "center",
    fontFamily: "Karla",

  },
  lyricsButton: {
    fontWeight: "700",
    backgroundColor: "#edc526",
    borderRadius: 20,
    fontSize: 13,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 18,
    paddingRight: 18,
    marginBottom: 20,
    border: "none",
    cursor: "pointer",
    color: "#303248",
    letterSpacing: 0.3,
    fontFamily: "Karla",
    whiteSpace: "nowrap",
    flexShrink: 0,
    width: 120,
  },
  lyricsButtonSpacer: {
    width: 120,
    flexShrink: 0,
  },
  lyricsSection: {
    marginLeft: 130,
  },
  lyricsScroll: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default playerStyles;
