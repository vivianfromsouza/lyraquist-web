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
  },
  wrapper: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  albumText: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minWidth: 0,
  },
  albumCover: {
    height: 52,
    width: 52,
    borderRadius: 8,
    marginBottom: 8,
  },
  trackInfo: {
    marginLeft: 12,
    flexShrink: 1,
  },
  trackText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#e8e1db",
    letterSpacing: 0.2,
  },
  artistText: {
    fontSize: 12,
    color: "rgba(232, 225, 219, 0.6)",
    marginTop: 2,
  },
  seekbar: {
    flex: 2,
    justifyContent: "center",
    marginHorizontal: 24,
  },
  seekbarControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  timeText: {
    fontSize: 11,
    color: "rgba(232, 225, 219, 0.5)",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    gap: 4,
  },
  volume: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  volumeNum: {
    fontSize: 13,
    fontWeight: "600",
    color: "#e8e1db",
    minWidth: 28,
    textAlign: "center",
  },
  lyrics: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 10,
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
    border: "none",
    cursor: "pointer",
    color: "#303248",
    letterSpacing: 0.3,
  },
  lyricsScroll: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default playerStyles;
