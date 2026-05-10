import { StyleSheet, Dimensions, PixelRatio } from "react-native";

const windowWidth = Dimensions.get("window").width;
const getFontSize = (size: number) => size / PixelRatio.getFontScale();

const aboutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e1db",
  },
  introSect: {
    width: windowWidth,
    backgroundColor: "#edc526",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 8,
    shadowColor: "#b89a00",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 10,
  },
  title: {
    textAlign: "center",
    fontSize: getFontSize(26),
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 20,
    color: "#303248",
    letterSpacing: 0.5,
    fontFamily: "Karla",
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

  // ── Hero card ──────────────────────────────────────────────────────────────
  heroCard: {
    backgroundColor: "#303248",
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#1a1c2e",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  heroLogo: {
    height: 100,
    width: 100,
    marginBottom: 16,
  },
  heroTitle: {
    fontFamily: "Karla",
    fontSize: getFontSize(22),
    fontWeight: "800",
    color: "#edc526",
    textAlign: "center",
    letterSpacing: 0.4,
  },
  heroSubtitle: {
    fontFamily: "Karla",
    fontSize: getFontSize(14),
    color: "rgba(232, 225, 219, 0.65)",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
  },

  // ── Q&A cards ──────────────────────────────────────────────────────────────
  qaCard: {
    marginHorizontal: 20,
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(48, 50, 72, 0.1)",
  },
  qaQuestion: {
    fontFamily: "Karla",
    fontSize: getFontSize(16),
    fontWeight: "700",
    color: "#303248",
    marginBottom: 8,
  },
  qaAnswer: {
    fontFamily: "Karla",
    fontSize: getFontSize(14),
    color: "rgba(48, 50, 72, 0.7)",
    lineHeight: 22,
  },
  qaAccent: {
    height: 3,
    width: 32,
    backgroundColor: "#edc526",
    borderRadius: 2,
    marginBottom: 10,
  },

  // ── Contributors card ──────────────────────────────────────────────────────
  contributorsCard: {
    marginHorizontal: 20,
    marginTop: 16,
    paddingBottom: 16,
  },
  contributorsTitle: {
    fontFamily: "Karla",
    fontSize: getFontSize(16),
    fontWeight: "700",
    color: "#303248",
    marginBottom: 10,
  },
  contributorsText: {
    fontFamily: "Karla",
    fontSize: getFontSize(14),
    color: "#303248",
    lineHeight: 22,
  },
  contributorsLabel: {
    fontFamily: "Karla",
    fontSize: getFontSize(12),
    fontWeight: "700",
    color: "rgba(48, 50, 72, 0.55)",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 4,
    marginTop: 10,
  },
});

export default aboutStyles;
