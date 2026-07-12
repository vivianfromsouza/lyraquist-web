import { PixelRatio, StyleSheet } from "react-native";
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
  },
  sectionTitle: {
    marginHorizontal: 20,
    fontSize: getFontSize(25),
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 5,
    color: "#303248",
    fontFamily: "Karla",
  },
  sectionTxt: {
    marginHorizontal: 20,
    fontSize: getFontSize(15),
    marginBottom: 20,
    color: "rgba(48, 50, 72, 0.75)",
    fontFamily: "Karla",
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
    fontFamily: "Karla",
  },
  sectionLabelLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(48, 50, 72, 0.12)",
    marginLeft: 12,
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
  cardInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "rgba(48, 50, 72, 0.08)",
    marginHorizontal: 16,
  },
  rowIcon: {
    color: "#303248",
  },
  rowInput: {
    flex: 1,
    fontSize: getFontSize(16),
    color: "#303248",
    fontFamily: "Karla",
  },
  fieldColumn: {
    flex: 1,
  },
  fieldInput: {
    fontSize: getFontSize(16),
    color: "#303248",
    fontFamily: "Karla",
  },
  fieldError: {
    marginTop: 4,
    fontSize: getFontSize(11),
    color: "#ff4a2a",
    fontFamily: "Karla",
  },

  alertTxt: {
    marginHorizontal: 20,
    marginBottom: 8,
    fontSize: getFontSize(12),
    color: "#ff4a2a",
    fontFamily: "Karla",
  },

  noteText: {
    marginHorizontal: 20,
    fontSize: getFontSize(12),
    color: "rgba(48, 50, 72, 0.55)",
    textAlign: "left",
    marginBottom: 12,
    fontFamily: "Karla",
  },

  dropdownWrapper: {
    fontFamily: "Karla",
    marginHorizontal: 20,
    marginBottom: 8,
  },

  dropdownText: {
    fontSize: getFontSize(16),
    color: "#303248",
    fontFamily: "Karla",
  },

  dropdownContainer: {
    borderColor: "rgba(48, 50, 72, 0.12)",
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#303248",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    
  },

  checkboxLocation: {
    marginHorizontal: 10,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxTxt: {
    flex: 1,
    fontSize: getFontSize(12),
    color: "rgba(48, 50, 72, 0.6)",
    fontFamily: "Karla",
  },

  // ── Submit button ──────────────────────────────────────────────────────────
  signupBtn: {
    backgroundColor: "#303248",
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#1a1c2e",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  signupBtnText: {
    fontFamily: "Karla",
    fontSize: getFontSize(15),
    fontWeight: "700",
    color: "#edc526",
    letterSpacing: 0.5,
  },
});

export default signupStyles;
