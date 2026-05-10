import { StyleSheet, Dimensions, PixelRatio } from "react-native";
const windowWidth = Dimensions.get("window").width;
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;

const playlistStyles = StyleSheet.create({
  // ── Shared / other screens ────────────────────────────────────────────────
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
    fontSize: getFontSize(20),
    color: "#edc526",
  },
  playlistCardName: {
    fontSize: getFontSize(13),
    fontWeight: "500",
    color: "#303248",
    marginTop: 10,
    width: 130,
  },
  playlistCardImage: {
    width: 130,
    height: 130,
    borderRadius: 8,
    backgroundColor: "#e8e1db",
    elevation: 4,
  },
  addToPlaylistHeader: {
    paddingTop: 20,
    backgroundColor: "#303248",
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  addToPlaylistTitle: {
    fontSize: getFontSize(26),
    fontWeight: "800",
    color: "#e8e1db",
    marginLeft: 16,
    paddingTop: 8,
    flex: 1,
  },
  introSect: {
    flex: 1,
    width: windowWidth,
    backgroundColor: "#303248",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 30,
  },
  loading: {
    marginTop: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e1db",
  },

  // ── PlaylistInfoScreen ────────────────────────────────────────────────────
  background: { backgroundColor: "#e8e1db", flex: 1, height: "80vh" },
  header: {
    paddingTop: 20,
    backgroundColor: "#303248",
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  arrowLocation: { marginLeft: 16, paddingVertical: 4 },
  title: {
    textAlign: "left",
    fontSize: getFontSize(26),
    fontWeight: "800",
    marginLeft: 16,
    paddingTop: 8,
    color: "#e8e1db",
    flex: 1,
  },
  controlsLocation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 20,
  },
  playLocation: { flexDirection: "row", alignItems: "center", gap: 16 },
  playBtn: {},
  searchBar: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 14,
    marginTop: 16,
    alignItems: "center",
    paddingVertical: 10,
    shadowColor: "#303248",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    color: "#303248",
    paddingHorizontal: 8,
    fontSize: getFontSize(14),
  },

  // ── Section label pattern ─────────────────────────────────────────────────
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 6,
  },
  sectionLabel: {
    fontSize: getFontSize(12),
    fontWeight: "700",
    color: "#edc526",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  sectionLabelLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(48, 50, 72, 0.12)",
    marginLeft: 12,
  },

  // ── Description ───────────────────────────────────────────────────────────
  descLocation: { marginBottom: 4 },
  descTitle: {
    fontSize: getFontSize(14),
    paddingBottom: 5,
    color: "rgba(48, 50, 72, 0.5)",
    paddingHorizontal: 20,
  },
  descText: {
    fontSize: getFontSize(14),
    color: "rgba(48, 50, 72, 0.65)",
    paddingHorizontal: 20,
    paddingBottom: 8,
    lineHeight: 20,
  },
  descTxtLocation: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 15,
  },

  // ── Column labels ─────────────────────────────────────────────────────────
  colTitles: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 20,
    marginRight: 40,
    paddingBottom: 4,
  },
  colLocation: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
    alignItems: "center",
  },
  colText: {
    color: "rgba(48, 50, 72, 0.4)",
    fontSize: getFontSize(11),
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // ── Song list items (PlaylistItem.tsx) ────────────────────────────────────
  playlistItemEntry: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    paddingVertical: 12,
  },
  playlistImageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  playlistItemImage: {
    width: 52,
    height: 52,
    borderRadius: 8,
  },
  playlistItemName: {
    fontWeight: "600",
    fontSize: getFontSize(14),
    maxWidth: 190,
    color: "#303248",
  },
  playlistItemArtist: {
    maxWidth: 190,
    color: "rgba(48, 50, 72, 0.5)",
    fontSize: getFontSize(13),
    marginTop: 2,
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
    borderBottomColor: "rgba(48, 50, 72, 0.08)",
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },

  // ── AddSongToPlaylistScreen ───────────────────────────────────────────────
  addToPlaylistContainer: {
    flex: 1,
    backgroundColor: "#e8e1db",
    height: "91vh",
  },
  addToPlaylistHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 16,
    marginRight: 16,
  },
  songInfoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: "#303248",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  songInfoImage: {
    width: 52,
    height: 52,
    borderRadius: 8,
  },
  songInfoText: {
    marginLeft: 14,
    flex: 1,
  },
  songInfoName: {
    fontSize: getFontSize(15),
    fontWeight: "700",
    color: "#303248",
  },
  songInfoArtist: {
    fontSize: getFontSize(13),
    color: "rgba(48,50,72,0.5)",
    marginTop: 3,
  },
  addToPlaylistDropdown: {
    marginHorizontal: 20,
    paddingTop: 8,
    zIndex: 10000,
  },
  addToPlaylistBtn: {
    backgroundColor: "#303248",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 20,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    marginBottom: 20,
  },
  addToPlaylistBtnText: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: getFontSize(15),
    color: "#edc526",
    letterSpacing: 0.5,
  },

  // ── Add Song button ───────────────────────────────────────────────────────
  addSongBtn: {
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#edc526",
    borderRadius: 20,
    paddingVertical: 12,
    marginBottom: 20,
    marginTop: 12,
  },
  addSongIcon: { marginRight: 6 },
  addSongTxt: {
    fontSize: getFontSize(14),
    color: "#edc526",
    fontWeight: "700",
    letterSpacing: 0.5,
    marginLeft: 6,
  },
  noResults: {
    textAlign: "center",
    paddingVertical: 40,
    color: "rgba(48, 50, 72, 0.4)",
    fontSize: getFontSize(15),
    fontWeight: "600",
    paddingHorizontal: 30,
  },
});

export default playlistStyles;
