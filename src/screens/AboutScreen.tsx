// Worked on by: Siri Avula
import { View, Text, ScrollView, Pressable } from "react-native";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import blueLogo from "../assets/blue_small.png";
import { useNavigate } from "react-router-dom";
import aboutStyles from "../styles/AboutStyles";
import LyraquistHeader from "../components/LyraquistHeader";

const MENU_ITEMS = [
  { label: "About Us", route: "/about/welcome" },
  { label: "Privacy Policy", route: "/about/privacy" },
  { label: "Terms & Conditions", route: "/about/terms" },
  { label: "Third-Party Software", route: "/about/third-party" },
  { label: "Send us Feedback", route: "/about/feedback" },
];

export default function AboutScreen() {
  const navigate = useNavigate();

  return (
    <ScrollView style={aboutStyles.container}>
      <LyraquistHeader title="About Lyraquist" logo={blueLogo} />

      <View style={aboutStyles.menuCard}>
        {MENU_ITEMS.map(({ label, route }, index) => (
          <View key={route}>
            {index > 0 && <View style={aboutStyles.menuInternalDivider} />}
            <Pressable
              style={aboutStyles.menuRow}
              onPress={() => navigate(route)}
            >
              <Text style={aboutStyles.menuRowText}>{label}</Text>
              <KeyboardArrowRightIcon />
            </Pressable>
          </View>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
