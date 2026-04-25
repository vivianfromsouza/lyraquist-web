import { StyleSheet, Dimensions, PixelRatio } from "react-native";
const windowWidth = Dimensions.get("window").width;
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;

const settingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
    height: "91vh",
  },
  title: {
    textAlign: "center",
    fontSize: getFontSize(26),
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 20,
    color: "#e8e1db",
    letterSpacing: 0.5,
  },
  introSect: {
    width: windowWidth,
    backgroundColor: "#303248",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 8,
  },
  // Profile card (SettingsScreen)
  profileCard: {
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#303248",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#303248",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  profileAvatarText: {
    color: "#edc526",
    fontSize: getFontSize(24),
    fontWeight: "700",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: getFontSize(17),
    fontWeight: "700",
    color: "#303248",
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: getFontSize(13),
    color: "rgba(48, 50, 72, 0.5)",
    marginBottom: 6,
  },
  profileLink: {
    fontSize: getFontSize(13),
    color: "#edc526",
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  // Menu card (SettingsScreen)
  menuCard: {
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: "#303248",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    overflow: "hidden",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  menuRowText: {
    fontSize: getFontSize(16),
    fontWeight: "600",
    color: "#303248",
  },
  menuInternalDivider: {
    height: 1,
    backgroundColor: "rgba(48, 50, 72, 0.08)",
    marginHorizontal: 20,
  },
  logOutContainer: {
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 40,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "rgba(255, 74, 42, 0.08)",
  },
  circle: {
    height: 150,
    width: 150,
    borderRadius: 100,
    marginTop: 20,
    backgroundColor: "#303248",
  },
  centerDisplay: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  backArrow: { alignSelf: "center", flex: 1 },
  logo: {
    height: 60,
    alignSelf: "center",
    flex: 1,
    resizeMode: "contain",
    marginBottom: 7,
  },
  settingTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 20,
    color: "#ff4a2a",
  },
  settingText: {
    fontSize: 20,
    color: "gray",
  },
  settingRow: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingCol: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  border: {
    borderRadius: 10,
    borderWidth: 2,
    marginHorizontal: 10,
    borderColor: "gray",
    paddingVertical: 10,
  },
  divider: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    paddingTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  deleteButtonText: {
    marginVertical: 10,
    textAlign: "center",
    backgroundColor: "#ff4a2a",
    fontSize: 25,
    fontWeight: "bold",
    color: "#e8e1db",
    marginHorizontal: 30,
    borderRadius: 20,
  },
  deleteButton: {
    marginHorizontal: 50,
    borderRadius: 20,
    backgroundColor: "#ff4a2a",
    marginTop: 20,
  },
  settingsButton: {
    backgroundColor: "#ff4a2a",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 30,
    width: "80%",
  },
  settingsBtnText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#e8e1db",
    marginVertical: 3,
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  alertText: {
    marginHorizontal: 20,
    color: "#ff4a2a",
    marginBottom: 10,
  },
  currentTxt: {
    fontSize: 20,
    color: "#303248",
    fontWeight: "bold",
  },
  zIndexValue: {
    zIndex: 10000,
  },

  // ── AccountSettings header ────────────────────────────────────────────────
  accountHeader: {
    paddingTop: 20,
    backgroundColor: "#303248",
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  accountHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 16,
    marginRight: 16,
  },
  accountHeaderTitle: {
    fontSize: getFontSize(24),
    fontWeight: "800",
    color: "#e8e1db",
    marginLeft: 16,
    paddingTop: 8,
    flex: 1,
  },

  // ── Section labels ─────────────────────────────────────────────────────────
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
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
  dangerSectionLabel: {
    fontSize: getFontSize(12),
    fontWeight: "700",
    color: "#ff4a2a",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },

  // ── White cards ────────────────────────────────────────────────────────────
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    marginHorizontal: 20,
    shadowColor: "#303248",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "rgba(48, 50, 72, 0.08)",
    marginHorizontal: 16,
  },
  cardLabel: {
    fontSize: getFontSize(14),
    color: "rgba(48, 50, 72, 0.5)",
    fontWeight: "500",
  },
  cardValue: {
    fontSize: getFontSize(14),
    color: "#303248",
    fontWeight: "700",
  },
  cardInput: {
    fontSize: getFontSize(14),
    color: "#303248",
    flex: 1,
    textAlign: "right",
  },

  // ── Dropdown ───────────────────────────────────────────────────────────────
  dropdownWrapper: {
    marginHorizontal: 20,
    marginTop: 12,
    zIndex: 10000,
  },

  // ── Action buttons ─────────────────────────────────────────────────────────
  actionBtn: {
    backgroundColor: "#303248",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 12,
    borderRadius: 20,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    marginBottom: 4,
  },
  actionBtnText: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: getFontSize(15),
    color: "#5bc8a6",
    letterSpacing: 0.5,
  },

  // ── Danger zone ────────────────────────────────────────────────────────────
  dangerCard: {
    backgroundColor: "rgba(255, 74, 42, 0.06)",
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 74, 42, 0.2)",
  },
  dangerText: {
    fontSize: getFontSize(13),
    color: "rgba(255, 74, 42, 0.8)",
    lineHeight: 20,
    marginBottom: 16,
  },
  deleteBtn: {
    backgroundColor: "#ff4a2a",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  deleteBtnText: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: getFontSize(15),
    color: "white",
    letterSpacing: 0.5,
  },
  spacer: {
    height: 40,
  },

  logOut: {
    paddingVertical: 16,
    textAlign: "center",
    fontSize: getFontSize(15),
    fontWeight: "700",
    color: "#ff4a2a",
    letterSpacing: 0.5,
  },
});

export default settingStyles;
