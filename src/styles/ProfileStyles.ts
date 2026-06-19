import { StyleSheet, PixelRatio } from "react-native";

const getFontSize = (size: number) => size / PixelRatio.getFontScale();

const profileStyles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: "#e8e1db",
    height: "93vh",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 24,
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
    fontFamily: "Karla",
  },
  cardValue: {
    fontSize: getFontSize(14),
    color: "#303248",
    fontWeight: "700",
    maxWidth: "55%",
    textAlign: "right",
    fontFamily: "Karla",
  },
  cardInput: {
    fontSize: getFontSize(14),
    color: "#303248",
    flex: 1,
    textAlign: "right",
    fontFamily: "Karla",
  },
  actionBtn: {
    backgroundColor: "#303248",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 12,
    borderRadius: 20,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
  },
  actionBtnText: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: getFontSize(15),
    color: "#5bc8a6",
    letterSpacing: 0.5,
    fontFamily: "Karla",
  },
});

export default profileStyles;
