import { StyleSheet, Dimensions, PixelRatio } from "react-native";
const windowWidth = Dimensions.get("window").width;
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;

const workbookStyles = StyleSheet.create({
  // ── Shared (Workbook.tsx card) ────────────────────────────────────────────
  icon: {
    elevation: 4,
    fontSize: 32,
  },
  name: {
    fontSize: getFontSize(13),
    fontWeight: "500",
    color: "#303248",
    marginTop: 8,
    width: 80,
  },
  introSect: {
    flex: 1,
    width: windowWidth,
    backgroundColor: "#303248",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 30,
  },

  // ── WorkbookInfoScreen ────────────────────────────────────────────────────
  background: { backgroundColor: "#e8e1db", flex: 1, height: "91vh" },
  header: {
    paddingTop: 20,
    backgroundColor: "#303248",
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  close: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 20,
  },
  closeLocation: { flexDirection: "row", alignItems: "center" },
  closeBtn: {},
  arrowBtn: { marginLeft: 16 },
  title: {
    textAlign: "left",
    fontSize: getFontSize(26),
    fontWeight: "800",
    marginLeft: 16,
    paddingTop: 8,
    color: "#e8e1db",
    flex: 1,
  },
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
    color: "#5bc8a6",
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
  descTxt: {
    marginVertical: 10,
    fontSize: getFontSize(14),
    marginRight: 20,
    marginLeft: 8,
    color: "rgba(48, 50, 72, 0.65)",
  },
  descIcon: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 15,
  },

  // ── Column labels ─────────────────────────────────────────────────────────
  wordCol: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 20,
    marginRight: 40,
    paddingBottom: 4,
  },
  wordColTxt: {
    color: "rgba(48, 50, 72, 0.4)",
    fontSize: getFontSize(11),
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  starredCol: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
    alignItems: "center",
  },
  starredColTxt: {
    color: "rgba(48, 50, 72, 0.4)",
    fontSize: getFontSize(11),
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginRight: 10,
  },
  deleteColTxt: {
    color: "rgba(48, 50, 72, 0.4)",
    fontSize: getFontSize(11),
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // ── Word list rows ────────────────────────────────────────────────────────
  wordList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    paddingVertical: 12,
  },
  iconCols: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
    alignItems: "center",
  },
  starIconFilled: {},
  starIconOutline: {},
  deleteIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
  },
  divider: {
    borderBottomColor: "rgba(48, 50, 72, 0.08)",
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },

  // ── Empty state ───────────────────────────────────────────────────────────
  noWordsTxt: {
    textAlign: "center",
    paddingVertical: 40,
    color: "rgba(48, 50, 72, 0.4)",
    fontSize: getFontSize(15),
    fontWeight: "600",
    paddingHorizontal: 30,
  },

  // ── Bottom buttons ────────────────────────────────────────────────────────
  addNewWordBtn: {
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#5bc8a6",
    borderRadius: 20,
    paddingVertical: 12,
    marginTop: 16,
    marginBottom: 8,
  },
  addBtnIcon: { marginRight: 6 },
  addNewWordTxt: {
    fontSize: getFontSize(14),
    color: "#5bc8a6",
    fontWeight: "700",
    letterSpacing: 0.5,
    marginLeft: 6,
  },
  button: {
    backgroundColor: "#303248",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 8,
    borderRadius: 20,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    marginBottom: 20,
  },
  buttonText: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: getFontSize(15),
    color: "#5bc8a6",
    letterSpacing: 0.5,
  },
  loading: {
    marginTop: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e1db",
  },
});

export default workbookStyles;
